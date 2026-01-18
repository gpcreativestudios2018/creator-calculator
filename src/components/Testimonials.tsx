import { X, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialsProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    handle: '@sarahfinance',
    avatar: '👩‍💼',
    platform: 'YouTube',
    followers: '125K',
    quote: 'Creator Calculator helped me understand my true earning potential. I was undercharging for sponsorships by 40%! This tool paid for itself in one brand deal.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    handle: '@marcusgames',
    avatar: '🎮',
    platform: 'Twitch',
    followers: '45K',
    quote: 'Finally, a calculator that understands streaming revenue. The breakdown between subs, bits, and sponsorships is spot on. Use it every month for planning.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Okonkwo',
    handle: '@elenastyle',
    avatar: '✨',
    platform: 'Instagram',
    followers: '230K',
    quote: 'The media kit generator alone is worth it. I landed 3 brand deals in my first month using the rate card it helped me create.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Whitmore',
    handle: '@jamesb2b',
    avatar: '💼',
    platform: 'LinkedIn',
    followers: '52K',
    quote: 'As a B2B creator, finding accurate revenue estimates was impossible until I found this. The newsletter monetization calculations are incredibly accurate.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Maya Torres',
    handle: '@mayaarts',
    avatar: '🎨',
    platform: 'TikTok',
    followers: '890K',
    quote: 'I went from guessing my income to actually planning my finances. The yearly projections helped me decide to go full-time creator.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Alex Kim',
    handle: '@alexcodes',
    avatar: '💻',
    platform: 'YouTube',
    followers: '78K',
    quote: 'The AI growth plan feature gave me actionable steps that actually worked. Grew my channel 30% in 3 months following its advice.',
    rating: 5,
  },
]

export function Testimonials({ theme, onClose }: TestimonialsProps) {
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
                Creator Testimonials
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                What creators are saying about Creator Calculator
              </p>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Banner */}
        <div className={`rounded-xl p-6 mb-8 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/30' : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'}`}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>10K+</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Creators using CC</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>4.9/5</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Average rating</p>
            </div>
            <div>
              <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>25+</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Platforms supported</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}
            >
              <CardContent className="p-5">
                {/* Quote Icon */}
                <Quote className={`w-8 h-8 mb-3 ${theme === 'dark' ? 'text-purple-500/30' : 'text-purple-200'}`} />

                {/* Quote Text */}
                <p className={`mb-4 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  "{testimonial.quote}"
                </p>

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{testimonial.avatar}</span>
                  <div>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {testimonial.handle} · {testimonial.platform} · {testimonial.followers} followers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}
