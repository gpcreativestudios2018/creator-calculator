import { useState, useMemo } from 'react'
import { platforms, type PlatformInput } from '@/platforms/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

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

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function Calculator() {
  const [activeTab, setActiveTab] = useState('youtube')
  const [inputValues, setInputValues] = useState<InputValues>(getInitialValues)

  const activePlatform = platforms.find(p => p.id === activeTab)
  const currentValues = inputValues[activeTab] || {}

  const updateValue = (inputId: string, value: number) => {
    setInputValues(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [inputId]: value,
      },
    }))
  }

  const monthlyRevenue = useMemo(() => {
    if (!activePlatform) return 0
    const values = currentValues

    switch (activeTab) {
      case 'youtube': {
        const views = values.monthlyViews || 0
        const cpm = values.cpm || 4
        return (views / 1000) * cpm
      }
      case 'tiktok': {
        const views = values.monthlyViews || 0
        return views * 0.00002 + views * 0.00003
      }
      case 'instagram': {
        const followers = values.followers || 0
        const posts = values.postsPerMonth || 0
        return (followers / 10000) * posts * 15
      }
      case 'twitter': {
        const impressions = values.impressions || 0
        const subscribers = values.subscribers || 0
        return (impressions / 1000000) * 5 + subscribers * 3
      }
      case 'facebook': {
        const watchMinutes = values.watchMinutes || 0
        return (watchMinutes / 1000) * 0.5
      }
      case 'linkedin': {
        const newsletterSubs = values.newsletterSubs || 0
        return newsletterSubs * 0.1
      }
      case 'snapchat': {
        const spotlightViews = values.spotlightViews || 0
        return spotlightViews * 0.00005
      }
      case 'pinterest': {
        const monthlyViews = values.monthlyViews || 0
        return monthlyViews * 0.00001
      }
      case 'twitch': {
        const subscribers = values.subscribers || 0
        const avgViewers = values.avgViewers || 0
        const hours = values.hoursStreamed || 0
        return subscribers * 2.5 + avgViewers * hours * 0.02
      }
      case 'kick': {
        const subscribers = values.subscribers || 0
        return subscribers * 4.5
      }
      case 'newsletter': {
        const totalSubs = values.subscribers || 0
        const paidPercent = values.paidPercent || 0
        const price = values.monthlyPrice || 0
        return (totalSubs * (paidPercent / 100)) * price
      }
      default:
        return 0
    }
  }, [activeTab, currentValues, activePlatform])

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
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === platform.id
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${platform.gradient}`}></span>
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
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${formatNumber(Math.round(monthlyRevenue * 100) / 100)}</p>
                  <p className="text-xs text-zinc-500 mt-1">Estimated earnings</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Yearly Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${formatNumber(Math.round(monthlyRevenue * 12))}</p>
                  <p className="text-xs text-zinc-500 mt-1">At current rate</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">Daily Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${formatNumber(Math.round((monthlyRevenue / 30) * 100) / 100)}</p>
                  <p className="text-xs text-zinc-500 mt-1">Per day estimate</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400">RPM</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    ${currentValues.monthlyViews
                      ? formatNumber(Math.round((monthlyRevenue / currentValues.monthlyViews) * 1000 * 100) / 100)
                      : '0'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Revenue per 1K views</p>
                </CardContent>
              </Card>
            </div>

            {/* Input Card */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Your Metrics</CardTitle>
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
