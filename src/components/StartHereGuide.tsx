import { useState } from 'react'
import { X, Rocket, Target, DollarSign, TrendingUp, Clock, CheckCircle, ChevronRight, Lightbulb, ArrowRight, Wrench } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { resources } from '@/data/resources'

interface StartHereGuideProps {
  theme: 'dark' | 'light'
  onClose: () => void
  onNavigate?: (section: string) => void
}

const steps = [
  {
    id: 'understand',
    title: 'Understand Creator Monetization',
    icon: DollarSign,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    content: [
      {
        heading: 'What is creator monetization?',
        text: 'Creator monetization is how content creators turn their audience into income. This includes ad revenue, sponsorships, subscriptions, digital products, and more.'
      },
      {
        heading: 'The creator economy is massive',
        text: 'Over 50 million people worldwide consider themselves creators. The creator economy is worth over $100 billion and growing rapidly.'
      },
      {
        heading: 'Multiple income streams are key',
        text: 'Successful creators rarely rely on one platform. They diversify across ad revenue, brand deals, memberships, and products to build stable income.'
      }
    ],
    tips: [
      'Start with one platform, master it, then expand',
      'Ad revenue alone is rarely enough — plan for sponsorships early',
      'Your email list is your most valuable asset (you own it)'
    ]
  },
  {
    id: 'calculator',
    title: 'How to Use SocialStacks',
    icon: Rocket,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    content: [
      {
        heading: 'Pick your platform',
        text: 'Use the dropdown in the sidebar to select from 25+ platforms including YouTube, TikTok, Instagram, Twitch, Patreon, and more.'
      },
      {
        heading: 'Enter your metrics',
        text: 'Input your current numbers (followers, views, engagement) or use hypothetical numbers to see potential earnings at different audience sizes.'
      },
      {
        heading: 'Explore the results',
        text: 'See estimated monthly and yearly revenue, plus detailed breakdowns of where that money comes from (ads, sponsorships, etc.).'
      }
    ],
    tips: [
      'Use "Compare All" to see earnings across all platforms at once',
      'Save scenarios to track your progress over time',
      'Adjust Region and Niche for more accurate estimates'
    ]
  },
  {
    id: 'platform',
    title: 'Choose Your Platform',
    icon: Target,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    content: [
      {
        heading: 'Match your content style',
        text: 'Love long-form video? YouTube. Quick entertainment? TikTok. Professional networking? LinkedIn. Writing? Substack. Choose what fits your strengths.'
      },
      {
        heading: 'Consider monetization speed',
        text: 'TikTok grows fast but pays less. YouTube is slower but pays more per view. Patreon requires existing fans but offers predictable income.'
      },
      {
        heading: 'Think about your audience',
        text: 'Where does your target audience spend time? A B2B creator might thrive on LinkedIn while a gamer belongs on Twitch or YouTube.'
      }
    ],
    tips: [
      'YouTube: Best long-term ad revenue, slower growth',
      'TikTok: Fastest growth, lower direct payouts, great for brand deals',
      'Instagram: Visual niches, strong sponsorship potential',
      'Patreon/Substack: Direct fan support, need existing audience'
    ]
  },
  {
    id: 'expectations',
    title: 'Set Realistic Expectations',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    content: [
      {
        heading: 'It takes time',
        text: 'Most creators take 1-2 years to earn meaningful income. The overnight success stories you hear are rare exceptions, not the rule.'
      },
      {
        heading: 'The numbers are averages',
        text: 'Calculator estimates are based on industry averages. Your actual earnings depend on niche, engagement quality, and monetization strategy.'
      },
      {
        heading: 'Consistency beats virality',
        text: 'One viral video rarely changes everything. Consistent posting, steady growth, and audience relationships build sustainable income.'
      }
    ],
    tips: [
      '1,000 true fans paying $100/year = $100K income',
      'Focus on engagement rate, not just follower count',
      'Brand deals often pay 10x more than ad revenue alone'
    ]
  },
  {
    id: 'action',
    title: 'Your First Steps',
    icon: TrendingUp,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    content: [
      {
        heading: 'Step 1: Calculate your current position',
        text: 'Enter your real metrics into SocialStacks to see where you stand today. This is your baseline.'
      },
      {
        heading: 'Step 2: Set a 6-month goal',
        text: 'Use the calculator to model where you want to be. What follower count would get you to $1,000/month? $5,000/month?'
      },
      {
        heading: 'Step 3: Identify your gaps',
        text: 'Use our AI tools and guides to understand what\'s holding you back and create an action plan.'
      }
    ],
    tips: [
      'Check "Monetization Tracker" to see platform requirements',
      'Use "AI Analysis" for personalized growth advice',
      'Read our "Case Studies" to learn from successful creators'
    ]
  },
  {
    id: 'tools',
    title: 'Creator Tools',
    icon: Wrench,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    content: [
      {
        heading: 'The right tools make all the difference',
        text: 'Successful creators use tools to work smarter, not harder. Here are the essential tools for video editing, design, analytics, and monetization.'
      },
      {
        heading: 'Start with the basics',
        text: 'You don\'t need every tool on day one. Start with a good editing tool and a design tool for thumbnails, then expand as you grow.'
      },
      {
        heading: 'Many have free tiers',
        text: 'Most of these tools offer free versions that are perfect for beginners. Upgrade to paid plans as your channel grows and you need more features.'
      }
    ],
    tips: [
      'TubeBuddy or vidIQ are essential for YouTube SEO',
      'Canva makes professional thumbnails easy (no design skills needed)',
      'Build your email list early with ConvertKit',
      'Use Descript or Riverside for podcast/video editing'
    ]
  }
]

