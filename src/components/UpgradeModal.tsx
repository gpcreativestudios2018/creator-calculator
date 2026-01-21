import { useState, useEffect } from 'react'
import { X, Crown, Sparkles, FileText, Download, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePro } from '@/contexts/ProContext'

const FEATURE_NAMES: Record<string, string> = {
  'ai-analysis': 'AI Analysis',
  'ai-growth-plan': 'AI Growth Plan',
  'ai-content-ideas': 'AI Content Ideas',
  'ai-brand-pitch': 'AI Brand Pitch Writer',
  'ai-revenue-opt': 'AI Revenue Optimizer',
  'ai-focus': 'AI Focus Guide',
  'ai-roadmap': 'AI Roadmap',
  'export-pdf': 'PDF Export',
  'export-csv': 'CSV Export',
  'media-kit': 'Media Kit Generator',
  'rate-card': 'Rate Card Generator',
  'sponsorship-calc': 'Sponsorship Calculator',
  'brand-pitch': 'Brand Pitch Generator',
  'business-planner': 'Business Planner',
  'content-roi': 'Content ROI Calculator',
  'goal-tracker': 'Goal Tracker',
  'screenshot-export': 'Screenshot Export',
  'unlimited-scenarios': 'Unlimited Saved Scenarios',
  'save-scenario': 'Save More Scenarios',
}

const PRO_BENEFITS = [
  { icon: Sparkles, text: 'All 7 AI-powered tools' },
  { icon: FileText, text: 'PDF & CSV exports' },
  { icon: Target, text: 'Professional business tools' },
  { icon: Download, text: 'Unlimited saved scenarios' },
]

interface UpgradeModalProps {
  theme: 'dark' | 'light'
}

export function UpgradeModal({ theme }: UpgradeModalProps) {
  const { checkout } = usePro()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeBlockedFeature, setUpgradeBlockedFeature] = useState<string | null>(null)

  // Listen for upgrade modal events
  useEffect(() => {
    const handleShowUpgrade = (e: CustomEvent<{ feature?: string }>) => {
      setUpgradeBlockedFeature(e.detail?.feature || null)
      setShowUpgradeModal(true)
    }
    window.addEventListener('showUpgradeModal', handleShowUpgrade as EventListener)
    return () => window.removeEventListener('showUpgradeModal', handleShowUpgrade as EventListener)
  }, [])

  if (!showUpgradeModal) return null

  const featureName = upgradeBlockedFeature
    ? FEATURE_NAMES[upgradeBlockedFeature] || upgradeBlockedFeature
    : 'this feature'

  const handleUpgrade = () => {
    setShowUpgradeModal(false)
    checkout()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
      <div className={`relative max-w-md w-full mx-4 rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 text-white">
          <button
            onClick={() => setShowUpgradeModal(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Upgrade to Pro</h2>
              <p className="text-white/80 text-sm">Unlock all premium features</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Blocked feature callout */}
          <div className={`mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              You tried to access:
            </p>
            <p className={`text-lg font-semibold mt-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {featureName}
            </p>
          </div>

          {/* Benefits list */}
          <div className="space-y-3 mb-6">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Pro includes:
            </p>
            {PRO_BENEFITS.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <benefit.icon className="w-4 h-4 text-purple-500" />
                </div>
                <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className={`text-center p-4 rounded-xl mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>$9</span>
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>/month</span>
            </div>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
              or $79/year (save 27%)
            </p>
          </div>

          {/* CTA Buttons */}
          <Button
            onClick={handleUpgrade}
            className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mb-3"
          >
            <Zap className="w-5 h-5 mr-2" />
            Unlock Pro Now
          </Button>

          <p className={`text-xs text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Cancel anytime. Secure payment via Stripe.
          </p>
        </div>
      </div>
    </div>
  )
}
