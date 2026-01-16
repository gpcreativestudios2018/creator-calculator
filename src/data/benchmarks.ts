export const creatorBenchmarks = [
  {
    platformId: 'youtube',
    metric: 'monthlyViews',
    metricLabel: 'Monthly Views',
    percentiles: {
      p10: 1000,
      p25: 5000,
      p50: 25000,
      p75: 100000,
      p90: 500000,
      p99: 5000000,
    },
  },
  {
    platformId: 'tiktok',
    metric: 'followers',
    metricLabel: 'Followers',
    percentiles: {
      p10: 500,
      p25: 2000,
      p50: 10000,
      p75: 50000,
      p90: 250000,
      p99: 2000000,
    },
  },
  {
    platformId: 'instagram',
    metric: 'followers',
    metricLabel: 'Followers',
    percentiles: {
      p10: 500,
      p25: 2000,
      p50: 10000,
      p75: 50000,
      p90: 200000,
      p99: 1000000,
    },
  },
  {
    platformId: 'twitter',
    metric: 'followers',
    metricLabel: 'Followers',
    percentiles: {
      p10: 200,
      p25: 1000,
      p50: 5000,
      p75: 25000,
      p90: 100000,
      p99: 1000000,
    },
  },
  {
    platformId: 'twitch',
    metric: 'avgViewers',
    metricLabel: 'Average Viewers',
    percentiles: {
      p10: 2,
      p25: 5,
      p50: 15,
      p75: 50,
      p90: 200,
      p99: 2000,
    },
  },
  {
    platformId: 'podcast',
    metric: 'downloads',
    metricLabel: 'Monthly Downloads',
    percentiles: {
      p10: 100,
      p25: 500,
      p50: 2000,
      p75: 10000,
      p90: 50000,
      p99: 500000,
    },
  },
  {
    platformId: 'newsletter',
    metric: 'subscribers',
    metricLabel: 'Subscribers',
    percentiles: {
      p10: 100,
      p25: 500,
      p50: 2500,
      p75: 10000,
      p90: 50000,
      p99: 250000,
    },
  },
  {
    platformId: 'substack',
    metric: 'freeSubscribers',
    metricLabel: 'Subscribers',
    percentiles: {
      p10: 100,
      p25: 500,
      p50: 2000,
      p75: 10000,
      p90: 50000,
      p99: 200000,
    },
  },
  {
    platformId: 'patreon',
    metric: 'patrons',
    metricLabel: 'Patrons',
    percentiles: {
      p10: 5,
      p25: 20,
      p50: 75,
      p75: 300,
      p90: 1000,
      p99: 10000,
    },
  },
]

export function getPercentileRank(platformId: string, metric: string, value: number): number | null {
  const benchmark = creatorBenchmarks.find(b => b.platformId === platformId && b.metric === metric)
  if (!benchmark) return null

  const { percentiles } = benchmark
  if (value <= percentiles.p10) return 10
  if (value <= percentiles.p25) return 25
  if (value <= percentiles.p50) return 50
  if (value <= percentiles.p75) return 75
  if (value <= percentiles.p90) return 90
  if (value <= percentiles.p99) return 99
  return 100
}

export function getPercentileLabel(percentile: number): string {
  if (percentile <= 10) return 'Getting Started'
  if (percentile <= 25) return 'Growing Creator'
  if (percentile <= 50) return 'Established Creator'
  if (percentile <= 75) return 'Top 25%'
  if (percentile <= 90) return 'Top 10%'
  if (percentile <= 99) return 'Top 1%'
  return 'Elite Creator'
}

export type CreatorBenchmark = typeof creatorBenchmarks[number]
