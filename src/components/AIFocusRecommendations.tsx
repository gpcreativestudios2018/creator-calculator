import { useState } from 'react'
import { Target, Loader2, AlertCircle, X, Compass } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isAIConfigured, callAI, type CreatorContext } from '@/services/ai'

interface AIFocusRecommendationsProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are a creator strategy advisor. Analyze the creator's metrics and tell them exactly where to focus their limited time and energy for maximum impact. Be direct and prioritized. Compare them to benchmarks and identify their biggest leverage points.`

function buildFocusPrompt(context: CreatorContext): string {
  return `Analyze where this ${context.platform} creator should focus their efforts:

Current Metrics:
- Platform: ${context.platform}
- Followers/Subscribers: ${context.followers || context.subscribers || 0}
- Monthly Views: ${context.monthlyViews || 'N/A'}
- Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}
- Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
- Niche: ${context.niche || 'General'}

Provide:
1. **Benchmark Comparison**: How do they compare to average creators at their level? (followers, engagement, revenue)
2. **Biggest Gap**: What's the #1 thing holding them back?
3. **Focus Priority Stack**: Rank these in order of importance for THIS creator:
   - Content quality
   - Posting frequency
   - Engagement/community
   - Monetization
   - Collaborations
   - Platform expansion
4. **This Week's Focus**: One specific thing to focus on this week
5. **This Month's Focus**: The key objective for the next 30 days
6. **Ignore For Now**: What they should NOT worry about at their current stage

Be specific and actionable. No generic advice.`
}

function getMockFocusResponse(context: CreatorContext): string {
  const audience = context.followers || context.subscribers || 0
  const tier = audience >= 100000 ? 'established' : audience >= 10000 ? 'growing' : 'emerging'

  return `## Benchmark Comparison

**Your Level:** ${tier.charAt(0).toUpperCase() + tier.slice(1)} Creator
**Followers:** ${audience.toLocaleString()} (${tier === 'emerging' ? 'top 50%' : tier === 'growing' ? 'top 20%' : 'top 5%'} of ${context.platform} creators)
**Revenue:** $${context.monthlyRevenue.toLocaleString()}/mo (${context.monthlyRevenue > audience * 0.01 ? 'above' : 'below'} average for your size)
**Engagement:** ${context.engagementRate?.toFixed(1) || '5'}% (${(context.engagementRate || 5) > 4 ? 'healthy' : 'needs work'})

## Your #1 Gap

${tier === 'emerging'
  ? "**Audience Growth** — You need more eyeballs before optimizing monetization. Focus on content that attracts new followers."
  : tier === 'growing'
  ? "**Monetization** — You have the audience but aren't fully monetizing. Add revenue streams."
  : "**Diversification** — Don't rely on one platform. Build owned audiences (email, community)."}

## Focus Priority Stack

1. ${tier === 'emerging' ? 'Content quality & hooks' : 'Monetization systems'}
2. ${tier === 'emerging' ? 'Posting consistency' : 'Content quality'}
3. ${tier === 'emerging' ? 'Engagement' : 'Community building'}
4. ${tier === 'growing' ? 'Collaborations' : 'Platform expansion'}
5. ${tier === 'emerging' ? 'Ignore monetization for now' : 'Automation & delegation'}

## This Week's Focus

${tier === 'emerging'
  ? "Analyze your top 3 performing posts. What do they have in common? Create 2 new posts using that formula."
  : "Reach out to 3 brands in your niche for partnership conversations."}

## This Month's Focus

${tier === 'emerging'
  ? "Post consistently (minimum 4x/week) and engage with 10 accounts in your niche daily."
  : "Launch or optimize one additional revenue stream (memberships, products, or sponsorships)."}

## Ignore For Now

${tier === 'emerging'
  ? "Don't worry about: sponsorships, multiple platforms, fancy equipment, or complex funnels. Just make good content consistently."
  : "Don't worry about: vanity metrics, viral content, or copying what mega-creators do. Focus on your engaged community."}

*Configure your AI API key for personalized recommendations.*`
}

export function AIFocusRecommendations({ context, theme, onClose }: AIFocusRecommendationsProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateRecommendations = async () => {
    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      const mock = getMockFocusResponse(context)
      setResponse(mock)
      setLoading(false)
      return
    }

    const result = await callAI(buildFocusPrompt(context), SYSTEM_PROMPT)

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate recommendations')
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className={`relative max-w-2xl w-full max-h-[90vh] overflow-hidden ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            <Target className="w-5 h-5 text-orange-500" />
            Where Should You Focus?
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Get AI-powered recommendations on where to spend your time and energy
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && !error && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100'
              }`}>
                <Compass className="w-8 h-8 text-orange-500" />
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Compare yourself to benchmarks and discover exactly where to focus for maximum growth on {context.platform}.
              </p>
              <Button
                onClick={generateRecommendations}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Target className="w-4 h-4 mr-2" />
                Show Me Where to Focus
              </Button>
              {!isAIConfigured() && (
                <p className={`mt-4 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  Demo mode — Add API key in src/services/ai.ts for live AI
                </p>
              )}
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-orange-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Analyzing your priorities...
              </p>
            </div>
          )}

          {error && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              theme === 'dark' ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
            }`}>
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
                  Analysis Failed
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-400/70' : 'text-red-600'}`}>
                  {error}
                </p>
                <Button
                  onClick={generateRecommendations}
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {response && (
            <div className="space-y-4">
              <div className={`prose prose-sm max-w-none ${
                theme === 'dark' ? 'prose-invert' : ''
              }`}>
                <div
                  className={`whitespace-pre-wrap ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                  dangerouslySetInnerHTML={{
                    __html: response
                      .replace(/## /g, '<h3 class="text-lg font-bold mt-4 mb-2 text-orange-500">')
                      .replace(/### /g, '<h4 class="font-semibold mt-3 mb-1">')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/• /g, '<br>• ')
                      .replace(/(\d)\. /g, '<br><span class="text-orange-500 font-bold">$1.</span> ')
                  }}
                />
              </div>
              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <Button
                  onClick={generateRecommendations}
                  variant="outline"
                  size="sm"
                >
                  Regenerate
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(response)
                  }}
                  variant="outline"
                  size="sm"
                >
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={onClose}
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AIFocusRecommendations
