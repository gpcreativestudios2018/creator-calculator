import { useState } from 'react'
import { Info, FileText, DollarSign, HandCoins, Send, Clock, Target, ArrowLeftRight, Layers, Sparkles, TrendingUp, Lightbulb, Mail, Compass, Map, BookOpen, Briefcase } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'
import { StatCard } from '@/components/StatCard'
import { PreviewCard } from '@/components/PreviewCard'
import { ShareButtons } from '@/components/ShareButtons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getPlatformColors } from '@/data/platformColors'
import { HowItsCalculated } from '@/components/HowItsCalculated'
import { PlatformModal } from '@/components/PlatformModal'
import { platforms, type PlatformInput } from '@/platforms/registry'
interface PlatformDashboardProps {
  platformId: string
  inputValues: Record<string, number>
  onUpdateValue: (inputId: string, value: number) => void
  results: {
    monthlyRevenue: number
    yearlyRevenue: number
    engagementRate?: number
  }
  theme: 'dark' | 'light'
  formatCurrency: (value: number) => string
  onShowMediaKit: () => void
  onShowRateCard: () => void
  onShowSponsorshipCalc: () => void
  onShowBrandPitch: () => void
  onShowContentROI: () => void
  onShowGoalTracker: () => void
  onShowPlatformSwitch: () => void
  onShowContentMix: () => void
  onShowAIAnalysis: () => void
  onShowAIGrowthPlan: () => void
  onShowAIContentIdeas: () => void
  onShowAIBrandPitch: () => void
  onShowAIRevenueOpt: () => void
  onShowAIFocus: () => void
  onShowAIRoadmap: () => void
  onShowMonetizationGuide: () => void
  onShowBusinessPlanner: () => void
}

