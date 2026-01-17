import { useState, useMemo } from 'react'
import { ArrowRight, TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { platforms } from '@/platforms/registry'
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
  calculateThreads,
  calculateDiscord,
  calculateRumble,
  calculateSubstack,
} from '@/engine/calculations'

interface PlatformSwitchCalculatorProps {
  currentPlatformId: string
  currentMetrics: {
    followers: number
    views: number
    engagement: number
    monthlyRevenue: number
  }
  theme: 'dark' | 'light'
}

// Helper function to calculate revenue for any platform
function calculatePlatformRevenue(
  platformId: string,
  followers: number,
  views: number,
  engagement: number
): number {
  try {
    switch (platformId) {
      case 'youtube':
        return calculateYouTube(followers, views, 4).monthlyRevenue
      case 'tiktok':
        return calculateTikTok(followers, views, engagement).monthlyRevenue
      case 'instagram':
        return calculateInstagram(followers, Math.round(views * (engagement / 100)), 20).monthlyRevenue
      case 'twitter':
        return calculateTwitter(followers, views, Math.round(followers * 0.01)).monthlyRevenue
      case 'facebook':
        return calculateFacebook(followers, views * 2).monthlyRevenue
      case 'linkedin':
        return calculateLinkedIn(followers, Math.round(followers * 0.1)).monthlyRevenue
      case 'snapchat':
        return calculateSnapchat(followers, views).monthlyRevenue
      case 'pinterest':
        return calculatePinterest(followers, views, 10).monthlyRevenue
      case 'twitch':
        return calculateTwitch(Math.round(followers * 0.02), Math.round(views / 30), 40).monthlyRevenue
      case 'kick':
        return calculateKick(Math.round(followers * 0.02), Math.round(views / 30)).monthlyRevenue
      case 'newsletter':
        return calculateNewsletter(followers, 5, 5).monthlyRevenue
      case 'patreon':
        return calculatePatreon(Math.round(followers * 0.01), 5).monthlyRevenue
      case 'kofi':
        return calculateKofi(Math.round(followers * 0.005), 5, Math.round(followers * 0.002), 5).monthlyRevenue
      case 'gumroad':
        return calculateGumroad(5, 20).monthlyRevenue
      case 'podcast':
        return calculatePodcast(views, 4, 25).monthlyRevenue
      case 'courses':
        return calculateCourses(Math.round(followers * 0.005), 99, 10).monthlyRevenue
      case 'onlyfans':
        return calculateOnlyFans(Math.round(followers * 0.02), 10, 20).monthlyRevenue
      case 'etsy':
        return calculateEtsy(Math.round(views * 0.002), 30, 40).monthlyRevenue
      case 'amazon':
        return calculateAmazon(views, 2, 4).monthlyRevenue
      case 'fansly':
        return calculateFansly(Math.round(followers * 0.02), 10, 15).monthlyRevenue
      case 'threads':
        return calculateThreads(followers, Math.round(views * (engagement / 100)), 20).monthlyRevenue
      case 'discord':
        return calculateDiscord(Math.round(followers * 0.01), 5).monthlyRevenue
      case 'rumble':
        return calculateRumble(followers, views, Math.round(followers * 0.005)).monthlyRevenue
      case 'substack':
        return calculateSubstack(followers, 5, 5).monthlyRevenue
      default:
        return 0
    }
  } catch {
    return 0
  }
}

