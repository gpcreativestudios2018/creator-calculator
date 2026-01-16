import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Youtube, Music2, Instagram, Keyboard, RotateCcw, BarChart3 } from 'lucide-react'

interface OnboardingModalProps {
  onComplete: () => void
}

const steps = [
  {
    title: 'Welcome to Creator Calculator! 👋',
    description: 'Calculate your potential earnings across 11 social platforms. Let\'s show you around.',
    icon: BarChart3,
    content: (
      <div className="flex justify-center gap-4 py-6">
        <Youtube className="w-10 h-10 text-red-500" />
        <Music2 className="w-10 h-10 text-pink-500" />
        <Instagram className="w-10 h-10 text-purple-500" />
      </div>
    ),
  },
  {
    title: 'Choose a Platform',
    description: 'Select any platform from the sidebar to see your estimated revenue based on your metrics.',
    icon: BarChart3,
    content: (
      <div className="bg-zinc-800 rounded-lg p-4 my-4">
        <p className="text-sm text-zinc-400 mb-2">Platforms available:</p>
        <p className="text-white">YouTube, TikTok, Instagram, X, Facebook, LinkedIn, Snapchat, Pinterest, Twitch, Kick, Newsletter</p>
      </div>
    ),
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Power users can navigate quickly with these shortcuts:',
    icon: Keyboard,
    content: (
      <div className="space-y-2 my-4">
        <div className="flex justify-between bg-zinc-800 rounded-lg p-3">
          <span className="text-zinc-400">Switch platforms</span>
          <kbd className="bg-zinc-700 px-2 py-1 rounded text-sm">1-9, 0, -</kbd>
        </div>
        <div className="flex justify-between bg-zinc-800 rounded-lg p-3">
          <span className="text-zinc-400">Navigate up/down</span>
          <kbd className="bg-zinc-700 px-2 py-1 rounded text-sm">↑ ↓</kbd>
        </div>
        <div className="flex justify-between bg-zinc-800 rounded-lg p-3">
          <span className="text-zinc-400">Reset inputs</span>
          <kbd className="bg-zinc-700 px-2 py-1 rounded text-sm">R</kbd>
        </div>
        <div className="flex justify-between bg-zinc-800 rounded-lg p-3">
          <span className="text-zinc-400">Compare all</span>
          <kbd className="bg-zinc-700 px-2 py-1 rounded text-sm">C</kbd>
        </div>
      </div>
    ),
  },
  {
    title: 'You\'re All Set! 🎉',
    description: 'Start entering your metrics to see your estimated earnings. Hover over any ⓘ icon for explanations.',
    icon: RotateCcw,
    content: (
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 my-4 text-center">
        <p className="text-lg font-medium text-white">Ready to calculate your creator income?</p>
      </div>
    ),
  },
]

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('cc-onboarding-complete')
    if (!hasSeenOnboarding) {
      setOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      localStorage.setItem('cc-onboarding-complete', 'true')
      setOpen(false)
      onComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem('cc-onboarding-complete', 'true')
    setOpen(false)
    onComplete()
  }

  const currentStep = steps[step]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{currentStep.title}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>

        {currentStep.content}

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === step ? 'bg-purple-500' : 'bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleSkip} className="text-zinc-400 hover:text-white">
              Skip
            </Button>
            <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
              {step === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
