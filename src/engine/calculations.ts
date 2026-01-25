export interface CalculationResult {
  monthlyRevenue: number
  yearlyRevenue: number
  breakdown?: Record<string, number>
  engagementRate?: number
  growthRate?: number
}

export function calculateYouTube(subscribers: number, monthlyViews: number, cpm: number): CalculationResult {
  const adRevenue = (monthlyViews / 1000) * cpm * 0.55 // 55% creator share
  const sponsorRate = subscribers >= 100000 ? 0.1 : 0.05
  const sponsorRevenue = subscribers * sponsorRate
  const monthlyRevenue = adRevenue + sponsorRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (monthlyViews / subscribers) * 100 / 30, // daily view rate
    growthRate: 8.2, // placeholder
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
  const engagementRate = (avgLikes / followers) * 100
  const brandDealRate = followers >= 10000 ? (followers / 1000) * 10 : 0
  const monthlyRevenue = brandDealRate * (postsPerMonth / 4) // assume 1 sponsored per 4 posts

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate,
    growthRate: 5.3,
  }
}

export function calculateTwitter(followers: number, impressions: number, subscribers: number): CalculationResult {
  const adRevenue = (impressions / 1000) * 0.5 // rough ad share estimate
  const subRevenue = subscribers * 3 // ~$3/sub avg after cut
  const monthlyRevenue = adRevenue + subRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (impressions / followers) * 100 / 30,
    growthRate: 3.1,
  }
}

export function calculateFacebook(followers: number, watchMinutes: number): CalculationResult {
  const adRevenue = (watchMinutes / 1000) * 1.5 // $1.50 per 1000 watch minutes
  const monthlyRevenue = adRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (watchMinutes / followers) / 10,
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

export function calculateNewsletter(subscribers: number, paidPercent: number, monthlyPrice: number): CalculationResult {
  const paidSubs = Math.floor(subscribers * (paidPercent / 100))
  const monthlyRevenue = paidSubs * monthlyPrice * 0.9 // 10% platform fee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: paidPercent,
    growthRate: 9.1,
  }
}

// Patreon: Memberships (Patreon takes ~8-12% fee, we'll use 10%)
export function calculatePatreon(patrons: number, avgPledge: number): CalculationResult {
  const grossRevenue = patrons * avgPledge
  const platformFee = grossRevenue * 0.10
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Membership Revenue': grossRevenue,
      'Platform Fee (10%)': -platformFee,
    },
    engagementRate: patrons > 0 ? Math.min((avgPledge / 5) * 100, 100) : 0,
    growthRate: 3.0,
  }
}

// Ko-fi: Tips + Memberships (Ko-fi takes 0% on tips for free tier, 5% on memberships)
export function calculateKofi(supporters: number, avgTip: number, members: number, memberPrice: number): CalculationResult {
  const tipRevenue = supporters * avgTip
  const membershipGross = members * memberPrice
  const membershipFee = membershipGross * 0.05
  const membershipRevenue = membershipGross - membershipFee
  const monthlyRevenue = tipRevenue + membershipRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Tips': tipRevenue,
      'Memberships': membershipRevenue,
    },
    engagementRate: (supporters + members) > 0 ? Math.min(((supporters + members) / 100) * 10, 100) : 0,
    growthRate: 2.5,
  }
}

// Gumroad: Digital products (Gumroad takes 10% flat fee)
export function calculateGumroad(products: number, avgPrice: number): CalculationResult {
  const grossRevenue = products * avgPrice
  const platformFee = grossRevenue * 0.10
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Product Sales': grossRevenue,
      'Platform Fee (10%)': -platformFee,
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
  const grossRevenue = students * coursePrice
  const fees = grossRevenue * (platformFee / 100)
  const monthlyRevenue = grossRevenue - fees

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Course Sales': grossRevenue,
      'Platform Fees': -fees,
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
  const grossRevenue = orders * avgOrder
  const monthlyRevenue = grossRevenue * (profitMargin / 100)

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Gross Sales': grossRevenue,
      'Net Profit': monthlyRevenue,
    },
    engagementRate: orders > 0 ? Math.min((orders / 30) * 100, 100) : 0,
    growthRate: 3.5,
  }
}

// Amazon Influencer Program
export function calculateAmazon(pageViews: number, conversionRate: number, avgCommission: number): CalculationResult {
  const conversions = pageViews * (conversionRate / 100)
  const monthlyRevenue = conversions * avgCommission

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Page Views': pageViews,
      'Conversions': conversions,
      'Commission Revenue': monthlyRevenue,
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
  const engagementRate = followers > 0 ? (avgLikes / followers) * 100 : 0
  const brandDealRate = followers >= 10000 ? (followers / 1000) * 8 : 0
  const monthlyRevenue = brandDealRate * (postsPerMonth / 8) // assume 1 sponsored per 8 posts

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Brand Deals': monthlyRevenue,
    },
    engagementRate,
    growthRate: 15.0,
  }
}

// Discord (server subscriptions, 10% platform fee)
export function calculateDiscord(subscribers: number, subPrice: number): CalculationResult {
  const grossRevenue = subscribers * subPrice
  const platformFee = grossRevenue * 0.10
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Subscriptions': grossRevenue,
      'Platform Fee (10%)': -platformFee,
    },
    engagementRate: subscribers > 0 ? Math.min((subscribers / 100) * 10, 100) : 0,
    growthRate: 5.0,
  }
}

// Rumble (ad revenue + Rants)
export function calculateRumble(followers: number, monthlyViews: number, rants: number): CalculationResult {
  // Rumble ad revenue: 60% to creator for exclusive content
  // CPM range: $0.25-$5.00, using $2.50 average
  // No minimum follower requirement for basic monetization
  const grossAdRevenue = (monthlyViews / 1000) * 2.50
  const creatorAdShare = grossAdRevenue * 0.60
  const rantsRevenue = rants * 0.90
  const monthlyRevenue = creatorAdShare + rantsRevenue
  const engagementRate = followers > 0 ? (monthlyViews / followers) * 100 / 30 : 0

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Ad Revenue (60% share)': creatorAdShare,
      'Rants (90% payout)': rantsRevenue,
    },
    engagementRate,
    growthRate: 12.0,
  }
}

// Substack (10% platform fee on paid subscriptions)
export function calculateSubstack(subscribers: number, paidPercent: number, monthlyPrice: number): CalculationResult {
  const paidSubs = Math.floor(subscribers * (paidPercent / 100))
  const grossRevenue = paidSubs * monthlyPrice
  const platformFee = grossRevenue * 0.10
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Paid Subscriptions': grossRevenue,
      'Platform Fee (10%)': -platformFee,
    },
    engagementRate: paidPercent,
    growthRate: 8.5,
  }
}

// Fanvue (takes 15% platform fee - better than OnlyFans/Fansly)
export function calculateFanvue(subscribers: number, subPrice: number, tipsPercent: number): CalculationResult {
  const subRevenue = subscribers * subPrice
  const tipRevenue = subRevenue * (tipsPercent / 100)
  const grossRevenue = subRevenue + tipRevenue
  const platformFee = grossRevenue * 0.15
  const monthlyRevenue = grossRevenue - platformFee

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    breakdown: {
      'Subscriptions': subRevenue,
      'Tips': tipRevenue,
      'Platform Fee (15%)': -platformFee,
    },
    engagementRate: subscribers > 0 ? Math.min((tipsPercent / 20) * 100, 100) : 0,
    growthRate: 10.0,
  }
}