export default function PlatformSwitchCalculator({
  currentPlatformId,
  currentMetrics,
  theme,
}: PlatformSwitchCalculatorProps) {
  const [targetPlatformId, setTargetPlatformId] = useState<string>('')
  const [followerTransferRate, setFollowerTransferRate] = useState(25)
  const [viewRetentionRate, setViewRetentionRate] = useState(40)
  const [engagementAdjustment, setEngagementAdjustment] = useState(100)

  const currentPlatform = platforms.find(p => p.id === currentPlatformId)
  const targetPlatform = platforms.find(p => p.id === targetPlatformId)
  const availablePlatforms = platforms.filter(p => p.id !== currentPlatformId)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const projectedMetrics = useMemo(() => {
    if (!targetPlatformId || !targetPlatform) return null

    const projectedFollowers = Math.round(currentMetrics.followers * (followerTransferRate / 100))
    const projectedViews = Math.round(currentMetrics.views * (viewRetentionRate / 100))
    const projectedEngagement = currentMetrics.engagement * (engagementAdjustment / 100)

    const monthlyRevenue = calculatePlatformRevenue(
      targetPlatformId,
      projectedFollowers,
      projectedViews,
      projectedEngagement
    )

    return {
      followers: projectedFollowers,
      views: projectedViews,
      engagement: projectedEngagement,
      monthlyRevenue,
    }
  }, [targetPlatformId, targetPlatform, currentMetrics, followerTransferRate, viewRetentionRate, engagementAdjustment])

  const revenueDifference = projectedMetrics
    ? projectedMetrics.monthlyRevenue - currentMetrics.monthlyRevenue
    : 0

  const percentageDifference = currentMetrics.monthlyRevenue > 0 && projectedMetrics
    ? ((projectedMetrics.monthlyRevenue - currentMetrics.monthlyRevenue) / currentMetrics.monthlyRevenue) * 100
    : 0

  const getVerdict = () => {
    if (!projectedMetrics) return null

    if (percentageDifference > 10) {
      return {
        type: 'positive' as const,
        text: `Switching could increase your earnings by ${percentageDifference.toFixed(0)}%`,
        Icon: TrendingUp,
        color: '#22c55e',
      }
    } else if (percentageDifference < -10) {
      return {
        type: 'negative' as const,
        text: `Staying on ${currentPlatform?.name} may be more profitable`,
        Icon: TrendingDown,
        color: '#ef4444',
      }
    } else {
      return {
        type: 'neutral' as const,
        text: 'Revenue would be similar — consider audience preferences',
        Icon: Minus,
        color: '#f59e0b',
      }
    }
  }

  const verdict = getVerdict()

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Platform Switch Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Platform Summary */}
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{ backgroundColor: `${currentPlatform?.accentColor}20` }}
            >
              {currentPlatform && <currentPlatform.icon className={`w-5 h-5 ${currentPlatform.iconColor}`} />}
            </div>
            <div>
              <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Current: {currentPlatform?.name}
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Your starting point
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Followers</p>
              <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {formatNumber(currentMetrics.followers)}
              </p>
            </div>
            <div>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Views</p>
              <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {formatNumber(currentMetrics.views)}
              </p>
            </div>
            <div>
              <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>Revenue</p>
              <p className="font-semibold" style={{ color: currentPlatform?.accentColor }}>
                {formatCurrency(currentMetrics.monthlyRevenue)}
              </p>
            </div>
          </div>
        </div>

        {/* Target Platform Selector */}
        <div className="space-y-2">
          <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Switch to Platform
          </Label>
          <Select value={targetPlatformId} onValueChange={setTargetPlatformId}>
            <SelectTrigger className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}>
              <SelectValue placeholder="Select target platform" />
            </SelectTrigger>
            <SelectContent>
              {availablePlatforms.map(platform => (
                <SelectItem key={platform.id} value={platform.id}>
                  <span className="flex items-center gap-2">
                    <platform.icon className={`w-4 h-4 ${platform.iconColor}`} />
                    <span>{platform.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {targetPlatformId && (
          <>
            {/* Conversion Assumptions */}
            <div className="space-y-4">
              <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                Conversion Assumptions
              </Label>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Follower Transfer Rate
                    </span>
                    <span className="text-sm font-medium text-purple-500">{followerTransferRate}%</span>
                  </div>
                  <Slider
                    value={[followerTransferRate]}
                    onValueChange={([value]) => setFollowerTransferRate(value)}
                    min={10}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    What % of followers will follow you to the new platform
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      View Retention Rate
                    </span>
                    <span className="text-sm font-medium text-blue-500">{viewRetentionRate}%</span>
                  </div>
                  <Slider
                    value={[viewRetentionRate]}
                    onValueChange={([value]) => setViewRetentionRate(value)}
                    min={20}
                    max={80}
                    step={5}
                    className="w-full"
                  />
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Expected views compared to your current platform
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      Engagement Adjustment
                    </span>
                    <span className="text-sm font-medium text-emerald-500">{engagementAdjustment}%</span>
                  </div>
                  <Slider
                    value={[engagementAdjustment]}
                    onValueChange={([value]) => setEngagementAdjustment(value)}
                    min={50}
                    max={150}
                    step={10}
                    className="w-full"
                  />
                  <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    Platform engagement differences (100% = same engagement)
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            {projectedMetrics && (
              <div className="space-y-4">
                <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                  Projected Comparison
                </Label>

                <div className="grid grid-cols-2 gap-4">
                  {/* Current Platform Card */}
                  <div
                    className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-50'}`}
                    style={{ borderColor: currentPlatform?.accentColor }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {currentPlatform && <currentPlatform.icon className={`w-4 h-4 ${currentPlatform.iconColor}`} />}
                      <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {currentPlatform?.name}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>Followers</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                          {formatNumber(currentMetrics.followers)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>Views</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                          {formatNumber(currentMetrics.views)}
                        </span>
                      </div>
                      <div className={`flex justify-between text-sm font-semibold pt-2 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                        <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>Revenue</span>
                        <span style={{ color: currentPlatform?.accentColor }}>
                          {formatCurrency(currentMetrics.monthlyRevenue)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Target Platform Card */}
                  <div
                    className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-50'}`}
                    style={{ borderColor: targetPlatform?.accentColor }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {targetPlatform && <targetPlatform.icon className={`w-4 h-4 ${targetPlatform.iconColor}`} />}
                      <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {targetPlatform?.name}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>Followers</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                          {formatNumber(projectedMetrics.followers)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>Views</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                          {formatNumber(projectedMetrics.views)}
                        </span>
                      </div>
                      <div className={`flex justify-between text-sm font-semibold pt-2 border-t ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                        <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>Revenue</span>
                        <span style={{ color: targetPlatform?.accentColor }}>
                          {formatCurrency(projectedMetrics.monthlyRevenue)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difference Display */}
                <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                  <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Revenue Difference:{' '}
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: revenueDifference >= 0 ? '#22c55e' : '#ef4444' }}
                  >
                    {revenueDifference >= 0 ? '+' : ''}
                    {formatCurrency(revenueDifference)}/mo
                  </span>
                </div>

                {/* Verdict */}
                {verdict && (
                  <div
                    className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-50'}`}
                    style={{ borderColor: verdict.color }}
                  >
                    <div className="flex items-center gap-3">
                      <verdict.Icon className="w-6 h-6" style={{ color: verdict.color }} />
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {verdict.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tips Section */}
            <div
              className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-amber-50 border border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-500' : 'text-amber-600'}`} />
                <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Platform Switch Tips
                </h4>
              </div>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-start gap-2">
                  <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
                  <span><strong>Cross-promote before switching</strong> — Announce your new platform to existing audience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
                  <span><strong>Build audience on both platforms first</strong> — Don't abandon one until the other is established</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
                  <span><strong>Different platforms favor different content</strong> — Adapt your style to the new platform's algorithm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
                  <span><strong>Consider diversification</strong> — Multiple platforms reduce risk if one changes policies</span>
                </li>
              </ul>
            </div>
          </>
        )}

        {!targetPlatformId && (
          <div className={`text-center py-8 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <ArrowRight className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Select a target platform to see projected earnings</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
