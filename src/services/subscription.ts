import { supabase } from '@/lib/supabase'
import { STRIPE_PRICE_ID } from '@/lib/stripe'

export async function createCheckoutSession(userId: string, userEmail: string) {
  if (!supabase) throw new Error('Supabase not configured')
  
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      priceId: STRIPE_PRICE_ID,
      userId,
      userEmail,
      returnUrl: window.location.origin,
    },
  })

  if (error) throw error
  return data
}

export async function getSubscription(userId: string) {
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data
}

export async function checkPromoCode(code: string) {
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .single()

  if (error) return null
  return data
}

export async function redeemPromoCode(userId: string, promoCodeId: string) {
  if (!supabase) throw new Error('Supabase not configured')
  
  const { error } = await supabase
    .from('promo_redemptions')
    .insert({
      user_id: userId,
      promo_code_id: promoCodeId,
    })

  if (error) throw error
  return true
}

export async function hasRedeemedPromo(userId: string) {
  if (!supabase) return false
  
  const { data } = await supabase
    .from('promo_redemptions')
    .select('id')
    .eq('user_id', userId)
    .single()

  return !!data
}