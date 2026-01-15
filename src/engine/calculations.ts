export interface CalculationResult {
  monthlyRevenue: number
  yearlyRevenue: number
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
  const creatorFund = monthlyViews * 0.02 // $0.02 per 1000 views
  const brandDeals = followers >= 10000 ? followers * 0.015 : 0
  const monthlyRevenue = creatorFund + brandDeals

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
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
  const consultingLeads = Math.floor(newsletterSubs * 0.01) // 1% become leads
  const monthlyRevenue = consultingLeads * 500 // $500 avg consulting value

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (newsletterSubs / followers) * 100,
    growthRate: 6.7,
  }
}

export function calculateSnapchat(followers: number, spotlightViews: number): CalculationResult {
  const spotlightRevenue = (spotlightViews / 1000) * 0.05
  const monthlyRevenue = spotlightRevenue

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (spotlightViews / followers) * 100,
    growthRate: 4.2,
  }
}

export function calculatePinterest(followers: number, monthlyViews: number, ideaPins: number): CalculationResult {
  const affiliateRevenue = (monthlyViews / 1000) * 0.1
  const creatorRewards = ideaPins * 2
  const monthlyRevenue = affiliateRevenue + creatorRewards

  return {
    monthlyRevenue,
    yearlyRevenue: monthlyRevenue * 12,
    engagementRate: (monthlyViews / followers) * 100,
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
