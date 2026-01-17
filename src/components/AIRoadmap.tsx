import { useState } from 'react'
import { Map, Loader2, AlertCircle, X, Flag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isAIConfigured, callAI, type CreatorContext } from '@/services/ai'

interface AIRoadmapProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are a creator career advisor. Create personalized, step-by-step roadmaps that tell creators exactly what to do next. Be specific with actions, timelines, and milestones. Make it feel achievable and motivating.`

function buildRoadmapPrompt(context: CreatorContext): string {
  return `Create a personalized "What to do next" roadmap for this ${context.platform} creator:

Current State:
- Platform: ${context.platform}
- Followers/Subscribers: ${context.followers || context.subscribers || 0}
- Monthly Views: ${context.monthlyViews || 'N/A'}
- Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}
- Yearly Revenue: $${context.yearlyRevenue.toFixed(2)}
- Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
- Niche: ${context.niche || 'General'}

Create a roadmap with:

1. **Your Next Milestone** - The next realistic goal (follower count, revenue target, etc.) with timeline

2. **Immediate Actions (This Week)**
   - 3 specific tasks to do in the next 7 days
   - Each should take less than 2 hours

3. **Short-term Goals (This Month)**
   - 3-4 objectives for the next 30 days
   - Include metrics to track

4. **Medium-term Vision (3 Months)**
   - Where they should be in 90 days
   - Key milestones to hit

5. **Unlock Next Level** - What needs to happen to reach the next tier:
   - If <1K followers: What gets them to 1K
   - If 1K-10K: What gets them to 10K
   - If 10K-100K: What gets them to 100K
   - If 100K+: What gets them to sustainable full-time income

Be specific, actionable, and encouraging. Use their actual numbers.`
}

function getMockRoadmapResponse(context: CreatorContext): string {
  const audience = context.followers || context.subscribers || 0
  const nextMilestone = audience < 1000 ? '1,000' : audience < 10000 ? '10,000' : audience < 100000 ? '100,000' : '500,000'
  const currentTier = audience < 1000 ? 'Starter' : audience < 10000 ? 'Rising' : audience < 100000 ? 'Established' : 'Pro'

  return `## Your Next Milestone

**Target:** ${nextMilestone} followers on ${context.platform}
**Timeline:** ${audience < 1000 ? '2-3 months' : audience < 10000 ? '4-6 months' : '6-12 months'}
**Current:** ${audience.toLocaleString()} (${((audience / parseInt(nextMilestone.replace(/,/g, ''))) * 100).toFixed(0)}% there)

---

## Immediate Actions (This Week)

**1. Content Audit** (1 hour)
→ Review your top 5 posts. Note what worked. Do more of that.

**2. Engagement Sprint** (30 min/day)
→ Comment meaningfully on 10 accounts in your niche daily.

**3. One Power Post** (2 hours)
→ Create one high-effort post using your best-performing format.

---

## This Month's Objectives

✦ Post consistently: ${audience < 10000 ? '5x per week minimum' : '4x per week minimum'}
✦ Grow followers by ${audience < 1000 ? '200-300' : audience < 10000 ? '500-1000' : '2000-5000'}
✦ ${audience < 10000 ? 'Get 3 collaboration conversations started' : 'Close 1 brand deal or launch 1 product'}
✦ Engagement rate target: ${Math.max((context.engagementRate || 5) + 0.5, 5)}%

---

## 90-Day Vision

By ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}:

📊 **Followers:** ${Math.round(audience * 1.5).toLocaleString()}+
💰 **Revenue:** $${Math.round(context.monthlyRevenue * 2).toLocaleString()}/month
🎯 **Status:** ${currentTier === 'Starter' ? 'Rising Creator' : currentTier === 'Rising' ? 'Established Creator' : 'Full-time viable'}

---

## Unlock: ${currentTier === 'Starter' ? 'Rising Creator' : currentTier === 'Rising' ? 'Established Creator' : 'Pro Creator'}

To reach ${nextMilestone} followers, you need:

${audience < 1000 ? `
- **Consistency** - Post daily for 30 days straight
- **Hooks** - First 3 seconds/lines must grab attention
- **Niche clarity** - Be known for ONE thing
- **Collaboration** - Get featured by 2-3 bigger accounts
` : audience < 10000 ? `
- **Content series** - Create a signature format people follow
- **Community** - Reply to every comment for 30 days
- **Cross-promotion** - Partner with 5 creators your size
- **SEO/Hashtags** - Optimize discoverability
` : `
- **Diversification** - Build email list (1000+ subscribers)
- **Monetization** - 3+ revenue streams active
- **Team** - Consider editor/VA to increase output
- **Brand positioning** - Become the go-to in your sub-niche
`}

---

**Your Creator Tier:** ${currentTier}
**Next Tier:** ${currentTier === 'Starter' ? 'Rising' : currentTier === 'Rising' ? 'Established' : currentTier === 'Established' ? 'Pro' : 'Legend'}

*Configure your AI API key for a personalized roadmap.*`
}

export function AIRoadmap({ context, theme, onClose }: AIRoadmapProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateRoadmap = async () => {
    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      const mock = getMockRoadmapResponse(context)
      setResponse(mock)
      setLoading(false)
      return
    }

    const result = await callAI(buildRoadmapPrompt(context), SYSTEM_PROMPT)

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate roadmap')
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
            <Map className="w-5 h-5 text-indigo-500" />
            Your Personalized Roadmap
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            What should you do next? Get your step-by-step action plan.
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && !error && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'
              }`}>
                <Flag className="w-8 h-8 text-indigo-500" />
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Get a personalized roadmap with your next milestone, weekly actions, monthly goals, and how to reach the next level.
              </p>
              <Button
                onClick={generateRoadmap}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Map className="w-4 h-4 mr-2" />
                Generate My Roadmap
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
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-indigo-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Building your personalized roadmap...
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
                  Generation Failed
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-400/70' : 'text-red-600'}`}>
                  {error}
                </p>
                <Button
                  onClick={generateRoadmap}
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
                      .replace(/## /g, '<h3 class="text-lg font-bold mt-4 mb-2 text-indigo-400">')
                      .replace(/### /g, '<h4 class="font-semibold mt-3 mb-1">')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/→/g, '<span class="text-indigo-400">→</span>')
                      .replace(/✦/g, '<span class="text-indigo-400">✦</span>')
                      .replace(/📊|💰|🎯/g, (match) => `<span class="text-lg">${match}</span>`)
                      .replace(/• /g, '<br>• ')
                      .replace(/(\d)\. /g, '<br><span class="text-indigo-400 font-bold">$1.</span> ')
                  }}
                />
              </div>
              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <Button
                  onClick={generateRoadmap}
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
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

export default AIRoadmap
