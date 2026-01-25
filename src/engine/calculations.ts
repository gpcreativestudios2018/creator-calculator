export interface CalculationResult {
  monthlyRevenue: number
  yearlyRevenue: number
  breakdown?: Record<string, number>
  engagementRate?: number
  growthRate?: number
}

export function calculateYouTube(subscribers: number, monthlyViews: number, cpm: number): CalculationResult {
  // YouTube Partner Program requirements: 1k subs + 4k watch hours (or 10M Shorts views)
  // AdSense revenue: 55% to creator
  // CPM varies by niche: $1-$30, finance/tech highest
  const qualifiesForPartner = subscribers >= 1000
  const adRevenue = qualifiesForPartner
    ? (monthlyViews / 1000) * cpm * 0.55
    : 0
  const engagementRate = subscribers > 0 ? (monthlyViews / subscribers) * 100 / 30 : 0

  return {
    monthlyRevenue: adRevenue,
    yearlyRevenue: adRevenue * 12,
    breakdown: {
      'AdSense Revenue (55% share)': adRevenue,
      'Meets 1k Sub Requirement': qualifiesForPartner ? 1 : 0,
    },
    engagementRate,
    growthRate: 8.2,
  }
}

export function calculateTikTok(followers: number, monthlyViews: number, engagementRate: number): CalculationResult {
  // TikTok Creativity Program: ~$0.50-$1.00 RPM (using $0.70 average)
  // Requirements: 10k followers, 100k views in 30 days, 18+, US/UK/EU/BR
  const qualifiesForProgram = followers >= 10000 && monthlyViews >= 100000
  const creativityProgramRevenue = qualifiesForProgram
    ? (monthlyViews / 1000) * 0.70
    : 0

  return {
    monthlyRevenue: creativityProgramRevenue,
    yearlyRevenue: creativityProgramRevenue * 12,
    breakdown: {
      'Creativity Program Revenue': creativityProgramRevenue,
      'Meets Requirements': qualifiesForProgram ? 1 : 0,
    },
    engagementRate,
    growthRate: 12.5,
  }
}

export function calculateInstagram(followers: number, avgLikes: number, postsPerMonth: number): CalculationResult {
  // Instagram Reels Bonus: Invite-only, inconsistent, being phased out
  // Instagram Subscriptions: 10k+ followers required, $0.99-$99.99/month tiers
  // No reliable direct monetization for most creators
  // This shows engagement metrics only - brand deals are external
  const engagementRate = followers > 0 ? (avgLikes / followers) * 100 : 0

  return {
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    breakdown: {
      'Platform Payouts': 0,
      'Avg Likes': avgLikes,
      'Posts/Month': postsPerMonth,
    },
    engagementRate,
    growthRate: 5.3,
  }
}

export function calculateTwitter(followers: number, impressions: number, subscribers: number): CalculationResult {
  // X/Twitter Ad Revenue Share requirements: X Premium subscriber, 500+ followers, 5M impressions in 3 months
  // RPM: ~$0.15-$0.25 per 1k impressions (using $0.20)
  // Subscriptions: Creator keeps ~97% after X's 3% cut
  const qualifiesForAds = followers >= 500 && impressions >= 1666667 // ~5M / 3 months
  const adRevenue = qualifiesForAds
    ? (impressions / 1000) * 0.20
    : 0
  const subRevenue = subscribers * 2.91 // $2.99 sub * 97% creator share
  const monthlyRevenue = adRevenue + subRevenue
  const engagementRate = followers > 0 ? (impressions / followers) * 100 / 30 : 0

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Ad Revenue Share': adRevenue,
      'Subscriptions (97% share)': subRevenue,
      'Meets Ad Requirements': qualifiesForAds ? 1 : 0,
    },
    engagementRate,
    growthRate: 3.1,
  }
}

