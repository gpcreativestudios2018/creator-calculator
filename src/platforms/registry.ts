export interface Platform {
  id: string
  name: string
  gradient: string
  description: string
  inputs: PlatformInput[]
}

export interface PlatformInput {
  id: string
  label: string
  type: 'number' | 'slider' | 'select'
  min?: number
  max?: number
  step?: number
  defaultValue: number
  tooltip?: string
}

export const platforms: Platform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    gradient: 'from-red-500 to-red-700',
    description: 'Ad revenue, memberships, and sponsorships',
    inputs: [
      { id: 'subscribers', label: 'Subscribers', type: 'number', min: 0, max: 100000000, defaultValue: 10000, tooltip: 'Total channel subscribers' },
      { id: 'monthlyViews', label: 'Monthly Views', type: 'number', min: 0, max: 1000000000, defaultValue: 100000, tooltip: 'Average views per month' },
      { id: 'cpm', label: 'CPM ($)', type: 'slider', min: 1, max: 15, step: 0.5, defaultValue: 4, tooltip: 'Cost per 1000 ad impressions' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    gradient: 'from-pink-500 to-cyan-500',
    description: 'Creator fund and brand partnerships',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 50000, tooltip: 'Total followers' },
      { id: 'monthlyViews', label: 'Monthly Views', type: 'number', min: 0, max: 1000000000, defaultValue: 500000, tooltip: 'Average views per month' },
      { id: 'engagementRate', label: 'Engagement Rate (%)', type: 'slider', min: 1, max: 20, step: 0.5, defaultValue: 6, tooltip: 'Likes + comments / views' },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
    description: 'Reels, posts, and brand deals',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 25000, tooltip: 'Total followers' },
      { id: 'avgLikes', label: 'Avg Likes per Post', type: 'number', min: 0, max: 10000000, defaultValue: 1000, tooltip: 'Average likes per post' },
      { id: 'postsPerMonth', label: 'Posts per Month', type: 'slider', min: 1, max: 60, step: 1, defaultValue: 12, tooltip: 'How often you post' },
    ],
  },
]
