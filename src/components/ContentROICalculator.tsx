import { useState, useMemo } from 'react'
import { Clock, TrendingUp, Lightbulb, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

interface ContentROICalculatorProps {
  platformId: string
  monthlyRevenue: number
  theme: 'dark' | 'light'
}

interface TimeAllocation {
  id: string
  label: string
  hours: number
  color: string
}

const benchmarks = [
  { label: 'Minimum Wage', rate: 15, color: '#ef4444' },
  { label: 'Freelancer', rate: 50, color: '#f59e0b' },
  { label: 'Consultant', rate: 100, color: '#22c55e' },
  { label: 'Expert', rate: 200, color: '#8b5cf6' },
]

export default function ContentROICalculator({ monthlyRevenue, theme }: ContentROICalculatorProps) {
  const [timeAllocations, setTimeAllocations] = useState<TimeAllocation[]>([
    { id: 'ideation', label: 'Ideation & Research', hours: 3, color: '#8b5cf6' },
    { id: 'filming', label: 'Filming/Recording', hours: 4, color: '#3b82f6' },
    { id: 'editing', label: 'Editing', hours: 6, color: '#ec4899' },
    { id: 'graphics', label: 'Thumbnail/Graphics', hours: 2, color: '#f59e0b' },
    { id: 'publishing', label: 'Publishing & SEO', hours: 1, color: '#10b981' },
    { id: 'community', label: 'Community Management', hours: 3, color: '#06b6d4' },
    { id: 'admin', label: 'Admin/Emails', hours: 2, color: '#6366f1' },
  ])

  const updateHours = (id: string, hours: number) => {
    setTimeAllocations(prev =>
      prev.map(item => (item.id === id ? { ...item, hours } : item))
    )
  }

  const totalWeeklyHours = useMemo(() =>
    timeAllocations.reduce((sum, item) => sum + item.hours, 0),
    [timeAllocations]
  )

  const totalMonthlyHours = totalWeeklyHours * 4

  const effectiveHourlyRate = useMemo(() =>
    totalMonthlyHours > 0 ? monthlyRevenue / totalMonthlyHours : 0,
    [monthlyRevenue, totalMonthlyHours]
  )

  const hourlyRateWithCut = useMemo(() => {
    const reducedMonthlyHours = (totalWeeklyHours - 5) * 4
    return reducedMonthlyHours > 0 ? monthlyRevenue / reducedMonthlyHours : 0
  }, [monthlyRevenue, totalWeeklyHours])

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const getRating = (rate: number) => {
    if (rate < 15) return { label: 'Below Average', color: '#ef4444' }
    if (rate < 50) return { label: 'Average', color: '#f59e0b' }
    if (rate < 100) return { label: 'Good', color: '#22c55e' }
    return { label: 'Excellent', color: '#8b5cf6' }
  }

  const rating = getRating(effectiveHourlyRate)

  const getEfficiencyTips = () => {
    const tips: { tip: string; priority: 'high' | 'medium' | 'low' }[] = []
    const editingPercent = (timeAllocations.find(t => t.id === 'editing')?.hours || 0) / totalWeeklyHours * 100
    const adminPercent = (timeAllocations.find(t => t.id === 'admin')?.hours || 0) / totalWeeklyHours * 100
    const communityPercent = (timeAllocations.find(t => t.id === 'community')?.hours || 0) / totalWeeklyHours * 100

    if (editingPercent > 40) {
      tips.push({
        tip: 'Editing takes over 40% of your time. Consider hiring an editor, using templates, or batch editing.',
        priority: 'high'
      })
    }
    if (adminPercent > 20) {
      tips.push({
        tip: 'Admin tasks take over 20% of your time. Consider automation tools like Notion, Zapier, or a VA.',
        priority: 'medium'
      })
    }
    if (communityPercent > 25) {
      tips.push({
        tip: 'Community management is over 25% of your time. Consider scheduled response times or a community manager.',
        priority: 'medium'
      })
    }
    if (effectiveHourlyRate < 15) {
      tips.push({
        tip: 'Your hourly rate is below minimum wage. Focus on growing revenue or reducing hours.',
        priority: 'high'
      })
    }
    if (totalWeeklyHours > 50) {
      tips.push({
        tip: 'You\'re working over 50 hours/week. This may lead to burnout. Consider delegating or cutting low-ROI tasks.',
        priority: 'high'
      })
    }

    return tips
  }

  const tips = getEfficiencyTips()
  const maxHours = Math.max(...timeAllocations.map(t => t.hours))

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Content ROI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <Clock className={`w-5 h-5 mx-auto mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {totalWeeklyHours}h
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Hours/Week</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <Clock className={`w-5 h-5 mx-auto mb-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {totalMonthlyHours}h
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Hours/Month</p>
          </div>
          <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <TrendingUp className="w-5 h-5 mx-auto mb-2" style={{ color: rating.color }} />
            <p className="text-2xl font-bold" style={{ color: rating.color }}>
              {formatCurrency(effectiveHourlyRate)}/hr
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{rating.label}</p>
          </div>
        </div>

        {/* Time Allocation Sliders */}
        <div className="space-y-4">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Time Allocation (hours per week)
          </Label>
          {timeAllocations.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  {item.label}
                </span>
                <span className="text-sm font-medium" style={{ color: item.color }}>
                  {item.hours}h ({totalWeeklyHours > 0 ? ((item.hours / totalWeeklyHours) * 100).toFixed(0) : 0}%)
                </span>
              </div>
              <Slider
                value={[item.hours]}
                onValueChange={([value]) => updateHours(item.id, value)}
                min={0}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Visual Breakdown */}
        <div className="space-y-3">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Time Breakdown
          </Label>
          <div className="space-y-2">
            {timeAllocations.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`w-24 text-xs truncate ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {item.label.split(' ')[0]}
                </div>
                <div className="flex-1 h-6 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#27272a' : '#e5e7eb' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                    style={{
                      width: maxHours > 0 ? `${(item.hours / maxHours) * 100}%` : '0%',
                      backgroundColor: item.color,
                      minWidth: item.hours > 0 ? '24px' : '0'
                    }}
                  >
                    {item.hours > 0 && (
                      <span className="text-xs font-medium text-white">{item.hours}h</span>
                    )}
                  </div>
                </div>
                {item.hours === maxHours && item.hours > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
                    Top
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benchmark Comparison */}
        <div className="space-y-3">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Rate Benchmarks
          </Label>
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <div className="relative h-8 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'dark' ? '#3f3f46' : '#d1d5db' }}>
              {benchmarks.map((benchmark, idx) => (
                <div
                  key={benchmark.label}
                  className="absolute top-0 h-full flex items-center justify-center text-xs font-medium text-white"
                  style={{
                    left: `${(idx / benchmarks.length) * 100}%`,
                    width: `${100 / benchmarks.length}%`,
                    backgroundColor: benchmark.color,
                    opacity: effectiveHourlyRate >= benchmark.rate ? 1 : 0.3,
                  }}
                >
                  ${benchmark.rate}
                </div>
              ))}
              {/* Current rate indicator */}
              <div
                className="absolute top-0 w-1 h-full bg-white shadow-lg"
                style={{
                  left: `${Math.min((effectiveHourlyRate / 200) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs">
              {benchmarks.map((benchmark) => (
                <span
                  key={benchmark.label}
                  className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}
                >
                  {benchmark.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* What If Scenario */}
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              What If You Cut 5 Hours/Week?
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Current Rate</p>
              <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {formatCurrency(effectiveHourlyRate)}/hr
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>New Rate</p>
              <p className="text-xl font-bold text-emerald-500">
                {formatCurrency(hourlyRateWithCut)}/hr
                {hourlyRateWithCut > effectiveHourlyRate && (
                  <span className="text-sm ml-2">
                    (+{((hourlyRateWithCut / effectiveHourlyRate - 1) * 100).toFixed(0)}%)
                  </span>
                )}
              </p>
            </div>
          </div>
          <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Same revenue with {totalWeeklyHours - 5} hours/week = higher effective rate
          </p>
        </div>

        {/* Efficiency Tips */}
        {tips.length > 0 && (
          <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-500' : 'text-amber-600'}`} />
              <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Efficiency Tips
              </h4>
            </div>
            <ul className="space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      tip.priority === 'high' ? 'bg-red-500' :
                      tip.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                  />
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                    {tip.tip}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
