export interface Region {
  id: string
  name: string
  flag: string
  currencyCode: string
  currencySymbol: string
  revenueMultiplier: number
}

export const regions: Region[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    revenueMultiplier: 1.0,
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    revenueMultiplier: 0.85,
  },
  {
    id: 'eu',
    name: 'European Union',
    flag: '🇪🇺',
    currencyCode: 'EUR',
    currencySymbol: '€',
    revenueMultiplier: 0.75,
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    revenueMultiplier: 0.80,
  },
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    revenueMultiplier: 0.75,
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    currencyCode: 'INR',
    currencySymbol: '₹',
    revenueMultiplier: 0.15,
  },
  {
    id: 'br',
    name: 'Brazil',
    flag: '🇧🇷',
    currencyCode: 'BRL',
    currencySymbol: 'R$',
    revenueMultiplier: 0.25,
  },
  {
    id: 'mx',
    name: 'Mexico',
    flag: '🇲🇽',
    currencyCode: 'MXN',
    currencySymbol: 'MX$',
    revenueMultiplier: 0.30,
  },
  {
    id: 'jp',
    name: 'Japan',
    flag: '🇯🇵',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    revenueMultiplier: 0.70,
  },
  {
    id: 'kr',
    name: 'South Korea',
    flag: '🇰🇷',
    currencyCode: 'KRW',
    currencySymbol: '₩',
    revenueMultiplier: 0.65,
  },
  {
    id: 'sea',
    name: 'Southeast Asia',
    flag: '🌏',
    currencyCode: 'USD',
    currencySymbol: '$',
    revenueMultiplier: 0.20,
  },
  {
    id: 'af',
    name: 'Africa',
    flag: '🌍',
    currencyCode: 'USD',
    currencySymbol: '$',
    revenueMultiplier: 0.10,
  },
  {
    id: 'me',
    name: 'Middle East',
    flag: '🌍',
    currencyCode: 'USD',
    currencySymbol: '$',
    revenueMultiplier: 0.40,
  },
  {
    id: 'global',
    name: 'Other/Global',
    flag: '🌐',
    currencyCode: 'USD',
    currencySymbol: '$',
    revenueMultiplier: 0.50,
  },
]

export const DEFAULT_REGION = 'us'

export function getRegionById(id: string): Region {
  return regions.find(r => r.id === id) ?? regions.find(r => r.id === DEFAULT_REGION)!
}
