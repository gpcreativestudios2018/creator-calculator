import { useState, useMemo, useEffect } from 'react'
import { TrendingUp, Menu, X, Sun, Moon, Info, RotateCcw } from 'lucide-react'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useTheme } from '@/components/ThemeProvider'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import { platforms, type PlatformInput } from '@/platforms/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const activePlatform = platforms.find(p => p.id === activeTab)
  const currentValues = inputValues[activeTab] || {}

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Number keys 1-9 and 0 to switch platforms (0 = 10th platform, - = 11th)
      const platformKeys: Record<string, number> = {
        '1': 0, '2': 1, '3': 2, '4': 3, '5': 4,
        '6': 5, '7': 6, '8': 7, '9': 8, '0': 9, '-': 10
      }

      if (e.key in platformKeys && !compareMode) {
        const index = platformKeys[e.key]
        if (index < platforms.length) {
          setActiveTab(platforms[index].id)
        }
      }

      // Arrow keys to navigate platforms
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !compareMode) {
        e.preventDefault()
        const currentIndex = platforms.findIndex(p => p.id === activeTab)
        let newIndex: number

        if (e.key === 'ArrowDown') {
          newIndex = currentIndex < platforms.length - 1 ? currentIndex + 1 : 0
        } else {
          newIndex = currentIndex > 0 ? currentIndex - 1 : platforms.length - 1
        }

        setActiveTab(platforms[newIndex].id)
      }

      // R to reset current platform
      if (e.key.toLowerCase() === 'r' && !compareMode && activePlatform) {
        const defaults: Record<string, number> = {}
        for (const input of activePlatform.inputs) {
          defaults[input.id] = input.defaultValue
        }
        setInputValues(prev => ({
          ...prev,
          [activeTab]: defaults,
        }))
      }

      // C to toggle compare mode
      if (e.key.toLowerCase() === 'c') {
        setCompareMode(prev => !prev)
      }

      // ? to show keyboard shortcuts (future feature placeholder)
      if (e.key === '?') {
        // Could open a shortcuts modal in the future
        console.log('Shortcuts: 1-9/0/- = platforms, ↑↓ = navigate, R = reset, C = compare')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab, activePlatform, compareMode])

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

    // Validation logic
    const getValidationError = (): string | null => {
      if (value < (input.min ?? 0)) {
        return `Minimum value is ${(input.min ?? 0).toLocaleString()}`
      }
      if (input.max && value > input.max) {
        return `Maximum value is ${input.max.toLocaleString()}`
      }
      return null
    }

    const error = getValidationError()
    const hasError = error !== null

    if (input.type === 'slider') {
      return (
        <div key={input.id} className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <Label className={`${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>{input.label}</Label>
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
            onValueChange={([v]) => updateValue(input.id, v)}
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
          <Label className={`${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>{input.label}</Label>
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
          onChange={(e) => updateValue(input.id, Number(e.target.value))}
          min={input.min}
          max={input.max}
          className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-zinc-900'} ${hasError ? 'border-red-500 focus:ring-red-500' : theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'}`}
        />
        {hasError && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <TooltipProvider>
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-100 text-zinc-900'}`}>
      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 p-4 flex items-center justify-between z-50 ${theme === 'dark' ? 'bg-zinc-900 border-b border-zinc-800' : 'bg-white border-b border-gray-200'}`}>
        <h1 className="text-xl font-bold">Creator Calculator</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 p-4 flex flex-col z-40 transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${theme === 'dark' ? 'bg-zinc-900 border-r border-zinc-800' : 'bg-white border-r border-gray-200'}`}>
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <h1 className="text-xl font-bold">Creator Calculator</h1>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 px-3">Platforms</p>
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                activeTab === platform.id
                  ? `${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-gray-200 text-zinc-900'} shadow-lg`
                  : `${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white' : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'} hover:translate-x-1`
              }`}
              style={activeTab === platform.id ? { boxShadow: `0 0 20px ${platform.accentColor}30` } : {}}
            >
              <platform.icon className={`w-4 h-4 ${platform.iconColor}`} />
              {platform.name}
            </button>
          ))}
        </nav>

        {/* Compare Toggle */}
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`mt-4 w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 ${
            compareMode
              ? 'bg-purple-600 text-white'
              : `${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white' : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'}`
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {compareMode ? 'Exit Compare' : 'Compare All'}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`mt-2 w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 ${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white' : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'}`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 pt-20 lg:pt-6 overflow-y-auto">
        {compareMode ? (
          /* Compare Mode View */
          <div>
            <div className="mb-6">
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Platform Comparison
              </h2>
              <p className="text-zinc-400">See estimated revenue across all platforms</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map((platform) => {
                const v = inputValues[platform.id] || {}
                let revenue = 0

                switch (platform.id) {
                  case 'youtube':
                    revenue = ((v.monthlyViews || 100000) / 1000) * (v.cpm || 4) * 0.55 + (v.subscribers || 10000) * 0.05
                    break
                  case 'tiktok':
                    revenue = (v.monthlyViews || 500000) * 0.02 + ((v.followers || 50000) >= 10000 ? (v.followers || 50000) * 0.015 : 0)
                    break
                  case 'instagram':
                    revenue = ((v.followers || 25000) >= 10000 ? ((v.followers || 25000) / 1000) * 10 : 0) * ((v.postsPerMonth || 12) / 4)
                    break
                  case 'twitter':
                    revenue = ((v.impressions || 500000) / 1000) * 0.5 + (v.subscribers || 0) * 3
                    break
                  case 'facebook':
                    revenue = ((v.watchMinutes || 100000) / 1000) * 1.5
                    break
                  case 'linkedin':
                    revenue = Math.floor((v.newsletterSubs || 1000) * 0.01) * 500
                    break
                  case 'snapchat':
                    revenue = ((v.spotlightViews || 50000) / 1000) * 0.05
                    break
                  case 'pinterest':
                    revenue = ((v.monthlyViews || 100000) / 1000) * 0.1 + (v.ideaPins || 20) * 2
                    break
                  case 'twitch':
                    revenue = (v.subscribers || 100) * 2.5 + (v.avgViewers || 50) * (v.hoursStreamed || 40) * 0.02 + (v.avgViewers || 50) * 0.5
                    break
                  case 'kick':
                    revenue = (v.subscribers || 50) * 4.5
                    break
                  case 'newsletter':
                    revenue = Math.floor((v.subscribers || 5000) * ((v.paidPercent || 5) / 100)) * (v.monthlyPrice || 10) * 0.9
                    break
                }

                return (
                  <Card
                    key={platform.id}
                    className={`border-l-4 cursor-pointer transition-all hover:scale-105 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}
                    style={{ borderLeftColor: platform.accentColor }}
                    onClick={() => { setCompareMode(false); setActiveTab(platform.id); }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <platform.icon className={`w-5 h-5 ${platform.iconColor}`} />
                        <CardTitle className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{platform.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue)}
                      </p>
                      <p className="text-xs text-emerald-500 mt-1">Monthly estimate</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : activePlatform && (
          <>
            {/* Header */}
            <div className="mb-6">
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${activePlatform.gradient} bg-clip-text text-transparent`}>
                {activePlatform.name}
              </h2>
              <p className="text-zinc-400">{activePlatform.description}</p>
            </div>

            {/* Metric Cards Row */}
            {results.monthlyRevenue === 0 ? (
              <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                    <TrendingUp className="w-8 h-8 text-zinc-500" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Enter your metrics to see earnings
                  </h3>
                  <p className="text-zinc-500 max-w-md">
                    Fill in your {activePlatform?.name} stats below and we'll calculate your estimated revenue from ads, sponsorships, and platform programs.
                  </p>
                </CardContent>
              </Card>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className={`border-l-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`} style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-sm font-medium text-zinc-400">Monthly Revenue</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center text-xs text-emerald-500 cursor-help">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <Info className="w-3 h-3" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Estimated monthly earnings from ads, sponsorships, and platform programs based on your current metrics.</p>
                    </TooltipContent>
                  </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    <AnimatedNumber value={results.monthlyRevenue} formatter={formatCurrency} />
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">Estimated earnings</p>
                </CardContent>
              </Card>

              <Card className={`border-l-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`} style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-sm font-medium text-zinc-400">Yearly Projection</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center text-xs text-emerald-500 cursor-help">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <Info className="w-3 h-3" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Annual projection calculated as monthly revenue × 12. Actual earnings may vary based on seasonal trends and growth.</p>
                    </TooltipContent>
                  </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    <AnimatedNumber value={results.yearlyRevenue} formatter={formatCurrency} />
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">Based on current metrics</p>
                </CardContent>
              </Card>

              <Card className={`border-l-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`} style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-sm font-medium text-zinc-400">Engagement Rate</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center text-xs text-emerald-500 cursor-help">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <Info className="w-3 h-3" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Measures audience interaction as a percentage. Higher engagement often leads to better monetization opportunities.</p>
                    </TooltipContent>
                  </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    <AnimatedNumber value={results.engagementRate ?? 0} formatter={(v) => `${v.toFixed(1)}%`} />
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">Audience interaction</p>
                </CardContent>
              </Card>

              <Card className={`border-l-4 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`} style={{ borderLeftColor: activePlatform.accentColor }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between w-full">
                  <CardTitle className="text-sm font-medium text-zinc-400">Growth Rate</CardTitle>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center text-xs text-emerald-500 cursor-help">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <Info className="w-3 h-3" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Estimated monthly growth rate based on typical platform benchmarks. Your actual growth depends on content quality and consistency.</p>
                    </TooltipContent>
                  </Tooltip>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-emerald-500">
                    +<AnimatedNumber value={results.growthRate ?? 0} formatter={(v) => `${v.toFixed(1)}%`} />
                  </p>
                  <p className="text-xs text-emerald-500 mt-1">Monthly average</p>
                </CardContent>
              </Card>
            </div>
            )}

            {/* Revenue Chart */}
            <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <CardHeader>
                <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Monthly', value: results.monthlyRevenue },
                      { name: 'Quarterly', value: results.monthlyRevenue * 3 },
                      { name: 'Yearly', value: results.yearlyRevenue },
                    ]}>
                      <XAxis dataKey="name" stroke={theme === 'dark' ? '#71717a' : '#52525b'} fontSize={12} />
                      <YAxis stroke={theme === 'dark' ? '#71717a' : '#52525b'} fontSize={12} tickFormatter={(v) => `$${v}`} />
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                        labelStyle={{ color: '#fff' }}
                        formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Revenue']}
                        cursor={false}
                      />
                      <Bar dataKey="value" fill={activePlatform.accentColor} radius={[4, 4, 0, 0]} style={{ cursor: 'default' }} animationDuration={500} animationEasing="ease-out" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Input Card */}
            <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Your Metrics</CardTitle>
<button
                  onClick={() => {
                    const defaults: Record<string, number> = {}
                    for (const input of activePlatform!.inputs) {
                      defaults[input.id] = input.defaultValue
                    }
                    setInputValues(prev => ({
                      ...prev,
                      [activeTab]: defaults,
                    }))
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white' : 'bg-gray-200 hover:bg-gray-300 text-zinc-600 hover:text-zinc-900'}`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
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
    </TooltipProvider>
  )
}
