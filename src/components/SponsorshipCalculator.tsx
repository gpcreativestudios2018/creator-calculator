import { useMemo } from 'react'
import { TrendingUp, Users, Eye, Zap, DollarSign, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platforms } from '@/platforms/registry'

interface SponsorshipMetrics {
  followers: number
  views: number
  engagement: number
}

interface SponsorshipCalculatorProps {
  platformId: string
  metrics: SponsorshipMetrics
  theme: 'dark' | 'light'
}

interface PlatformBenchmark {
  cpmLow: number
  cpmMid: number
  cpmHigh: number
  followerRateLow: number
  followerRateMid: number
  followerRateHigh: number
  engagementMultiplier: number
}

const platformBenchmarks: Record<string, PlatformBenchmark> = {
  youtube: {
    cpmLow: 15,
    cpmMid: 22,
    cpmHigh: 30,
    followerRateLow: 0.02,
    followerRateMid: 0.035,
    followerRateHigh: 0.05,
    engagementMultiplier: 1.5,
  },
  instagram: {
    cpmLow: 10,
    cpmMid: 15,
    cpmHigh: 20,
    followerRateLow: 0.01,
    followerRateMid: 0.015,
    followerRateHigh: 0.02,
    engagementMultiplier: 1.3,
  },
  tiktok: {
    cpmLow: 10,
    cpmMid: 17,
    cpmHigh: 25,
    followerRateLow: 0.01,
    followerRateMid: 0.018,
    followerRateHigh: 0.025,
    engagementMultiplier: 1.4,
  },
  twitter: {
    cpmLow: 5,
    cpmMid: 10,
    cpmHigh: 15,
    followerRateLow: 0.005,
    followerRateMid: 0.01,
    followerRateHigh: 0.015,
    engagementMultiplier: 1.2,
  },
  twitch: {
    cpmLow: 20,
    cpmMid: 30,
    cpmHigh: 45,
    followerRateLow: 0.015,
    followerRateMid: 0.025,
    followerRateHigh: 0.04,
    engagementMultiplier: 1.6,
  },
  podcast: {
    cpmLow: 18,
    cpmMid: 25,
    cpmHigh: 35,
    followerRateLow: 0.03,
    followerRateMid: 0.05,
    followerRateHigh: 0.08,
    engagementMultiplier: 1.4,
  },
  linkedin: {
    cpmLow: 15,
    cpmMid: 25,
    cpmHigh: 40,
    followerRateLow: 0.02,
    followerRateMid: 0.035,
    followerRateHigh: 0.05,
    engagementMultiplier: 1.5,
  },
  default: {
    cpmLow: 10,
    cpmMid: 15,
    cpmHigh: 20,
    followerRateLow: 0.01,
    followerRateMid: 0.015,
    followerRateHigh: 0.02,
    engagementMultiplier: 1.3,
  },
}

const pricingFactors = [
  {
    factor: 'Niche',
    description: 'Finance, tech, and B2B niches command 20-50% higher rates',
    icon: TrendingUp,
  },
  {
    factor: 'Engagement Rate',
    description: 'Above 5% engagement can justify 25-40% premium pricing',
    icon: Zap,
  },
  {
    factor: 'Content Type',
    description: 'Dedicated videos worth 3-5x more than simple mentions',
    icon: Eye,
  },
  {
    factor: 'Exclusivity',
    description: 'Exclusive deals (no competitors) add 30-50% to rates',
    icon: Users,
  },
]

