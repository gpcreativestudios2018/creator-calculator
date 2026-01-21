import { useState, useEffect } from 'react'
import { X, DollarSign, BarChart3, Sparkles, ArrowRight } from 'lucide-react'
import {
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  Twitch,
  ShoppingBag,
  Mail
} from 'lucide-react'
import {
  SiTiktok,
  SiPatreon,
  SiKofi,
  SiSubstack,
  SiDiscord
} from 'react-icons/si'
import { FaXTwitter, FaSnapchat, FaPinterestP, FaPodcast } from 'react-icons/fa6'

interface OnboardingModalProps {
  onComplete: () => void
}

const ONBOARDING_KEY = 'socialstacks-onboarding-complete'

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    const hasCompleted = localStorage.getItem(ONBOARDING_KEY)
    if (!hasCompleted) {
      setIsOpen(true)
    }
  }, [])

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setIsOpen(false)
    onComplete()
  }

  const handleSkip = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setIsOpen(false)
    onComplete()
  }

  if (!isOpen) return null

  const platformIcons = [
    { icon: Youtube, color: 'text-red-500', name: 'YouTube' },
    { icon: SiTiktok, color: 'text-white', name: 'TikTok' },
    { icon: Instagram, color: 'text-pink-500', name: 'Instagram' },
    { icon: FaXTwitter, color: 'text-white', name: 'X' },
    { icon: Facebook, color: 'text-blue-500', name: 'Facebook' },
    { icon: Twitch, color: 'text-purple-500', name: 'Twitch' },
    { icon: Linkedin, color: 'text-blue-400', name: 'LinkedIn' },
    { icon: FaSnapchat, color: 'text-yellow-400', name: 'Snapchat' },
    { icon: FaPinterestP, color: 'text-red-600', name: 'Pinterest' },
    { icon: SiPatreon, color: 'text-orange-500', name: 'Patreon' },
    { icon: SiKofi, color: 'text-pink-400', name: 'Ko-fi' },
    { icon: FaPodcast, color: 'text-purple-400', name: 'Podcast' },
    { icon: SiSubstack, color: 'text-orange-400', name: 'Substack' },
    { icon: SiDiscord, color: 'text-indigo-400', name: 'Discord' },
    { icon: ShoppingBag, color: 'text-orange-500', name: 'Etsy' },
    { icon: Mail, color: 'text-emerald-500', name: 'Newsletter' },
  ]

  const valueProps = [
    {
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-500',
      title: 'Estimate Your Earnings',
      description: 'Calculate potential revenue across 25+ platforms based on your real metrics'
    },
    {
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      title: 'Compare & Optimize',
      description: 'See which platforms pay best and where to focus your content efforts'
    },
    {
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      title: 'AI-Powered Insights',
      description: 'Get personalized growth strategies and revenue optimization tips'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          /* Step 1: Welcome Hero */
          <div className="p-8 md:p-12">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo_full_transparent.png"
                alt="SocialStacks"
                className="h-32 md:h-40 w-auto"
              />
            </div>

            {/* Tagline */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Welcome to SocialStacks! 👋
              </h1>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                Calculate your potential creator income across <span className="text-purple-400 font-semibold">25+ platforms</span> — completely free.
              </p>
            </div>

            {/* Platform Icons Grid */}
            <div className="mb-8">
              <p className="text-center text-sm text-zinc-500 mb-4">Platforms we support:</p>
              <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                {platformIcons.map((platform, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors group"
                    title={platform.name}
                  >
                    <platform.icon className={`w-5 h-5 ${platform.color} group-hover:scale-110 transition-transform`} />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-medium">
                  +9
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/25"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleSkip}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Skip intro
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-8 h-1.5 rounded-full bg-purple-500" />
              <div className="w-8 h-1.5 rounded-full bg-zinc-700" />
            </div>
          </div>
        ) : (
          /* Step 2: Value Props */
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                What You Can Do 🚀
              </h2>
              <p className="text-zinc-400">
                Everything you need to understand and grow your creator income
              </p>
            </div>

            {/* Value Prop Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {valueProps.map((prop, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prop.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <prop.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Pro Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-zinc-300">
                  <span className="text-purple-400 font-medium">Pro features</span> unlock AI tools, exports & more
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/25"
              >
                Start Calculating
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleComplete}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                I'll explore on my own
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex justify-center gap-2 mt-8">
              <div className="w-8 h-1.5 rounded-full bg-zinc-700" />
              <div className="w-8 h-1.5 rounded-full bg-purple-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
