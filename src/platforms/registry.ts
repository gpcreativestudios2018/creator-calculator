import {
  Youtube,
  Music2,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Ghost,
  Pin,
  Twitch,
  Gamepad2,
  Mail,
  type LucideIcon
} from 'lucide-react'

export interface Platform {
  id: string
  name: string
  icon: LucideIcon
  iconColor: string
  accentColor: string
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
    icon: Youtube,
    iconColor: 'text-red-500',
    accentColor: '#ef4444',
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
    icon: Music2,
    iconColor: 'text-pink-500',
    accentColor: '#ec4899',
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
    icon: Instagram,
    iconColor: 'text-pink-500',
    accentColor: '#ec4899',
    gradient: 'from-purple-500 via-pink-500 to-orange-500',
    description: 'Reels, posts, and brand deals',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 25000, tooltip: 'Total followers' },
      { id: 'avgLikes', label: 'Avg Likes per Post', type: 'number', min: 0, max: 10000000, defaultValue: 1000, tooltip: 'Average likes per post' },
      { id: 'postsPerMonth', label: 'Posts per Month', type: 'slider', min: 1, max: 60, step: 1, defaultValue: 12, tooltip: 'How often you post' },
    ],
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    iconColor: 'text-zinc-400',
    accentColor: '#a1a1aa',
    gradient: 'from-zinc-600 to-zinc-800',
    description: 'Creator subscriptions and ads revenue share',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 10000, tooltip: 'Total followers' },
      { id: 'impressions', label: 'Monthly Impressions', type: 'number', min: 0, max: 1000000000, defaultValue: 500000, tooltip: 'Total monthly impressions' },
      { id: 'subscribers', label: 'Paid Subscribers', type: 'number', min: 0, max: 1000000, defaultValue: 0, tooltip: 'X Premium subscribers' },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    iconColor: 'text-blue-500',
    accentColor: '#3b82f6',
    gradient: 'from-blue-600 to-blue-800',
    description: 'In-stream ads and stars',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 50000, tooltip: 'Page followers' },
      { id: 'watchMinutes', label: 'Monthly Watch Minutes', type: 'number', min: 0, max: 100000000, defaultValue: 100000, tooltip: 'Total watch time per month' },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    iconColor: 'text-blue-400',
    accentColor: '#60a5fa',
    gradient: 'from-blue-700 to-blue-900',
    description: 'Newsletter and consulting revenue',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 10000000, defaultValue: 5000, tooltip: 'Total followers' },
      { id: 'newsletterSubs', label: 'Newsletter Subscribers', type: 'number', min: 0, max: 1000000, defaultValue: 1000, tooltip: 'Newsletter subscribers' },
    ],
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    icon: Ghost,
    iconColor: 'text-yellow-400',
    accentColor: '#facc15',
    gradient: 'from-yellow-400 to-yellow-500',
    description: 'Spotlight and creator programs',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 10000, tooltip: 'Total followers' },
      { id: 'spotlightViews', label: 'Spotlight Views', type: 'number', min: 0, max: 100000000, defaultValue: 50000, tooltip: 'Monthly Spotlight views' },
    ],
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: Pin,
    iconColor: 'text-red-500',
    accentColor: '#ef4444',
    gradient: 'from-red-600 to-red-700',
    description: 'Creator rewards and affiliate income',
    inputs: [
      { id: 'followers', label: 'Followers', type: 'number', min: 0, max: 100000000, defaultValue: 10000, tooltip: 'Total followers' },
      { id: 'monthlyViews', label: 'Monthly Views', type: 'number', min: 0, max: 1000000000, defaultValue: 100000, tooltip: 'Monthly pin views' },
      { id: 'ideaPins', label: 'Idea Pins / Month', type: 'slider', min: 1, max: 100, step: 1, defaultValue: 20, tooltip: 'Idea pins published per month' },
    ],
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: Twitch,
    iconColor: 'text-purple-500',
    accentColor: '#a855f7',
    gradient: 'from-purple-600 to-purple-800',
    description: 'Subscriptions, bits, and ads',
    inputs: [
      { id: 'subscribers', label: 'Subscribers', type: 'number', min: 0, max: 100000, defaultValue: 100, tooltip: 'Paid subscribers' },
      { id: 'avgViewers', label: 'Average Viewers', type: 'number', min: 0, max: 100000, defaultValue: 50, tooltip: 'Concurrent viewers' },
      { id: 'hoursStreamed', label: 'Hours Streamed / Month', type: 'slider', min: 1, max: 200, step: 1, defaultValue: 40, tooltip: 'Monthly streaming hours' },
    ],
  },
  {
    id: 'kick',
    name: 'Kick',
    icon: Gamepad2,
    iconColor: 'text-green-500',
    accentColor: '#22c55e',
    gradient: 'from-green-500 to-green-700',
    description: 'Subscriptions and platform bonuses',
    inputs: [
      { id: 'subscribers', label: 'Subscribers', type: 'number', min: 0, max: 100000, defaultValue: 50, tooltip: 'Paid subscribers' },
      { id: 'avgViewers', label: 'Average Viewers', type: 'number', min: 0, max: 100000, defaultValue: 30, tooltip: 'Concurrent viewers' },
    ],
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    icon: Mail,
    iconColor: 'text-emerald-500',
    accentColor: '#10b981',
    gradient: 'from-emerald-500 to-emerald-700',
    description: 'Paid subscriptions and sponsorships',
    inputs: [
      { id: 'subscribers', label: 'Total Subscribers', type: 'number', min: 0, max: 10000000, defaultValue: 5000, tooltip: 'Total email subscribers' },
      { id: 'paidPercent', label: 'Paid Subscriber %', type: 'slider', min: 0, max: 20, step: 0.5, defaultValue: 5, tooltip: 'Percentage who pay' },
      { id: 'monthlyPrice', label: 'Monthly Price ($)', type: 'slider', min: 1, max: 50, step: 1, defaultValue: 10, tooltip: 'Subscription price' },
    ],
  },
]
