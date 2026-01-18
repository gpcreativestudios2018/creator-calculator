import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowRight, Star, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { platforms } from '@/platforms/registry'

interface PlatformLandingPageProps {
  platformId: string
  onOpenCalculator: (platformId: string) => void
  className?: string
}

const platformContent: Record<string, {
  tagline: string
  benefits: string[]
  stats: { label: string; value: string }[]
  features: string[]
  faqs: { q: string; a: string }[]
}> = {
  youtube: {
    tagline: 'Calculate your YouTube ad revenue, memberships, and sponsorship potential',
    benefits: [
      'Accurate RPM estimates by niche',
      'Multiple revenue stream breakdown',
      'Sponsorship rate calculator included',
      'Growth projection modeling'
    ],
    stats: [
      { label: 'Avg RPM Range', value: '$2-$25' },
      { label: 'Revenue Streams', value: '4+' },
      { label: 'Accuracy', value: '±15%' },
      { label: 'Free Forever', value: '100%' }
    ],
    features: [
      'Ad revenue calculator with CPM/RPM',
      'Channel membership estimator',
      'Super Chat & Super Thanks modeling',
      'Brand deal pricing guide'
    ],
    faqs: [
      { q: 'How accurate is this calculator?', a: 'Our estimates are within ±15% of actual earnings based on industry data and creator feedback.' },
      { q: 'Does this include all revenue sources?', a: 'Yes! We calculate ads, memberships, Super Chats, and provide sponsorship rate guidance.' },
      { q: 'What RPM should I expect?', a: 'RPM varies by niche from $2 (gaming) to $25+ (finance). Our calculator adjusts for your specific niche.' }
    ]
  },
  tiktok: {
    tagline: 'Estimate your TikTok Creator Fund earnings and brand deal potential',
    benefits: [
      'Creator Fund rate estimates',
      'Brand deal pricing calculator',
      'Engagement rate analysis',
      'Growth potential insights'
    ],
    stats: [
      { label: 'Fund Rate', value: '$0.02-0.04' },
      { label: 'Per 1K Views', value: 'Estimated' },
      { label: 'Brand Deals', value: 'Included' },
      { label: 'Free Tool', value: '100%' }
    ],
    features: [
      'Creativity Program Beta estimates',
      'Brand collaboration pricing',
      'Engagement rate calculator',
      'Affiliate revenue modeling'
    ],
    faqs: [
      { q: 'How much does TikTok pay per view?', a: 'The Creator Fund pays roughly $0.02-$0.04 per 1,000 views, but this varies significantly.' },
      { q: 'Are brand deals included?', a: 'Yes! We estimate brand deal rates based on your follower count and engagement rate.' },
      { q: 'What about TikTok Shop?', a: 'Our calculator includes affiliate and shop commission estimates for eligible creators.' }
    ]
  },
  instagram: {
    tagline: 'Calculate your Instagram sponsorship rates and Reels bonus potential',
    benefits: [
      'Sponsorship rate by follower tier',
      'Reels Play Bonus estimates',
      'Story and post pricing',
      'Engagement-based adjustments'
    ],
    stats: [
      { label: 'Sponsor Rate', value: '$10-100' },
      { label: 'Per 1K Followers', value: 'Base Rate' },
      { label: 'Content Types', value: '4+' },
      { label: 'Always Free', value: '100%' }
    ],
    features: [
      'Feed post sponsorship rates',
      'Story and Reel pricing',
      'Engagement rate impact',
      'Affiliate link revenue'
    ],
    faqs: [
      { q: 'How much should I charge per post?', a: 'A common baseline is $10-$100 per 1,000 followers, adjusted for engagement rate and niche.' },
      { q: 'Does engagement rate matter?', a: 'Absolutely! Higher engagement can increase your rates by 50-200% above baseline.' },
      { q: 'What about Reels bonuses?', a: 'We include Reels Play Bonus estimates when available in your region.' }
    ]
  },
  twitch: {
    tagline: 'Calculate your Twitch subscription revenue, bits, and ad earnings',
    benefits: [
      'Subscription split calculator',
      'Bits revenue breakdown',
      'Ad revenue estimates',
      'Donation modeling'
    ],
    stats: [
      { label: 'Sub Split', value: '50-70%' },
      { label: 'Bits Value', value: '$0.01' },
      { label: 'Revenue Types', value: '5+' },
      { label: 'Free Calculator', value: '100%' }
    ],
    features: [
      'Tier 1/2/3 sub calculations',
      'Bits and cheers revenue',
      'Ad revenue per hour streamed',
      'Sponsorship rate guide'
    ],
    faqs: [
      { q: 'What percentage do streamers keep from subs?', a: 'Most affiliates keep 50%, while partners can negotiate up to 70% of subscription revenue.' },
      { q: 'How much are bits worth?', a: 'Streamers receive $0.01 per bit. 100 bits = $1.00 for the creator.' },
      { q: 'Are donations included?', a: 'Yes! We model typical donation patterns based on viewer count and stream hours.' }
    ]
  },
  patreon: {
    tagline: 'Estimate your Patreon earnings after fees and calculate optimal tier pricing',
    benefits: [
      'After-fee calculations',
      'Tier optimization suggestions',
      'Churn rate modeling',
      'Growth projections'
    ],
    stats: [
      { label: 'Platform Fee', value: '5-12%' },
      { label: 'Payment Fee', value: '~3%' },
      { label: 'You Keep', value: '85-92%' },
      { label: 'Free Tool', value: '100%' }
    ],
    features: [
      'Multi-tier revenue calculator',
      'Fee breakdown by plan type',
      'Patron growth modeling',
      'Churn impact analysis'
    ],
    faqs: [
      { q: 'How much does Patreon take?', a: 'Patreon takes 5-12% depending on your plan, plus ~3% payment processing fees.' },
      { q: 'What tier pricing works best?', a: 'Most successful creators offer tiers at $3, $5, $10, and $25 with escalating value.' },
      { q: 'How do I reduce churn?', a: 'Our calculator models churn rates and shows the impact of retention improvements.' }
    ]
  }
}

