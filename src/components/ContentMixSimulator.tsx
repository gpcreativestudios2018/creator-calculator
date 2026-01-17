import { useState, useMemo } from 'react'
import { Lightbulb, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface ContentMixSimulatorProps {
  platformId: string
  theme: 'dark' | 'light'
}

interface ContentType {
  id: string
  label: string
  unit: string
  maxValue: number
  minRevenue: number
  maxRevenue: number
  color: string
  isShortForm?: boolean
  isLive?: boolean
}

interface ContentMix {
  [key: string]: number
}

const platformContentTypes: Record<string, ContentType[]> = {
  youtube: [
    { id: 'longform', label: 'Long-form Videos', unit: 'videos', maxValue: 10, minRevenue: 50, maxRevenue: 500, color: '#ef4444' },
    { id: 'shorts', label: 'Shorts', unit: 'shorts', maxValue: 20, minRevenue: 5, maxRevenue: 50, color: '#f59e0b', isShortForm: true },
    { id: 'live', label: 'Live Streams', unit: 'streams', maxValue: 10, minRevenue: 20, maxRevenue: 200, color: '#8b5cf6', isLive: true },
    { id: 'community', label: 'Community Posts', unit: 'posts', maxValue: 20, minRevenue: 1, maxRevenue: 10, color: '#3b82f6' },
  ],
  tiktok: [
    { id: 'videos', label: 'Regular Videos', unit: 'videos', maxValue: 20, minRevenue: 10, maxRevenue: 100, color: '#00f2ea' },
    { id: 'live', label: 'Live Streams', unit: 'streams', maxValue: 10, minRevenue: 15, maxRevenue: 150, color: '#ff0050', isLive: true },
    { id: 'stories', label: 'Stories', unit: 'stories', maxValue: 20, minRevenue: 2, maxRevenue: 20, color: '#69c9d0', isShortForm: true },
  ],
  instagram: [
    { id: 'posts', label: 'Feed Posts', unit: 'posts', maxValue: 15, minRevenue: 10, maxRevenue: 50, color: '#e1306c' },
    { id: 'reels', label: 'Reels', unit: 'reels', maxValue: 20, minRevenue: 20, maxRevenue: 150, color: '#f77737', isShortForm: true },
    { id: 'stories', label: 'Stories', unit: 'stories', maxValue: 30, minRevenue: 5, maxRevenue: 30, color: '#fd1d1d', isShortForm: true },
    { id: 'lives', label: 'Lives', unit: 'streams', maxValue: 5, minRevenue: 30, maxRevenue: 200, color: '#833ab4', isLive: true },
  ],
  twitch: [
    { id: 'streams', label: 'Stream Hours', unit: 'hours', maxValue: 40, minRevenue: 3, maxRevenue: 15, color: '#9146ff', isLive: true },
    { id: 'clips', label: 'Clips/Highlights', unit: 'clips', maxValue: 20, minRevenue: 1, maxRevenue: 10, color: '#772ce8', isShortForm: true },
  ],
  kick: [
    { id: 'streams', label: 'Stream Hours', unit: 'hours', maxValue: 40, minRevenue: 5, maxRevenue: 20, color: '#53fc18', isLive: true },
    { id: 'clips', label: 'Clips', unit: 'clips', maxValue: 20, minRevenue: 2, maxRevenue: 15, color: '#00ff00', isShortForm: true },
  ],
  twitter: [
    { id: 'tweets', label: 'Tweets', unit: 'tweets', maxValue: 30, minRevenue: 1, maxRevenue: 15, color: '#1da1f2' },
    { id: 'threads', label: 'Threads', unit: 'threads', maxValue: 10, minRevenue: 5, maxRevenue: 50, color: '#0077b5' },
    { id: 'spaces', label: 'Spaces', unit: 'spaces', maxValue: 5, minRevenue: 10, maxRevenue: 100, color: '#794bc4', isLive: true },
  ],
  facebook: [
    { id: 'posts', label: 'Posts', unit: 'posts', maxValue: 20, minRevenue: 5, maxRevenue: 30, color: '#1877f2' },
    { id: 'reels', label: 'Reels', unit: 'reels', maxValue: 15, minRevenue: 10, maxRevenue: 80, color: '#42b72a', isShortForm: true },
    { id: 'lives', label: 'Lives', unit: 'streams', maxValue: 5, minRevenue: 20, maxRevenue: 150, color: '#f02849', isLive: true },
  ],
  linkedin: [
    { id: 'posts', label: 'Posts', unit: 'posts', maxValue: 15, minRevenue: 10, maxRevenue: 100, color: '#0a66c2' },
    { id: 'articles', label: 'Articles', unit: 'articles', maxValue: 5, minRevenue: 50, maxRevenue: 300, color: '#004182' },
    { id: 'videos', label: 'Videos', unit: 'videos', maxValue: 10, minRevenue: 30, maxRevenue: 200, color: '#0077b5' },
  ],
}

const defaultContentTypes: ContentType[] = [
  { id: 'posts', label: 'Posts', unit: 'posts', maxValue: 20, minRevenue: 5, maxRevenue: 50, color: '#8b5cf6' },
  { id: 'videos', label: 'Videos', unit: 'videos', maxValue: 15, minRevenue: 20, maxRevenue: 150, color: '#3b82f6' },
  { id: 'stories', label: 'Stories', unit: 'stories', maxValue: 20, minRevenue: 2, maxRevenue: 20, color: '#ec4899', isShortForm: true },
]

const presets = [
  { id: 'balanced', label: 'Balanced', description: 'Even mix of content types' },
  { id: 'shortform', label: 'Short-form Focus', description: 'Heavy on shorts/reels' },
  { id: 'longform', label: 'Long-form Focus', description: 'Fewer but longer content' },
  { id: 'streaming', label: 'Streaming Focus', description: 'Mostly live content' },
]

export default function ContentMixSimulator({ platformId, theme }: ContentMixSimulatorProps) {
  const contentTypes = platformContentTypes[platformId] || defaultContentTypes

  const getInitialMix = (): ContentMix => {
    const mix: ContentMix = {}
    contentTypes.forEach(type => {
      mix[type.id] = Math.round(type.maxValue * 0.3)
    })
    return mix
  }

  const [contentMix, setContentMix] = useState<ContentMix>(getInitialMix)
  const [revenueMultiplier, setRevenueMultiplier] = useState(50) // 0-100 scale for revenue estimation

  const updateMix = (typeId: string, value: number) => {
    setContentMix(prev => ({ ...prev, [typeId]: value }))
  }

  const applyPreset = (presetId: string) => {
    const newMix: ContentMix = {}

    switch (presetId) {
      case 'balanced':
        contentTypes.forEach(type => {
          newMix[type.id] = Math.round(type.maxValue * 0.4)
        })
        break
      case 'shortform':
        contentTypes.forEach(type => {
          if (type.isShortForm) {
            newMix[type.id] = Math.round(type.maxValue * 0.8)
          } else if (type.isLive) {
            newMix[type.id] = Math.round(type.maxValue * 0.1)
          } else {
            newMix[type.id] = Math.round(type.maxValue * 0.2)
          }
        })
        break
      case 'longform':
        contentTypes.forEach(type => {
          if (type.isShortForm) {
            newMix[type.id] = Math.round(type.maxValue * 0.1)
          } else if (type.isLive) {
            newMix[type.id] = Math.round(type.maxValue * 0.2)
          } else {
            newMix[type.id] = Math.round(type.maxValue * 0.6)
          }
        })
        break
      case 'streaming':
        contentTypes.forEach(type => {
          if (type.isLive) {
            newMix[type.id] = Math.round(type.maxValue * 0.8)
          } else if (type.isShortForm) {
            newMix[type.id] = Math.round(type.maxValue * 0.3)
          } else {
            newMix[type.id] = Math.round(type.maxValue * 0.1)
          }
        })
        break
    }

    setContentMix(newMix)
  }

  const calculateRevenue = (type: ContentType, count: number): number => {
    const multiplierFactor = revenueMultiplier / 100
    const avgRevenue = type.minRevenue + (type.maxRevenue - type.minRevenue) * multiplierFactor
    return count * avgRevenue
  }

  const revenueBreakdown = useMemo(() => {
    return contentTypes.map(type => ({
      ...type,
      count: contentMix[type.id] || 0,
      revenue: calculateRevenue(type, contentMix[type.id] || 0),
    }))
  }, [contentMix, revenueMultiplier, contentTypes])

  const totalContent = useMemo(() => {
    return revenueBreakdown.reduce((sum, item) => sum + item.count, 0)
  }, [revenueBreakdown])

  const weeklyRevenue = useMemo(() => {
    return revenueBreakdown.reduce((sum, item) => sum + item.revenue, 0)
  }, [revenueBreakdown])

  const monthlyRevenue = weeklyRevenue * 4

  const shortFormPercent = useMemo(() => {
    const shortFormRevenue = revenueBreakdown
      .filter(item => item.isShortForm)
      .reduce((sum, item) => sum + item.revenue, 0)
    return weeklyRevenue > 0 ? (shortFormRevenue / weeklyRevenue) * 100 : 0
  }, [revenueBreakdown, weeklyRevenue])

  const hasLiveContent = useMemo(() => {
    return revenueBreakdown.some(item => item.isLive && item.count > 0)
  }, [revenueBreakdown])

  const pieData = useMemo(() => {
    return revenueBreakdown
      .filter(item => item.revenue > 0)
      .map(item => ({
        name: item.label,
        value: item.revenue,
        color: item.color,
      }))
  }, [revenueBreakdown])

  const getSuggestions = () => {
    const suggestions: { text: string; priority: 'high' | 'medium' | 'low' }[] = []

    if (shortFormPercent < 30 && contentTypes.some(t => t.isShortForm)) {
      suggestions.push({
        text: 'Short-form content is growing rapidly — consider adding more shorts/reels to your mix.',
        priority: 'medium',
      })
    }

    if (!hasLiveContent && contentTypes.some(t => t.isLive)) {
      suggestions.push({
        text: 'Live streams build community and can significantly boost revenue through tips and engagement.',
        priority: 'medium',
      })
    }

    if (totalContent > 20) {
      suggestions.push({
        text: 'Quality over quantity — focus on fewer, better pieces of content rather than overwhelming your audience.',
        priority: 'high',
      })
    }

    if (totalContent < 5) {
      suggestions.push({
        text: 'Consistency matters — try to maintain a regular posting schedule to grow your audience.',
        priority: 'medium',
      })
    }

    const maxRevenueType = revenueBreakdown.reduce((max, item) =>
      item.revenue > max.revenue ? item : max, revenueBreakdown[0])

    if (maxRevenueType && maxRevenueType.revenue > weeklyRevenue * 0.7) {
      suggestions.push({
        text: `${maxRevenueType.label} generates most of your revenue. Consider diversifying to reduce risk.`,
        priority: 'low',
      })
    }

    return suggestions
  }

  const suggestions = getSuggestions()

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Content Mix Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preset Scenarios */}
        <div className="space-y-2">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Quick Presets
          </Label>
          <div className="flex flex-wrap gap-2">
            {presets.map(preset => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                title={preset.description}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Revenue Quality Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Content Performance Level
            </Label>
            <span className={`text-sm font-medium ${
              revenueMultiplier < 30 ? 'text-red-500' :
              revenueMultiplier < 70 ? 'text-yellow-500' : 'text-green-500'
            }`}>
              {revenueMultiplier < 30 ? 'Below Average' :
               revenueMultiplier < 70 ? 'Average' : 'Above Average'}
            </span>
          </div>
          <Slider
            value={[revenueMultiplier]}
            onValueChange={([value]) => setRevenueMultiplier(value)}
            min={0}
            max={100}
            step={5}
            className="w-full"
          />
          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Adjust based on your typical engagement and monetization rates
          </p>
        </div>

        {/* Content Type Sliders */}
        <div className="space-y-4">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Weekly Content Mix
          </Label>
          {contentTypes.map(type => {
            const count = contentMix[type.id] || 0
            const revenue = calculateRevenue(type, count)

            return (
              <div key={type.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {type.label}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {count} {type.unit}
                    </span>
                    <span className={`text-xs ml-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      ~{formatCurrency(revenue)}/wk
                    </span>
                  </div>
                </div>
                <Slider
                  value={[count]}
                  onValueChange={([value]) => updateMix(type.id, value)}
                  min={0}
                  max={type.maxValue}
                  step={1}
                  className="w-full"
                />
              </div>
            )
          })}
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Content/Week</p>
            <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {totalContent}
            </p>
          </div>
          <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Weekly Revenue</p>
            <p className="text-2xl font-bold text-emerald-500">
              {formatCurrency(weeklyRevenue)}
            </p>
          </div>
          <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Monthly Revenue</p>
            <p className="text-2xl font-bold text-purple-500">
              {formatCurrency(monthlyRevenue)}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        {pieData.length > 0 && (
          <div className="space-y-2">
            <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Revenue Breakdown
            </Label>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#27272a' : '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      color: theme === 'dark' ? '#fff' : '#000',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimization Suggestions */}
        {suggestions.length > 0 && (
          <div
            className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-amber-50 border border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-500' : 'text-amber-600'}`} />
              <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Optimization Tips
              </h4>
            </div>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      suggestion.priority === 'high' ? 'bg-red-500' :
                      suggestion.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                  />
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                    {suggestion.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pro Tips */}
        <div
          className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Pro Tips
            </h4>
          </div>
          <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Repurpose content</strong> — Turn long-form into shorts, clips, and posts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Test and iterate</strong> — Track which content types perform best for you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Batch production</strong> — Create multiple pieces in one session</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
