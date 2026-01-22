import { X, Check, Crown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PricingModalProps {
  theme: 'dark' | 'light'
  onClose: () => void
  onUpgrade: () => void
  onContinueFree: () => void
  isLoggedIn: boolean
  onSignIn: () => void
}

const freeFeatures = [
  'All 25+ platform calculators',
  'Revenue projections & analytics',
  'Light/Dark theme',
  'Share & copy permalink',
  'Platform comparisons',
  'Basic exports',
]

const proFeatures = [
  'Everything in Free, plus:',
  'AI-powered growth tools',
  'AI brand pitch generator',
  'AI content ideas & strategy',
  'PDF & CSV exports',
  'Saved scenarios',
  'Priority support',
]

export function PricingModal({ theme, onClose, onUpgrade, onContinueFree, isLoggedIn, onSignIn }: PricingModalProps) {
  const isDark = theme === 'dark'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative w-full max-w-4xl rounded-2xl ${isDark ? 'bg-zinc-900' : 'bg-white'} p-8 shadow-2xl`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'}`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            Choose Your Plan
          </h2>
          <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Start free, upgrade when you're ready for more power
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* FREE Tier */}
          <div className={`relative rounded-xl border-2 flex flex-col h-full ${isDark ? 'border-zinc-700 bg-zinc-800/50' : 'border-zinc-200 bg-zinc-50'} p-6`}>
            <div className="mb-6">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${isDark ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-200 text-zinc-600'}`}>
                Best for getting started
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>Free</h3>
              <div className="mt-2">
                <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>$0</span>
                <span className={`${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}> forever</span>
              </div>
            </div>

            <div className="flex-grow">
              <ul className="space-y-3 mb-8">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`} />
                    <span className={`${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={onContinueFree}
              variant="outline"
              className={`w-full mt-auto ${isDark ? 'border-zinc-600 hover:bg-zinc-700' : ''}`}
            >
              Continue Free
            </Button>
          </div>

          {/* PRO Tier */}
          <div className="relative rounded-xl border-2 border-purple-500 bg-gradient-to-b from-purple-500/10 to-transparent p-6 flex flex-col h-full">
            {/* Recommended badge */}
            <div className="absolute -top-3 right-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
            </div>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 bg-purple-500/20 text-purple-400">
                <Sparkles className="w-3 h-3" />
                Power users & serious creators
              </div>
              <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                <Crown className="w-5 h-5 text-yellow-500" />
                Pro
              </h3>
              <div className="mt-2">
                <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>$9</span>
                <span className={`${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>/month</span>
              </div>
              <p className={`text-sm mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                Cancel anytime
              </p>
            </div>

            <div className="flex-grow">
              <ul className="space-y-3 mb-8">
                {proFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-purple-400' : 'text-purple-500'}`} />
                    <span className={`${i === 0 ? (isDark ? 'text-purple-300 font-medium' : 'text-purple-600 font-medium') : (isDark ? 'text-zinc-300' : 'text-zinc-600')}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              onClick={isLoggedIn ? onUpgrade : onSignIn}
              className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold"
            >
              {isLoggedIn ? 'Get Pro' : 'Sign In to Upgrade'}
            </Button>
          </div>
        </div>

        {/* Footer note */}
        <p className={`text-center text-sm mt-6 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Already using SocialStacks? You can upgrade anytime — your data stays the same.
        </p>
      </div>
    </div>
  )
}