export function calculateFacebook(followers: number, monthlyViews: number): CalculationResult {
  // Facebook In-Stream Ads requirements: 10k followers + 600k watch minutes (past 60 days)
  // Pays per 1,000 ad views (CPM), not watch minutes
  // CPM range: $1-$3, using $2.00 average
  // Creator gets 55% of ad revenue
  const qualifiesForAds = followers >= 10000
  const adRevenue = qualifiesForAds
    ? (monthlyViews / 1000) * 2.00 * 0.55
    : 0
  const engagementRate = followers > 0 ? (monthlyViews / followers) * 100 : 0

  return {
    monthlyRevenue: adRevenue,
    yearlyRevenue: adRevenue * 12,
    breakdown: {
      'In-Stream Ad Revenue (55% share)': adRevenue,
      'Meets 10k Follower Requirement': qualifiesForAds ? 1 : 0,
    },
    engagementRate,
    growthRate: 2.8,
  }
}

export function calculateLinkedIn(followers: number, newsletterSubs: number): CalculationResult {
  // LinkedIn has NO direct creator monetization program
  // This calculator shows potential reach metrics only
  // Revenue must come from external sources (consulting, courses, jobs)
  const engagementRate = followers > 0 ? (newsletterSubs / followers) * 100 : 0

  return {
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    breakdown: {
      'Platform Payouts': 0,
      'Newsletter Subscribers': newsletterSubs,
    },
    engagementRate,
    growthRate: 6.7,
  }
}

export function calculateSnapchat(followers: number, spotlightViews: number): CalculationResult {
  // Snapchat Spotlight requirements: 50k followers, 25M monthly Snap views, 18+
  // Actual RPM varies: ~$0.10-$0.50 per 1k views (using $0.25 average)
  const qualifiesForSpotlight = followers >= 50000
  const spotlightRevenue = qualifiesForSpotlight
    ? (spotlightViews / 1000) * 0.25
    : 0
  const engagementRate = followers > 0 ? (spotlightViews / followers) * 100 : 0

  return {
    monthlyRevenue: spotlightRevenue,
    yearlyRevenue: spotlightRevenue * 12,
    breakdown: {
      'Spotlight Revenue': spotlightRevenue,
      'Meets 50k Requirement': qualifiesForSpotlight ? 1 : 0,
    },
    engagementRate,
    growthRate: 4.2,
  }
}

export function calculatePinterest(followers: number, monthlyViews: number, ideaPins: number): CalculationResult {
  // Pinterest Creator Rewards program ENDED November 2022
  // No direct platform monetization exists
  // Revenue comes from affiliate links and driving traffic to external sites
  const engagementRate = followers > 0 ? (monthlyViews / followers) * 100 : 0

  return {
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    breakdown: {
      'Platform Payouts': 0,
      'Monthly Views': monthlyViews,
      'Idea Pins': ideaPins,
    },
    engagementRate,
    growthRate: 3.5,
  }
}

export function calculateTwitch(subscribers: number, avgViewers: number, hoursStreamed: number): CalculationResult {
  const subRevenue = subscribers * 2.5 // $2.50 per sub avg
  const adRevenue = avgViewers * hoursStreamed * 0.02
  const bitsRevenue = avgViewers * 0.5
  const monthlyRevenue = subRevenue + adRevenue + bitsRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (avgViewers / subscribers) * 100,
    growthRate: 7.8,
  }
}

export function calculateKick(subscribers: number, avgViewers: number): CalculationResult {
  const subRevenue = subscribers * 4.5 // 95% payout
  const monthlyRevenue = subRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (avgViewers / (subscribers || 1)) * 100,
    growthRate: 15.2,
  }
}

export function calculateNewsletter(subscribers: number, paidPercent: number, monthlyPrice: number, platformFee: number = 10): CalculationResult {
  // Generic newsletter calculator for any platform
  // Common platforms: Substack (10%), Beehiiv (0-3%), Ghost (0%), ConvertKit (0-3%)
  // User inputs their platform fee % (default 10%)
  // Processing fees (~3%) added on top
  const paidSubs = Math.floor(subscribers * (paidPercent / 100))
  const grossRevenue = paidSubs * monthlyPrice
  const platformFees = grossRevenue * (platformFee / 100)
  const processingFees = grossRevenue * 0.03
  const totalFees = platformFees + processingFees
  const monthlyRevenue = grossRevenue - totalFees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Revenue': grossRevenue,
      'Platform Fee': -platformFees,
      'Processing (~3%)': -processingFees,
    },
    engagementRate: paidPercent,
    growthRate: 9.1,
  }
}

