import { useState } from 'react'
import { Sparkles, Loader2, AlertCircle, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isAIConfigured, callAI, getMockResponse, type CreatorContext } from '@/services/ai'

interface AIAnalysisProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are an expert creator economy coach. Analyze the creator's metrics and provide actionable, specific advice. Be encouraging but honest. Format your response in markdown with clear sections. Keep it concise - max 300 words.`

function buildAnalysisPrompt(context: CreatorContext): string {
  return `Analyze this creator's ${context.platform} account and identify what's holding them back and how they can grow:

Platform: ${context.platform}
Followers/Subscribers: ${context.followers || context.subscribers || 0}
Monthly Views: ${context.monthlyViews || 'N/A'}
Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}
Yearly Revenue: $${context.yearlyRevenue.toFixed(2)}
Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
Niche: ${context.niche || 'General'}
Region: ${context.region || 'US'}

Provide:
1. A quick assessment of their current position
2. The #1 thing holding them back
3. Three specific, actionable recommendations
4. One quick win they can do this week`
}

export function AIAnalysis({ context, theme, onClose }: AIAnalysisProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = async () => {
    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      // Use mock response when API key not configured
      const mock = getMockResponse('analysis', context)
      setResponse(mock)
      setLoading(false)
      return
    }

    // Use Claude for analysis (hybrid approach - Claude for quality insights)
    const result = await callAI(buildAnalysisPrompt(context), SYSTEM_PROMPT)

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate analysis')
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
            <Sparkles className="w-5 h-5 text-purple-500" />
            AI Growth Analysis
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Get personalized insights on what's holding you back and how to grow
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && !error && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Our AI will analyze your {context.platform} metrics and provide personalized growth recommendations.
              </p>
              <Button
                onClick={runAnalysis}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze My Account
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
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-purple-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Analyzing your metrics...
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
                  onClick={runAnalysis}
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
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/• /g, '<br>• ')
                      .replace(/(\d)\. /g, '<br>$1. ')
                  }}
                />
              </div>
              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <Button
                  onClick={runAnalysis}
                  variant="outline"
                  size="sm"
                >
                  Regenerate
                </Button>
                <Button
                  onClick={onClose}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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

export default AIAnalysis
