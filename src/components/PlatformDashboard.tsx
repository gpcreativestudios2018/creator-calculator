import { useState } from 'react'
import { Info, Camera, Crown } from 'lucide-react'
import { PlatformRequirementsModal } from '@/components/PlatformRequirementsModal'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'
import { StatCard } from '@/components/StatCard'
import { PreviewCard } from '@/components/PreviewCard'
import { ShareButtons } from '@/components/ShareButtons'
import { ShareableLink } from '@/components/ShareableLink'
import { ShareCard } from '@/components/ShareCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getPlatformColors } from '@/data/platformColors'
import { getPlatformCardConfig } from '@/data/platformCardConfig'
import { PlatformModal } from '@/components/PlatformModal'
import { platforms, type PlatformInput } from '@/platforms/registry'
import { usePro } from '@/contexts/ProContext'
import { getMethodologyByPlatformId } from '@/data/methodology'

// Inline methodology content component (always expanded)
function MethodologyContent({ platformId, theme }: { platformId: string; theme: 'dark' | 'light' }) {
  const methodology = getMethodologyByPlatformId(platformId)

  if (!methodology) {
    return <p className="text-zinc-400">No methodology data available for this platform.</p>
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div>
        <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Overview
        </h4>
        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {methodology.howItWorks}
        </p>
      </div>

      {/* Formulas */}
      <div>
        <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Formulas
        </h4>
        <div className="space-y-3">
          {methodology.formulas.map((formula: { name: string; formula: string; explanation: string }, index: number) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
            >
              <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'border-zinc-700 bg-zinc-800/80' : 'border-gray-200 bg-gray-50'}`}>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                  {formula.name}
                </span>
              </div>
              <div className="px-4 py-3">
                <code className={`block text-sm font-mono mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {formula.formula}
                </code>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {formula.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assumptions */}
      <div>
        <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Key Assumptions
        </h4>
        <ul className={`space-y-1.5 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {methodology.assumptions.map((assumption: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
              <span>{assumption}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className={`p-4 rounded-lg border ${
        theme === 'dark'
          ? 'bg-amber-950/20 border-amber-900/30'
          : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-start gap-2">
          <span className={`text-lg ${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'}`}>⚠️</span>
          <p className={`text-sm ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800'}`}>
            {methodology.disclaimer}
          </p>
        </div>
      </div>

      {/* Sources */}
      {methodology.sources.length > 0 && (
        <div>
          <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Sources
          </h4>
          <div className="flex flex-wrap gap-2">
            {methodology.sources.map((source: { name: string; url: string }, index: number) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                    : 'bg-gray-100 text-zinc-600 hover:bg-gray-200 hover:text-zinc-900'
                }`}
              >
                {source.name}
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className={`pt-4 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
        <p className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Last updated: {methodology.lastUpdated} • Formula {methodology.version}
        </p>
      </div>
    </div>
  )
}

interface PlatformDashboardProps {
  platformId: string
  inputValues: Record<string, number>
  onUpdateValue: (inputId: string, value: number) => void
  results: {
    monthlyRevenue: number
    yearlyRevenue: number
    engagementRate?: number
    breakdown?: Record<string, number>
  }
  theme: 'dark' | 'light'
  formatCurrency: (value: number) => string
  selectedTimePeriod: string
  onTimePeriodChange: (period: string) => void
  timePeriods: Array<{ id: string; name: string; multiplier: number }>
  onShowPricing?: () => void
}

export function PlatformDashboard({
  platformId,
  inputValues,
  onUpdateValue,
  results,
  theme,
  formatCurrency: _formatCurrency,
  selectedTimePeriod,
  onTimePeriodChange,
  timePeriods,
  onShowPricing,
}: PlatformDashboardProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showShareCard, setShowShareCard] = useState(false)
  const [showRequirementsModal, setShowRequirementsModal] = useState(false)
  const [showMethodologyModal, setShowMethodologyModal] = useState(false)

  const { canUseFeature: _canUseFeature, isPro } = usePro()
  const colors = getPlatformColors(platformId)
  const platform = platforms.find(p => p.id === platformId)

  if (!platform) return null

  // Get platform-specific card configuration
  const cardConfig = getPlatformCardConfig(platformId)

  // Helper to check if a card should be shown
  const shouldShowCard = (cardId: string) => !cardConfig.hiddenCards?.includes(cardId)

  // Get current time period for revenue display
  const currentTimePeriod = timePeriods.find(t => t.id === selectedTimePeriod) || timePeriods[0]

  // Check if user has entered custom values (not just defaults)
  const hasCustomValues = platform.inputs.some(input => {
    const currentValue = inputValues[input.id]
    return currentValue !== undefined && currentValue !== input.defaultValue
  })

  // Calculate additional metrics for gauges
  const monthlyRevenue = results.monthlyRevenue * currentTimePeriod.multiplier
  const yearlyRevenue = results.yearlyRevenue
  const engagementRate = results.engagementRate || 4.5

  // Growth rate calculation (simplified - could be enhanced)
  const subscribers = inputValues.subscribers || 0
  const growthRate = subscribers > 0 ? Math.min(((subscribers / 10000) * 5), 25) : 0

  // Revenue breakdown data from calculation results (platform-specific)
  const revenueStreamsData = cardConfig.revenueStreams
    .map(stream => ({
      name: stream.name,
      value: results.breakdown?.[stream.key] || 0,
      color: stream.color,
    }))
    .filter(item => item.value > 0 && item.name !== 'No Direct Revenue')

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

  // Scenario Analysis data (keep as-is, simple worst/expected/best)
  const scenarioData = [
    { name: 'Worst', value: monthlyRevenue * 0.7, color: '#EF4444' },
    { name: 'Expected', value: monthlyRevenue, color: '#3B82F6' },
    { name: 'Best', value: monthlyRevenue * 1.5, color: '#22C55E' },
  ]

  // What If scenarios from platform config
  const whatIfData = cardConfig.whatIfScenarios.map(scenario => ({
    label: scenario.label,
    value: monthlyRevenue * scenario.multiplier,
    description: scenario.description,
  }))

  // Partner Program thresholds (platform-specific)
  const partnerProgress = cardConfig.partnerRequirements.map(req => {
    const currentValue = inputValues[req.inputKey] || 0
    const progress = Math.min((currentValue / req.threshold) * 100, 100)
    return {
      ...req,
      currentValue,
      progress,
      met: currentValue >= req.threshold,
    }
  })
  const isMonetized = cardConfig.partnerRequirements.length === 0 ||
    partnerProgress.every(req => req.met)

  // How You Compare metric
  const compareValue = inputValues[cardConfig.compareMetric] || inputValues.subscribers || inputValues.followers || 0
  const currentMilestone = cardConfig.compareMilestones.find(m => compareValue < m.value) ||
    cardConfig.compareMilestones[cardConfig.compareMilestones.length - 1]

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
            aria-label={input.label}
          />
        </div>
      )
    }

    return (
      <div key={input.id} className="space-y-2">
        <div className="flex items-center gap-1.5">
          <Label htmlFor={`input-${input.id}`} className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{input.label}</Label>
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
          id={`input-${input.id}`}
          value={value}
          onChange={(e) => onUpdateValue(input.id, Number(e.target.value))}
          min={input.min}
          max={input.max}
          aria-label={input.label}
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

      {/* Share Buttons */}
      <div className="flex justify-end items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowShareCard(true)}
          className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
          title="Create shareable card"
          aria-label="Create shareable card"
        >
          <Camera className="w-4 h-4 text-pink-500" />
        </Button>
        <ShareableLink
          platformId={platformId}
          inputValues={inputValues}
          theme={theme}
        />
        <ShareButtons
          platform={platform.name}
          monthlyRevenue={monthlyRevenue}
          yearlyRevenue={yearlyRevenue}
          theme={theme}
        />
      </div>

      {/* Upgrade to Pro Banner */}
      {!isPro && (
        <div
          onClick={() => onShowPricing?.()}
          className={`p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01] ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 hover:border-purple-500/50'
              : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Unlock Pro Features
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  AI tools, exports, media kits & more
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                $9/mo
              </span>
              <span className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}>
                Upgrade →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div id="revenue-card" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label={`${currentTimePeriod.name} Revenue`}
          value={`$${monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle={`per ${currentTimePeriod.name.toLowerCase().replace('ly', '')}`}
          progress={Math.min((monthlyRevenue / (10000 * currentTimePeriod.multiplier)) * 100, 100)}
          color="#22C55E"
          theme={theme}
          tooltip={`Your estimated ${currentTimePeriod.name.toLowerCase()} earnings from this platform based on the metrics you entered. This includes ad revenue, sponsorships, and other income sources.`}
        />
        <StatCard
          label="Yearly Projection"
          value={`$${yearlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          subtitle="per year"
          progress={Math.min((yearlyRevenue / 120000) * 100, 100)}
          color="#3B82F6"
          theme={theme}
          tooltip="Your annual revenue projection based on 12 months of consistent performance."
        />
        <StatCard
          label="Engagement Rate"
          value={`${engagementRate.toFixed(1)}%`}
          subtitle="avg engagement"
          progress={Math.min((engagementRate / 10) * 100, 100)}
          color="#F97316"
          theme={theme}
          tooltip="How actively your audience interacts with your content (likes, comments, shares) relative to your reach. Rates over 100% can happen when content goes viral beyond your follower count!"
        />
        <StatCard
          label="Growth Rate"
          value={`${growthRate.toFixed(1)}%`}
          subtitle="monthly growth"
          progress={Math.min((growthRate / 20) * 100, 100)}
          color="#14B8A6"
          theme={theme}
          tooltip="An estimated monthly growth percentage based on your current audience size. Smaller accounts typically grow faster percentage-wise than larger ones."
        />
      </div>

      {/* Social Proof Strip */}
      <div className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 px-4 rounded-lg text-sm ${
        theme === 'dark' ? 'bg-zinc-900/50 text-zinc-400' : 'bg-gray-50 text-zinc-600'
      }`}>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-semibold">25+</span> platforms supported
        </span>
        <span className={`hidden sm:block ${theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'}`}>•</span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-semibold">Free</span> to use
        </span>
        <span className={`hidden sm:block ${theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'}`}>•</span>
        <span className="flex items-center gap-1.5">
          <span className="text-emerald-500 font-semibold">No signup</span> required
        </span>
        <span className={`hidden sm:block ${theme === 'dark' ? 'text-zinc-700' : 'text-zinc-300'}`}>•</span>
        <span className="flex items-center gap-1.5">
          Used by <span className="text-emerald-500 font-semibold">creators worldwide</span>
        </span>
      </div>

      {/* Your Metrics Input Card */}
      <Card id="metrics-input" className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <platform.icon className={`w-5 h-5 ${platform.iconColor}`} />
              Your Metrics
              <button
                onClick={() => setShowMethodologyModal(true)}
                className={`text-sm font-normal ml-2 hover:underline transition-colors ${
                  theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                }`}
              >
                How this is calculated
              </button>
            </CardTitle>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRequirementsModal(true)}
                className={`text-sm font-medium hover:underline transition-colors ${
                  theme === 'dark' ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'
                }`}
              >
                How to monetize {platform.name}?
              </button>
              {!hasCustomValues && (
                <div className={`flex items-center gap-2 text-xs ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Sample data</span>
                </div>
              )}
              <div className={`inline-flex rounded-lg p-0.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                {timePeriods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => onTimePeriodChange(period.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      selectedTimePeriod === period.id
                        ? theme === 'dark'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-white text-purple-600 shadow-sm'
                        : theme === 'dark'
                          ? 'text-zinc-400 hover:text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {period.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
        {shouldShowCard('revenue-streams') && (
        <PreviewCard
          title="Revenue Streams"
          tooltip={`Breakdown of your ${platform.name} income sources`}
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('revenue-streams')}
          theme={theme}
        >
          {revenueStreamsData.length > 0 ? (
            <div className="h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueStreamsData}
                      cx="50%"
                      cy="50%"
                      innerRadius="35%"
                      outerRadius="60%"
                      dataKey="value"
                      stroke="none"
                    >
                      {revenueStreamsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-1">
                {revenueStreamsData.slice(0, 3).map((stream, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stream.color }} />
                    <span className="text-[10px] text-zinc-400">{stream.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Enter metrics to see breakdown
            </div>
          )}
        </PreviewCard>
        )}

        {/* Earnings by Period - Bar Chart */}
        {shouldShowCard('earnings-period') && (
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
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Enter metrics to see earnings
            </div>
          )}
        </PreviewCard>
        )}

        {/* 12-Month Projection - Line Chart */}
        {shouldShowCard('projection') && (
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
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Enter metrics to see projection
            </div>
          )}
        </PreviewCard>
        )}

        {/* Take-Home Estimate - Donut Chart */}
        {shouldShowCard('take-home') && (
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
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Enter metrics to see take-home
            </div>
          )}
        </PreviewCard>
        )}

        {/* Hourly Rate - Big Number Display */}
        {shouldShowCard('hourly-rate') && (
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
            <p className="text-sm text-zinc-400 mt-1">per hour</p>
            <p className="text-xs text-zinc-400 mt-2">(based on 40 hrs/month)</p>
          </div>
        </PreviewCard>
        )}

        {/* How You Compare - Always show */}
        <PreviewCard
          title="How You Compare"
          tooltip={`See how you stack up against other ${platform.name} creators`}
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('benchmark')}
          theme={theme}
        >
          <div className="h-full flex flex-col items-center justify-center">
            {compareValue > 0 ? (
              <>
                <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {currentMilestone?.percentile || 'Top 50%'}
                </p>
                <p className="text-sm text-zinc-400 mt-1">of creators</p>
                <div className="w-full mt-3 px-4">
                  <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min((compareValue / (currentMilestone?.value || 100000)) * 100, 100)}%`,
                        background: `linear-gradient(90deg, ${colors.light}, ${colors.dark})`
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-zinc-400 text-sm">Enter metrics to compare</div>
            )}
          </div>
        </PreviewCard>

        {/* Scenario Analysis - Bar Chart */}
        {shouldShowCard('scenario') && (
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
            <div className="flex items-center justify-center h-full text-zinc-400 text-sm">
              Enter metrics to see scenarios
            </div>
          )}
        </PreviewCard>
        )}

        {/* What If Analysis - Multiplier Display */}
        {shouldShowCard('what-if') && (
        <PreviewCard
          title="What If Analysis"
          tooltip="See how changes would affect your revenue"
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('what-if')}
          theme={theme}
        >
          <div className="h-full flex flex-col justify-center space-y-2 px-2">
            {whatIfData.map((scenario, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xs text-zinc-400">{scenario.label}</span>
                <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  ${Math.round(scenario.value).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </PreviewCard>
        )}

        {/* Partner Program - Progress Display */}
        {shouldShowCard('partner-program') && (
        <PreviewCard
          title="Partner Program"
          tooltip={`${cardConfig.partnerProgramName} eligibility status`}
          colorLight={colors.light}
          colorDark={colors.dark}
          onClick={() => setActiveModal('partner-program')}
          theme={theme}
        >
          <div className="h-full flex flex-col justify-center px-2">
            {cardConfig.partnerRequirements.length === 0 ? (
              <div className="text-center">
                <div className="text-3xl mb-2">✓</div>
                <p className={`font-bold text-xs ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  No minimum requirements
                </p>
              </div>
            ) : isMonetized ? (
              <div className="text-center">
                <div className="text-3xl mb-2">✓</div>
                <p className={`font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>Eligible!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {partnerProgress.slice(0, 2).map((req, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">{req.metric}</span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                        {req.currentValue.toLocaleString()} / {req.threshold.toLocaleString()}
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${req.progress}%`,
                          backgroundColor: req.met ? '#22C55E' : colors.light
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </PreviewCard>
        )}
      </div>

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
          title={`${cardConfig.partnerProgramName} Status`}
          platformId={platformId}
        >
          <div className="space-y-6">
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Track your progress toward {platform.name} monetization requirements.
            </p>

            {cardConfig.partnerRequirements.length === 0 ? (
              <div className={`text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
                <div className="text-5xl mb-4">✓</div>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  No Minimum Requirements
                </p>
                <p className={`mt-2 ${theme === 'dark' ? 'text-emerald-400/70' : 'text-emerald-600'}`}>
                  {platform.name} allows anyone to start earning immediately.
                </p>
              </div>
            ) : isMonetized ? (
              <div className={`text-center p-8 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-800' : 'bg-emerald-50 border border-emerald-200'}`}>
                <div className="text-5xl mb-4">🎉</div>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  You're Eligible!
                </p>
                <p className={`mt-2 ${theme === 'dark' ? 'text-emerald-400/70' : 'text-emerald-600'}`}>
                  You meet the requirements for {cardConfig.partnerProgramName}.
                </p>
              </div>
            ) : (
              <>
                <div className={`text-center p-6 rounded-xl ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-amber-400' : 'text-amber-700'}`}>
                    Keep Growing!
                  </p>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-amber-400/70' : 'text-amber-600'}`}>
                    You're on your way to {cardConfig.partnerProgramName} eligibility.
                  </p>
                </div>

                <div className="space-y-4">
                  {partnerProgress.map((req, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-500">{req.metric}</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                          {req.currentValue.toLocaleString()} / {req.threshold.toLocaleString()}
                        </span>
                      </div>
                      <div className={`h-4 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${req.progress}%`,
                            backgroundColor: req.met ? '#22C55E' : colors.light
                          }}
                        />
                      </div>
                      <p className={`text-xs mt-1 ${req.met ? 'text-emerald-500' : 'text-zinc-500'}`}>
                        {req.met ? '✓ Complete!' : `${(req.threshold - req.currentValue).toLocaleString()} more needed`}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              * Requirements shown are for {cardConfig.partnerProgramName}.
            </p>
          </div>
        </PlatformModal>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareCard
          platformId={platformId}
          monthlyRevenue={monthlyRevenue}
          yearlyRevenue={yearlyRevenue}
          theme={theme}
          onClose={() => setShowShareCard(false)}
        />
      )}

      {/* Platform Requirements Modal */}
      {showRequirementsModal && (
        <PlatformRequirementsModal
          platformId={platformId}
          theme={theme}
          onClose={() => setShowRequirementsModal(false)}
        />
      )}

      {/* Methodology Modal - Shows expanded content directly */}
      {showMethodologyModal && (
        <PlatformModal
          isOpen={true}
          onClose={() => setShowMethodologyModal(false)}
          title={`How ${platform.name} Revenue Is Calculated`}
          theme={theme}
        >
          <MethodologyContent platformId={platformId} theme={theme} />
        </PlatformModal>
      )}
    </div>
  )
}