export default function SponsorshipCalculator({ platformId, metrics, theme }: SponsorshipCalculatorProps) {
  const platform = platforms.find(p => p.id === platformId)
  const benchmark = platformBenchmarks[platformId] || platformBenchmarks.default

  const pricing = useMemo(() => {
    const { followers, views, engagement } = metrics

    // CPM-based calculation (views / 1000 * CPM)
    const cpmLow = (views / 1000) * benchmark.cpmLow
    const cpmMid = (views / 1000) * benchmark.cpmMid
    const cpmHigh = (views / 1000) * benchmark.cpmHigh

    // Follower-based calculation
    const followerLow = followers * benchmark.followerRateLow
    const followerMid = followers * benchmark.followerRateMid
    const followerHigh = followers * benchmark.followerRateHigh

    // Engagement-based calculation (engaged followers * multiplier)
    const engagedFollowers = followers * (engagement / 100)
    const engagementLow = engagedFollowers * benchmark.engagementMultiplier * 0.5
    const engagementMid = engagedFollowers * benchmark.engagementMultiplier
    const engagementHigh = engagedFollowers * benchmark.engagementMultiplier * 1.5

    // Calculate final estimates (weighted average of methods)
    const low = Math.round((cpmLow * 0.4 + followerLow * 0.3 + engagementLow * 0.3))
    const mid = Math.round((cpmMid * 0.4 + followerMid * 0.3 + engagementMid * 0.3))
    const high = Math.round((cpmHigh * 0.4 + followerHigh * 0.3 + engagementHigh * 0.3))

    // Benchmark ranges for similar creators
    const benchmarkLow = Math.round(mid * 0.7)
    const benchmarkHigh = Math.round(mid * 1.3)

    // Engagement tier
    let engagementTier: 'low' | 'average' | 'high' = 'average'
    if (engagement < 2) engagementTier = 'low'
    else if (engagement > 5) engagementTier = 'high'

    return {
      low: Math.max(low, 50),
      mid: Math.max(mid, 100),
      high: Math.max(high, 200),
      benchmarkLow: Math.max(benchmarkLow, 50),
      benchmarkHigh: Math.max(benchmarkHigh, 200),
      engagementTier,
      methods: {
        cpm: { low: cpmLow, mid: cpmMid, high: cpmHigh },
        follower: { low: followerLow, mid: followerMid, high: followerHigh },
        engagement: { low: engagementLow, mid: engagementMid, high: engagementHigh },
      },
    }
  }, [metrics, benchmark])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Recommended Rate Card */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" style={{ color: platform?.accentColor || '#8b5cf6' }} />
            <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Your Recommended Sponsorship Rate
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: `${platform?.accentColor}15` }}
          >
            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Based on your {platform?.name || 'platform'} metrics
            </p>
            <p className="text-4xl font-bold" style={{ color: platform?.accentColor }}>
              {formatCurrency(pricing.mid)}
            </p>
            <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Range: {formatCurrency(pricing.low)} - {formatCurrency(pricing.high)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Metrics */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader className="pb-3">
          <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Your Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <Users className={`w-4 h-4 mx-auto mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {formatNumber(metrics.followers)}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Followers</p>
            </div>
            <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <Eye className={`w-4 h-4 mx-auto mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {formatNumber(metrics.views)}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Avg Views</p>
            </div>
            <div className={`text-center p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <Zap className={`w-4 h-4 mx-auto mb-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
              <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {metrics.engagement.toFixed(1)}%
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader className="pb-3">
          <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Pricing Tiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                Conservative
              </p>
              <p className={`text-xl font-bold ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {formatCurrency(pricing.low)}
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Quick deals, new brands
              </p>
            </div>
            <div
              className="p-4 rounded-lg border-2"
              style={{ borderColor: platform?.accentColor, backgroundColor: `${platform?.accentColor}10` }}
            >
              <p className="text-xs font-medium mb-1" style={{ color: platform?.accentColor }}>
                Recommended
              </p>
              <p className="text-xl font-bold" style={{ color: platform?.accentColor }}>
                {formatCurrency(pricing.mid)}
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                Standard rate
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs font-medium mb-1 text-emerald-500`}>
                Premium
              </p>
              <p className="text-xl font-bold text-emerald-500">
                {formatCurrency(pricing.high)}
              </p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Exclusive, high demand
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benchmark Comparison */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader className="pb-3">
          <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Benchmark Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Creators with similar metrics charge:
            </p>
            <p className={`text-lg font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {formatCurrency(pricing.benchmarkLow)} - {formatCurrency(pricing.benchmarkHigh)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}>Below Average</span>
              <span className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}>Above Average</span>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#27272a' : '#e5e7eb' }}>
              <div
                className="absolute h-full rounded-full"
                style={{
                  left: '20%',
                  width: '60%',
                  backgroundColor: `${platform?.accentColor}40`,
                }}
              />
              <div
                className="absolute h-full w-1 rounded-full"
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: platform?.accentColor,
                }}
              />
            </div>
            <p className={`text-center text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Your rate is{' '}
              <span className="font-semibold" style={{ color: platform?.accentColor }}>
                average
              </span>{' '}
              for your metrics
            </p>
          </div>

          {/* Engagement Tier */}
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            pricing.engagementTier === 'high'
              ? 'bg-emerald-500/10'
              : pricing.engagementTier === 'low'
                ? 'bg-amber-500/10'
                : theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
          }`}>
            <Zap className={`w-4 h-4 ${
              pricing.engagementTier === 'high'
                ? 'text-emerald-500'
                : pricing.engagementTier === 'low'
                  ? 'text-amber-500'
                  : theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
            }`} />
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {pricing.engagementTier === 'high'
                ? 'High engagement! You can charge premium rates.'
                : pricing.engagementTier === 'low'
                  ? 'Lower engagement may limit pricing flexibility.'
                  : 'Average engagement supports standard rates.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Factors */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Info className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Factors That Affect Pricing
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pricingFactors.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.factor}
                  className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
                  <div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {item.factor}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Platform CPM Benchmarks */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader className="pb-3">
          <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            {platform?.name || 'Platform'} CPM Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Sponsorship CPM Range
              </span>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${benchmark.cpmLow} - ${benchmark.cpmHigh}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Rate per 1K Followers
              </span>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${(benchmark.followerRateLow * 1000).toFixed(0)} - ${(benchmark.followerRateHigh * 1000).toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Engagement Multiplier
              </span>
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {benchmark.engagementMultiplier}x
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
