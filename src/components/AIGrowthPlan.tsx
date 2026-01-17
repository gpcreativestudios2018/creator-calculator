import { useState } from 'react'
import { TrendingUp, Loader2, AlertCircle, X, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isAIConfigured, callAI, getMockResponse, type CreatorContext } from '@/services/ai'

interface AIGrowthPlanProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are an expert creator economy strategist. Create detailed, actionable 90-day growth plans. Be specific with numbers and timelines. Format in markdown with clear monthly sections. Keep it practical and achievable.`

function buildGrowthPlanPrompt(context: CreatorContext): string {
  return `Create a 90-day growth plan for this ${context.platform} creator:

Current Metrics:
- Followers/Subscribers: ${context.followers || context.subscribers || 0}
- Monthly Views: ${context.monthlyViews || 'N/A'}
- Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}
- Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
- Niche: ${context.niche || 'General'}

Create a structured 90-day plan with:
1. Specific goals for each month (with numbers)
2. Weekly action items
3. Content strategy recommendations
4. Monetization milestones
5. Key metrics to track

Make it realistic for their current level. Include specific tactics, not just general advice.`
}

export function AIGrowthPlan({ context, theme, onClose }: AIGrowthPlanProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generatePlan = async () => {
    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      const mock = getMockResponse('growth-plan', context)
      setResponse(mock)
      setLoading(false)
      return
    }

    const result = await callAI(buildGrowthPlanPrompt(context), SYSTEM_PROMPT)

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate growth plan')
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
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            AI Growth Plan
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Get a personalized 90-day roadmap to grow your {context.platform} account
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && !error && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'
              }`}>
                <Calendar className="w-8 h-8 text-emerald-500" />
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Generate a detailed 90-day growth plan with specific goals, weekly actions, and monetization milestones.
              </p>
              <Button
                onClick={generatePlan}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Generate My Growth Plan
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
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-emerald-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Creating your personalized growth plan...
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
                  onClick={generatePlan}
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
                      .replace(/## /g, '<h3 class="text-lg font-bold mt-4 mb-2">')
                      .replace(/### /g, '<h4 class="font-semibold mt-3 mb-1">')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/• /g, '<br>• ')
                      .replace(/(\d)\. /g, '<br>$1. ')
                  }}
                />
              </div>
              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <Button
                  onClick={generatePlan}
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
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
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

export default AIGrowthPlan
