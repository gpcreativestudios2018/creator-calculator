import { useState } from 'react'
import { Lightbulb, Loader2, AlertCircle, X, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isAIConfigured, callAI, getMockResponse, type CreatorContext } from '@/services/ai'

interface AIContentIdeasProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are a viral content strategist. Generate creative, specific content ideas that match the creator's niche and audience size. Focus on ideas that can realistically go viral or drive engagement. Be specific with hooks and angles, not generic topics.`

function buildContentIdeasPrompt(context: CreatorContext): string {
  return `Generate 10 specific content ideas for this ${context.platform} creator:

Profile:
- Platform: ${context.platform}
- Followers: ${context.followers || context.subscribers || 0}
- Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
- Niche: ${context.niche || 'General'}
- Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}

For each idea, provide:
1. A specific hook/title (not generic)
2. Why it would work for their audience size
3. Best format (short-form, long-form, carousel, etc.)

Focus on ideas that:
- Match current trends on ${context.platform}
- Are achievable for their follower count
- Have viral potential or high engagement likelihood
- Could attract brand deals or monetization`
}

export function AIContentIdeas({ context, theme, onClose }: AIContentIdeasProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateIdeas = async () => {
    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      const mock = getMockResponse('content-ideas', context)
      setResponse(mock)
      setLoading(false)
      return
    }

    const result = await callAI(buildContentIdeasPrompt(context), SYSTEM_PROMPT)

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate content ideas')
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
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            AI Content Ideas
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Get personalized content ideas tailored to your {context.platform} audience
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && !error && (
            <div className="text-center py-8">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100'
              }`}>
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Generate trending content ideas based on your niche, audience size, and platform best practices.
              </p>
              <Button
                onClick={generateIdeas}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Generate Content Ideas
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
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-yellow-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Brainstorming viral content ideas...
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
                  onClick={generateIdeas}
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
                      .replace(/(\d{1,2})\. /g, '<br><span class="text-yellow-500 font-bold">$1.</span> ')
                  }}
                />
              </div>
              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <Button
                  onClick={generateIdeas}
                  variant="outline"
                  size="sm"
                >
                  More Ideas
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
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
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

export default AIContentIdeas
