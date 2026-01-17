// Two-tone color schemes for each platform
// Used for charts, gauges, and visual elements

export interface PlatformColors {
  light: string
  dark: string
}

export const platformColors: Record<string, PlatformColors> = {
  // YouTube - Two reds
  youtube: {
    light: '#FF6B6B',
    dark: '#CC0000',
  },

  // TikTok - Pink + Teal (actual brand colors)
  tiktok: {
    light: '#FF0050',
    dark: '#00F2EA',
  },

  // Instagram - Pink/Purple gradient tones
  instagram: {
    light: '#F77737',
    dark: '#C13584',
  },

  // Twitter/X - Two blues
  twitter: {
    light: '#1DA1F2',
    dark: '#0D8BD9',
  },

  // Facebook - Two blues
  facebook: {
    light: '#4267B2',
    dark: '#1E3A5F',
  },

  // LinkedIn - Two blues
  linkedin: {
    light: '#0A66C2',
    dark: '#004182',
  },

  // Snapchat - Two yellows
  snapchat: {
    light: '#FFFC00',
    dark: '#FFD700',
  },

  // Pinterest - Two reds
  pinterest: {
    light: '#E60023',
    dark: '#AD081B',
  },

  // Twitch - Two purples
  twitch: {
    light: '#9146FF',
    dark: '#6441A5',
  },

  // Kick - Two greens
  kick: {
    light: '#53FC18',
    dark: '#1E6B0A',
  },

  // Newsletter - Two blues
  newsletter: {
    light: '#4A90D9',
    dark: '#2563EB',
  },

  // Patreon - Coral/Orange tones
  patreon: {
    light: '#FF6B6B',
    dark: '#F96854',
  },

  // Ko-fi - Two blues
  kofi: {
    light: '#29ABE0',
    dark: '#0D6EFD',
  },

  // Gumroad - Pink tones
  gumroad: {
    light: '#FF90E8',
    dark: '#FF6BB3',
  },

  // Podcast - Two purples
  podcast: {
    light: '#9933FF',
    dark: '#5C16C5',
  },

  // Courses - Two greens
  courses: {
    light: '#34D399',
    dark: '#059669',
  },

  // OnlyFans - Two blues
  onlyfans: {
    light: '#00AFF0',
    dark: '#0085C5',
  },

  // Fansly - Two blues
  fansly: {
    light: '#1FA3F0',
    dark: '#0077CC',
  },

  // Fanvue - Teal tones
  fanvue: {
    light: '#2DD4BF',
    dark: '#0D9488',
  },

  // Etsy - Two oranges
  etsy: {
    light: '#F56400',
    dark: '#D35400',
  },

  // Amazon - Orange/Yellow
  amazon: {
    light: '#FF9900',
    dark: '#CC7A00',
  },

  // Threads - Two grays/purples
  threads: {
    light: '#8B5CF6',
    dark: '#6D28D9',
  },

  // Discord - Two purples
  discord: {
    light: '#7289DA',
    dark: '#5865F2',
  },

  // Rumble - Two greens
  rumble: {
    light: '#85C742',
    dark: '#5E9B2D',
  },

  // Substack - Two oranges
  substack: {
    light: '#FF6719',
    dark: '#CC5214',
  },
}

// Helper function to get colors with fallback
export function getPlatformColors(platformId: string): PlatformColors {
  return platformColors[platformId] || { light: '#8B5CF6', dark: '#6D28D9' }
}
