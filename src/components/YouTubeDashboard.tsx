import { Info, FileText, DollarSign, HandCoins, Send, Clock, Target, ArrowLeftRight, Layers } from 'lucide-react'
import { CircularGauge } from '@/components/CircularGauge'
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

      {/* 3x3 Preview Cards Grid - Coming in Part 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder for preview cards */}
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          Revenue Streams (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          Earnings by Period (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          12-Month Projection (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          Take-Home Estimate (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          Hourly Rate (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          How You Compare (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          Scenario Analysis (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          What If Analysis (Coming)
        </div>
        <div className={`aspect-square rounded-2xl ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'} flex items-center justify-center text-zinc-500`}>
          Partner Program (Coming)
        </div>
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
