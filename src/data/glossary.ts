export interface GlossaryTerm {
  term: string
  definition: string
  category: 'revenue' | 'metrics' | 'platforms' | 'business'
  related?: string[]
}

export const glossary: GlossaryTerm[] = [
  {
    term: 'Ad Revenue',
    definition: 'Income earned from advertisements displayed on your content. Platforms share a percentage of what advertisers pay, typically based on impressions or views.',
    category: 'revenue',
    related: ['CPM', 'RPM', 'Impressions'],
  },
  {
    term: 'Affiliate Commission',
    definition: 'Earnings from promoting products or services using unique tracking links. You receive a percentage of each sale made through your link, typically 5-50% depending on the program.',
    category: 'revenue',
    related: ['CTR', 'Conversion Rate'],
  },
  {
    term: 'ARR (Annual Recurring Revenue)',
    definition: 'The yearly value of recurring subscription revenue. Calculated as MRR × 12. A key metric for creators with membership or subscription-based income.',
    category: 'revenue',
    related: ['MRR', 'LTV'],
  },
  {
    term: 'ARPU (Average Revenue Per User)',
    definition: 'Total revenue divided by total users or subscribers. Helps measure how much value each member of your audience generates on average.',
    category: 'revenue',
    related: ['LTV', 'MRR'],
  },
  {
    term: 'Bits (Twitch)',
    definition: 'Virtual currency on Twitch that viewers purchase and use to cheer for streamers. Creators earn $0.01 per Bit. Viewers buy 100 Bits for ~$1.40, with Twitch taking a cut.',
    category: 'platforms',
    related: ['Super Chat', 'Creator Fund'],
  },
  {
    term: 'Brand Deal',
    definition: 'A paid partnership where a company pays you to create content featuring their product or service. Rates vary widely based on audience size, engagement, and niche.',
    category: 'revenue',
    related: ['Sponsorship', 'Media Kit', 'Rate Card'],
  },
  {
    term: 'Channel Membership',
    definition: 'A subscription feature allowing fans to pay monthly for exclusive perks like badges, emotes, and members-only content. Available on YouTube, Twitch, and other platforms.',
    category: 'platforms',
    related: ['MRR', 'Churn Rate'],
  },
  {
    term: 'Churn Rate',
    definition: 'The percentage of subscribers who cancel their subscription in a given period. A 5% monthly churn means you lose 5% of subscribers each month. Lower is better.',
    category: 'metrics',
    related: ['Retention Rate', 'MRR'],
  },
  {
    term: 'Conversion Rate',
    definition: 'The percentage of people who take a desired action (like purchasing or subscribing) out of total visitors. A 2% conversion rate means 2 out of 100 visitors convert.',
    category: 'metrics',
    related: ['CTR', 'Affiliate Commission'],
  },
  {
    term: 'CPM (Cost Per Mille)',
    definition: 'The amount advertisers pay per 1,000 ad impressions. Higher CPM means advertisers pay more to reach your audience. Varies by niche, geography, and season.',
    category: 'revenue',
    related: ['RPM', 'Ad Revenue', 'Impressions'],
  },
  {
    term: 'Creator Fund',
    definition: 'A pool of money platforms set aside to pay creators based on performance metrics like views or engagement. Examples include TikTok Creator Fund and YouTube Shorts Fund.',
    category: 'platforms',
    related: ['Ad Revenue', 'Partner Program'],
  },
  {
    term: 'Creator Program',
    definition: 'Official programs that allow creators to earn money on platforms. Requirements vary but typically include minimum follower counts and content guidelines.',
    category: 'platforms',
    related: ['Partner Program', 'Monetization Threshold'],
  },
  {
    term: 'CTR (Click-Through Rate)',
    definition: 'The percentage of people who click on a link or thumbnail out of total impressions. A 5% CTR means 5 out of 100 viewers clicked. Higher CTR indicates compelling content.',
    category: 'metrics',
    related: ['Impressions', 'Conversion Rate'],
  },
  {
    term: 'Deliverables',
    definition: 'The specific content pieces you agree to create for a brand deal. Examples: 1 YouTube video, 3 Instagram Stories, 2 TikToks. Always clarify deliverables before signing contracts.',
    category: 'business',
    related: ['Brand Deal', 'Usage Rights'],
  },
  {
    term: 'Engagement Rate',
    definition: 'A measure of how actively your audience interacts with your content. Calculated as (likes + comments + shares) ÷ total followers × 100. Higher engagement often leads to better monetization.',
    category: 'metrics',
    related: ['Reach', 'Impressions'],
  },
  {
    term: 'Exclusivity',
    definition: 'A contract clause preventing you from working with competing brands for a specified period. Exclusivity commands higher rates but limits future opportunities.',
    category: 'business',
    related: ['Brand Deal', 'Usage Rights'],
  },
  {
    term: 'Gross vs Net',
    definition: 'Gross revenue is total earnings before deductions. Net revenue is what you keep after platform fees, taxes, and expenses. A $10,000 gross deal might net you $6,000-7,000.',
    category: 'business',
    related: ['Ad Revenue', 'Brand Deal'],
  },
  {
    term: 'Impressions',
    definition: 'The total number of times your content is displayed, regardless of whether it was clicked or watched. One person seeing your content twice counts as two impressions.',
    category: 'metrics',
    related: ['Reach', 'CPM', 'CTR'],
  },
  {
    term: 'LTV (Lifetime Value)',
    definition: 'The total revenue you can expect from a single subscriber over their entire relationship with you. Calculated as ARPU × average subscription length.',
    category: 'revenue',
    related: ['ARPU', 'Churn Rate', 'MRR'],
  },
  {
    term: 'Media Kit',
    definition: 'A document showcasing your audience demographics, engagement rates, past brand work, and rates. Essential for pitching to brands and negotiating deals professionally.',
    category: 'business',
    related: ['Rate Card', 'Brand Deal'],
  },
  {
    term: 'Monetization Threshold',
    definition: 'Minimum requirements to earn money on a platform. YouTube requires 1,000 subscribers + 4,000 watch hours. TikTok requires 10,000 followers + 100,000 views in 30 days.',
    category: 'platforms',
    related: ['Partner Program', 'Creator Program'],
  },
  {
    term: 'MRR (Monthly Recurring Revenue)',
    definition: 'Predictable monthly income from subscriptions, memberships, or retainer clients. More stable than one-time payments. A key metric for sustainable creator businesses.',
    category: 'revenue',
    related: ['ARR', 'Channel Membership', 'Churn Rate'],
  },
  {
    term: 'Partner Program',
    definition: 'Premium creator programs with enhanced monetization features. YouTube Partner Program, Twitch Partner, etc. Usually requires meeting higher thresholds than basic creator programs.',
    category: 'platforms',
    related: ['Creator Program', 'Monetization Threshold'],
  },
  {
    term: 'Rate Card',
    definition: 'A pricing sheet listing your fees for different types of sponsored content. Example: Instagram Post - $500, YouTube Integration - $2,000, Full Video - $5,000.',
    category: 'business',
    related: ['Media Kit', 'Brand Deal'],
  },
  {
    term: 'Reach',
    definition: 'The total number of unique users who see your content. Unlike impressions, reach counts each person only once regardless of how many times they view your content.',
    category: 'metrics',
    related: ['Impressions', 'Engagement Rate'],
  },
  {
    term: 'Retention Rate',
    definition: 'The percentage of viewers who continue watching your content or subscribers who stay subscribed. Higher retention signals quality content and leads to better algorithmic performance.',
    category: 'metrics',
    related: ['Churn Rate', 'Watch Time'],
  },
  {
    term: 'RPM (Revenue Per Mille)',
    definition: 'Your actual earnings per 1,000 views after the platform takes its cut. Lower than CPM because platforms typically keep 30-55% of ad revenue. The number that matters for creators.',
    category: 'revenue',
    related: ['CPM', 'Ad Revenue'],
  },
  {
    term: 'Sponsorship',
    definition: 'Paid promotion of a brand, product, or service within your content. Can be integrated (within content) or dedicated (entire video about the sponsor). Typically pays more than ad revenue.',
    category: 'revenue',
    related: ['Brand Deal', 'Deliverables'],
  },
  {
    term: 'Super Chat / Super Thanks',
    definition: 'YouTube features allowing viewers to pay to highlight their messages during livestreams (Super Chat) or on regular videos (Super Thanks). Creators keep 70% after platform fees.',
    category: 'platforms',
    related: ['Bits', 'Channel Membership'],
  },
  {
    term: 'Usage Rights',
    definition: 'Terms defining how a brand can use your sponsored content beyond your own channels. Unlimited usage rights (ads, billboards, etc.) should command significantly higher fees.',
    category: 'business',
    related: ['Brand Deal', 'Exclusivity', 'Deliverables'],
  },
  {
    term: 'Watch Time',
    definition: 'Total minutes viewers spend watching your content. A critical metric for YouTube monetization and algorithmic ranking. More important than view count for long-form content.',
    category: 'metrics',
    related: ['Retention Rate', 'Impressions'],
  },
]

export function getGlossaryByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return glossary.filter(term => term.category === category)
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase()
  return glossary.filter(
    term =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
  )
}
