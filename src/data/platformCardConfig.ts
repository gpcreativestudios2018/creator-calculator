// Platform-specific configuration for dashboard cards
// This ensures each platform shows relevant metrics, not YouTube-specific ones

export interface RevenueStream {
  name: string
  key: string // maps to breakdown object from calculations
  color: string
}

export interface WhatIfScenario {
  label: string
  multiplier: number
  description: string
}

export interface PartnerRequirement {
  metric: string
  inputKey: string
  threshold: number
  label: string
}

export interface PlatformCardConfig {
  // Revenue Streams card
  revenueStreams: RevenueStream[]

  // What If Analysis scenarios
  whatIfScenarios: WhatIfScenario[]

  // Partner Program / Monetization requirements
  partnerRequirements: PartnerRequirement[]
  partnerProgramName: string

  // How You Compare - which metric to use
  compareMetric: 'subscribers' | 'followers' | 'patrons' | 'supporters' | 'members' | 'students' | 'downloads'
  compareMilestones: { value: number; percentile: string }[]
}

// Default milestones for follower-based platforms
const defaultFollowerMilestones = [
  { value: 1000, percentile: 'Top 50%' },
  { value: 10000, percentile: 'Top 20%' },
  { value: 100000, percentile: 'Top 5%' },
  { value: 1000000, percentile: 'Top 1%' },
]

// Smaller milestones for subscription platforms
const subscriptionMilestones = [
  { value: 10, percentile: 'Top 80%' },
  { value: 100, percentile: 'Top 50%' },
  { value: 1000, percentile: 'Top 20%' },
  { value: 10000, percentile: 'Top 5%' },
]

