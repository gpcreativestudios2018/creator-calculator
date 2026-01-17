import { useState } from 'react'
import { Info, FileText, DollarSign, HandCoins, Send, Clock, Target, ArrowLeftRight, Layers } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, LineChart, Line } from 'recharts'
import { CircularGauge } from '@/components/CircularGauge'
import { PreviewCard } from '@/components/PreviewCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getPlatformColors } from '@/data/platformColors'
import { platforms, type PlatformInput } from '@/platforms/registry'
import { Play } from 'lucide-react'

interface YouTubeDashboardProps {
  inputValues: Record<string, number>
  onUpdateValue: (inputId: string, value: number) => void
  results: {
    monthlyRevenue: number
    yearlyRevenue: number
    engagementRate?: number
  }
  theme: 'dark' | 'light'
  // Tool modal handlers
  onShowMediaKit: () => void
  onShowRateCard: () => void
  onShowSponsorshipCalc: () => void
  onShowBrandPitch: () => void
  onShowContentROI: () => void
  onShowGoalTracker: () => void
  onShowPlatformSwitch: () => void
  onShowContentMix: () => void
}

export function YouTubeDashboard({
  inputValues,
  onUpdateValue,
  results,
  theme,
  onShowMediaKit,
  onShowRateCard,
  onShowSponsorshipCalc,
  onShowBrandPitch,
  onShowContentROI,
  onShowGoalTracker,
  onShowPlatformSwitch,
  onShowContentMix,
}: YouTubeDashboardProps) {
  const [_activeModal, setActiveModal] = useState<string | null>(null)

  const colors = getPlatformColors('youtube')
  const platform = platforms.find(p => p.id === 'youtube')!

  // Calculate additional metrics for gauges
  const monthlyRevenue = results.monthlyRevenue
  const yearlyRevenue = results.yearlyRevenue
  const engagementRate = results.engagementRate || 4.5

  // Growth rate calculation (simplified - could be enhanced)
  const subscribers = inputValues.subscribers || 0
  const growthRate = subscribers > 0 ? Math.min(((subscribers / 10000) * 5), 25) : 0

  const toolButtons = [
    { label: 'Media Kit', icon: FileText, onClick: onShowMediaKit },
    { label: 'Rate Card', icon: DollarSign, onClick: onShowRateCard },
    { label: 'Sponsorship Pricing', icon: HandCoins, onClick: onShowSponsorshipCalc },
    { label: 'Brand Pitch', icon: Send, onClick: onShowBrandPitch },
    { label: 'Content ROI', icon: Clock, onClick: onShowContentROI },
    { label: 'Goal Tracker', icon: Target, onClick: onShowGoalTracker },
    { label: 'Platform Switch', icon: ArrowLeftRight, onClick: onShowPlatformSwitch },
    { label: 'Content Mix', icon: Layers, onClick: onShowContentMix },
  ]

  // Revenue breakdown data for charts
  const adRevenue = ((inputValues.monthlyViews || 0) / 1000) * (inputValues.cpm || 4) * 0.55
  const sponsorRevenue = (inputValues.subscribers || 0) >= 100000
    ? (inputValues.subscribers || 0) * 0.1
    : (inputValues.subscribers || 0) * 0.05
  const membershipRevenue = (inputValues.subscribers || 0) * 0.02

  const revenueStreamsData = [
    { name: 'Ad Revenue', value: adRevenue, color: colors.light },
    { name: 'Sponsorships', value: sponsorRevenue, color: colors.dark },
    { name: 'Memberships', value: membershipRevenue, color: '#FF9999' },
  ].filter(item => item.value > 0)

  const earningsByPeriodData = [
    { name: 'Daily', value: monthlyRevenue / 30 },
    { name: 'Weekly', value: monthlyRevenue / 4 },
    { name: 'Monthly', value: monthlyRevenue },
    { name: 'Yearly', value: yearlyRevenue },
  ]

  // 12-Month Projection data
  const projectionData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: monthlyRevenue * (1 + (growthRate / 100 * (i / 12))),
  }))

  // Take-Home calculation (simplified)
  const grossAnnual = yearlyRevenue
  const estimatedTax = grossAnnual * 0.25
  const estimatedExpenses = grossAnnual * 0.15
  const takeHome = grossAnnual - estimatedTax - estimatedExpenses
  const takeHomeData = [
    { name: 'Take Home', value: takeHome, color: colors.light },
    { name: 'Taxes', value: estimatedTax, color: colors.dark },
    { name: 'Expenses', value: estimatedExpenses, color: '#FF9999' },
  ]

  // Hourly Rate calculation
  const hoursPerMonth = 40 // Default assumption
  const hourlyRate = monthlyRevenue > 0 ? monthlyRevenue / hoursPerMonth : 0

  // Scenario Analysis data
  const scenarioData = [
    { name: 'Worst', value: monthlyRevenue * 0.7, color: '#EF4444' },
    { name: 'Expected', value: monthlyRevenue, color: colors.light },
    { name: 'Best', value: monthlyRevenue * 1.5, color: '#22C55E' },
  ]

  // Partner Program thresholds
  const monthlyViews = inputValues.monthlyViews || 0
  const watchHours = (monthlyViews * 4) / 60 // Rough estimate: 4 min avg watch time
  const yearlyWatchHours = watchHours * 12
  const subsProgress = Math.min((subscribers / 1000) * 100, 100)
  const watchProgress = Math.min((yearlyWatchHours / 4000) * 100, 100)
  const isMonetized = subscribers >= 1000 && yearlyWatchHours >= 4000

  const renderInput = (input: PlatformInput) => {
    const value = inputValues[input.id] ?? input.defaultValue

    if (input.type === 'slider') {
      return (
        <div key={input.id} className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{input.label}</Label>
              {input.tooltip && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>{input.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{value}</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={([v]) => onUpdateValue(input.id, v)}
            min={input.min}
            max={input.max}
            step={input.step}
            className="w-full"
          />
        </div>
      )
    }

    return (
      <div key={input.id} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{input.label}</Label>
          {input.tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-300 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>{input.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <Input
          type="number"
          value={value}
          onChange={(e) => onUpdateValue(input.id, Number(e.target.value))}
          min={input.min}
          max={input.max}
          className={theme === 'dark' ? 'bg-zinc-800 text-white border-zinc-700' : 'bg-gray-100 text-zinc-900 border-gray-300'}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          YouTube
        </h2>
        <p className="text-zinc-400">Creator revenue dashboard</p>
      </div>

      {/* 4 Circular Gauges */}
      <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
        <CircularGauge
          label="Monthly Revenue"
          value={monthlyRevenue}
          maxValue={Math.max(monthlyRevenue * 1.5, 10000)}
          format="currency"
          colorLight={colors.light}
          colorDark={colors.dark}
          size="lg"
        />
        <CircularGauge
          label="Yearly Projection"
          value={yearlyRevenue}
          maxValue={Math.max(yearlyRevenue * 1.5, 120000)}
          format="currency"
          colorLight={colors.light}
          colorDark={colors.dark}
          size="lg"
        />
        <CircularGauge
          label="Engagement Rate"
          value={engagementRate}
          maxValue={15}
          format="percent"
          colorLight={colors.light}
          colorDark={colors.dark}
          size="lg"
        />
        <CircularGauge
          label="Growth Rate"
          value={growthRate}
          maxValue={30}
          format="percent"
          colorLight={colors.light}
          colorDark={colors.dark}
          size="lg"
        />
      </div>

      {/* 8 Tool Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {toolButtons.map((tool) => (
          <button
            key={tool.label}
            onClick={tool.onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700'
                : 'bg-gray-100 text-zinc-700 hover:bg-gray-200 hover:text-zinc-900 border border-gray-300'
            }`}
          >
            <tool.icon className="w-4 h-4" />
            {tool.label}
          </button>
        ))}
      </div>

      {/* Your Metrics Input Card */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            <Play className="w-5 h-5 text-red-500" />
            Your Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platform.inputs.map(renderInput)}
          </div>
        </CardContent>
      </Card>

      {/* 3x3 Preview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Revenue Streams - Donut Chart */}
        <PreviewCard
          title="Revenue Streams"
          tooltip="Breakdown of your YouTube income sources"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('revenue-streams')}
        >
          {revenueStreamsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueStreamsData}
                  cx="50%"
                  cy="50%"
                  innerRadius="40%"
                  outerRadius="70%"
                  dataKey="value"
                  stroke="none"
                >
                  {revenueStreamsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
              Enter metrics to see breakdown
            </div>
          )}
        </PreviewCard>

        {/* Earnings by Period - Bar Chart */}
        <PreviewCard
          title="Earnings by Period"
          tooltip="Your revenue across different time periods"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('earnings-period')}
        >
          {monthlyRevenue > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsByPeriodData} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {earningsByPeriodData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? colors.light : colors.dark}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
              Enter metrics to see earnings
            </div>
          )}
        </PreviewCard>

        {/* 12-Month Projection - Line Chart */}
        <PreviewCard
          title="12-Month Projection"
          tooltip="Projected revenue growth over the next year"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('projection')}
        >
          {monthlyRevenue > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 8, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.light}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
              Enter metrics to see projection
            </div>
          )}
        </PreviewCard>

        {/* Take-Home Estimate - Donut Chart */}
        <PreviewCard
          title="Take-Home Estimate"
          tooltip="Your estimated earnings after taxes and expenses"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('take-home')}
        >
          {yearlyRevenue > 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="h-3/4 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={takeHomeData}
                      cx="50%"
                      cy="50%"
                      innerRadius="40%"
                      outerRadius="70%"
                      dataKey="value"
                      stroke="none"
                    >
                      {takeHomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${Math.round(takeHome).toLocaleString()}/yr
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
              Enter metrics to see take-home
            </div>
          )}
        </PreviewCard>

        {/* Hourly Rate - Big Number Display */}
        <PreviewCard
          title="Your Hourly Rate"
          tooltip="What you're effectively earning per hour of work"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('hourly-rate')}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <p className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              ${hourlyRate.toFixed(0)}
            </p>
            <p className="text-sm text-zinc-500 mt-1">per hour</p>
            <p className="text-xs text-zinc-600 mt-2">(based on 40 hrs/month)</p>
          </div>
        </PreviewCard>

        {/* How You Compare - Benchmark Display */}
        <PreviewCard
          title="How You Compare"
          tooltip="See how you stack up against other YouTube creators"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('benchmark')}
        >
          <div className="h-full flex flex-col items-center justify-center">
            {(inputValues.subscribers || 0) > 0 ? (
              <>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Top {inputValues.subscribers >= 100000 ? '5%' : inputValues.subscribers >= 10000 ? '20%' : '50%'}
                </p>
                <p className="text-sm text-zinc-500 mt-1">of creators</p>
                <div className="w-full mt-3 px-4">
                  <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${inputValues.subscribers >= 100000 ? 95 : inputValues.subscribers >= 10000 ? 80 : 50}%`,
                        background: `linear-gradient(90deg, ${colors.light}, ${colors.dark})`
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-zinc-500 text-sm">Enter subscribers to compare</div>
            )}
          </div>
        </PreviewCard>

        {/* Scenario Analysis - Bar Chart */}
        <PreviewCard
          title="Scenario Analysis"
          tooltip="Best, expected, and worst case revenue scenarios"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('scenario')}
        >
          {monthlyRevenue > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {scenarioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
              Enter metrics to see scenarios
            </div>
          )}
        </PreviewCard>

        {/* What If Analysis - Multiplier Display */}
        <PreviewCard
          title="What If Analysis"
          tooltip="See how changes would affect your revenue"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('what-if')}
        >
          <div className="h-full flex flex-col justify-center space-y-2 px-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">2x Views</span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${Math.round(monthlyRevenue * 1.8).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">2x Subs</span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${Math.round(monthlyRevenue * 1.3).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-500">+$2 CPM</span>
              <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${Math.round(monthlyRevenue * 1.4).toLocaleString()}
              </span>
            </div>
          </div>
        </PreviewCard>

        {/* Partner Program - Progress Display */}
        <PreviewCard
          title="Partner Program"
          tooltip="YouTube Partner Program eligibility status"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('partner-program')}
        >
          <div className="h-full flex flex-col justify-center px-2">
            {isMonetized ? (
              <div className="text-center">
                <div className="text-3xl mb-2">✓</div>
                <p className={`font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>Eligible!</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">Subscribers</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                      {subscribers.toLocaleString()} / 1,000
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${subsProgress}%`,
                        backgroundColor: subsProgress >= 100 ? '#22C55E' : colors.light
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">Watch Hours</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                      {Math.round(yearlyWatchHours).toLocaleString()} / 4,000
                    </span>
                  </div>
                  <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${watchProgress}%`,
                        backgroundColor: watchProgress >= 100 ? '#22C55E' : colors.dark
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </PreviewCard>
      </div>

      {/* How Is This Calculated - Expandable Section */}
      <details className={`rounded-lg ${theme === 'dark' ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'}`}>
        <summary className={`px-4 py-3 cursor-pointer font-medium ${theme === 'dark' ? 'text-white hover:bg-zinc-800' : 'text-zinc-900 hover:bg-gray-50'}`}>
          ▼ How Is This Calculated?
        </summary>
        <div className={`px-4 pb-4 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          <p className="mb-2"><strong>Ad Revenue:</strong> (Monthly Views / 1,000) × CPM × 0.55</p>
          <p className="mb-2"><strong>Sponsorships:</strong> Based on subscriber count tier</p>
          <p><strong>Note:</strong> These are estimates based on industry averages. Actual earnings vary by niche, location, and audience engagement.</p>
        </div>
      </details>
    </div>
  )
}