// Patreon: Memberships (Patreon takes ~8-12% fee, we'll use 10%)
export function calculatePatreon(patrons: number, avgPledge: number): CalculationResult {
  // Patreon fees: 8-12% platform fee (using 10%) + ~5% payment processing
  // Total fees: ~15%, creator keeps ~85%
  // No minimum patron requirement
  const grossRevenue = patrons * avgPledge
  const platformFee = grossRevenue * 0.10
  const processingFee = grossRevenue * 0.05
  const totalFees = platformFee + processingFee
  const monthlyRevenue = grossRevenue - totalFees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Revenue': grossRevenue,
      'Platform Fee (10%)': -platformFee,
      'Processing Fee (~5%)': -processingFee,
    },
    engagementRate: patrons > 0 ? Math.min((avgPledge / 5) * 100, 100) : 0,
    growthRate: 3.0,
  }
}

// Ko-fi: Tips + Memberships (Ko-fi takes 0% on tips for free tier, 5% on memberships)
export function calculateKofi(supporters: number, avgTip: number, members: number, memberPrice: number): CalculationResult {
  // Ko-fi: 0% platform fee on tips (free tier), 5% on memberships
  // Payment processing: ~3% on everything (PayPal/Stripe)
  // No minimum payout
  const tipGross = supporters * avgTip
  const tipProcessing = tipGross * 0.03
  const tipRevenue = tipGross - tipProcessing

  const membershipGross = members * memberPrice
  const membershipFee = membershipGross * 0.05
  const membershipProcessing = membershipGross * 0.03
  const membershipRevenue = membershipGross - membershipFee - membershipProcessing

  const monthlyRevenue = tipRevenue + membershipRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Tips (after processing)': tipRevenue,
      'Memberships (after 5% + processing)': membershipRevenue,
    },
    engagementRate: (supporters + members) > 0 ? Math.min(((supporters + members) / 100) * 10, 100) : 0,
    growthRate: 2.5,
  }
}

// Gumroad: Digital products (Gumroad takes 10% flat fee)
export function calculateGumroad(products: number, avgPrice: number): CalculationResult {
  // Gumroad fees: 10% flat + $0.50 per transaction + ~3% payment processing
  // No monthly fees, no minimum sales
  const grossRevenue = products * avgPrice
  const platformFee = grossRevenue * 0.10
  const transactionFees = products * 0.50
  const processingFee = grossRevenue * 0.03
  const totalFees = platformFee + transactionFees + processingFee
  const monthlyRevenue = grossRevenue - totalFees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Sales': grossRevenue,
      'Platform Fee (10%)': -platformFee,
      'Transaction Fees ($0.50 each)': -transactionFees,
      'Processing (~3%)': -processingFee,
    },
    engagementRate: products > 0 ? Math.min((products / 50) * 100, 100) : 0,
    growthRate: 4.0,
  }
}

// Podcast: Sponsorships based on downloads
export function calculatePodcast(downloads: number, episodes: number, cpm: number): CalculationResult {
  const downloadsPerEpisode = episodes > 0 ? downloads / episodes : 0
  const sponsorRevenue = (downloads / 1000) * cpm
  const monthlyRevenue = sponsorRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Sponsorship Revenue': sponsorRevenue,
      'Downloads/Episode': downloadsPerEpisode,
    },
    engagementRate: downloadsPerEpisode > 0 ? Math.min((downloadsPerEpisode / 1000) * 10, 100) : 0,
    growthRate: 5.0,
  }
}

