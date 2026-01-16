export interface FormulaDetail {
  name: string
  formula: string
  explanation: string
}

export interface DataSource {
  name: string
  url: string
}

export interface PlatformMethodology {
  howItWorks: string
  formulas: FormulaDetail[]
  assumptions: string[]
  disclaimer: string
  sources: DataSource[]
  lastUpdated: string
  version: string
}

export const methodology: Record<string, PlatformMethodology> = {
  youtube: {
    howItWorks:
      'YouTube revenue is calculated based on your monthly views, CPM (cost per thousand impressions), and YouTube\'s revenue share. Additional income streams include channel memberships, Super Chats from live streams, and the Shorts bonus program.',
    formulas: [
      {
        name: 'Ad Revenue',
        formula: '(monthlyViews / 1000) × CPM × 0.55',
        explanation:
          'Views divided by 1000 gives you thousands of impressions. Multiply by your CPM rate, then by 0.55 because YouTube takes 45% and creators keep 55%.',
      },
      {
        name: 'Memberships',
        formula: 'members × averageMembershipPrice × 0.70',
        explanation:
          'Total members times average membership price ($4.99 default). YouTube takes 30%, creators keep 70%.',
      },
      {
        name: 'Super Chats',
        formula: 'monthlyLiveHours × superChatRate × 0.70',
        explanation:
          'Hours streamed times average Super Chat revenue per hour. YouTube takes 30% of Super Chat revenue.',
      },
      {
        name: 'Shorts Bonus',
        formula: 'shortsViews × shortsRPM',
        explanation:
          'Shorts views times the Shorts RPM (typically $0.01-0.05 per 1000 views, much lower than long-form).',
      },
    ],
    assumptions: [
      'CPM varies significantly by niche ($2-50+) and geography',
      'Default CPM of $4 represents a general content average',
      '45% monetized views assumption (not all views show ads)',
      'Membership pricing at $4.99 tier average',
      'Super Chat rates vary widely by audience engagement',
      'Shorts RPM is significantly lower than long-form content',
    ],
    disclaimer:
      'YouTube earnings vary dramatically based on content niche, audience geography, seasonality, and advertiser demand. Finance and tech niches can see CPMs 5-10x higher than entertainment. Q4 typically sees 20-40% higher CPMs due to holiday advertising.',
    sources: [
      { name: 'YouTube Partner Program Terms', url: 'https://support.google.com/youtube/answer/72857' },
      { name: 'YouTube Revenue Share Policy', url: 'https://support.google.com/youtube/answer/6162278' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  tiktok: {
    howItWorks:
      'TikTok revenue primarily comes from the Creativity Program (formerly Creator Fund), which pays based on qualified video views. Brand deals and affiliate marketing typically generate more income than platform payouts for most creators.',
    formulas: [
      {
        name: 'Creativity Program',
        formula: '(qualifiedViews / 1000) × RPM',
        explanation:
          'Only views on videos over 1 minute from eligible regions count. RPM typically ranges from $0.50-1.00 per 1000 qualified views.',
      },
      {
        name: 'Brand Deals (estimated)',
        formula: 'followers × brandDealRate × dealsPerMonth',
        explanation:
          'Rough estimate based on follower count. Rate per follower varies ($0.01-0.05) based on engagement and niche.',
      },
    ],
    assumptions: [
      'Creativity Program requires 10k+ followers and 100k+ views in 30 days',
      'Only videos 1+ minute qualify for Creativity Program',
      'RPM of $0.50-1.00 based on current creator reports',
      'Brand deal rates vary enormously by niche and engagement',
      'US/UK/EU viewers pay significantly more than other regions',
    ],
    disclaimer:
      'TikTok\'s Creativity Program payouts are notoriously inconsistent and have changed multiple times. Most successful TikTok creators earn the majority of their income from brand deals, not platform payouts. The platform does not publicly share payout formulas.',
    sources: [
      { name: 'TikTok Creativity Program', url: 'https://www.tiktok.com/creators/creator-portal/en-us/getting-paid-to-create/creator-fund/' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  instagram: {
    howItWorks:
      'Instagram monetization comes from Reels bonuses (invite-only program), brand sponsorships, and affiliate marketing. The platform\'s revenue share for creators is more limited compared to YouTube, making sponsorships the primary income source.',
    formulas: [
      {
        name: 'Reels Bonus',
        formula: '(reelsPlays / 1000) × bonusRPM',
        explanation:
          'Reels plays times the bonus RPM. Instagram\'s bonus program is invite-only and rates vary significantly ($0.01-0.10 per 1000 plays).',
      },
      {
        name: 'Sponsored Posts (estimated)',
        formula: 'followers × engagementRate × sponsorRate',
        explanation:
          'Follower count weighted by engagement rate. Higher engagement commands premium rates ($10-100+ per 1000 engaged followers).',
      },
    ],
    assumptions: [
      'Reels bonus program is invite-only and not available to all creators',
      'Bonus rates fluctuate and program has been paused/restarted',
      'Sponsorship rates heavily depend on niche and engagement quality',
      'Story vs Feed vs Reels command different sponsorship rates',
      'Engagement rate is more important than raw follower count',
    ],
    disclaimer:
      'Instagram does not have a transparent monetization program like YouTube. Most creator income comes from brand deals negotiated independently. The Reels bonus program availability and rates change frequently without notice.',
    sources: [
      { name: 'Instagram Monetization', url: 'https://help.instagram.com/353876931432784' },
      { name: 'Instagram Creator Resources', url: 'https://creators.instagram.com/' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  twitter: {
    howItWorks:
      'Twitter/X revenue comes from the ad revenue sharing program (requires X Premium subscription), Subscriptions feature, and tips. The ad revenue program shares a portion of ad revenue from replies to your posts.',
    formulas: [
      {
        name: 'Ad Revenue Share',
        formula: '(impressions / 1000) × adShareRPM',
        explanation:
          'Impressions on posts with ads in replies. RPM is very low ($0.01-0.10) and requires X Premium subscription and 5M+ impressions in 3 months.',
      },
      {
        name: 'Subscriptions',
        formula: 'subscribers × subscriptionPrice × 0.97',
        explanation:
          'Number of paying subscribers times subscription price. X takes only 3% for the first year (then increases).',
      },
    ],
    assumptions: [
      'Ad revenue sharing requires X Premium and 500+ followers',
      'Must have 5M+ impressions in last 3 months to qualify',
      'Ad RPM varies significantly and is generally very low',
      'Subscription feature requires application and approval',
      'X takes 3% in year one, increasing thereafter',
    ],
    disclaimer:
      'Twitter/X\'s ad revenue sharing program requires significant reach and an X Premium subscription. Actual payouts have been inconsistent since the program launched. Most Twitter monetization still comes from external sponsorships and driving traffic to other platforms.',
    sources: [
      { name: 'X Creator Revenue Sharing', url: 'https://help.twitter.com/en/using-x/creator-ads-revenue-sharing' },
      { name: 'X Subscriptions', url: 'https://help.twitter.com/en/using-x/subscriptions' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  facebook: {
    howItWorks:
      'Facebook monetization includes in-stream ads on videos, Stars (virtual tips during live streams), and fan subscriptions. Videos must be at least 1 minute long with 600,000 watch minutes in the last 60 days to qualify.',
    formulas: [
      {
        name: 'In-Stream Ads',
        formula: '(watchMinutes / 1000) × adRPM × 0.55',
        explanation:
          'Total watch minutes times RPM, with Facebook taking 45%. Only videos 1+ minutes with mid-roll ad breaks qualify.',
      },
      {
        name: 'Stars',
        formula: 'starsReceived × 0.01',
        explanation:
          'Each Star is worth $0.01 to the creator. Stars are purchased by viewers and given during live streams.',
      },
      {
        name: 'Subscriptions',
        formula: 'subscribers × subscriptionPrice × 0.70',
        explanation:
          'Monthly subscribers times subscription price. Facebook takes 30% of subscription revenue.',
      },
    ],
    assumptions: [
      'Requires 10,000 followers and 600,000 watch minutes (60 days)',
      'Videos must be 1+ minute for in-stream ad eligibility',
      'RPM varies by content type and audience geography',
      'Stars require viewers to purchase virtual currency first',
      'Subscription tiers range from $0.99 to $99.99',
    ],
    disclaimer:
      'Facebook\'s monetization thresholds are relatively high compared to other platforms. The platform has reduced organic reach significantly, making it harder to hit watch time requirements. Reels monetization is still developing.',
    sources: [
      { name: 'Facebook In-Stream Ads', url: 'https://www.facebook.com/business/help/177272939320821' },
      { name: 'Facebook Stars', url: 'https://www.facebook.com/creators/tools/stars' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  linkedin: {
    howItWorks:
      'LinkedIn monetization is primarily indirect through personal branding, lead generation, and newsletter subscriptions. The platform recently introduced a Creator Fund and native newsletter features. Most LinkedIn revenue comes from business opportunities generated by content.',
    formulas: [
      {
        name: 'Newsletter Sponsorships (estimated)',
        formula: 'newsletterSubscribers × openRate × sponsorCPM',
        explanation:
          'Newsletter subscribers times open rate times sponsor rate. LinkedIn newsletters often command premium B2B rates.',
      },
      {
        name: 'Lead Generation Value (estimated)',
        formula: 'qualifiedLeads × averageContractValue × closeRate',
        explanation:
          'Estimated value of business generated. This varies enormously by industry and service offered.',
      },
    ],
    assumptions: [
      'LinkedIn Creator Mode increases content distribution',
      'B2B audiences command higher sponsorship rates',
      'Newsletter subscribers are highly engaged professionals',
      'Lead generation value depends entirely on your business',
      'No direct platform monetization like ad revenue share',
    ],
    disclaimer:
      'LinkedIn does not have a traditional creator monetization program. Value comes from building professional reputation, generating leads, and growing a newsletter audience. Revenue estimates are highly speculative and depend on your ability to convert attention into business.',
    sources: [
      { name: 'LinkedIn Creator Mode', url: 'https://www.linkedin.com/help/linkedin/answer/a522537' },
      { name: 'LinkedIn Newsletters', url: 'https://www.linkedin.com/help/linkedin/answer/a548492' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  snapchat: {
    howItWorks:
      'Snapchat monetization comes primarily from Spotlight (public short-form videos) which pays creators based on performance. The Spotlight fund distributes money based on engagement metrics for qualifying viral content.',
    formulas: [
      {
        name: 'Spotlight Revenue',
        formula: '(spotlightViews / 1000) × spotlightRPM',
        explanation:
          'Views on Spotlight videos times the effective RPM. Snapchat\'s program pays based on a pool distributed by performance.',
      },
    ],
    assumptions: [
      'Spotlight payments come from a fixed pool distributed by performance',
      'Must be 16+ and meet community guidelines',
      'Viral content receives disproportionately higher payouts',
      'RPM varies significantly based on total creator pool',
      'Content must be original and not from other platforms',
    ],
    disclaimer:
      'Snapchat Spotlight payouts have varied significantly since launch, with early payouts being much higher. The program distributes a fixed pool, so individual earnings depend on competition. Payments are not guaranteed and criteria can change.',
    sources: [
      { name: 'Snapchat Spotlight', url: 'https://support.snapchat.com/en-US/article/spotlight-guidelines' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  pinterest: {
    howItWorks:
      'Pinterest monetization is primarily through affiliate marketing and driving traffic to external sites. The platform offers a Creator Rewards program for Idea Pins and has experimented with creator funds. Most Pinterest income is indirect.',
    formulas: [
      {
        name: 'Affiliate Revenue (estimated)',
        formula: 'outboundClicks × conversionRate × averageCommission',
        explanation:
          'Clicks to affiliate links times conversion rate times average commission per sale.',
      },
      {
        name: 'Creator Rewards',
        formula: 'qualifyingIdeaPins × rewardRate',
        explanation:
          'Idea Pins meeting engagement thresholds times reward rate. Program availability varies by region.',
      },
    ],
    assumptions: [
      'Pinterest is primarily a traffic and discovery platform',
      'Affiliate marketing is the main monetization method',
      'Idea Pins have limited direct monetization currently',
      'Creator Rewards program has specific engagement requirements',
      'Product tags and shopping features enable affiliate income',
    ],
    disclaimer:
      'Pinterest does not have robust direct creator monetization. Most successful Pinterest creators use the platform to drive traffic to blogs, stores, or affiliate offers. The Creator Rewards program is limited in scope and availability.',
    sources: [
      { name: 'Pinterest Creator Resources', url: 'https://business.pinterest.com/creator-resources/' },
      { name: 'Pinterest Creator Rewards', url: 'https://help.pinterest.com/en/article/creator-rewards' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  twitch: {
    howItWorks:
      'Twitch revenue comes from subscriptions (with multiple tiers), Bits (virtual cheering currency), and ad revenue. Partners get better rates than Affiliates. Most successful streamers also earn from sponsorships and donations.',
    formulas: [
      {
        name: 'Subscriptions',
        formula: '(tier1Subs × 2.50) + (tier2Subs × 5.00) + (tier3Subs × 12.50)',
        explanation:
          'Each sub tier has a different price split. Standard Affiliates get 50% ($2.50 of $4.99 Tier 1). Top Partners may negotiate up to 70%.',
      },
      {
        name: 'Bits',
        formula: 'bitsReceived × 0.01',
        explanation:
          'Each Bit is worth $0.01 to the streamer. Viewers purchase Bits at varying rates from Twitch.',
      },
      {
        name: 'Ad Revenue',
        formula: '(adImpressions / 1000) × adCPM × creatorShare',
        explanation:
          'Ad impressions times CPM. Creator share varies; Affiliates get 30%, Partners get 55%.',
      },
    ],
    assumptions: [
      'Affiliate revenue share is 50% for subs, 30% for ads',
      'Partner revenue share is 50-70% for subs, 55% for ads',
      'Bits are always $0.01 per bit to creators',
      'Gift subs count the same as regular subs',
      'Prime subs pay the same as Tier 1 subs',
    ],
    disclaimer:
      'Twitch income varies dramatically based on streaming hours, consistency, and community engagement. Top Partners can negotiate better revenue splits. The platform has reduced revenue splits for new Partners. Sponsorships often exceed platform revenue for larger streamers.',
    sources: [
      { name: 'Twitch Affiliate Agreement', url: 'https://www.twitch.tv/p/legal/affiliate-agreement/' },
      { name: 'Twitch Partner Program', url: 'https://www.twitch.tv/p/partners/' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  kick: {
    howItWorks:
      'Kick offers a more creator-friendly revenue split than Twitch, with 95% of subscription revenue going to creators. The platform also supports tips and has fewer restrictions on content. It\'s backed by gambling company Stake.',
    formulas: [
      {
        name: 'Subscriptions',
        formula: 'subscribers × subscriptionPrice × 0.95',
        explanation:
          'Kick takes only 5% of subscription revenue, giving creators 95%. Subscriptions are $4.99.',
      },
      {
        name: 'Tips',
        formula: 'tipsReceived × 1.00',
        explanation:
          'Creators keep 100% of tips sent through the platform.',
      },
    ],
    assumptions: [
      '95/5 revenue split for subscriptions',
      'Creators keep 100% of tips',
      'Platform is newer with smaller but growing audience',
      'Some creators have exclusive deals with guaranteed minimums',
      'Viewer base skews toward gambling and mature content',
    ],
    disclaimer:
      'Kick is a newer platform with a smaller viewer base than Twitch. While the revenue split is more favorable, discoverability and total earning potential may be lower. The platform is backed by Stake (gambling) which influences its content ecosystem.',
    sources: [
      { name: 'Kick Creator Program', url: 'https://kick.com/creator-program' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },

  newsletter: {
    howItWorks:
      'Newsletter revenue typically comes from paid subscriptions (using platforms like Substack, Beehiiv, or ConvertKit), sponsorships, and affiliate marketing. Revenue scales with subscriber count and engagement rate.',
    formulas: [
      {
        name: 'Paid Subscriptions',
        formula: 'paidSubscribers × monthlyPrice × (1 - platformFee)',
        explanation:
          'Number of paying subscribers times subscription price, minus platform fees (typically 10% for Substack, less for others).',
      },
      {
        name: 'Sponsorships',
        formula: 'totalSubscribers × openRate × sponsorCPM',
        explanation:
          'Total list size times open rate gives you effective reach. Multiply by sponsor CPM (typically $20-50+ for quality lists).',
      },
      {
        name: 'Affiliate Revenue',
        formula: 'clicks × conversionRate × averageCommission',
        explanation:
          'Affiliate link clicks times conversion rate times average commission per sale.',
      },
    ],
    assumptions: [
      'Substack takes 10% of paid subscription revenue',
      'Other platforms may charge flat fees or lower percentages',
      'Sponsorship CPMs vary from $10-100+ based on niche',
      'Open rates typically range from 30-60% for engaged lists',
      'Paid conversion rates are typically 1-10% of free subscribers',
    ],
    disclaimer:
      'Newsletter economics vary dramatically based on niche, audience quality, and monetization strategy. B2B newsletters can command much higher sponsorship rates. Building a paying subscriber base takes significant time and consistent quality content.',
    sources: [
      { name: 'Substack Economics', url: 'https://on.substack.com/p/how-writers-make-money' },
      { name: 'Newsletter Sponsorship Rates', url: 'https://sparklp.co/newsletter-ad-rates/' },
    ],
    lastUpdated: 'January 2025',
    version: 'v1.0',
  },
}

export function getMethodologyByPlatformId(platformId: string): PlatformMethodology | null {
  return methodology[platformId] || null
}

export const glossary: Record<string, string> = {
  CPM: 'Cost Per Mille (thousand). The amount advertisers pay per 1,000 ad impressions.',
  RPM: 'Revenue Per Mille. The amount creators earn per 1,000 views after platform cuts.',
  CTR: 'Click-Through Rate. Percentage of viewers who click on a link or ad.',
  CPC: 'Cost Per Click. Amount paid each time someone clicks an ad.',
  MRR: 'Monthly Recurring Revenue. Predictable monthly income from subscriptions.',
  ARR: 'Annual Recurring Revenue. MRR multiplied by 12.',
  LTV: 'Lifetime Value. Total revenue expected from a subscriber before they cancel.',
  CAC: 'Customer Acquisition Cost. Cost to acquire one new paying subscriber.',
  Churn: 'The rate at which subscribers cancel their subscriptions.',
  'Engagement Rate': 'Percentage of followers who interact with content (likes, comments, shares).',
  Impressions: 'Number of times content is displayed, regardless of clicks.',
  Reach: 'Number of unique users who see your content.',
  'Watch Time': 'Total minutes viewers spend watching your videos.',
  'Retention Rate': 'Percentage of video watched on average by viewers.',
  'Revenue Share': 'The percentage of revenue the platform keeps vs pays to creators.',
  Monetization: 'The process of earning money from content or audience.',
  'Creator Fund': 'A pool of money platforms distribute to creators based on performance.',
  Affiliate: 'Earning commission by promoting other companies\' products.',
  Sponsorship: 'Payment from brands to feature their products in content.',
  'Super Chat': 'YouTube feature allowing viewers to pay for highlighted messages in live chat.',
  Bits: 'Twitch virtual currency viewers purchase to cheer and support streamers.',
  Stars: 'Facebook virtual currency for tipping creators during live streams.',
}
