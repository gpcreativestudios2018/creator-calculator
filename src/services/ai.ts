// AI Service for Creator Calculator
// Supports OpenAI and Claude APIs

export interface AIConfig {
  provider: 'openai' | 'claude'
  apiKey: string
  model: string
}

// Placeholder config - user will add their API key later
export const aiConfig: AIConfig = {
  provider: 'openai', // or 'claude'
  apiKey: '', // ADD YOUR API KEY HERE
  model: 'gpt-4o-mini', // cost-effective default
}

export interface CreatorContext {
  platform: string
  followers?: number
  subscribers?: number
  monthlyViews?: number
  monthlyRevenue: number
  yearlyRevenue: number
  engagementRate?: number
  niche?: string
  region?: string
}

export interface AIResponse {
  success: boolean
  content: string
  error?: string
}

// Check if AI is configured
export function isAIConfigured(): boolean {
  return aiConfig.apiKey.length > 0
}

// Generic AI call function
export async function callAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  if (!isAIConfigured()) {
    return {
      success: false,
      content: '',
      error: 'API key not configured. Add your API key in src/services/ai.ts',
    }
  }

  try {
    if (aiConfig.provider === 'openai') {
      return await callOpenAI(prompt, systemPrompt)
    } else {
      return await callClaude(prompt, systemPrompt)
    }
  } catch (error) {
    return {
      success: false,
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function callOpenAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${aiConfig.apiKey}`,
    },
    body: JSON.stringify({
      model: aiConfig.model,
      messages: [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        { role: 'user', content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    content: data.choices[0]?.message?.content || '',
  }
}

async function callClaude(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': aiConfig.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: aiConfig.model,
      max_tokens: 1000,
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`)
  }

  const data = await response.json()
  return {
    success: true,
    content: data.content[0]?.text || '',
  }
}

// Mock responses for when API key is not configured
export function getMockResponse(type: string, context: CreatorContext): string {
  const { platform, monthlyRevenue, followers, subscribers } = context
  const audience = followers || subscribers || 0

  switch (type) {
    case 'analysis':
      return `## Growth Analysis for ${platform}

**Current Status:** You're earning $${monthlyRevenue.toLocaleString()}/month with ${audience.toLocaleString()} followers.

**Key Insights:**
- Your engagement could be improved with more consistent posting
- Consider diversifying revenue streams beyond platform payouts
- Your niche has room for sponsorship opportunities

**Quick Wins:**
1. Post at peak hours for your audience
2. Engage with comments within the first hour
3. Collaborate with creators in adjacent niches

*Configure your AI API key for personalized insights.*`

    case 'growth-plan':
      return `## 90-Day Growth Plan for ${platform}

**Goal:** Increase revenue by 50% and grow audience by 25%

**Month 1: Foundation**
- Audit your top 10 performing posts
- Create a content calendar
- Optimize posting schedule

**Month 2: Expansion**
- Launch 2 new content formats
- Reach out to 5 potential collaborators
- Test paid promotion on best content

**Month 3: Monetization**
- Pitch 3 brands for sponsorships
- Create a digital product or membership
- Optimize your media kit

*Configure your AI API key for a personalized plan.*`

    case 'content-ideas':
      return `## Content Ideas for ${platform}

Based on trending topics and your niche:

1. **Behind-the-scenes** - Show your creative process
2. **Tutorial series** - Teach something you're good at
3. **Challenge video** - Participate in trending challenges
4. **Q&A session** - Answer audience questions
5. **Collaboration** - Partner with a complementary creator
6. **Story time** - Share a personal experience
7. **Hot take** - Share an opinion on industry news
8. **Before/after** - Show transformation or progress
9. **Day in the life** - Authentic lifestyle content
10. **Myth busting** - Debunk common misconceptions

*Configure your AI API key for personalized ideas based on your metrics.*`

    case 'optimization':
      return `## Revenue Optimization Tips

**Current:** $${monthlyRevenue.toLocaleString()}/month

**Opportunities:**
- **Sponsorships:** With ${audience.toLocaleString()} followers, you could charge $${Math.round(audience * 0.02)}-$${Math.round(audience * 0.05)} per post
- **Affiliate marketing:** Add 10-20% to your revenue
- **Digital products:** Create templates, presets, or guides
- **Memberships:** Convert 2-5% of audience to paying members

**Priority Actions:**
1. Create a rate card for brand inquiries
2. Join 2-3 affiliate programs in your niche
3. Survey your audience on what they'd pay for

*Configure your AI API key for detailed optimization strategies.*`

    default:
      return 'Configure your AI API key for personalized insights.'
  }
}
