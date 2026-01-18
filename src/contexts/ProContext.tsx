import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { trackUpgradePrompt, trackUpgradeComplete } from '@/utils/analytics'

type Tier = 'free' | 'pro'

interface ProContextType {
  tier: Tier
  isPro: boolean
  scenariosUsed: number
  maxFreeScenarios: number
  canUseFeature: (feature: string) => boolean
  incrementScenarios: () => void
  showUpgradeModal: boolean
  setShowUpgradeModal: (show: boolean) => void
  upgradeBlockedFeature: string | null
  triggerUpgrade: (feature: string) => void
  // For testing/demo purposes
  setTier: (tier: Tier) => void
}

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
  'media-kit',
  'rate-card',
  'sponsorship-calc',
  'brand-pitch',
  'business-planner',
  'content-roi',
  'goal-tracker',
  'screenshot-export',
  'unlimited-scenarios',
]

const MAX_FREE_SCENARIOS = 3
const STORAGE_KEY_TIER = 'creator-calc-tier'
const STORAGE_KEY_SCENARIOS = 'creator-calc-scenarios-count'

const ProContext = createContext<ProContextType | undefined>(undefined)

export function ProProvider({ children }: { children: ReactNode }) {
  const [tier, setTierState] = useState<Tier>('free')
  const [scenariosUsed, setScenariosUsed] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeBlockedFeature, setUpgradeBlockedFeature] = useState<string | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const storedTier = localStorage.getItem(STORAGE_KEY_TIER) as Tier | null
    const storedScenarios = localStorage.getItem(STORAGE_KEY_SCENARIOS)

    if (storedTier === 'pro') {
      setTierState('pro')
    }
    if (storedScenarios) {
      setScenariosUsed(parseInt(storedScenarios, 10) || 0)
    }
  }, [])

  const isPro = tier === 'pro'

  const setTier = (newTier: Tier) => {
    setTierState(newTier)
    localStorage.setItem(STORAGE_KEY_TIER, newTier)
    if (newTier === 'pro') {
      trackUpgradeComplete()
    }
  }

  const canUseFeature = (feature: string): boolean => {
    if (isPro) return true

    // Check if it's a pro-only feature
    if (PRO_FEATURES.includes(feature)) {
      return false
    }

    // Check scenario limit
    if (feature === 'save-scenario' && scenariosUsed >= MAX_FREE_SCENARIOS) {
      return false
    }

    return true
  }

  const incrementScenarios = () => {
    const newCount = scenariosUsed + 1
    setScenariosUsed(newCount)
    localStorage.setItem(STORAGE_KEY_SCENARIOS, newCount.toString())
  }

  const triggerUpgrade = (feature: string) => {
    setUpgradeBlockedFeature(feature)
    setShowUpgradeModal(true)
    trackUpgradePrompt(feature)
  }

  return (
    <ProContext.Provider
      value={{
        tier,
        isPro,
        scenariosUsed,
        maxFreeScenarios: MAX_FREE_SCENARIOS,
        canUseFeature,
        incrementScenarios,
        showUpgradeModal,
        setShowUpgradeModal,
        upgradeBlockedFeature,
        triggerUpgrade,
        setTier,
      }}
    >
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
