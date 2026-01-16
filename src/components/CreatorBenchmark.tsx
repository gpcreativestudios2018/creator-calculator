import { useMemo } from 'react'
import { TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { creatorBenchmarks, getPercentileRank, getPercentileLabel } from '@/data/benchmarks'
import { platforms } from '@/platforms/registry'

interface CreatorBenchmarkProps {
  platformId: string
  currentValues: Record<string, number>
  theme: 'dark' | 'light'
}

export function CreatorBenchmark({ platformId, currentValues, theme }: CreatorBenchmarkProps) {
  const benchmark = useMemo(() =>
    creatorBenchmarks.find(b => b.platformId === platformId),
    [platformId]
  )

  const platform = useMemo(() =>
    platforms.find(p => p.id === platformId),
    [platformId]
  )

  const analysis = useMemo(() => {
    if (!benchmark) return null

    const currentValue = currentValues[benchmark.metric] || 0
    const percentile = getPercentileRank(platformId, benchmark.metric, currentValue)
    if (percentile === null) return null

    const label = getPercentileLabel(percentile)
    const median = benchmark.percentiles.p50

    // Calculate position on the scale (0-100%)
    const { percentiles } = benchmark
    let position = 0
    if (currentValue <= percentiles.p10) {
      position = (currentValue / percentiles.p10) * 10
    } else if (currentValue <= percentiles.p25) {
      position = 10 + ((currentValue - percentiles.p10) / (percentiles.p25 - percentiles.p10)) * 15
    } else if (currentValue <= percentiles.p50) {
      position = 25 + ((currentValue - percentiles.p25) / (percentiles.p50 - percentiles.p25)) * 25
    } else if (currentValue <= percentiles.p75) {
      position = 50 + ((currentValue - percentiles.p50) / (percentiles.p75 - percentiles.p50)) * 25
    } else if (currentValue <= percentiles.p90) {
      position = 75 + ((currentValue - percentiles.p75) / (percentiles.p90 - percentiles.p75)) * 15
    } else if (currentValue <= percentiles.p99) {
      position = 90 + ((currentValue - percentiles.p90) / (percentiles.p99 - percentiles.p90)) * 9
    } else {
      position = 99 + Math.min((currentValue - percentiles.p99) / percentiles.p99 * 1, 1)
    }
    position = Math.min(Math.max(position, 0), 100)

    const vsMedian = currentValue > median
      ? `${((currentValue / median - 1) * 100).toFixed(0)}% above`
      : currentValue < median
        ? `${((1 - currentValue / median) * 100).toFixed(0)}% below`
        : 'at'

    return {
      currentValue,
      percentile,
      label,
      position,
      median,
      vsMedian,
      metricLabel: benchmark.metricLabel,
    }
  }, [benchmark, currentValues, platformId])

  if (!benchmark || !analysis) return null

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  const percentileMarkers = [
    { value: 10, label: '10%', position: 10 },
    { value: 25, label: '25%', position: 25 },
    { value: 50, label: '50%', position: 50 },
    { value: 75, label: '75%', position: 75 },
    { value: 90, label: '90%', position: 90 },
    { value: 99, label: '99%', position: 99 },
  ]

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Users className={`w-4 h-4 ${platform?.iconColor || 'text-purple-500'}`} />
          <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            How You Compare
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Percentile Label */}
        <div className="text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
            style={{ backgroundColor: `${platform?.accentColor}20`, color: platform?.accentColor }}
          >
            {analysis.label}
          </span>
        </div>

        {/* Visual Scale */}
        <div className="relative pt-6 pb-2">
          {/* Background gradient bar */}
          <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-emerald-500 to-purple-500 opacity-30" />

          {/* Percentile markers */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-1">
            {percentileMarkers.map((marker) => (
              <div
                key={marker.value}
                className="flex flex-col items-center"
                style={{ position: 'absolute', left: `${marker.position}%`, transform: 'translateX(-50%)' }}
              >
                <span className={`text-[10px] font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {marker.label}
                </span>
              </div>
            ))}
          </div>

          {/* User position marker */}
          <div
            className="absolute top-5 -translate-x-1/2 transition-all duration-500 ease-out"
            style={{ left: `${analysis.position}%` }}
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{ backgroundColor: platform?.accentColor }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm text-center ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          You're in the <span className="font-semibold" style={{ color: platform?.accentColor }}>top {100 - analysis.percentile}%</span> of {platform?.name || 'creators'} by {analysis.metricLabel.toLowerCase()}
        </p>

        {/* Comparison to median */}
        <div className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${analysis.currentValue >= analysis.median ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              vs. Industry Average
            </span>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${analysis.currentValue >= analysis.median ? 'text-emerald-500' : 'text-amber-500'}`}>
              {analysis.vsMedian} average
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Median: {formatNumber(analysis.median)}
            </p>
          </div>
        </div>

        {/* Percentile breakdown */}
        <div className={`grid grid-cols-3 gap-2 text-center text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
          <div>
            <p className="font-medium">Bottom 50%</p>
            <p>&lt; {formatNumber(benchmark.percentiles.p50)}</p>
          </div>
          <div>
            <p className="font-medium">Top 10%</p>
            <p>&gt; {formatNumber(benchmark.percentiles.p90)}</p>
          </div>
          <div>
            <p className="font-medium">Top 1%</p>
            <p>&gt; {formatNumber(benchmark.percentiles.p99)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
