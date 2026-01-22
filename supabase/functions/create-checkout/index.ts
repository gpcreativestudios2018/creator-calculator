import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') as string

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { priceId, userId, userEmail, returnUrl } = await req.json()

    if (!priceId || !userId || !userEmail) {
      throw new Error('Missing required parameters')
    }

    // Check if customer exists
    const customerSearch = await fetch(
      `https://api.stripe.com/v1/customers?email=${encodeURIComponent(userEmail)}&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
        },
      }
    )
    const customerData = await customerSearch.json()

    let customerId: string
    if (customerData.data && customerData.data.length > 0) {
      customerId = customerData.data[0].id
    } else {
      // Create customer
      const createCustomer = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: userEmail,
          'metadata[supabase_user_id]': userId,
        }),
      })
      const newCustomer = await createCustomer.json()
      customerId = newCustomer.id
    }

    // Create checkout session
    const sessionResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        customer: customerId,
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        mode: 'subscription',
        success_url: `${returnUrl}?success=true`,
        cancel_url: `${returnUrl}?canceled=true`,
        'subscription_data[metadata][supabase_user_id]': userId,
      }),
    })

    const session = await sessionResponse.json()

    if (session.error) {
      throw new Error(session.error.message)
    }

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})