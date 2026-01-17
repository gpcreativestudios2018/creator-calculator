import { useState, useMemo } from 'react'
import { Copy, RefreshCw, Lightbulb, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { platforms } from '@/platforms/registry'

interface BrandPitchGeneratorProps {
  platformId: string
  metrics: {
    followers: number
    views: number
    engagement: number
    monthlyRevenue: number
  }
  theme: 'dark' | 'light'
}

const campaignTypes = [
  { id: 'product-review', label: 'Product Review' },
  { id: 'sponsored-post', label: 'Sponsored Post' },
  { id: 'brand-ambassador', label: 'Brand Ambassador' },
  { id: 'giveaway', label: 'Giveaway' },
  { id: 'affiliate', label: 'Affiliate Partnership' },
  { id: 'other', label: 'Other' },
]

const nicheOptions = [
  { id: 'tech', label: 'Tech' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'finance', label: 'Finance' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'food', label: 'Food' },
  { id: 'travel', label: 'Travel' },
  { id: 'education', label: 'Education' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'other', label: 'Other' },
]

const greetingVariants = [
  'Hi',
  'Hello',
  'Hey',
]

const introVariants = [
  "I'm reaching out because",
  "I wanted to connect because",
  "I'm writing to you because",
]

const closingVariants = [
  "I'd love to explore how we can work together.",
  "I think there's a great opportunity for us to collaborate.",
  "I believe a partnership could be mutually beneficial.",
]

const signOffVariants = [
  'Best regards',
  'Looking forward to hearing from you',
  'Thanks for your time',
]

export default function BrandPitchGenerator({ platformId, metrics, theme }: BrandPitchGeneratorProps) {
  const [creatorName, setCreatorName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [campaignType, setCampaignType] = useState('sponsored-post')
  const [niche, setNiche] = useState('lifestyle')
  const [brandLove, setBrandLove] = useState('')
  const [uniqueValue, setUniqueValue] = useState('')
  const [templateVariant, setTemplateVariant] = useState(0)
  const [copied, setCopied] = useState(false)

  const platform = platforms.find(p => p.id === platformId)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const getCampaignLabel = (id: string) => {
    return campaignTypes.find(c => c.id === id)?.label || 'Sponsored Post'
  }

  const getNicheLabel = (id: string) => {
    return nicheOptions.find(n => n.id === id)?.label || 'Lifestyle'
  }

  const generatedPitch = useMemo(() => {
    const greeting = greetingVariants[templateVariant % greetingVariants.length]
    const intro = introVariants[templateVariant % introVariants.length]
    const closing = closingVariants[templateVariant % closingVariants.length]
    const signOff = signOffVariants[templateVariant % signOffVariants.length]

    const name = creatorName || '[Your Name]'
    const brand = brandName || '[Brand Name]'
    const campaign = getCampaignLabel(campaignType)
    const nicheLabel = getNicheLabel(niche)
    const love = brandLove || "[Why you love the brand - be specific!]"
    const value = uniqueValue || "[What makes you unique as a creator]"

    const estimatedReach = Math.round(metrics.views * (metrics.engagement / 100) * 2)

    return `${greeting} ${brand} Team,

${intro} I've been a huge fan of your brand and I'd love to explore a potential collaboration.

${love}

A bit about me: I'm ${name}, a ${nicheLabel.toLowerCase()} content creator on ${platform?.name || 'social media'} with ${formatNumber(metrics.followers)} followers and an engagement rate of ${metrics.engagement.toFixed(1)}%. My content regularly reaches ${formatNumber(metrics.views)} views, with an estimated reach of ${formatNumber(estimatedReach)} engaged users per post.

${value}

I'm particularly interested in a ${campaign.toLowerCase()} partnership. ${closing}

Would you be open to a quick call to discuss this further? I'm happy to share my media kit with more detailed analytics.

${signOff},
${name}`
  }, [creatorName, brandName, campaignType, niche, brandLove, uniqueValue, templateVariant, metrics, platform])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPitch)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleRegenerate = () => {
    setTemplateVariant(prev => prev + 1)
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader>
        <CardTitle className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Brand Pitch Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="creatorName" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Your Name
            </Label>
            <Input
              id="creatorName"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="Your name or brand"
              className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandName" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Brand Name
            </Label>
            <Input
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Brand you're pitching"
              className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaignType" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Campaign Type
            </Label>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {campaignTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="niche" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Your Niche
            </Label>
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger className={theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white' : ''}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {nicheOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="brandLove" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            What You Love About the Brand ({brandLove.length}/300)
          </Label>
          <textarea
            id="brandLove"
            value={brandLove}
            onChange={(e) => setBrandLove(e.target.value.slice(0, 300))}
            placeholder="I've been using your products for over a year now, and I especially love how..."
            rows={3}
            className={`w-full rounded-md px-3 py-2 text-sm ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                : 'bg-white border-gray-300 text-zinc-900 placeholder:text-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uniqueValue" className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
            Your Unique Value Proposition ({uniqueValue.length}/300)
          </Label>
          <textarea
            id="uniqueValue"
            value={uniqueValue}
            onChange={(e) => setUniqueValue(e.target.value.slice(0, 300))}
            placeholder="What sets me apart is my authentic connection with my audience. I focus on in-depth reviews that..."
            rows={3}
            className={`w-full rounded-md px-3 py-2 text-sm ${
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                : 'bg-white border-gray-300 text-zinc-900 placeholder:text-gray-400'
            } border focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        {/* Generated Pitch Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
              Generated Pitch
            </Label>
            <div className="flex gap-2">
              <button
                onClick={handleRegenerate}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate
              </button>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : theme === 'dark'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg font-mono text-sm whitespace-pre-wrap ${
              theme === 'dark'
                ? 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                : 'bg-gray-50 text-zinc-700 border border-gray-200'
            }`}
          >
            {generatedPitch}
          </div>
        </div>

        {/* Tips Section */}
        <div
          className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-amber-50 border border-amber-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className={`w-5 h-5 ${theme === 'dark' ? 'text-yellow-500' : 'text-amber-600'}`} />
            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Pitch Best Practices
            </h4>
          </div>
          <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Keep it under 200 words</strong> — Decision-makers are busy. Get to the point.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Personalize for each brand</strong> — Generic pitches get ignored. Show you know them.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Include specific metrics</strong> — Numbers build credibility. Share engagement, not just followers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}>•</span>
              <span><strong>Have a clear ask</strong> — End with a specific next step (call, email, media kit).</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
