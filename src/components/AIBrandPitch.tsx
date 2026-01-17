import { useState } from 'react'
import { Mail, Loader2, AlertCircle, X, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { isAIConfigured, callAI, type CreatorContext } from '@/services/ai'

interface AIBrandPitchProps {
  context: CreatorContext
  theme: 'dark' | 'light'
  onClose: () => void
}

const SYSTEM_PROMPT = `You are an expert at writing brand partnership pitches for content creators. Write professional, compelling outreach emails that highlight the creator's value proposition. Be concise, confident, and specific about what the creator offers. Avoid being generic or salesy.`

function buildBrandPitchPrompt(context: CreatorContext, brandName: string, productType: string): string {
  return `Write a brand partnership pitch email for this creator to send to ${brandName}:

Creator Profile:
- Platform: ${context.platform}
- Followers/Subscribers: ${context.followers || context.subscribers || 0}
- Monthly Views: ${context.monthlyViews || 'N/A'}
- Engagement Rate: ${context.engagementRate?.toFixed(1) || 'N/A'}%
- Niche: ${context.niche || 'General'}
- Estimated Monthly Revenue: $${context.monthlyRevenue.toFixed(2)}

Brand Info:
- Brand Name: ${brandName}
- Product/Service Type: ${productType}

Write a pitch that:
1. Has a compelling subject line
2. Opens with a hook (not "I'm reaching out...")
3. Quickly establishes credibility with specific numbers
4. Explains why this partnership makes sense
5. Proposes specific collaboration ideas
6. Ends with a clear call to action

Keep it under 200 words. Be professional but personable.`
}

function getMockBrandPitch(context: CreatorContext, brandName: string): string {
  const audience = context.followers || context.subscribers || 0
  return `**Subject:** Partnership Idea: ${context.platform} Creator x ${brandName}

Hi ${brandName} Team,

Your recent campaign caught my attention—it's exactly the kind of authentic content my ${audience.toLocaleString()} followers engage with.

**Quick stats:**
- ${audience.toLocaleString()} engaged followers on ${context.platform}
- ${context.engagementRate?.toFixed(1) || '5'}% engagement rate (2x platform average)
- ${context.niche || 'Lifestyle'} niche with purchasing intent

**Partnership ideas:**
1. Dedicated product review/tutorial
2. "Day in my life" integration
3. Giveaway collaboration to boost both our audiences

I've helped similar brands see 3-5x ROI on creator partnerships. Happy to share case studies and my media kit.

Would you be open to a quick 15-minute call this week?

Best,
[Your Name]

---
*Configure your AI API key for personalized pitches.*`
}

export function AIBrandPitch({ context, theme, onClose }: AIBrandPitchProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [brandName, setBrandName] = useState('')
  const [productType, setProductType] = useState('')

  const generatePitch = async () => {
    if (!brandName.trim()) {
      setError('Please enter a brand name')
      return
    }

    setLoading(true)
    setError(null)

    if (!isAIConfigured()) {
      const mock = getMockBrandPitch(context, brandName)
      setResponse(mock)
      setLoading(false)
      return
    }

    const result = await callAI(
      buildBrandPitchPrompt(context, brandName, productType || 'general products'),
      SYSTEM_PROMPT
    )

    if (result.success) {
      setResponse(result.content)
    } else {
      setError(result.error || 'Failed to generate pitch')
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
            <Mail className="w-5 h-5 text-blue-500" />
            AI Brand Pitch Writer
          </CardTitle>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Generate professional brand partnership outreach emails
          </p>
        </CardHeader>

        <CardContent className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {!response && !loading && (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="space-y-4">
                  <div>
                    <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                      Brand Name *
                    </Label>
                    <Input
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g., Nike, Notion, Skillshare"
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                  <div>
                    <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                      Product/Service Type (optional)
                    </Label>
                    <Input
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      placeholder="e.g., productivity software, fitness apparel"
                      className={`mt-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className={`p-3 rounded-lg flex items-center gap-2 ${
                  theme === 'dark' ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'
                }`}>
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="text-center">
                <Button
                  onClick={generatePitch}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Generate Pitch Email
                </Button>
                {!isAIConfigured() && (
                  <p className={`mt-4 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    Demo mode — Add API key in src/services/ai.ts for live AI
                  </p>
                )}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 mx-auto mb-4 text-blue-500 animate-spin" />
              <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                Crafting your pitch for {brandName}...
              </p>
            </div>
          )}

          {response && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div
                  className={`whitespace-pre-wrap ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                  dangerouslySetInnerHTML={{
                    __html: response
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/• /g, '<br>• ')
                      .replace(/(\d)\. /g, '<br>$1. ')
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setResponse(null)}
                  variant="outline"
                  size="sm"
                >
                  New Pitch
                </Button>
                <Button
                  onClick={generatePitch}
                  variant="outline"
                  size="sm"
                >
                  Regenerate
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(response.replace(/\*\*/g, '').replace(/<[^>]*>/g, ''))
                  }}
                  variant="outline"
                  size="sm"
                >
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={onClose}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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

export default AIBrandPitch