export function StartHereGuide({ theme, onClose }: StartHereGuideProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const markComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
    if (stepIndex < steps.length - 1) {
      setActiveStep(stepIndex + 1)
    }
  }

  const currentStep = steps[activeStep]

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b backdrop-blur-sm"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(9, 9, 11, 0.95)' : 'rgba(249, 250, 251, 0.95)',
          borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                🚀 Start Here — Beginner's Guide
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Everything you need to know to start earning as a creator
              </p>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            const isCompleted = completedSteps.includes(index)

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`flex flex-col items-center min-w-[80px] transition-all ${
                  isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                        ? `${step.bgColor} ${step.color}`
                        : theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-200 text-zinc-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className={`text-xs text-center font-medium ${
                  isActive
                    ? theme === 'dark' ? 'text-white' : 'text-zinc-900'
                    : theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
                }`}>
                  {step.title.length > 15 ? step.title.slice(0, 15) + '...' : step.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* Current Step Content */}
        <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 text-xl ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <div className={`p-2 rounded-lg ${currentStep.bgColor}`}>
                <currentStep.icon className={`w-6 h-6 ${currentStep.color}`} />
              </div>
              {currentStep.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep.content.map((section, idx) => (
              <div key={idx}>
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {section.heading}
                </h3>
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                  {section.text}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className={`mb-6 border-2 ${theme === 'dark' ? 'bg-zinc-900/50 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <Lightbulb className="w-5 h-5 text-purple-500" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentStep.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ChevronRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${currentStep.color}`} />
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Tools (only on tools step) */}
        {currentStep.id === 'tools' && (
          <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Recommended Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resources.filter(r => r.category === 'tools').slice(0, 12).map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02] ${
                      theme === 'dark'
                        ? 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {tool.title}
                      </div>
                      <div className={`text-xs truncate ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {tool.description.slice(0, 60)}...
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={theme === 'dark' ? 'border-zinc-700' : ''}
          >
            ← Previous
          </Button>

          <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {activeStep + 1} of {steps.length}
          </span>

          {activeStep === steps.length - 1 ? (
            <Button onClick={() => { markComplete(activeStep); onClose(); }} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Done — Start Exploring!
            </Button>
          ) : (
            <Button onClick={() => markComplete(activeStep)}>
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}