// Courses (Teachable, Kajabi, etc.)
export function calculateCourses(students: number, coursePrice: number, platformFee: number): CalculationResult {
  // Course platforms: Teachable, Kajabi, Thinkific, etc.
  // Platform fees vary: 0-10% depending on plan
  // Payment processing: ~3% on all platforms (Stripe/PayPal)
  const grossRevenue = students * coursePrice
  const platformFees = grossRevenue * (platformFee / 100)
  const processingFees = grossRevenue * 0.03
  const totalFees = platformFees + processingFees
  const monthlyRevenue = grossRevenue - totalFees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Sales': grossRevenue,
      'Platform Fee': -platformFees,
      'Processing (~3%)': -processingFees,
    },
    engagementRate: students > 0 ? Math.min((students / 20) * 100, 100) : 0,
    growthRate: 4.5,
  }
}

// OnlyFans (takes 20% platform fee)
export function calculateOnlyFans(subscribers: number, subPrice: number, tipsPercent: number): CalculationResult {
  const subRevenue = subscribers * subPrice
  const tipRevenue = subRevenue * (tipsPercent / 100)
  const grossRevenue = subRevenue + tipRevenue
  const platformFee = grossRevenue * 0.20
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Subscriptions': subRevenue,
      'Tips': tipRevenue,
      'Platform Fee (20%)': -platformFee,
    },
    engagementRate: subscribers > 0 ? Math.min((tipsPercent / 20) * 100, 100) : 0,
    growthRate: 5.0,
  }
}

// Etsy (profit after all costs)
export function calculateEtsy(orders: number, avgOrder: number, profitMargin: number): CalculationResult {
  // Etsy fees breakdown:
  // - Listing fee: $0.20 per item
  // - Transaction fee: 6.5% of order total
  // - Payment processing: 3% + $0.25 per transaction
  // User inputs their profit margin AFTER all costs
  const grossRevenue = orders * avgOrder
  const listingFees = orders * 0.20
  const transactionFees = grossRevenue * 0.065
  const processingFees = (grossRevenue * 0.03) + (orders * 0.25)
  const totalEtsyFees = listingFees + transactionFees + processingFees
  const revenueAfterFees = grossRevenue - totalEtsyFees
  // Apply user's profit margin (accounts for product costs, shipping, etc.)
  const monthlyRevenue = revenueAfterFees * (profitMargin / 100)

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Sales': grossRevenue,
      'Listing Fees ($0.20/item)': -listingFees,
      'Transaction Fee (6.5%)': -transactionFees,
      'Processing (3% + $0.25)': -processingFees,
      'Your Profit': monthlyRevenue,
    },
    engagementRate: orders > 0 ? Math.min((orders / 30) * 100, 100) : 0,
    growthRate: 3.5,
  }
}

// Amazon Influencer Program
export function calculateAmazon(pageViews: number, conversionRate: number, avgCommission: number): CalculationResult {
  // Amazon Influencer Program
  // User inputs their average commission per sale (varies by category 1-10%)
  // No minimum follower requirement
  // Payment delay: 60 days after month end
  const conversions = pageViews * (conversionRate / 100)
  const monthlyRevenue = conversions * avgCommission

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Storefront Views': pageViews,
      'Conversions': conversions,
      'Commission Earned': monthlyRevenue,
    },
    engagementRate: conversionRate,
    growthRate: 3.0,
  }
}

// Fansly (takes 20% platform fee, same as OnlyFans)
export function calculateFansly(subscribers: number, subPrice: number, tipsPercent: number): CalculationResult {
  const subRevenue = subscribers * subPrice
  const tipRevenue = subRevenue * (tipsPercent / 100)
  const grossRevenue = subRevenue + tipRevenue
  const platformFee = grossRevenue * 0.20
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Subscriptions': subRevenue,
      'Tips': tipRevenue,
      'Platform Fee (20%)': -platformFee,
    },
    engagementRate: subscribers > 0 ? Math.min((tipsPercent / 20) * 100, 100) : 0,
    growthRate: 8.0,
  }
}