export const platformCardConfigs: Record<string, PlatformCardConfig> = {
  // ========== AD-BASED PLATFORMS ==========
  youtube: {
    revenueStreams: [
      { name: 'Ad Revenue', key: 'AdSense Revenue (55% share)', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Views', multiplier: 2.0, description: 'Double your monthly views' },
      { label: '2x Subscribers', multiplier: 1.3, description: 'Double your subscriber count' },
      { label: '+$2 CPM', multiplier: 1.5, description: 'Higher-paying niche or better retention' },
    ],
    partnerRequirements: [
      { metric: 'Subscribers', inputKey: 'subscribers', threshold: 1000, label: '1,000 subscribers' },
      { metric: 'Monthly Views', inputKey: 'monthlyViews', threshold: 48000, label: '~4,000 watch hours/year (48k views/mo)' },
    ],
    partnerProgramName: 'YouTube Partner Program',
    compareMetric: 'subscribers',
    compareMilestones: defaultFollowerMilestones,
  },

  tiktok: {
    revenueStreams: [
      { name: 'Creator Fund', key: 'Creativity Program Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Views', multiplier: 2.0, description: 'Double your monthly views' },
      { label: '2x Followers', multiplier: 1.2, description: 'Grow your audience' },
      { label: 'Go Viral (10x)', multiplier: 10.0, description: 'A video hits the For You page' },
    ],
    partnerRequirements: [
      { metric: 'Followers', inputKey: 'followers', threshold: 10000, label: '10,000 followers' },
      { metric: 'Views (90 days)', inputKey: 'monthlyViews', threshold: 100000, label: '100,000 views in 90 days' },
    ],
    partnerProgramName: 'TikTok Creativity Program',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  facebook: {
    revenueStreams: [
      { name: 'In-Stream Ads', key: 'In-Stream Ad Revenue (55% share)', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Views', multiplier: 2.0, description: 'Double your video views' },
      { label: '2x Followers', multiplier: 1.2, description: 'Grow your page' },
      { label: 'Reels Focus', multiplier: 1.5, description: 'Shift to short-form content' },
    ],
    partnerRequirements: [
      { metric: 'Followers', inputKey: 'followers', threshold: 10000, label: '10,000 followers' },
      { metric: 'Watch Time', inputKey: 'monthlyViews', threshold: 600000, label: '600,000 minutes watched' },
    ],
    partnerProgramName: 'Facebook In-Stream Ads',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  twitter: {
    revenueStreams: [
      { name: 'Ad Revenue', key: 'Ad Revenue Share', color: '#22C55E' },
      { name: 'Subscriptions', key: 'Subscriptions (97% share)', color: '#3B82F6' },
    ],
    whatIfScenarios: [
      { label: '2x Impressions', multiplier: 2.0, description: 'Double your reach' },
      { label: '2x Followers', multiplier: 1.3, description: 'Grow your audience' },
      { label: 'Viral Thread', multiplier: 5.0, description: 'A thread goes viral' },
    ],
    partnerRequirements: [
      { metric: 'Followers', inputKey: 'followers', threshold: 500, label: '500 followers' },
      { metric: 'Impressions (3mo)', inputKey: 'impressions', threshold: 5000000, label: '5M impressions in 3 months' },
    ],
    partnerProgramName: 'X Premium Revenue Share',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  snapchat: {
    revenueStreams: [
      { name: 'Spotlight', key: 'Spotlight Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Views', multiplier: 2.0, description: 'Double your Spotlight views' },
      { label: '5x Views', multiplier: 5.0, description: 'Content featured by Snap' },
      { label: 'Viral Snap', multiplier: 10.0, description: 'Go viral on Spotlight' },
    ],
    partnerRequirements: [
      { metric: 'Followers', inputKey: 'followers', threshold: 50000, label: '50,000 followers' },
      { metric: 'Spotlight Views', inputKey: 'spotlightViews', threshold: 100000, label: '100,000 Spotlight views' },
    ],
    partnerProgramName: 'Snapchat Spotlight',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  podcast: {
    revenueStreams: [
      { name: 'Sponsorships', key: 'Sponsorship Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Downloads', multiplier: 2.0, description: 'Double your audience' },
      { label: 'Weekly Episodes', multiplier: 1.5, description: 'Increase episode frequency' },
      { label: 'Premium CPM', multiplier: 1.8, description: 'Land higher-paying sponsors' },
    ],
    partnerRequirements: [
      { metric: 'Downloads/Episode', inputKey: 'downloads', threshold: 5000, label: '5,000 downloads per episode' },
    ],
    partnerProgramName: 'Podcast Ad Networks',
    compareMetric: 'downloads',
    compareMilestones: [
      { value: 500, percentile: 'Top 50%' },
      { value: 5000, percentile: 'Top 20%' },
      { value: 50000, percentile: 'Top 5%' },
      { value: 500000, percentile: 'Top 1%' },
    ],
  },

  rumble: {
    revenueStreams: [
      { name: 'Ad Revenue', key: 'Ad Revenue (60% share)', color: '#22C55E' },
      { name: 'Rants', key: 'Rants (90% payout)', color: '#3B82F6' },
    ],
    whatIfScenarios: [
      { label: '2x Views', multiplier: 2.0, description: 'Double your views' },
      { label: 'More Rants', multiplier: 1.5, description: 'Increase tipping engagement' },
      { label: 'Higher CPM', multiplier: 1.4, description: 'Better ad rates' },
    ],
    partnerRequirements: [
      { metric: 'Views', inputKey: 'monthlyViews', threshold: 1000, label: 'Active uploads' },
    ],
    partnerProgramName: 'Rumble Partner Program',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  // ========== SUBSCRIPTION PLATFORMS ==========
  patreon: {
    revenueStreams: [
      { name: 'Pledges', key: 'Gross Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Patrons', multiplier: 2.0, description: 'Double your patron count' },
      { label: '+$3 Avg Pledge', multiplier: 1.6, description: 'Higher tier adoption' },
      { label: 'Reduce Churn', multiplier: 1.2, description: 'Improve retention by 20%' },
    ],
    partnerRequirements: [], // No minimum requirements
    partnerProgramName: 'Patreon Creator',
    compareMetric: 'patrons',
    compareMilestones: subscriptionMilestones,
  },

  onlyfans: {
    revenueStreams: [
      { name: 'Subscriptions', key: 'Subscriptions', color: '#22C55E' },
      { name: 'Tips', key: 'Tips', color: '#3B82F6' },
    ],
    whatIfScenarios: [
      { label: '2x Subscribers', multiplier: 2.0, description: 'Double your sub count' },
      { label: '+$5 Sub Price', multiplier: 1.5, description: 'Increase subscription price' },
      { label: 'More Tips', multiplier: 1.3, description: 'Increase tip engagement' },
    ],
    partnerRequirements: [], // No minimum requirements
    partnerProgramName: 'OnlyFans Creator',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  fansly: {
    revenueStreams: [
      { name: 'Subscriptions', key: 'Subscriptions', color: '#22C55E' },
      { name: 'Tips', key: 'Tips', color: '#3B82F6' },
    ],
    whatIfScenarios: [
      { label: '2x Subscribers', multiplier: 2.0, description: 'Double your sub count' },
      { label: '+$5 Sub Price', multiplier: 1.5, description: 'Increase subscription price' },
      { label: 'More Tips', multiplier: 1.3, description: 'Increase tip engagement' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Fansly Creator',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  fanvue: {
    revenueStreams: [
      { name: 'Subscriptions', key: 'Subscriptions', color: '#22C55E' },
      { name: 'Tips', key: 'Tips', color: '#3B82F6' },
    ],
    whatIfScenarios: [
      { label: '2x Subscribers', multiplier: 2.0, description: 'Double your sub count' },
      { label: '+$5 Sub Price', multiplier: 1.5, description: 'Increase subscription price' },
      { label: 'More Tips', multiplier: 1.3, description: 'Increase tip engagement' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Fanvue Creator',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  twitch: {
    revenueStreams: [
      { name: 'Subscriptions', key: 'subRevenue', color: '#22C55E' },
      { name: 'Bits', key: 'bitsRevenue', color: '#3B82F6' },
      { name: 'Ads', key: 'adRevenue', color: '#F97316' },
    ],
    whatIfScenarios: [
      { label: '2x Subs', multiplier: 2.0, description: 'Double your subscriber count' },
      { label: '2x Viewers', multiplier: 1.5, description: 'Double average viewers' },
      { label: 'More Stream Hours', multiplier: 1.3, description: 'Stream more consistently' },
    ],
    partnerRequirements: [
      { metric: 'Avg Viewers', inputKey: 'avgViewers', threshold: 3, label: '3 average viewers' },
      { metric: 'Hours Streamed', inputKey: 'hoursStreamed', threshold: 8, label: '8 hours streamed in 30 days' },
    ],
    partnerProgramName: 'Twitch Affiliate',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  kick: {
    revenueStreams: [
      { name: 'Subscriptions', key: 'subRevenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Subs', multiplier: 2.0, description: 'Double your subscriber count' },
      { label: '2x Viewers', multiplier: 1.5, description: 'Double average viewers' },
      { label: 'Partner Status', multiplier: 1.2, description: 'Get better rev share' },
    ],
    partnerRequirements: [
      { metric: 'Avg Viewers', inputKey: 'avgViewers', threshold: 5, label: '5 average viewers' },
    ],
    partnerProgramName: 'Kick Creator',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  kofi: {
    revenueStreams: [
      { name: 'Tips', key: 'Tips (after processing)', color: '#22C55E' },
      { name: 'Memberships', key: 'Memberships (after 5% + processing)', color: '#3B82F6' },
    ],
    whatIfScenarios: [
      { label: '2x Supporters', multiplier: 2.0, description: 'Double your supporters' },
      { label: 'Add Memberships', multiplier: 2.5, description: 'Launch recurring memberships' },
      { label: 'Higher Tips', multiplier: 1.4, description: 'Increase average tip amount' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Ko-fi Creator',
    compareMetric: 'supporters',
    compareMilestones: subscriptionMilestones,
  },

  discord: {
    revenueStreams: [
      { name: 'Subscriptions', key: 'Gross Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Members', multiplier: 2.0, description: 'Double your paid members' },
      { label: '+$5 Price', multiplier: 1.5, description: 'Increase membership price' },
      { label: 'Add Tiers', multiplier: 1.3, description: 'Launch premium tiers' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Discord Server Subscriptions',
    compareMetric: 'members',
    compareMilestones: subscriptionMilestones,
  },

  substack: {
    revenueStreams: [
      { name: 'Paid Subscriptions', key: 'Gross Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Free Subs', multiplier: 1.5, description: 'Grow your free list' },
      { label: '2x Paid %', multiplier: 2.0, description: 'Better conversion rate' },
      { label: '+$3 Price', multiplier: 1.4, description: 'Increase subscription price' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Substack Writer',
    compareMetric: 'subscribers',
    compareMilestones: [
      { value: 100, percentile: 'Top 70%' },
      { value: 1000, percentile: 'Top 40%' },
      { value: 10000, percentile: 'Top 10%' },
      { value: 100000, percentile: 'Top 1%' },
    ],
  },

  newsletter: {
    revenueStreams: [
      { name: 'Paid Subscriptions', key: 'Gross Revenue', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Subscribers', multiplier: 1.5, description: 'Grow your list' },
      { label: '2x Paid %', multiplier: 2.0, description: 'Better conversion rate' },
      { label: '+$3 Price', multiplier: 1.4, description: 'Increase subscription price' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Newsletter Creator',
    compareMetric: 'subscribers',
    compareMilestones: [
      { value: 100, percentile: 'Top 70%' },
      { value: 1000, percentile: 'Top 40%' },
      { value: 10000, percentile: 'Top 10%' },
      { value: 100000, percentile: 'Top 1%' },
    ],
  },

  // ========== E-COMMERCE PLATFORMS ==========
  gumroad: {
    revenueStreams: [
      { name: 'Product Sales', key: 'Gross Sales', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Products', multiplier: 2.0, description: 'Double your product catalog' },
      { label: '+$10 Avg Price', multiplier: 1.5, description: 'Increase average price' },
      { label: 'Launch Course', multiplier: 3.0, description: 'Add a premium product' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Gumroad Creator',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  etsy: {
    revenueStreams: [
      { name: 'Product Sales', key: 'Gross Sales', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Orders', multiplier: 2.0, description: 'Double your monthly orders' },
      { label: '+$10 Avg Order', multiplier: 1.5, description: 'Increase average order value' },
      { label: 'Better Margins', multiplier: 1.25, description: 'Improve profit margins' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Etsy Seller',
    compareMetric: 'subscribers',
    compareMilestones: [
      { value: 10, percentile: 'Top 70%' },
      { value: 100, percentile: 'Top 40%' },
      { value: 1000, percentile: 'Top 10%' },
      { value: 10000, percentile: 'Top 1%' },
    ],
  },

  amazon: {
    revenueStreams: [
      { name: 'Commissions', key: 'Commission Earned', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Page Views', multiplier: 2.0, description: 'Double your traffic' },
      { label: '2x Conversion', multiplier: 2.0, description: 'Better product recommendations' },
      { label: 'Higher Commission', multiplier: 1.5, description: 'Promote higher-commission items' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Amazon Associates',
    compareMetric: 'subscribers',
    compareMilestones: subscriptionMilestones,
  },

  teachable: {
    revenueStreams: [
      { name: 'Course Sales', key: 'Gross Sales', color: '#22C55E' },
    ],
    whatIfScenarios: [
      { label: '2x Students', multiplier: 2.0, description: 'Double your enrollment' },
      { label: '+$50 Price', multiplier: 1.5, description: 'Increase course price' },
      { label: 'Add Course', multiplier: 2.0, description: 'Launch another course' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Course Creator',
    compareMetric: 'students',
    compareMilestones: [
      { value: 10, percentile: 'Top 60%' },
      { value: 100, percentile: 'Top 30%' },
      { value: 1000, percentile: 'Top 10%' },
      { value: 10000, percentile: 'Top 1%' },
    ],
  },

  // ========== NO DIRECT MONETIZATION ==========
  instagram: {
    revenueStreams: [
      { name: 'No Direct Revenue', key: 'none', color: '#6B7280' },
    ],
    whatIfScenarios: [
      { label: '2x Followers', multiplier: 1.0, description: 'Instagram has no direct monetization' },
      { label: 'Brand Deals', multiplier: 1.0, description: 'Sponsorships are separate' },
      { label: 'Affiliate Links', multiplier: 1.0, description: 'Use external tools' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Instagram Creator',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  linkedin: {
    revenueStreams: [
      { name: 'No Direct Revenue', key: 'none', color: '#6B7280' },
    ],
    whatIfScenarios: [
      { label: '2x Followers', multiplier: 1.0, description: 'LinkedIn has no direct monetization' },
      { label: 'Lead Gen', multiplier: 1.0, description: 'Convert followers to clients' },
      { label: 'Newsletter', multiplier: 1.0, description: 'Build email list' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'LinkedIn Creator',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  pinterest: {
    revenueStreams: [
      { name: 'No Direct Revenue', key: 'none', color: '#6B7280' },
    ],
    whatIfScenarios: [
      { label: '2x Followers', multiplier: 1.0, description: 'Pinterest has no direct monetization' },
      { label: 'Affiliate Pins', multiplier: 1.0, description: 'Use affiliate links' },
      { label: 'Drive Traffic', multiplier: 1.0, description: 'Send traffic to monetized site' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Pinterest Creator',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },

  threads: {
    revenueStreams: [
      { name: 'No Direct Revenue', key: 'none', color: '#6B7280' },
    ],
    whatIfScenarios: [
      { label: '2x Followers', multiplier: 1.0, description: 'Threads has no monetization yet' },
      { label: 'Build Audience', multiplier: 1.0, description: 'Grow for future monetization' },
      { label: 'Cross-Promote', multiplier: 1.0, description: 'Drive to monetized platforms' },
    ],
    partnerRequirements: [],
    partnerProgramName: 'Threads Creator',
    compareMetric: 'followers',
    compareMilestones: defaultFollowerMilestones,
  },
}

// Helper to get config with fallback
export function getPlatformCardConfig(platformId: string): PlatformCardConfig {
  return platformCardConfigs[platformId] || platformCardConfigs.youtube
}