// Generate default content for platforms without custom content
const getDefaultContent = (platformName: string) => ({
  tagline: `Calculate your ${platformName} revenue potential with our free calculator`,
  benefits: [
    'Accurate revenue estimates',
    'Multiple income streams',
    'Industry benchmarks',
    'Free forever'
  ],
  stats: [
    { label: 'Accuracy', value: '±15%' },
    { label: 'Income Streams', value: '3+' },
    { label: 'Updated', value: '2025' },
    { label: 'Free', value: '100%' }
  ],
  features: [
    'Revenue calculation',
    'Growth projections',
    'Industry comparisons',
    'Export options'
  ],
  faqs: [
    { q: 'Is this calculator free?', a: 'Yes! Creator Calculator is 100% free to use.' },
    { q: 'How accurate are the estimates?', a: 'Our estimates are based on industry data and typically within ±15% of actual earnings.' },
    { q: 'Can I save my results?', a: 'Yes! You can export and share your calculations.' }
  ]
})

export function PlatformLandingPage({ platformId, onOpenCalculator, className }: PlatformLandingPageProps) {
  const platform = platforms.find(p => p.id === platformId)

  if (!platform) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Platform Not Found</h1>
        <Button onClick={() => onOpenCalculator('youtube')}>Go to Calculator</Button>
      </div>
    )
  }

  const content = platformContent[platformId] || getDefaultContent(platform.name)
  const Icon = platform.icon

  return (
    <div className={cn('max-w-5xl mx-auto p-6 space-y-12', className)}>
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className={cn(
          'inline-flex items-center justify-center w-20 h-20 rounded-2xl',
          `bg-gradient-to-br ${platform.gradient}`
        )}>
          <Icon className="h-10 w-10 text-white" />
        </div>
        <div>
          <Badge variant="secondary" className="mb-4">Free Calculator</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {platform.name} Revenue Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.tagline}
          </p>
        </div>
        <Button size="lg" onClick={() => onOpenCalculator(platformId)} className="text-lg px-8">
          Calculate Your {platform.name} Earnings
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {content.stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-6">Why Use Our {platform.name} Calculator?</h2>
          <ul className="space-y-4">
            {content.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card className="bg-gradient-to-br from-muted/50 to-muted">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="italic text-muted-foreground mb-4">
              "Finally, a calculator that actually understands how {platform.name} monetization works.
              The estimates were spot-on with my actual earnings!"
            </p>
            <p className="font-medium">— {platform.name} Creator</p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Calculator Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {content.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {content.faqs.map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <Card className={cn('bg-gradient-to-br border-2 border-white/10', `${platform.gradient}/20`)}>
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Calculate Your Earnings?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of creators using our free {platform.name} calculator.
          </p>
          <Button size="lg" onClick={() => onOpenCalculator(platformId)}>
            Open {platform.name} Calculator
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