// Threads (brand deals based on engagement)
export function calculateThreads(followers: number, avgLikes: number, postsPerMonth: number): CalculationResult {
  // Threads creator bonus program ENDED July 2025
  // No direct platform monetization exists
  // Revenue comes from brand deals, affiliates, driving traffic (all external)
  const engagementRate = followers > 0 ? (avgLikes / followers) * 100 : 0

  return {
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    breakdown: {
      'Platform Payouts': 0,
      'Avg Likes': avgLikes,
      'Posts/Month': postsPerMonth,
    },
    engagementRate,
    growthRate: 15.0,
  }
}

// Discord (server subscriptions, 10% platform fee)
export function calculateDiscord(subscribers: number, subPrice: number): CalculationResult {
  // Discord Server Subscriptions: 10% platform fee + Stripe processing (~3%)
  // US-only, requires 18+, good standing
  // Subscription range: $2.99-$199.99/month
  // Minimum payout: $100 first, $25 after
  const grossRevenue = subscribers * subPrice
  const platformFee = grossRevenue * 0.10
  const processingFee = grossRevenue * 0.03
  const totalFees = platformFee + processingFee
  const monthlyRevenue = grossRevenue - totalFees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Revenue': grossRevenue,
      'Platform Fee (10%)': -platformFee,
      'Processing (~3%)': -processingFee,
    },
    engagementRate: subscribers > 0 ? Math.min((subscribers / 100) * 10, 100) : 0,
    growthRate: 5.0,
  }
}

// Rumble (ad revenue + Rants)
export function calculateRumble(monthlyViews: number, cpm: number, rants: number): CalculationResult {
  // Rumble ad revenue: 60% to creator for exclusive content
  // CPM range: $0.25-$5.00, user inputs their CPM
  // No minimum follower requirement for basic monetization
  const grossAdRevenue = (monthlyViews / 1000) * cpm
  const creatorAdShare = grossAdRevenue * 0.60
  const rantsRevenue = rants * 5 * 0.90 // $5 avg rant, 90% to creator
  const monthlyRevenue = creatorAdShare + rantsRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Ad Revenue (60% share)': creatorAdShare,
      'Rants (90% payout)': rantsRevenue,
    },
    engagementRate: 0,
    growthRate: 12.0,
  }
}

// Substack (10% platform fee on paid subscriptions)
export function calculateSubstack(subscribers: number, paidPercent: number, monthlyPrice: number): CalculationResult {
  // Substack: 10% platform fee + Stripe processing (~2.9% + $0.30) + 0.7% billing
  // Total fees: ~13%, creator keeps ~87%
  // Minimum subscription: $5/month
  const paidSubs = Math.floor(subscribers * (paidPercent / 100))
  const grossRevenue = paidSubs * monthlyPrice
  const platformFee = grossRevenue * 0.10
  const stripeFee = (grossRevenue * 0.029) + (paidSubs * 0.30)
  const billingFee = grossRevenue * 0.007
  const totalFees = platformFee + stripeFee + billingFee
  const monthlyRevenue = grossRevenue - totalFees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Revenue': grossRevenue,
      'Substack Fee (10%)': -platformFee,
      'Stripe Processing': -stripeFee,
      'Billing Fee (0.7%)': -billingFee,
    },
    engagementRate: paidPercent,
    growthRate: 8.5,
  }
}

// Fanvue (takes 15% platform fee - better than OnlyFans/Fansly)
export function calculateFanvue(subscribers: number, subPrice: number, tipsPercent: number): CalculationResult {
  // Fanvue fees: 15% first 30 days (promo), then 20% ongoing
  // Using 20% for realistic ongoing earnings estimate
  // Subscription range: $5-$50/month
  const subRevenue = subscribers * subPrice
  const tipRevenue = subRevenue * (tipsPercent / 100)
  const grossRevenue = subRevenue + tipRevenue
  const platformFee = grossRevenue * 0.20
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Subscriptions': subRevenue,
      'Tips': tipRevenue,
      'Platform Fee (20%)': -platformFee,
    },
    engagementRate: subscribers > 0 ? Math.min((tipsPercent / 20) * 100, 100) : 0,
    growthRate: 10.0,
  }
}
