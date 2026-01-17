import { useState, useMemo, useEffect } from 'react'
import { Menu, X, Sun, Moon, Info, Wallet } from 'lucide-react'
import { AnimatedNumber } from '@/components/AnimatedNumber'
import { useTheme } from '@/components/ThemeProvider'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts'
import { platforms } from '@/platforms/registry'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { OnboardingModal } from '@/components/OnboardingModal'
import { MethodologyPage } from '@/components/MethodologyPage'
import { Glossary } from '@/components/Glossary'
import MediaKitGenerator from '@/components/MediaKitGenerator'
import RateCardGenerator from '@/components/RateCardGenerator'
import SponsorshipCalculator from '@/components/SponsorshipCalculator'
import BrandPitchGenerator from '@/components/BrandPitchGenerator'
import ContentROICalculator from '@/components/ContentROICalculator'
import GoalTracker from '@/components/GoalTracker'
import PlatformSwitchCalculator from '@/components/PlatformSwitchCalculator'
import ContentMixSimulator from '@/components/ContentMixSimulator'
import AIAnalysis from '@/components/AIAnalysis'
import AIGrowthPlan from '@/components/AIGrowthPlan'
import AIContentIdeas from '@/components/AIContentIdeas'
import AIBrandPitch from '@/components/AIBrandPitch'
import AIRevenueOptimization from '@/components/AIRevenueOptimization'
import AIFocusRecommendations from '@/components/AIFocusRecommendations'
import AIRoadmap from '@/components/AIRoadmap'
import { PlatformDashboard } from '@/components/PlatformDashboard'
import { regions, DEFAULT_REGION } from '@/data/geography'
import { niches, DEFAULT_NICHE } from '@/data/niches'
import { timePeriods, DEFAULT_TIME_PERIOD } from '@/data/timePeriods'
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
  calculatePatreon,
  calculateKofi,
  calculateGumroad,
  calculatePodcast,
  calculateCourses,
  calculateOnlyFans,
  calculateEtsy,
  calculateAmazon,
  calculateFansly,
  calculateFanvue,
  calculateThreads,
  calculateDiscord,
  calculateRumble,
  calculateSubstack,
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
  const [selectedRegion, setSelectedRegion] = useState<string>(DEFAULT_REGION)
  const [selectedNiche, setSelectedNiche] = useState<string>(DEFAULT_NICHE)
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>(DEFAULT_TIME_PERIOD)
  const [showMethodology, setShowMethodology] = useState(false)
  const [showGlossary, setShowGlossary] = useState(false)
  const [showMediaKit, setShowMediaKit] = useState(false)
  const [showRateCard, setShowRateCard] = useState(false)
  const [showSponsorshipCalc, setShowSponsorshipCalc] = useState(false)
  const [showBrandPitch, setShowBrandPitch] = useState(false)
  const [showContentROI, setShowContentROI] = useState(false)
  const [showGoalTracker, setShowGoalTracker] = useState(false)
  const [showPlatformSwitch, setShowPlatformSwitch] = useState(false)
  const [showContentMix, setShowContentMix] = useState(false)
  const [showAIAnalysis, setShowAIAnalysis] = useState(false)
  const [showAIGrowthPlan, setShowAIGrowthPlan] = useState(false)
  const [showAIContentIdeas, setShowAIContentIdeas] = useState(false)
  const [showAIBrandPitch, setShowAIBrandPitch] = useState(false)
  const [showAIRevenueOpt, setShowAIRevenueOpt] = useState(false)
  const [showAIFocus, setShowAIFocus] = useState(false)
  const [showAIRoadmap, setShowAIRoadmap] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const activePlatform = platforms.find(p => p.id === activeTab)
  const currentRegion = useMemo(() =>
    regions.find(r => r.id === selectedRegion) || regions[0],
    [selectedRegion]
  )
  const currentNiche = useMemo(() =>
    niches.find(n => n.id === selectedNiche) || niches.find(n => n.id === 'general')!,
    [selectedNiche]
  )
  const currentTimePeriod = useMemo(() =>
    timePeriods.find(t => t.id === selectedTimePeriod) || timePeriods.find(t => t.id === 'monthly')!,
    [selectedTimePeriod]
  )
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

  // Helper function to apply region and niche multipliers to calculation results
  const applyMultipliers = (result: CalculationResult, regionMultiplier: number, nicheMultiplier: number): CalculationResult => {
    const combinedMultiplier = regionMultiplier * nicheMultiplier
    return {
      ...result,
      monthlyRevenue: result.monthlyRevenue * combinedMultiplier,
      yearlyRevenue: result.yearlyRevenue * combinedMultiplier,
    }
  }

  // Calculate results using the calculation engine
  const results: CalculationResult = useMemo(() => {
    const v = currentValues
    let baseResult: CalculationResult
    switch (activeTab) {
      case 'youtube':
        baseResult = calculateYouTube(v.subscribers || 0, v.monthlyViews || 0, v.cpm || 4)
        break
      case 'tiktok':
        baseResult = calculateTikTok(v.followers || 0, v.monthlyViews || 0, v.engagementRate || 6)
        break
      case 'instagram':
        baseResult = calculateInstagram(v.followers || 0, v.avgLikes || 0, v.postsPerMonth || 12)
        break
      case 'twitter':
        baseResult = calculateTwitter(v.followers || 0, v.impressions || 0, v.subscribers || 0)
        break
      case 'facebook':
        baseResult = calculateFacebook(v.followers || 0, v.watchMinutes || 0)
        break
      case 'linkedin':
        baseResult = calculateLinkedIn(v.followers || 0, v.newsletterSubs || 0)
        break
      case 'snapchat':
        baseResult = calculateSnapchat(v.followers || 0, v.spotlightViews || 0)
        break
      case 'pinterest':
        baseResult = calculatePinterest(v.followers || 0, v.monthlyViews || 0, v.ideaPins || 20)
        break
      case 'twitch':
        baseResult = calculateTwitch(v.subscribers || 0, v.avgViewers || 0, v.hoursStreamed || 40)
        break
      case 'kick':
        baseResult = calculateKick(v.subscribers || 0, v.avgViewers || 0)
        break
      case 'newsletter':
        baseResult = calculateNewsletter(v.subscribers || 0, v.paidPercent || 5, v.monthlyPrice || 10)
        break
      case 'patreon':
        baseResult = calculatePatreon(v.patrons || 0, v.avgPledge || 5)
        break
      case 'kofi':
        baseResult = calculateKofi(v.supporters || 0, v.avgTip || 5, v.members || 0, v.memberPrice || 5)
        break
      case 'gumroad':
        baseResult = calculateGumroad(v.products || 0, v.avgPrice || 25)
        break
      case 'podcast':
        baseResult = calculatePodcast(v.downloads || 0, v.episodes || 4, v.cpm || 25)
        break
      case 'teachable':
        baseResult = calculateCourses(v.students || 0, v.coursePrice || 100, v.platformFee || 5)
        break
      case 'onlyfans':
        baseResult = calculateOnlyFans(v.subscribers || 0, v.subPrice || 10, v.tipsPercent || 20)
        break
      case 'etsy':
        baseResult = calculateEtsy(v.orders || 0, v.avgOrder || 25, v.profitMargin || 50)
        break
      case 'amazon':
        baseResult = calculateAmazon(v.pageViews || 0, v.conversionRate || 3, v.avgCommission || 4)
        break
      case 'fansly':
        baseResult = calculateFansly(v.subscribers || 0, v.subPrice || 10, v.tipsPercent || 20)
        break
      case 'fanvue':
        baseResult = calculateFanvue(v.subscribers || 0, v.subPrice || 10, v.tipsPercent || 20)
        break
      case 'threads':
        baseResult = calculateThreads(v.followers || 0, v.avgLikes || 0, v.postsPerMonth || 20)
        break
      case 'discord':
        baseResult = calculateDiscord(v.members || 0, v.avgPrice || 5)
        break
      case 'rumble':
        baseResult = calculateRumble(v.monthlyViews || 0, v.cpm || 3, v.rants || 0)
        break
      case 'substack':
        baseResult = calculateSubstack(v.freeSubscribers || 0, v.paidPercent || 5, v.monthlyPrice || 10)
        break
      default:
        baseResult = { monthlyRevenue: 0, yearlyRevenue: 0 }
    }
    return applyMultipliers(baseResult, currentRegion.revenueMultiplier, currentNiche.rpmMultiplier)
  }, [activeTab, currentValues, currentRegion, currentNiche])

  const aiContext = {
    platform: activePlatform?.name || activeTab,
    followers: currentValues.followers,
    subscribers: currentValues.subscribers,
    monthlyViews: currentValues.monthlyViews,
    monthlyRevenue: results.monthlyRevenue,
    yearlyRevenue: results.yearlyRevenue,
    engagementRate: results.engagementRate,
    niche: currentNiche.name,
    region: currentRegion.name,
  }

  const formatCurrency = (value: number) => {
    const formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value)
    return `${currentRegion.currencySymbol}${formatted}`
  }

  return (
    <TooltipProvider>
      {showMethodology && (
        <MethodologyPage
          onClose={() => setShowMethodology(false)}
          theme={theme}
        />
      )}
      {showGlossary && (
        <Glossary
          onClose={() => setShowGlossary(false)}
          theme={theme}
        />
      )}
      {showMediaKit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowMediaKit(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <MediaKitGenerator
              platformId={activeTab}
              metrics={{
                followers: currentValues.followers || currentValues.subscribers || currentValues.patrons || currentValues.members || 0,
                views: currentValues.monthlyViews || currentValues.impressions || currentValues.spotlightViews || 0,
                engagement: results.engagementRate || 0,
                monthlyRevenue: results.monthlyRevenue,
                yearlyRevenue: results.monthlyRevenue * 12,
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showRateCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowRateCard(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <RateCardGenerator
              platformId={activeTab}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showSponsorshipCalc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowSponsorshipCalc(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <SponsorshipCalculator
              platformId={activeTab}
              metrics={{
                followers: currentValues.followers || currentValues.subscribers || 0,
                views: currentValues.views || currentValues.monthlyViews || currentValues.avgViewers || 0,
                engagement: currentValues.engagementRate || 3,
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showBrandPitch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowBrandPitch(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <BrandPitchGenerator
              platformId={activeTab}
              metrics={{
                followers: currentValues.followers || currentValues.subscribers || 0,
                views: currentValues.views || currentValues.monthlyViews || currentValues.avgViewers || 0,
                engagement: currentValues.engagementRate || 3,
                monthlyRevenue: results.monthlyRevenue,
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showContentROI && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowContentROI(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <ContentROICalculator
              platformId={activeTab}
              monthlyRevenue={results.monthlyRevenue}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showGoalTracker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowGoalTracker(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <GoalTracker
              platformId={activeTab}
              currentMetrics={{
                followers: inputValues[activeTab]?.followers || inputValues[activeTab]?.subscribers || 0,
                views: inputValues[activeTab]?.views || inputValues[activeTab]?.monthlyViews || 0,
                monthlyRevenue: results.monthlyRevenue,
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showPlatformSwitch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowPlatformSwitch(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <PlatformSwitchCalculator
              currentPlatformId={activeTab}
              currentMetrics={{
                followers: inputValues[activeTab]?.followers || inputValues[activeTab]?.subscribers || 0,
                views: inputValues[activeTab]?.views || inputValues[activeTab]?.monthlyViews || 0,
                engagement: inputValues[activeTab]?.engagementRate || inputValues[activeTab]?.engagement || 5,
                monthlyRevenue: results.monthlyRevenue,
              }}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showContentMix && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-xl p-6">
            <button
              onClick={() => setShowContentMix(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <ContentMixSimulator
              platformId={activeTab}
              theme={theme}
            />
          </div>
        </div>
      )}
      {showAIAnalysis && (
        <AIAnalysis
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIAnalysis(false)}
        />
      )}
      {showAIGrowthPlan && (
        <AIGrowthPlan
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIGrowthPlan(false)}
        />
      )}
      {showAIContentIdeas && (
        <AIContentIdeas
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIContentIdeas(false)}
        />
      )}
      {showAIBrandPitch && (
        <AIBrandPitch
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIBrandPitch(false)}
        />
      )}
      {showAIRevenueOpt && (
        <AIRevenueOptimization
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIRevenueOpt(false)}
        />
      )}
      {showAIFocus && (
        <AIFocusRecommendations
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIFocus(false)}
        />
      )}
      {showAIRoadmap && (
        <AIRoadmap
          context={aiContext}
          theme={theme}
          onClose={() => setShowAIRoadmap(false)}
        />
      )}
      {!showMethodology && !showGlossary && (
      <>
      <OnboardingModal onComplete={() => {}} />
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
          <button
            onClick={() => { setActiveTab('youtube'); setCompareMode(false); }}
            className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-[1.02]"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <h1 className="text-xl font-bold">Creator Calculator</h1>
          </button>
        </div>

        {/* Platform Selector */}
        <div className="mb-6">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2 px-3">Platform</p>
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className={`w-full ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-100 border-gray-300 text-zinc-900'}`}>
              <SelectValue>
                {(() => {
                  const platform = platforms.find(p => p.id === activeTab)
                  if (platform) {
                    const Icon = platform.icon
                    return (
                      <span className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${platform.iconColor}`} />
                        {platform.name}
                      </span>
                    )
                  }
                  return 'Select platform'
                })()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className={`${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'} max-h-[300px]`}
              position="popper"
              sideOffset={4}
            >
              {platforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <SelectItem
                    key={platform.id}
                    value={platform.id}
                    className={`${theme === 'dark' ? 'text-white focus:bg-zinc-700' : 'text-zinc-900 focus:bg-gray-100'}`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${platform.iconColor}`} />
                      {platform.name}
                    </span>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Region Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2 px-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Region</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>Your region affects estimated earnings. US typically has the highest ad rates.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-100 border-gray-300 text-zinc-900'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.flag} {region.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-zinc-500 mt-1 px-1">
            {currentRegion.revenueMultiplier === 1 ? 'Baseline rates' : `${Math.round(currentRegion.revenueMultiplier * 100)}% of US rates`}
          </p>
        </div>

        {/* Niche Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2 px-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Niche</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>Your content category affects ad rates. Finance and tech niches typically earn more per view than gaming or entertainment.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-gray-100 border-gray-300 text-zinc-900'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            {niches.map((niche) => (
              <option key={niche.id} value={niche.id}>
                {niche.icon} {niche.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-zinc-500 mt-1 px-1">
            {currentNiche.rpmMultiplier === 1 ? 'Average RPM' : currentNiche.rpmMultiplier > 1 ? `${Math.round(currentNiche.rpmMultiplier * 100)}% of average RPM` : `${Math.round(currentNiche.rpmMultiplier * 100)}% of average RPM`}
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2 px-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Time Period</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3 h-3 text-zinc-500 hover:text-zinc-300 cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p>View your estimated earnings by day, week, month, or year.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex">
            {timePeriods.map((period, index) => (
              <button
                key={period.id}
                onClick={() => setSelectedTimePeriod(period.id)}
                className={`flex-1 px-2 py-1.5 text-xs font-medium transition-colors ${
                  index === 0 ? 'rounded-l-md' : ''
                } ${
                  index === timePeriods.length - 1 ? 'rounded-r-md' : ''
                } ${
                  selectedTimePeriod === period.id
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      : 'bg-gray-200 text-zinc-600 hover:bg-gray-300 hover:text-zinc-900'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Button */}
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 mb-4 ${
            activeTab === 'portfolio'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
              : `${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white' : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'} hover:translate-x-1`
          }`}
          style={activeTab === 'portfolio' ? { boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' } : {}}
        >
          <Wallet className={`w-4 h-4 ${activeTab === 'portfolio' ? 'text-white' : 'text-emerald-500'}`} />
          Total Earnings
        </button>

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

        {/* Methodology Link */}
        <button
          onClick={() => setShowMethodology(true)}
          className={`mt-2 w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 ${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white' : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'}`}
        >
          <Info className="w-4 h-4" />
          How It Works
        </button>

        {/* Glossary Link */}
        <button
          onClick={() => setShowGlossary(true)}
          className={`mt-2 w-full px-3 py-2 rounded-lg flex items-center gap-3 transition-all duration-200 ${theme === 'dark' ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white' : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Glossary
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
                  case 'patreon':
                    revenue = ((v.patrons || 100) * (v.avgPledge || 5)) * 0.9
                    break
                  case 'kofi':
                    revenue = ((v.supporters || 20) * (v.avgTip || 5)) + ((v.members || 10) * (v.memberPrice || 5) * 0.95)
                    break
                  case 'gumroad':
                    revenue = ((v.products || 50) * (v.avgPrice || 25)) * 0.9
                    break
                  case 'podcast':
                    revenue = ((v.downloads || 10000) / 1000) * (v.cpm || 25)
                    break
                  case 'teachable':
                    revenue = ((v.students || 20) * (v.coursePrice || 100)) * (1 - (v.platformFee || 5) / 100)
                    break
                  case 'onlyfans':
                    revenue = (((v.subscribers || 100) * (v.subPrice || 10)) * (1 + (v.tipsPercent || 20) / 100)) * 0.8
                    break
                  case 'etsy':
                    revenue = ((v.orders || 30) * (v.avgOrder || 25)) * ((v.profitMargin || 50) / 100)
                    break
                  case 'amazon':
                    revenue = ((v.pageViews || 5000) * ((v.conversionRate || 3) / 100)) * (v.avgCommission || 4)
                    break
                  case 'fansly':
                    revenue = (((v.subscribers || 100) * (v.subPrice || 10)) * (1 + (v.tipsPercent || 20) / 100)) * 0.8
                    break
                  case 'threads':
                    revenue = ((v.followers || 10000) / 10000) * 15 * (((v.avgLikes || 500) / (v.followers || 10000)) * 100 / 5) * Math.max(Math.floor((v.postsPerMonth || 20) * 0.1), 1)
                    break
                  case 'discord':
                    revenue = ((v.members || 50) * (v.avgPrice || 5)) * 0.9
                    break
                  case 'rumble':
                    revenue = (((v.monthlyViews || 50000) / 1000) * (v.cpm || 3)) + ((v.rants || 10) * 5)
                    break
                  case 'substack':
                    revenue = (Math.floor((v.freeSubscribers || 5000) * ((v.paidPercent || 5) / 100)) * (v.monthlyPrice || 10)) * 0.9
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
                        {formatCurrency(revenue * currentRegion.revenueMultiplier * currentNiche.rpmMultiplier * currentTimePeriod.multiplier)}
                      </p>
                      <p className="text-xs text-emerald-500 mt-1">{currentTimePeriod.name} estimate</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : activeTab === 'portfolio' ? (
          /* Portfolio View */
          (() => {
            // Helper function to check if user has modified inputs from defaults
            const hasUserInput = (platformId: string): boolean => {
              const platform = platforms.find(p => p.id === platformId)
              if (!platform) return false
              const v = inputValues[platformId] || {}
              return platform.inputs.some(input => {
                const currentValue = v[input.id]
                return currentValue !== undefined && currentValue !== input.defaultValue
              })
            }

            // Calculate revenue for platforms where user has entered data
            const platformRevenues = platforms.map((platform) => {
              const v = inputValues[platform.id] || {}
              const userHasInput = hasUserInput(platform.id)

              // Only calculate revenue if user has entered custom values
              if (!userHasInput) {
                return { platform, revenue: 0, hasUserInput: false }
              }

              let revenue = 0

              switch (platform.id) {
                case 'youtube':
                  revenue = ((v.monthlyViews || 0) / 1000) * (v.cpm || 4) * 0.55 + (v.subscribers || 0) * 0.05
                  break
                case 'tiktok':
                  revenue = (v.monthlyViews || 0) * 0.02 + ((v.followers || 0) >= 10000 ? (v.followers || 0) * 0.015 : 0)
                  break
                case 'instagram':
                  revenue = ((v.followers || 0) >= 10000 ? ((v.followers || 0) / 1000) * 10 : 0) * ((v.postsPerMonth || 12) / 4)
                  break
                case 'twitter':
                  revenue = ((v.impressions || 0) / 1000) * 0.5 + (v.subscribers || 0) * 3
                  break
                case 'facebook':
                  revenue = ((v.watchMinutes || 0) / 1000) * 1.5
                  break
                case 'linkedin':
                  revenue = Math.floor((v.newsletterSubs || 0) * 0.01) * 500
                  break
                case 'snapchat':
                  revenue = ((v.spotlightViews || 0) / 1000) * 0.05
                  break
                case 'pinterest':
                  revenue = ((v.monthlyViews || 0) / 1000) * 0.1 + (v.ideaPins || 0) * 2
                  break
                case 'twitch':
                  revenue = (v.subscribers || 0) * 2.5 + (v.avgViewers || 0) * (v.hoursStreamed || 0) * 0.02 + (v.avgViewers || 0) * 0.5
                  break
                case 'kick':
                  revenue = (v.subscribers || 0) * 4.5
                  break
                case 'newsletter':
                  revenue = Math.floor((v.subscribers || 0) * ((v.paidPercent || 5) / 100)) * (v.monthlyPrice || 10) * 0.9
                  break
              }

              return {
                platform,
                revenue: revenue * currentRegion.revenueMultiplier * currentNiche.rpmMultiplier,
                hasUserInput: true,
              }
            })

            // Filter to only platforms with revenue > 0
            const platformsWithRevenue = platformRevenues.filter(p => p.revenue > 0)
            const totalMonthlyRevenue = platformsWithRevenue.reduce((sum, p) => sum + p.revenue, 0)
            const sortedPlatforms = [...platformsWithRevenue].sort((a, b) => b.revenue - a.revenue)
            const topPlatform = sortedPlatforms[0]

            // Empty state if no platforms have revenue
            if (platformsWithRevenue.length === 0) {
              return (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                      Total Portfolio
                    </h2>
                    <p className="text-zinc-400">Combined earnings across all platforms</p>
                  </div>
                  <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                        <Wallet className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        No earnings data yet
                      </h3>
                      <p className="text-zinc-500 max-w-md mb-6">
                        Enter metrics for at least one platform to see your total portfolio earnings. Click on any platform in the sidebar to get started.
                      </p>
                      <button
                        onClick={() => setActiveTab('youtube')}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Start with YouTube
                      </button>
                    </CardContent>
                  </Card>
                </div>
              )
            }

            return (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    Total Portfolio
                  </h2>
                  <p className="text-zinc-400">Combined earnings across all platforms</p>
                </div>

                {/* Total Earnings Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card className={`border-l-4 border-l-emerald-500 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-zinc-400">{currentTimePeriod.name} Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        <AnimatedNumber value={totalMonthlyRevenue * currentTimePeriod.multiplier} formatter={formatCurrency} />
                      </p>
                      <p className="text-xs text-emerald-500 mt-1">All platforms combined</p>
                    </CardContent>
                  </Card>

                  <Card className={`border-l-4 border-l-emerald-500 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-zinc-400">Monthly Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        <AnimatedNumber value={totalMonthlyRevenue} formatter={formatCurrency} />
                      </p>
                      <p className="text-xs text-emerald-500 mt-1">Per month</p>
                    </CardContent>
                  </Card>

                  <Card className={`border-l-4 border-l-emerald-500 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-zinc-400">Yearly Projection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        <AnimatedNumber value={totalMonthlyRevenue * 12} formatter={formatCurrency} />
                      </p>
                      <p className="text-xs text-emerald-500 mt-1">Annual estimate</p>
                    </CardContent>
                  </Card>

                  <Card className={`border-l-4 border-l-emerald-500 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-zinc-400">Top Platform</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        {topPlatform && <topPlatform.platform.icon className={`w-5 h-5 ${topPlatform.platform.iconColor}`} />}
                        <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                          {topPlatform?.platform.name || '-'}
                        </p>
                      </div>
                      <p className="text-xs text-emerald-500 mt-1">{platformsWithRevenue.length} active platform{platformsWithRevenue.length !== 1 ? 's' : ''}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Chart */}
                <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                  <CardHeader>
                    <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Revenue by Platform</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sortedPlatforms.map(p => ({
                          name: p.platform.name,
                          value: p.revenue * currentTimePeriod.multiplier,
                          fill: p.platform.accentColor,
                        }))} layout="vertical">
                          <XAxis type="number" stroke={theme === 'dark' ? '#71717a' : '#52525b'} fontSize={12} tickFormatter={(v) => `${currentRegion.currencySymbol}${v}`} />
                          <YAxis type="category" dataKey="name" stroke={theme === 'dark' ? '#71717a' : '#52525b'} fontSize={12} width={100} />
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                            labelStyle={{ color: '#fff' }}
                            formatter={(value) => [`${currentRegion.currencySymbol}${Number(value).toFixed(2)}`, 'Revenue']}
                            cursor={false}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={500} animationEasing="ease-out">
                            {sortedPlatforms.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.platform.accentColor} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Breakdown */}
                <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
                  <CardHeader>
                    <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Platform Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sortedPlatforms.map(({ platform, revenue }) => {
                        const percentage = totalMonthlyRevenue > 0 ? (revenue / totalMonthlyRevenue) * 100 : 0
                        return (
                          <div
                            key={platform.id}
                            className={`p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                            onClick={() => setActiveTab(platform.id)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <platform.icon className={`w-4 h-4 ${platform.iconColor}`} />
                                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{platform.name}</span>
                              </div>
                              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                                {formatCurrency(revenue * currentTimePeriod.multiplier)}
                              </span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`}>
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%`, backgroundColor: platform.accentColor }}
                              />
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">{percentage.toFixed(1)}% of total</p>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })()
        ) : activePlatform ? (
          <PlatformDashboard
            platformId={activeTab}
            inputValues={currentValues}
            onUpdateValue={updateValue}
            results={results}
            theme={theme}
            formatCurrency={formatCurrency}
            onShowMediaKit={() => setShowMediaKit(true)}
            onShowRateCard={() => setShowRateCard(true)}
            onShowSponsorshipCalc={() => setShowSponsorshipCalc(true)}
            onShowBrandPitch={() => setShowBrandPitch(true)}
            onShowContentROI={() => setShowContentROI(true)}
            onShowGoalTracker={() => setShowGoalTracker(true)}
            onShowPlatformSwitch={() => setShowPlatformSwitch(true)}
            onShowContentMix={() => setShowContentMix(true)}
          />
        ) : null}
      </main>
    </div>
    </>
    )}
    </TooltipProvider>
  )
}

