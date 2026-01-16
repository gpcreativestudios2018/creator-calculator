import { useState, useMemo } from 'react'
import { TrendingUp } from 'lucide-react'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { platforms, type PlatformInput } from '@/platforms/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  calculateYouTube,
  calculateTikTok,
  calculateInstagram,
  calculateTwitter,
  calculateFacebook,
  calculateLinkedIn,
  calculateSnapchat,
  calculatePinterest,
  calculateTwitch,
  calculateKick,
  calculateNewsletter,
  type CalculationResult,
} from '@/engine/calculations'

type InputValues = Record<string, Record<string, number>>

function getInitialValues(): InputValues {
  const values: InputValues = {}
  for (const platform of platforms) {
    values[platform.id] = {}
    for (const input of platform.inputs) {
      values[platform.id][input.id] = input.defaultValue
    }
  }
  return values
}

export function Calculator() {
  const [activeTab, setActiveTab] = useState('youtube')
  const [inputValues, setInputValues] = useState<InputValues>(getInitialValues)

  const activePlatform = platforms.find(p => p.id === activeTab)
  const currentValues = inputValues[activeTab] || {}

  const updateValue = (inputId: string, value: number) => {
    // Validate: ensure value is a number and not negative
    const validValue = isNaN(value) ? 0 : Math.max(0, value)

    setInputValues(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [inputId]: validValue,
      },
    }))
  }

  // Calculate results using the calculation engine
  const results: CalculationResult = useMemo(() => {
    const v = currentValues
    switch (activeTab) {
      case 'youtube':
        return calculateYouTube(v.subscribers || 0, v.monthlyViews || 0, v.cpm || 4)
      case 'tiktok':
        return calculateTikTok(v.followers || 0, v.monthlyViews || 0, v.engagementRate || 6)
      case 'instagram':
        return calculateInstagram(v.followers || 0, v.avgLikes || 0, v.postsPerMonth || 12)
      case 'twitter':
        return calculateTwitter(v.followers || 0, v.impressions || 0, v.subscribers || 0)
      case 'facebook':
        return calculateFacebook(v.followers || 0, v.watchMinutes || 0)
      case 'linkedin':
        return calculateLinkedIn(v.followers || 0, v.newsletterSubs || 0)
      case 'snapchat':
        return calculateSnapchat(v.followers || 0, v.spotlightViews || 0)
      case 'pinterest':
        return calculatePinterest(v.followers || 0, v.monthlyViews || 0, v.ideaPins || 20)
      case 'twitch':
        return calculateTwitch(v.subscribers || 0, v.avgViewers || 0, v.hoursStreamed || 40)
      case 'kick':
        return calculateKick(v.subscribers || 0, v.avgViewers || 0)
      case 'newsletter':
        return calculateNewsletter(v.subscribers || 0, v.paidPercent || 5, v.monthlyPrice || 10)
      default:
        return { monthlyRevenue: 0, yearlyRevenue: 0 }
    }
  }, [activeTab, currentValues])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  const renderInput = (input: PlatformInput) => {
    const value = currentValues[input.id] ?? input.defaultValue

    if (input.type === 'slider') {
      return (
        <div key={input.id} className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-zinc-300">{input.label}</Label>
            <span className="text-sm font-medium text-white">{value}{input.label.includes('%') || input.label.includes('CPM') ? '' : ''}</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={([v]) => updateValue(input.id, v)}
            min={input.min}
            max={input.max}
            step={input.step}
            className="w-full"
          />
          {input.tooltip && (
            <p className="text-xs text-zinc-500">{input.tooltip}</p>
          )}
        </div>
      )
    }

    return (
      <div key={input.id} className="space-y-2">
        <Label className="text-zinc-300">{input.label}</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => updateValue(input.id, Number(e.target.value))}
          min={input.min}
          max={input.max}
          className="bg-zinc-800 border-zinc-700 text-white"
        />
        {input.tooltip && (
          <p className="text-xs text-zinc-500">{input.tooltip}</p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Creator Calculator</h1>
        </div>

        <nav className="space-y-1 flex-1">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 px-3">Platforms</p>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                activeTab === platform.id
                  ? 'bg-zinc-800 text-white shadow-lg'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white hover:translate-x-1'
              }`}
              style={activeTab === platform.id ? { boxShadow: `0 0 20px ${platform.accentColor}30` } : {}}
            >
              <platform.icon className={`w-4 h-4 ${platform.iconColor}`} />
              {platform.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePlatform && (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${activePlatform.gradient} bg-clip-text text-transparent`}>
                {activePlatform.name}
              </h2>
              <p className="text-zinc-400">{activePlatform.description}</p>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-zinc-900 border-zinc-800 border-l-4" style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-zinc-400">Monthly Revenue</CardTitle>
                  <span className="flex items-center text-xs text-emerald-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">
                    <AnimatedNumber value={results.monthlyRevenue} formatter={formatCurrency} />
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">Estimated earnings</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 border-l-4" style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-zinc-400">Yearly Projection</CardTitle>
                  <span className="flex items-center text-xs text-emerald-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">
                    <AnimatedNumber value={results.yearlyRevenue} formatter={formatCurrency} />
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Based on current metrics</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 border-l-4" style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-zinc-400">Engagement Rate</CardTitle>
                  <span className="flex items-center text-xs text-emerald-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +4.5%
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">
                    <AnimatedNumber value={results.engagementRate ?? 0} formatter={(v) => `${v.toFixed(1)}%`} />
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">Audience interaction</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 border-l-4" style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium text-zinc-400">Growth Rate</CardTitle>
                  <span className="flex items-center text-xs text-emerald-500">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{(results.growthRate ?? 0).toFixed(1)}%
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-emerald-500">
                    +<AnimatedNumber value={results.growthRate ?? 0} formatter={(v) => `${v.toFixed(1)}%`} />
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Monthly average</p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Chart */}
            <Card className="bg-zinc-900 border-zinc-800 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Monthly', value: results.monthlyRevenue },
                      { name: 'Quarterly', value: results.monthlyRevenue * 3 },
                      { name: 'Yearly', value: results.yearlyRevenue },
                    ]}>
                      <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                      <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `$${v}`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                        labelStyle={{ color: '#fff' }}
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                      />
                      <Bar dataKey="value" fill={activePlatform.accentColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Input Card */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Your Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activePlatform.inputs.map(renderInput)}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
