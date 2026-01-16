export interface Niche {
  id: string
  name: string
  icon: string
  rpmMultiplier: number
}

export const niches: Niche[] = [
  {
    id: 'finance',
    name: 'Finance/Business',
    icon: '💰',
    rpmMultiplier: 2.5,
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: '💻',
    rpmMultiplier: 1.8,
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    rpmMultiplier: 1.5,
  },
  {
    id: 'health',
    name: 'Health/Fitness',
    icon: '💪',
    rpmMultiplier: 1.4,
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: '🏠',
    rpmMultiplier: 2.0,
  },
  {
    id: 'legal',
    name: 'Legal/Law',
    icon: '⚖️',
    rpmMultiplier: 2.2,
  },
  {
    id: 'beauty',
    name: 'Beauty/Fashion',
    icon: '💄',
    rpmMultiplier: 1.3,
  },
  {
    id: 'food',
    name: 'Food/Cooking',
    icon: '🍳',
    rpmMultiplier: 1.1,
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
    rpmMultiplier: 1.2,
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    rpmMultiplier: 0.8,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    rpmMultiplier: 0.9,
  },
  {
    id: 'music',
    name: 'Music',
    icon: '🎵',
    rpmMultiplier: 0.7,
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    rpmMultiplier: 1.0,
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle/Vlog',
    icon: '📷',
    rpmMultiplier: 0.9,
  },
  {
    id: 'diy',
    name: 'DIY/Crafts',
    icon: '🔨',
    rpmMultiplier: 1.0,
  },
  {
    id: 'pets',
    name: 'Pets/Animals',
    icon: '🐕',
    rpmMultiplier: 0.85,
  },
  {
    id: 'news',
    name: 'News/Politics',
    icon: '📰',
    rpmMultiplier: 1.1,
  },
  {
    id: 'comedy',
    name: 'Comedy',
    icon: '😂',
    rpmMultiplier: 0.75,
  },
  {
    id: 'general',
    name: 'Other/General',
    icon: '📌',
    rpmMultiplier: 1.0,
  },
]

export const DEFAULT_NICHE = 'general'

export function getNicheById(id: string): Niche {
  return niches.find(n => n.id === id) ?? niches.find(n => n.id === DEFAULT_NICHE)!
}
