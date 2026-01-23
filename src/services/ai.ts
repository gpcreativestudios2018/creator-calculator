// AI Service for Creator Calculator
// Uses Supabase Edge Function to securely call OpenAI

import { supabase } from '@/lib/supabase'

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

// Check if user has Pro subscription
export async function isProUser(): Promise<boolean> {
  if (!supabase) return false

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  // Check for lifetime promo redemption first
  const { data: promoData } = await supabase
    .from('promo_redemptions')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (promoData) return true

  // Check for active subscription in subscriptions table
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single()

  return subscription?.status === 'active'
}

// Call AI via Supabase Edge Function
export async function callAI(prompt: string, systemPrompt?: string): Promise<AIResponse> {
  try {
    if (!supabase) {
      return {
        success: false,
        content: '',
        error: 'Supabase not initialized',
      }
    }

    // Check if user is Pro
    const isPro = await isProUser()
    if (!isPro) {
      return {
        success: false,
        content: '',
        error: 'AI features require a Pro subscription',
      }
    }

    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { prompt, systemPrompt, maxTokens: 1000 }
    })

    if (error) {
      return {
        success: false,
        content: '',
        error: error.message,
      }
    }

    return {
      success: data.success,
      content: data.content || '',
      error: data.error,
    }
  } catch (error) {
    return {
      success: false,
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// For backwards compatibility - always returns true now since we check Pro status in callAI
export function isAIConfigured(): boolean {
  return true
}

// Mock responses for free users or when showing previews
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

*🔒 Upgrade to Pro for personalized AI-powered insights.*`

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

*🔒 Upgrade to Pro for a personalized plan.*`

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

*🔒 Upgrade to Pro for personalized ideas based on your metrics.*`

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

*🔒 Upgrade to Pro for detailed optimization strategies.*`

    case 'brand-pitch':
      return `## Brand Pitch Template

**Subject:** Partnership Opportunity - [Your Name] x [Brand]

Hi [Brand Contact],

I'm [Your Name], a ${platform} creator with ${audience.toLocaleString()} engaged followers in the [niche] space.

I've been a fan of [Brand] and think there's a natural fit for collaboration...

[Pitch details would go here]

Looking forward to exploring this!

Best,
[Your Name]

*🔒 Upgrade to Pro for AI-generated personalized pitches.*`

    default:
      return '*🔒 Upgrade to Pro for AI-powered insights.*'
  }
}
