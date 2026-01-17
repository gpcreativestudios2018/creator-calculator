import { useState } from 'react'
import { DollarSign, Loader2, AlertCircle, X, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isAIConfigured, callAI, getMockResponse, type CreatorContext } from '@/services/ai'

interface AIRevenueOptimizationProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are a creator monetization expert. Analyze the creator's current revenue and provide specific, actionable optimization strategies. Focus on realistic opportunities based on their audience size and platform. Include specific numbers and estimates where possible.`

function buildOptimizationPrompt(context: CreatorContext): string {
  return `Analyze and optimize revenue for this ${context.platform} creator:

Current Metrics:
- Platform: ${context.platform}
- Followers/Subscribers: ${context.followers || context.subscribers || 0}
- Monthly Views: ${context.monthlyViews || 'N/A'}
- Current Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}
- Current Yearly Revenue: $${context.yearlyRevenue.toFixed(2)}
- Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
- Niche: ${context.niche || 'General'}
- Region: ${context.region || 'US'}

Provide:
1. Revenue gap analysis (what they're leaving on the table)
2. Top 3 untapped revenue streams with estimated earnings
3. Pricing optimization suggestions (are they undercharging?)
4. Specific sponsorship rate recommendations
5. Passive income opportunities for their niche
6. Quick wins to increase revenue this month

Be specific with dollar amounts and percentages.`
}

export function AIRevenueOptimization({ context, theme, onClose }: AIRevenueOptimizationProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateOptimization = async () => {
    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      const mock = getMockResponse('optimization', context)
      setResponse(mock)
      setLoading(false)
      return
    }

    const result = await callAI(buildOptimizationPrompt(context), SYSTEM_PROMPT)

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate optimization suggestions')
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
            <DollarSign className="w-5 h-5 text-green-500" />
            AI Revenue Optimization
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Discover untapped revenue opportunities and optimize your earnings
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && !error && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  ${context.monthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Current estimated revenue
                </p>
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Get AI-powered suggestions to maximize your {context.platform} income with specific strategies and dollar estimates.
              </p>
              <Button
                onClick={generateOptimization}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Optimize My Revenue
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
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-green-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Analyzing revenue opportunities...
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
                  onClick={generateOptimization}
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
                      .replace(/\$(\d+[\d,]*)/g, '<span class="text-green-500 font-semibold">$$$1</span>')
                      .replace(/• /g, '<br>• ')
                      .replace(/(\d)\. /g, '<br>$1. ')
                  }}
                />
              </div>
              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <Button
                  onClick={generateOptimization}
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
                  className="bg-green-600 hover:bg-green-700 text-white"
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

export default AIRevenueOptimization