export function PlatformDashboard({
  platformId,
  inputValues,
  onUpdateValue,
  results,
  theme,
  formatCurrency: _formatCurrency,
  onShowMediaKit,
  onShowRateCard,
  onShowSponsorshipCalc,
  onShowBrandPitch,
  onShowContentROI,
  onShowGoalTracker,
  onShowPlatformSwitch,
  onShowContentMix,
  onShowAIAnalysis,
  onShowAIGrowthPlan,
  onShowAIContentIdeas,
  onShowAIBrandPitch,
  onShowAIRevenueOpt,
  onShowAIFocus,
  onShowAIRoadmap,
  onShowMonetizationGuide,
  onShowBusinessPlanner,
}: PlatformDashboardProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const colors = getPlatformColors(platformId)
  const platform = platforms.find(p => p.id === platformId)

  if (!platform) return null

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
    { label: 'How to Monetize', icon: BookOpen, onClick: onShowMonetizationGuide },
    { label: 'Business Planner', icon: Briefcase, onClick: onShowBusinessPlanner },
  ]

  const aiToolButtons = [
    { label: 'AI Analysis', icon: Sparkles, onClick: onShowAIAnalysis, color: 'purple' },
    { label: 'Growth Plan', icon: TrendingUp, onClick: onShowAIGrowthPlan, color: 'emerald' },
    { label: 'Content Ideas', icon: Lightbulb, onClick: onShowAIContentIdeas, color: 'yellow' },
    { label: 'Brand Pitch', icon: Mail, onClick: onShowAIBrandPitch, color: 'blue' },
    { label: 'Revenue Optimizer', icon: DollarSign, onClick: onShowAIRevenueOpt, color: 'green' },
    { label: 'Focus Guide', icon: Compass, onClick: onShowAIFocus, color: 'orange' },
    { label: 'Roadmap', icon: Map, onClick: onShowAIRoadmap, color: 'indigo' },
  ]

  // Revenue breakdown data for charts
  const adRevenue = ((inputValues.monthlyViews || 0) / 1000) * (inputValues.cpm || 4) * 0.55
  const sponsorRevenue = (inputValues.subscribers || 0) >= 100000
    ? (inputValues.subscribers || 0) * 0.1
    : (inputValues.subscribers || 0) * 0.05
  const membershipRevenue = (inputValues.subscribers || 0) * 0.02

  const revenueStreamsData = [
    { name: 'Ad Revenue', value: adRevenue, color: '#22C55E' },
    { name: 'Sponsorships', value: sponsorRevenue, color: '#3B82F6' },
    { name: 'Memberships', value: membershipRevenue, color: '#F97316' },
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
    { name: 'Take Home', value: takeHome, color: '#22C55E' },
    { name: 'Taxes', value: estimatedTax, color: '#EF4444' },
    { name: 'Expenses', value: estimatedExpenses, color: '#F97316' },
  ]

  // Hourly Rate calculation
  const hoursPerMonth = 40 // Default assumption
  const hourlyRate = monthlyRevenue > 0 ? monthlyRevenue / hoursPerMonth : 0

  // Scenario Analysis data
  const scenarioData = [
    { name: 'Worst', value: monthlyRevenue * 0.7, color: '#EF4444' },
    { name: 'Expected', value: monthlyRevenue, color: '#3B82F6' },
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
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${platform.gradient} bg-clip-text text-transparent`}>
          {platform.name}
        </h2>
        <p className="text-zinc-400">{platform.description}</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="per month"
          progress={Math.min((monthlyRevenue / 10000) * 100, 100)}
          color="#22C55E"
          theme={theme}
        />
        <StatCard
          label="Yearly Projection"
          value={`$${yearlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="per year"
          progress={Math.min((yearlyRevenue / 120000) * 100, 100)}
          color="#3B82F6"
          theme={theme}
        />
        <StatCard
          label="Engagement Rate"
          value={`${engagementRate.toFixed(1)}%`}
          subtitle="avg engagement"
          progress={Math.min((engagementRate / 10) * 100, 100)}
          color="#F97316"
          theme={theme}
        />
        <StatCard
          label="Growth Rate"
          value={`${growthRate.toFixed(1)}%`}
          subtitle="monthly growth"
          progress={Math.min((growthRate / 20) * 100, 100)}
          color="#14B8A6"
          theme={theme}
        />
      </div>

      {/* Share Buttons */}
      <div className="flex justify-end mt-4">
        <ShareButtons
          platform={platform.name}
          monthlyRevenue={monthlyRevenue}
          yearlyRevenue={yearlyRevenue}
          theme={theme}
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

      {/* AI Tools Section */}
      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-800/30' : 'bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200'}`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>AI-Powered Tools</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {aiToolButtons.map((tool) => (
            <button
              key={tool.label}
              onClick={tool.onClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                  : 'bg-white/80 text-zinc-700 hover:bg-white hover:text-zinc-900 border border-gray-200'
              }`}
            >
              <tool.icon className={`w-4 h-4 ${
                tool.color === 'purple' ? 'text-purple-500' :
                tool.color === 'emerald' ? 'text-emerald-500' :
                tool.color === 'yellow' ? 'text-yellow-500' :
                tool.color === 'blue' ? 'text-blue-500' :
                tool.color === 'green' ? 'text-green-500' :
                tool.color === 'orange' ? 'text-orange-500' :
                'text-indigo-500'
              }`} />
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Your Metrics Input Card */}
      <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            <platform.icon className={`w-5 h-5 ${platform.iconColor}`} />
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
          theme={theme}
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
          theme={theme}
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
                      fill={index % 2 === 0 ? '#3B82F6' : '#60A5FA'}
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
          theme={theme}
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
                  stroke="#22C55E"
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
          theme={theme}
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
          theme={theme}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-emerald-500">
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
          theme={theme}
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
          theme={theme}
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
          theme={theme}
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
          theme={theme}
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

      {/* How Is This Calculated - Full Component */}
      <HowItsCalculated platformId={platformId} />

      {/* Revenue Streams Modal */}
      <PlatformModal
        isOpen={activeModal === 'revenue-streams'}
        onClose={() => setActiveModal(null)}
        title="Revenue Streams"
        theme={theme}
      >
        <div className="space-y-6">
          <div className="h-64">
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
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {revenueStreamsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {revenueStreamsData.map((stream) => (
              <div key={stream.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stream.color }} />
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{stream.name}</span>
                </div>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  ${stream.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PlatformModal>

      {/* Earnings by Period Modal */}
      <PlatformModal
        isOpen={activeModal === 'earnings-period'}
        onClose={() => setActiveModal(null)}
        title="Earnings by Period"
        theme={theme}
      >
        <div className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsByPeriodData} margin={{ top: 20, right: 30, bottom: 20, left: 40 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {earningsByPeriodData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3B82F6' : '#60A5FA'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {earningsByPeriodData.map((period) => (
              <div key={period.name} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <p className="text-sm text-zinc-500">{period.name}</p>
                <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  ${period.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PlatformModal>

      {/* 12-Month Projection Modal */}
      <PlatformModal
        isOpen={activeModal === 'projection'}
        onClose={() => setActiveModal(null)}
        title="12-Month Projection"
        theme={theme}
      >
        <div className="space-y-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData} margin={{ top: 20, right: 30, bottom: 20, left: 40 }}>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={{ fill: '#22C55E', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <p className="text-sm text-zinc-500">Starting</p>
              <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                ${monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <p className="text-sm text-zinc-500">End of Year</p>
              <p className={`text-xl font-bold text-emerald-500`}>
                ${projectionData[11]?.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <p className="text-sm text-zinc-500">Growth</p>
              <p className={`text-xl font-bold text-emerald-500`}>
                +{growthRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </PlatformModal>

      {activeModal === 'take-home' && (
        <PlatformModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Take-Home Estimate"
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Estimated earnings after taxes and business expenses. Based on typical creator tax brackets and expense ratios.
            </p>

            {yearlyRevenue > 0 ? (
              <>
                <div className="h-64">
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
                        label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      >
                        {takeHomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}>Take-Home (60%)</span>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      ${takeHome.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                    <span className="text-zinc-500">Estimated Taxes (25%)</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                      ${estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                    <span className="text-zinc-500">Business Expenses (15%)</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                      ${estimatedExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                    </span>
                  </div>
                </div>

                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  * Estimates based on 25% tax rate and 15% business expenses. Actual amounts vary by location and business structure.
                </p>
              </>
            ) : (
              <p className="text-zinc-500 text-center py-8">Enter your metrics to see take-home estimate.</p>
            )}
          </div>
        </PlatformModal>
      )}

      {activeModal === 'hourly-rate' && (
        <PlatformModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Your Hourly Rate"
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              What you're effectively earning per hour based on estimated time investment.
            </p>

            <div className={`text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <p className="text-6xl font-bold text-emerald-500 mb-2">
                ${hourlyRate.toFixed(0)}
              </p>
              <p className="text-zinc-500">per hour</p>
            </div>

            <div className="space-y-3">
              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <span className="text-zinc-500">Monthly Revenue</span>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  ${monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <span className="text-zinc-500">Hours/Month (estimated)</span>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>40 hrs</span>
              </div>
              <div className={`flex justify-between items-center p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <span className="text-zinc-500">Hours/Week</span>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>~10 hrs</span>
              </div>
            </div>

            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              * Based on 40 hours/month estimate. Adjust mentally for your actual time investment.
            </p>
          </div>
        </PlatformModal>
      )}

      {activeModal === 'benchmark' && (
        <PlatformModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="How You Compare"
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              See how your metrics stack up against other {platform.name} creators.
            </p>

            {(inputValues.subscribers || inputValues.followers || 0) > 0 ? (
              <>
                <div className={`text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                  <p className={`text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Top {(inputValues.subscribers || inputValues.followers || 0) >= 100000 ? '5%' : (inputValues.subscribers || inputValues.followers || 0) >= 10000 ? '20%' : (inputValues.subscribers || inputValues.followers || 0) >= 1000 ? '35%' : '50%'}
                  </p>
                  <p className="text-zinc-500">of {platform.name} creators</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500">Your Position</span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                        {(inputValues.subscribers || inputValues.followers || 0).toLocaleString()} followers
                      </span>
                    </div>
                    <div className={`h-4 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(((inputValues.subscribers || inputValues.followers || 0) / 100000) * 100, 100)}%`,
                          background: `linear-gradient(90deg, ${colors.light}, ${colors.dark})`
                        }}
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                    <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Milestones</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">1,000 (Top 50%)</span>
                        <span>{(inputValues.subscribers || inputValues.followers || 0) >= 1000 ? '✓' : `${Math.round(((inputValues.subscribers || inputValues.followers || 0) / 1000) * 100)}%`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">10,000 (Top 20%)</span>
                        <span>{(inputValues.subscribers || inputValues.followers || 0) >= 10000 ? '✓' : `${Math.round(((inputValues.subscribers || inputValues.followers || 0) / 10000) * 100)}%`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">100,000 (Top 5%)</span>
                        <span>{(inputValues.subscribers || inputValues.followers || 0) >= 100000 ? '✓' : `${Math.round(((inputValues.subscribers || inputValues.followers || 0) / 100000) * 100)}%`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">1,000,000 (Top 1%)</span>
                        <span>{(inputValues.subscribers || inputValues.followers || 0) >= 1000000 ? '✓' : `${((inputValues.subscribers || inputValues.followers || 0) / 1000000 * 100).toFixed(1)}%`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-zinc-500 text-center py-8">Enter your follower count to see how you compare.</p>
            )}
          </div>
        </PlatformModal>
      )}

      {activeModal === 'scenario' && (
        <PlatformModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Scenario Analysis"
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Best case, expected, and worst case monthly revenue scenarios.
            </p>

            {monthlyRevenue > 0 ? (
              <>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scenarioData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: theme === 'dark' ? '#a1a1aa' : '#71717a' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `$${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {scenarioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  <div className={`flex justify-between items-center p-4 rounded-lg border ${theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
                    <div>
                      <span className={theme === 'dark' ? 'text-red-400' : 'text-red-700'}>Worst Case</span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-red-400/70' : 'text-red-600'}`}>-30% from baseline</p>
                    </div>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                      ${(monthlyRevenue * 0.7).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-4 rounded-lg border ${theme === 'dark' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
                    <div>
                      <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>Expected</span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-blue-400/70' : 'text-blue-600'}`}>Current estimate</p>
                    </div>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                      ${monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center p-4 rounded-lg border ${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div>
                      <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}>Best Case</span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-emerald-400/70' : 'text-emerald-600'}`}>+50% from baseline</p>
                    </div>
                    <span className={`text-xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      ${(monthlyRevenue * 1.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-zinc-500 text-center py-8">Enter your metrics to see scenario analysis.</p>
            )}
          </div>
        </PlatformModal>
      )}

      {activeModal === 'what-if' && (
        <PlatformModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="What If Analysis"
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              See how changes to your metrics would affect your revenue.
            </p>

            <div className="space-y-3">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>Double your views</span>
                  <span className="text-emerald-500 font-bold">
                    ${Math.round(monthlyRevenue * 1.8).toLocaleString()}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '80%' }} />
                </div>
                <p className="text-xs text-emerald-500 mt-1">+{Math.round((1.8 - 1) * 100)}% revenue</p>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>Double your followers</span>
                  <span className="text-emerald-500 font-bold">
                    ${Math.round(monthlyRevenue * 1.3).toLocaleString()}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '30%' }} />
                </div>
                <p className="text-xs text-emerald-500 mt-1">+{Math.round((1.3 - 1) * 100)}% revenue</p>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>Increase CPM by $2</span>
                  <span className="text-emerald-500 font-bold">
                    ${Math.round(monthlyRevenue * 1.4).toLocaleString()}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '40%' }} />
                </div>
                <p className="text-xs text-emerald-500 mt-1">+{Math.round((1.4 - 1) * 100)}% revenue</p>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>All of the above</span>
                  <span className="text-emerald-500 font-bold">
                    ${Math.round(monthlyRevenue * 3.5).toLocaleString()}
                  </span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }} />
                </div>
                <p className="text-xs text-emerald-500 mt-1">+{Math.round((3.5 - 1) * 100)}% revenue</p>
              </div>
            </div>
          </div>
        </PlatformModal>
      )}

      {activeModal === 'partner-program' && (
        <PlatformModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Partner Program Status"
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Track your progress toward {platform.name} monetization requirements.
            </p>

            {isMonetized ? (
              <div className={`text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
                <div className="text-5xl mb-4">🎉</div>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  You're Eligible!
                </p>
                <p className={`mt-2 ${theme === 'dark' ? 'text-emerald-400/70' : 'text-emerald-600'}`}>
                  You meet the requirements for {platform.name} monetization.
                </p>
              </div>
            ) : (
              <>
                <div className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                    Keep Growing!
                  </p>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-amber-400/70' : 'text-amber-600'}`}>
                    You're on your way to monetization eligibility.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500">Subscribers</span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                        {subscribers.toLocaleString()} / 1,000
                      </span>
                    </div>
                    <div className={`h-4 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${subsProgress}%`,
                          backgroundColor: subsProgress >= 100 ? '#22C55E' : colors.light
                        }}
                      />
                    </div>
                    <p className={`text-xs mt-1 ${subsProgress >= 100 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      {subsProgress >= 100 ? '✓ Complete!' : `${(1000 - subscribers).toLocaleString()} more needed`}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-500">Watch Hours (yearly)</span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                        {Math.round(yearlyWatchHours).toLocaleString()} / 4,000
                      </span>
                    </div>
                    <div className={`h-4 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${watchProgress}%`,
                          backgroundColor: watchProgress >= 100 ? '#22C55E' : colors.dark
                        }}
                      />
                    </div>
                    <p className={`text-xs mt-1 ${watchProgress >= 100 ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      {watchProgress >= 100 ? '✓ Complete!' : `${(4000 - yearlyWatchHours).toLocaleString()} more needed`}
                    </p>
                  </div>
                </div>
              </>
            )}

            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              * Requirements shown are for YouTube Partner Program. Other platforms have different thresholds.
            </p>
          </div>
        </PlatformModal>
      )}
    </div>
  )
}
