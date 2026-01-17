import { useState, useMemo } from 'react'
import { X, Target, DollarSign, TrendingUp, Calendar, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { platforms } from '@/platforms/registry'
import { getPlatformColors } from '@/data/platformColors'

interface CreatorBusinessPlannerProps {
  platformId: string
  currentMetrics: {
    followers: number
    views: number
    monthlyRevenue: number
  }
  theme: 'dark' | 'light'
  onClose: () => void
}

// Platform-specific growth and revenue assumptions
const platformAssumptions: Record<string, {
  avgRevenuePerFollower: number
  avgViewsPerFollower: number
  avgMonthlyGrowthRate: number
  contentPerWeek: number
  hoursPerContent: number
}> = {
  youtube: { avgRevenuePerFollower: 0.05, avgViewsPerFollower: 100, avgMonthlyGrowthRate: 3, contentPerWeek: 2, hoursPerContent: 8 },
  tiktok: { avgRevenuePerFollower: 0.01, avgViewsPerFollower: 500, avgMonthlyGrowthRate: 8, contentPerWeek: 7, hoursPerContent: 1 },
  instagram: { avgRevenuePerFollower: 0.02, avgViewsPerFollower: 50, avgMonthlyGrowthRate: 4, contentPerWeek: 5, hoursPerContent: 2 },
  twitter: { avgRevenuePerFollower: 0.005, avgViewsPerFollower: 20, avgMonthlyGrowthRate: 5, contentPerWeek: 14, hoursPerContent: 0.5 },
  facebook: { avgRevenuePerFollower: 0.015, avgViewsPerFollower: 30, avgMonthlyGrowthRate: 2, contentPerWeek: 3, hoursPerContent: 3 },
  linkedin: { avgRevenuePerFollower: 0.1, avgViewsPerFollower: 10, avgMonthlyGrowthRate: 5, contentPerWeek: 5, hoursPerContent: 1 },
  twitch: { avgRevenuePerFollower: 0.2, avgViewsPerFollower: 5, avgMonthlyGrowthRate: 4, contentPerWeek: 4, hoursPerContent: 4 },
  kick: { avgRevenuePerFollower: 0.25, avgViewsPerFollower: 5, avgMonthlyGrowthRate: 6, contentPerWeek: 4, hoursPerContent: 4 },
  patreon: { avgRevenuePerFollower: 5, avgViewsPerFollower: 1, avgMonthlyGrowthRate: 3, contentPerWeek: 2, hoursPerContent: 4 },
  substack: { avgRevenuePerFollower: 0.5, avgViewsPerFollower: 1, avgMonthlyGrowthRate: 4, contentPerWeek: 2, hoursPerContent: 3 },
  newsletter: { avgRevenuePerFollower: 0.3, avgViewsPerFollower: 1, avgMonthlyGrowthRate: 4, contentPerWeek: 2, hoursPerContent: 3 },
  podcast: { avgRevenuePerFollower: 0.1, avgViewsPerFollower: 2, avgMonthlyGrowthRate: 3, contentPerWeek: 1, hoursPerContent: 6 },
  default: { avgRevenuePerFollower: 0.02, avgViewsPerFollower: 50, avgMonthlyGrowthRate: 4, contentPerWeek: 3, hoursPerContent: 2 },
}

export function CreatorBusinessPlanner({ platformId, currentMetrics, theme, onClose }: CreatorBusinessPlannerProps) {
  const [step, setStep] = useState(1)
  const [monthlyIncomeGoal, setMonthlyIncomeGoal] = useState(5000)
  const [timelineMonths, setTimelineMonths] = useState(12)
  const [hoursPerWeek, setHoursPerWeek] = useState(20)
  const [growthStrategy, setGrowthStrategy] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')

  const platform = platforms.find(p => p.id === platformId)
  const colors = getPlatformColors(platformId)
  const assumptions = platformAssumptions[platformId] || platformAssumptions.default

  const growthMultipliers = {
    conservative: 0.6,
    moderate: 1,
    aggressive: 1.5,
  }

  const plan = useMemo(() => {
    const growthRate = (assumptions.avgMonthlyGrowthRate / 100) * growthMultipliers[growthStrategy]
    const currentFollowers = currentMetrics.followers || 100
    const currentRevenue = currentMetrics.monthlyRevenue || 0

    // Calculate required followers for income goal
    const requiredFollowers = Math.ceil(monthlyIncomeGoal / assumptions.avgRevenuePerFollower)
    const followersNeeded = Math.max(0, requiredFollowers - currentFollowers)

    // Calculate months to reach goal based on growth rate
    let monthsToGoal = 0
    let projectedFollowers = currentFollowers
    if (followersNeeded > 0 && growthRate > 0) {
      while (projectedFollowers < requiredFollowers && monthsToGoal < 120) {
        projectedFollowers = projectedFollowers * (1 + growthRate)
        monthsToGoal++
      }
    }

    // Calculate content requirements
    const effectiveGrowthRate = growthRate * (hoursPerWeek / 20) // Adjusted for time investment
    const contentPerMonth = assumptions.contentPerWeek * 4
    const hoursPerMonth = contentPerMonth * assumptions.hoursPerContent

    // Monthly projections
    const projections = []
    let runningFollowers = currentFollowers
    let runningRevenue = currentRevenue
    for (let month = 1; month <= Math.min(timelineMonths, 24); month++) {
      runningFollowers = runningFollowers * (1 + effectiveGrowthRate)
      runningRevenue = runningFollowers * assumptions.avgRevenuePerFollower
      projections.push({
        month,
        followers: Math.round(runningFollowers),
        revenue: Math.round(runningRevenue),
        content: contentPerMonth * month,
      })
    }

    // Final month stats
    const finalProjection = projections[projections.length - 1] || { followers: currentFollowers, revenue: currentRevenue }
    const goalAchievable = finalProjection.revenue >= monthlyIncomeGoal
    const monthToHitGoal = projections.findIndex(p => p.revenue >= monthlyIncomeGoal) + 1

    return {
      requiredFollowers,
      followersNeeded,
      monthsToGoal: monthsToGoal || timelineMonths,
      contentPerMonth,
      hoursPerMonth,
      projections,
      finalProjection,
      goalAchievable,
      monthToHitGoal: monthToHitGoal > 0 ? monthToHitGoal : null,
      currentFollowers,
      currentRevenue,
      growthRate: effectiveGrowthRate * 100,
    }
  }, [monthlyIncomeGoal, timelineMonths, hoursPerWeek, growthStrategy, currentMetrics, assumptions])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const formatCurrency = (num: number) => `$${num.toLocaleString()}`

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
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.light}20` }}
              >
                <Target className="w-5 h-5" style={{ color: colors.light }} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Business Planner
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {platform?.name} • Goal → Revenue → Content
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  step === s
                    ? 'text-white'
                    : step > s
                      ? theme === 'dark' ? 'bg-zinc-800 text-emerald-500' : 'bg-gray-200 text-emerald-600'
                      : theme === 'dark' ? 'bg-zinc-800 text-zinc-500' : 'bg-gray-200 text-zinc-400'
                }`}
                style={step === s ? { backgroundColor: colors.light } : {}}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : <span className="w-4 text-center">{s}</span>}
                {s === 1 ? 'Set Goals' : s === 2 ? 'Your Plan' : 'Action Steps'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Step 1: Set Goals */}
        {step === 1 && (
          <div className="space-y-6">
            <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Monthly Income Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>Target Monthly Revenue</Label>
                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {formatCurrency(monthlyIncomeGoal)}
                    </span>
                  </div>
                  <Slider
                    value={[monthlyIncomeGoal]}
                    onValueChange={(v) => setMonthlyIncomeGoal(v[0])}
                    min={500}
                    max={50000}
                    step={500}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>$500</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Current: <span className="font-semibold text-emerald-500">{formatCurrency(plan.currentRevenue)}/mo</span>
                    {' '}• Gap: <span className="font-semibold">{formatCurrency(Math.max(0, monthlyIncomeGoal - plan.currentRevenue))}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>Months to Achieve Goal</Label>
                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {timelineMonths} months
                    </span>
                  </div>
                  <Slider
                    value={[timelineMonths]}
                    onValueChange={(v) => setTimelineMonths(v[0])}
                    min={3}
                    max={24}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>3 months</span>
                    <span>24 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Growth Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {(['conservative', 'moderate', 'aggressive'] as const).map((strategy) => (
                    <button
                      key={strategy}
                      onClick={() => setGrowthStrategy(strategy)}
                      className={`p-4 rounded-lg text-center transition-all ${
                        growthStrategy === strategy
                          ? 'ring-2 text-white'
                          : theme === 'dark' ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-gray-100 text-zinc-700 hover:bg-gray-200'
                      }`}
                      style={growthStrategy === strategy ? { backgroundColor: colors.light, '--tw-ring-color': colors.light } as React.CSSProperties : {}}
                    >
                      <p className="font-semibold capitalize">{strategy}</p>
                      <p className={`text-xs mt-1 ${growthStrategy === strategy ? 'text-white/80' : 'text-zinc-500'}`}>
                        {strategy === 'conservative' ? '~2% growth/mo' : strategy === 'moderate' ? '~4% growth/mo' : '~6% growth/mo'}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Time Investment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>Hours Per Week</Label>
                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {hoursPerWeek} hrs
                    </span>
                  </div>
                  <Slider
                    value={[hoursPerWeek]}
                    onValueChange={(v) => setHoursPerWeek(v[0])}
                    min={5}
                    max={60}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>5 hrs (part-time)</span>
                    <span>60 hrs (full-time+)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setStep(2)}
              className="w-full py-6 text-lg"
              style={{ backgroundColor: colors.light }}
            >
              Generate My Plan
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Your Plan */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Goal Summary */}
            <Card
              className={`border-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}
              style={{ borderColor: plan.goalAchievable ? '#10b981' : '#f59e0b' }}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    plan.goalAchievable ? 'bg-emerald-500/20 text-emerald-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {plan.goalAchievable ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Goal Achievable!
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        Stretch Goal
                      </>
                    )}
                  </div>

                  <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    In {timelineMonths} months, you could reach:
                  </p>
                  <p className={`text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {formatCurrency(plan.finalProjection.revenue)}/month
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    with {formatNumber(plan.finalProjection.followers)} followers
                  </p>

                  {plan.monthToHitGoal && (
                    <p className="text-emerald-500 font-medium mt-4">
                      You'll hit {formatCurrency(monthlyIncomeGoal)}/mo in month {plan.monthToHitGoal}!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
                <CardContent className="p-4 text-center">
                  <p className={`text-xs uppercase tracking-wide mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Followers Needed
                  </p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {formatNumber(plan.requiredFollowers)}
                  </p>
                </CardContent>
              </Card>

              <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
                <CardContent className="p-4 text-center">
                  <p className={`text-xs uppercase tracking-wide mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Growth Rate
                  </p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {plan.growthRate.toFixed(1)}%/mo
                  </p>
                </CardContent>
              </Card>

              <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
                <CardContent className="p-4 text-center">
                  <p className={`text-xs uppercase tracking-wide mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Content/Month
                  </p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {plan.contentPerMonth}
                  </p>
                </CardContent>
              </Card>

              <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
                <CardContent className="p-4 text-center">
                  <p className={`text-xs uppercase tracking-wide mb-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Hours/Month
                  </p>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {plan.hoursPerMonth}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Projections */}
            <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                  Monthly Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {plan.projections.map((p) => (
                    <div
                      key={p.month}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        p.revenue >= monthlyIncomeGoal
                          ? 'bg-emerald-500/10 border border-emerald-500/30'
                          : theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'
                      }`}
                    >
                      <span className={`font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        Month {p.month}
                      </span>
                      <div className="flex items-center gap-6 text-sm">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}>
                          {formatNumber(p.followers)} followers
                        </span>
                        <span className={`font-semibold ${p.revenue >= monthlyIncomeGoal ? 'text-emerald-500' : theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                          {formatCurrency(p.revenue)}/mo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className={`flex-1 ${theme === 'dark' ? 'border-zinc-700' : ''}`}
              >
                Adjust Goals
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1"
                style={{ backgroundColor: colors.light }}
              >
                Get Action Steps
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Action Steps */}
        {step === 3 && (
          <div className="space-y-6">
            <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  <Target className="w-5 h-5" style={{ color: colors.light }} />
                  Your Weekly Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`} style={{ borderLeftColor: colors.light }}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Content Creation ({Math.ceil(plan.contentPerMonth / 4)} pieces/week)
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <li>• Schedule {Math.ceil(plan.contentPerMonth / 4)} posts per week</li>
                    <li>• Batch create content on dedicated days</li>
                    <li>• Use templates to speed up production</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`} style={{ borderLeftColor: colors.light }}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Growth Activities ({Math.round(hoursPerWeek * 0.3)} hrs/week)
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <li>• Engage with 20+ accounts in your niche daily</li>
                    <li>• Respond to all comments within 1 hour</li>
                    <li>• Collaborate with 1 creator per month</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`} style={{ borderLeftColor: colors.light }}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Monetization Focus
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <li>• Pitch 2 brands per week for sponsorships</li>
                    <li>• Add 1 new revenue stream per quarter</li>
                    <li>• Track and optimize top-performing content</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`} style={{ borderLeftColor: colors.light }}>
                  <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Monthly Milestones
                  </h4>
                  <ul className={`space-y-1 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <li>• Month 1: Reach {formatNumber(Math.round(plan.currentFollowers * 1.04))} followers</li>
                    <li>• Month 3: Hit {formatCurrency(Math.round(plan.projections[2]?.revenue || 0))}/month</li>
                    <li>• Month 6: Reach {formatNumber(plan.projections[5]?.followers || 0)} followers</li>
                    {plan.monthToHitGoal && <li>• Month {plan.monthToHitGoal}: Hit your {formatCurrency(monthlyIncomeGoal)} goal!</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-2 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`} style={{ borderColor: colors.light }}>
              <CardContent className="p-6 text-center">
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Your Success Formula
                </h3>
                <p className={`text-lg ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  <span style={{ color: colors.light }} className="font-bold">{Math.ceil(plan.contentPerMonth / 4)}</span> posts/week +{' '}
                  <span style={{ color: colors.light }} className="font-bold">{hoursPerWeek}</span> hrs/week +{' '}
                  <span style={{ color: colors.light }} className="font-bold">{timelineMonths}</span> months
                </p>
                <p className={`text-2xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  = {formatCurrency(plan.finalProjection.revenue)}/month
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className={`flex-1 ${theme === 'dark' ? 'border-zinc-700' : ''}`}
              >
                Back to Plan
              </Button>
              <Button
                onClick={onClose}
                className="flex-1"
                style={{ backgroundColor: colors.light }}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
