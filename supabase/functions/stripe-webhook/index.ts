import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') as string

async function verifyStripeSignature(payload: string, signature: string): Promise<boolean> {
  const parts = signature.split(',')
  let timestamp = ''
  let sig = ''
  
  for (const part of parts) {
    const [key, value] = part.split('=')
    if (key === 't') timestamp = value
    if (key === 'v1') sig = value
  }
  
  if (!timestamp || !sig) return false
  
  const signedPayload = `${timestamp}.${payload}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(webhookSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signatureBytes = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(signedPayload)
  )
  
  const expectedSig = Array.from(new Uint8Array(signatureBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  
  return sig === expectedSig
}

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  if (!signature) {
    return new Response(JSON.stringify({ error: 'No signature' }), { status: 400 })
  }

  const isValid = await verifyStripeSignature(body, signature)
  if (!isValid) {
    console.error('Invalid signature')
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 })
  }

  const event = JSON.parse(body)
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('Checkout completed:', session.id)
        console.log('Subscription ID:', session.subscription)
        
        if (!session.subscription) {
          console.log('No subscription in session')
          return new Response(JSON.stringify({ received: true, note: 'No subscription' }), { status: 200 })
        }
        
        // Get subscription details from Stripe
        const subResponse = await fetch(
          `https://api.stripe.com/v1/subscriptions/${session.subscription}`,
          {
            headers: { 'Authorization': `Bearer ${stripeSecretKey}` },
          }
        )
        const subscription = await subResponse.json()
        console.log('Subscription data:', JSON.stringify(subscription))
        
        const userId = subscription.metadata?.supabase_user_id
        console.log('User ID from metadata:', userId)
        
        if (userId) {
          const periodEnd = subscription.current_period_end 
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null
            
          const { error } = await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: session.customer,
            stripe_subscription_id: subscription.id,
            status: subscription.status || 'active',
            price_id: subscription.items?.data?.[0]?.price?.id || null,
            current_period_end: periodEnd,
            cancel_at_period_end: subscription.cancel_at_period_end || false,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' })
          
          if (error) {
            console.error('Supabase error:', error)
            return new Response(JSON.stringify({ error: error.message }), { status: 500 })
          }
          console.log('Subscription saved!')
        } else {
          console.log('No user ID found in subscription metadata')
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const userId = subscription.metadata?.supabase_user_id

        if (userId) {
          const periodEnd = subscription.current_period_end 
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null
            
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            stripe_customer_id: subscription.customer,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            price_id: subscription.items?.data?.[0]?.price?.id || null,
            current_period_end: periodEnd,
            cancel_at_period_end: subscription.cancel_at_period_end || false,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' })
        }
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})