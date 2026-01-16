export const monetizationThresholds = [
  {
    platformId: 'youtube',
    programName: 'YouTube Partner Program',
    requirements: [
      { name: 'Subscribers', required: 1000, metric: 'subscribers' },
      { name: 'Watch Hours (yearly)', required: 4000, metric: 'watchHours' },
    ],
  },
  {
    platformId: 'tiktok',
    programName: 'TikTok Creativity Program',
    requirements: [
      { name: 'Followers', required: 10000, metric: 'followers' },
      { name: 'Views (30 days)', required: 100000, metric: 'monthlyViews' },
    ],
  },
  {
    platformId: 'instagram',
    programName: 'Instagram Bonuses',
    requirements: [
      { name: 'Followers', required: 10000, metric: 'followers' },
    ],
  },
  {
    platformId: 'facebook',
    programName: 'Facebook In-Stream Ads',
    requirements: [
      { name: 'Followers', required: 10000, metric: 'followers' },
      { name: 'Watch Minutes (60 days)', required: 600000, metric: 'watchMinutes' },
    ],
  },
  {
    platformId: 'twitch',
    programName: 'Twitch Affiliate',
    requirements: [
      { name: 'Followers', required: 50, metric: 'followers' },
      { name: 'Avg Viewers', required: 3, metric: 'avgViewers' },
      { name: 'Stream Days (30 days)', required: 7, metric: 'streamDays' },
    ],
  },
  {
    platformId: 'kick',
    programName: 'Kick Partner',
    requirements: [
      { name: 'Followers', required: 75, metric: 'followers' },
      { name: 'Avg Viewers', required: 5, metric: 'avgViewers' },
    ],
  },
  {
    platformId: 'snapchat',
    programName: 'Snapchat Spotlight',
    requirements: [
      { name: 'Followers', required: 1000, metric: 'followers' },
    ],
  },
  {
    platformId: 'rumble',
    programName: 'Rumble Partner',
    requirements: [
      { name: 'Followers', required: 0, metric: 'followers' },
    ],
    note: 'Open to all creators',
  },
]

export type MonetizationThreshold = typeof monetizationThresholds[number]
