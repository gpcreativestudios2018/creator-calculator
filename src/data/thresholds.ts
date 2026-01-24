export const monetizationThresholds = [
  {
    platformId: 'youtube',
    programName: 'YouTube Partner Program',
    requirements: [
      { name: 'Subscribers', required: 1000, metric: 'subscribers' },
      { name: 'Watch Hours (yearly)', required: 4000, metric: 'watchHours' },
    ],
    benefits: ['Ad revenue sharing (55%)', 'Channel memberships', 'Super Chat & Super Thanks', 'YouTube Shopping'],
  },
  {
    platformId: 'tiktok',
    programName: 'TikTok Creativity Program',
    requirements: [
      { name: 'Followers', required: 10000, metric: 'followers' },
      { name: 'Views (30 days)', required: 100000, metric: 'monthlyViews' },
    ],
    benefits: ['Revenue from qualifying videos', 'Higher RPM than old Creator Fund', 'Analytics access'],
  },
  {
    platformId: 'instagram',
    programName: 'Instagram Monetization',
    requirements: [
      { name: 'Followers', required: 10000, metric: 'followers' },
    ],
    benefits: ['Reels Play Bonus (invite only)', 'Badges in Live', 'Subscriptions', 'Branded content tools'],
  },
  {
    platformId: 'twitter',
    programName: 'X Ads Revenue Sharing',
    requirements: [
      { name: 'Followers', required: 500, metric: 'followers' },
      { name: 'Impressions (3 months)', required: 5000000, metric: 'impressions' },
    ],
    benefits: ['Ad revenue sharing', 'Subscriptions', 'Tips', 'Premium badge'],
    note: 'Requires X Premium subscription',
  },
  {
    platformId: 'facebook',
    programName: 'Facebook In-Stream Ads',
    requirements: [
      { name: 'Followers', required: 10000, metric: 'followers' },
      { name: 'Watch Minutes (60 days)', required: 600000, metric: 'watchMinutes' },
    ],
    benefits: ['In-stream ads', 'Fan subscriptions', 'Stars', 'Branded content'],
  },
  {
    platformId: 'twitch',
    programName: 'Twitch Affiliate',
    requirements: [
      { name: 'Followers', required: 25, metric: 'followers' },
      { name: 'Avg Viewers', required: 3, metric: 'avgViewers' },
      { name: 'Stream Days (30 days)', required: 4, metric: 'streamDays' },
      { name: 'Hours Streamed', required: 4, metric: 'hoursStreamed' },
    ],
    benefits: ['Subscriptions (50% rev share)', 'Bits', 'Game sales commission', 'Ad revenue'],
  },
  {
    platformId: 'kick',
    programName: 'Kick Creator Program',
    requirements: [
      { name: 'Followers', required: 75, metric: 'followers' },
      { name: 'Avg Viewers', required: 5, metric: 'avgViewers' },
    ],
    benefits: ['95% subscription revenue', 'Kick tips', 'No exclusivity required'],
    note: 'Affiliate tier shown. Partner requires 250 followers, 75 avg viewers, 30 hrs/month, 25 subs. 95/5 revenue split.',
  },
  {
    platformId: 'snapchat',
    programName: 'Snapchat Unified Monetization',
    requirements: [
      { name: 'Followers', required: 50000, metric: 'followers' },
      { name: 'Posts per Month', required: 25, metric: 'postsPerMonth' },
    ],
    benefits: ['Spotlight rewards', 'Story ads revenue', 'Gifting'],
    note: 'Feb 2025 update: Also requires 10+ active days/month and either 12K watch hours, 10M Snap views, or 1M Spotlight views in 28 days. Videos must be 1+ min.',
  },
  {
    platformId: 'pinterest',
    programName: 'Pinterest Creator Fund',
    requirements: [
      { name: 'Followers', required: 0, metric: 'followers' },
    ],
    benefits: ['Inclusion Fund grants (invite only)', 'Affiliate marketing', 'Brand partnerships'],
    note: 'No direct platform monetization. Creator Rewards ended Nov 2022. Monetize via affiliates and brand deals.',
  },
  {
    platformId: 'linkedin',
    programName: 'LinkedIn Creator Mode',
    requirements: [
      { name: 'Followers', required: 150, metric: 'followers' },
    ],
    benefits: ['Newsletter feature', 'LinkedIn Live access', 'Featured section', 'Follow button priority'],
    note: 'No direct monetization yet',
  },
  {
    platformId: 'rumble',
    programName: 'Rumble Partner',
    requirements: [
      { name: 'Videos', required: 1, metric: 'videos' },
    ],
    benefits: ['60% ad revenue share', 'Rants (tipping)', 'No content restrictions'],
    note: 'Open to all creators immediately',
  },
  {
    platformId: 'substack',
    programName: 'Substack Paid Subscriptions',
    requirements: [
      { name: 'Free Subscribers', required: 0, metric: 'subscribers' },
    ],
    benefits: ['90% of subscription revenue', 'Paid newsletters', 'No minimum required'],
    note: 'Can start monetizing immediately',
  },
  {
    platformId: 'patreon',
    programName: 'Patreon Creator',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['Tiered memberships', '92-95% revenue (varies by plan)', 'Merch integration'],
    note: 'No follower minimum',
  },
  {
    platformId: 'kofi',
    programName: 'Ko-fi Creator',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['0% platform fee on donations', 'Memberships', 'Shop', 'Commissions'],
    note: 'Free tier keeps 100% of tips',
  },
  {
    platformId: 'gumroad',
    programName: 'Gumroad Seller',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['Digital product sales', 'Memberships', '90% revenue (10% fee)'],
    note: 'No minimum required',
  },
  {
    platformId: 'podcast',
    programName: 'Podcast Monetization',
    requirements: [
      { name: 'Downloads/Episode', required: 5000, metric: 'downloads' },
    ],
    benefits: ['Dynamic ad insertion', 'Sponsor deals', 'Premium subscriptions'],
    note: '5k+ downloads attracts advertisers',
  },
  {
    platformId: 'newsletter',
    programName: 'Newsletter Monetization',
    requirements: [
      { name: 'Subscribers', required: 1000, metric: 'subscribers' },
    ],
    benefits: ['Paid subscriptions', 'Sponsorships', 'Affiliate marketing'],
    note: '1k+ subscribers attracts sponsors',
  },
  {
    platformId: 'courses',
    programName: 'Course Creator',
    requirements: [
      { name: 'Audience Size', required: 1000, metric: 'audience' },
    ],
    benefits: ['Course sales', 'Coaching upsells', 'Community access'],
    note: 'Audience helps with launches',
  },
  {
    platformId: 'onlyfans',
    programName: 'OnlyFans Creator',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['80% subscription revenue', 'Tips', 'PPV messages', 'Referral bonus'],
    note: 'ID verification required',
  },
  {
    platformId: 'fansly',
    programName: 'Fansly Creator',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['80% revenue share', 'Multiple tiers', 'Tips', 'Referrals'],
    note: 'No minimum required',
  },
  {
    platformId: 'fanvue',
    programName: 'Fanvue Creator',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['85% revenue share', 'AI tools included', 'Tips', 'PPV'],
    note: 'Higher revenue share than competitors',
  },
  {
    platformId: 'etsy',
    programName: 'Etsy Seller',
    requirements: [
      { name: 'Account', required: 1, metric: 'account' },
    ],
    benefits: ['Product listings', 'Digital downloads', 'Built-in marketplace traffic'],
    note: '$0.20 listing fee + transaction fees',
  },
  {
    platformId: 'amazon',
    programName: 'Amazon Influencer Program',
    requirements: [
      { name: 'Recommended Following', required: 1000, metric: 'followers' },
    ],
    benefits: ['Custom storefront', 'Commission on sales', 'Shoppable videos'],
    note: 'No fixed minimum. ~1K followers recommended. Approval based on engagement, content quality, and social presence.',
  },
  {
    platformId: 'threads',
    programName: 'Threads (Meta)',
    requirements: [
      { name: 'Followers', required: 0, metric: 'followers' },
    ],
    benefits: ['Growing audience', 'Cross-posting with Instagram'],
    note: 'No monetization yet - build audience now',
  },
  {
    platformId: 'discord',
    programName: 'Discord Server Subscriptions',
    requirements: [
      { name: 'Server Members', required: 0, metric: 'members' },
    ],
    benefits: ['Server subscriptions', '90% revenue share', 'Tiered perks'],
    note: 'No member minimum. Must be 18+, US-based server owner, 2FA enabled, good standing.',
  },
]

export type MonetizationThreshold = typeof monetizationThresholds[number]
