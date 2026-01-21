import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getSubscription, hasRedeemedPromo, createCheckoutSession } from '@/services/subscription'

type ProTier = 'free' | 'pro' | 'lifetime'

interface ProContextType {
  tier: ProTier
  isPro: boolean
  isLifetime: boolean
  loading: boolean
  setTier: (tier: ProTier) => void
  canUseFeature: (feature: string) => boolean
  triggerUpgrade: (feature?: string) => void
  checkout: () => Promise<void>
}

const ProContext = createContext<ProContextType | undefined>(undefined)

const PRO_FEATURES = [
  'ai-analysis',
  'ai-growth-plan',
  'ai-content-ideas',
  'ai-brand-pitch',
  'ai-revenue-opt',
  'ai-focus',
  'ai-roadmap',
  'export-pdf',
  'export-csv',
  'saved-scenarios',
  'media-kit',
]

export function ProProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [tier, setTierState] = useState<ProTier>('free')
  const [loading, setLoading] = useState(true)

  // Check subscription status when user changes
  useEffect(() => {
    async function checkSubscription() {
      if (!user) {
        // Check localStorage for demo/promo
        const stored = localStorage.getItem('socialstacks_tier')
        if (stored === 'pro' || stored === 'lifetime') {
          setTierState(stored)
        } else {
          setTierState('free')
        }
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // Check for lifetime promo redemption first
        const hasPromo = await hasRedeemedPromo(user.id)
        if (hasPromo) {
          setTierState('lifetime')
          localStorage.setItem('socialstacks_tier', 'lifetime')
          setLoading(false)
          return
        }

        // Check for active subscription
        const subscription = await getSubscription(user.id)
        if (subscription && subscription.status === 'active') {
          setTierState('pro')
          localStorage.setItem('socialstacks_tier', 'pro')
        } else {
          setTierState('free')
          localStorage.removeItem('socialstacks_tier')
        }
      } catch (error) {
        console.error('Error checking subscription:', error)
        setTierState('free')
      }
      setLoading(false)
    }

    checkSubscription()
  }, [user])

  // Listen for successful checkout return
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname)
      // Refresh subscription status
      if (user) {
        setLoading(true)
        getSubscription(user.id).then(sub => {
          if (sub && sub.status === 'active') {
            setTierState('pro')
            localStorage.setItem('socialstacks_tier', 'pro')
          }
          setLoading(false)
        })
      }
    }
  }, [user])

  const setTier = (newTier: ProTier) => {
    setTierState(newTier)
    if (newTier === 'free') {
      localStorage.removeItem('socialstacks_tier')
    } else {
      localStorage.setItem('socialstacks_tier', newTier)
    }
  }

  const isPro = tier === 'pro' || tier === 'lifetime'
  const isLifetime = tier === 'lifetime'

  const canUseFeature = (feature: string) => {
    if (isPro) return true
    return !PRO_FEATURES.includes(feature)
  }

  const triggerUpgrade = (feature?: string) => {
    setUpgradeFeature(feature || null)
    window.dispatchEvent(new CustomEvent('showUpgradeModal', { detail: { feature } }))
  }

  const checkout = async () => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showAuthModal'))
      return
    }

    try {
      const { url } = await createCheckoutSession(user.id, user.email!)
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    }
  }

  return (
    <ProContext.Provider value={{
      tier,
      isPro,
      isLifetime,
      loading,
      setTier,
      canUseFeature,
      triggerUpgrade,
      checkout
    }}>
      {children}
    </ProContext.Provider>
  )
}

export function usePro() {
  const context = useContext(ProContext)
  if (context === undefined) {
    throw new Error('usePro must be used within a ProProvider')
  }
  return context
}
