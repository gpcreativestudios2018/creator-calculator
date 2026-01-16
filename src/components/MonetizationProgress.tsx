import { useMemo } from 'react'
import { CheckCircle2, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { monetizationThresholds } from '@/data/thresholds'
import { platforms } from '@/platforms/registry'

interface MonetizationProgressProps {
  platformId: string
  currentValues: Record<string, number>
  theme: 'dark' | 'light'
}

export function MonetizationProgress({ platformId, currentValues, theme }: MonetizationProgressProps) {
  const threshold = useMemo(() =>
    monetizationThresholds.find(t => t.platformId === platformId),
    [platformId]
  )

  const platform = useMemo(() =>
    platforms.find(p => p.id === platformId),
    [platformId]
  )

  const progress = useMemo(() => {
    if (!threshold) return null

    return threshold.requirements.map(req => {
      const current = currentValues[req.metric] || 0
      const percentage = Math.min((current / req.required) * 100, 100)
      const isMet = current >= req.required

      return {
        ...req,
        current,
        percentage,
        isMet,
      }
    })
  }, [threshold, currentValues])

  if (!threshold || !progress) return null

  const metCount = progress.filter(p => p.isMet).length
  const totalCount = progress.length
  const allMet = metCount === totalCount

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className={`w-4 h-4 ${platform?.iconColor || 'text-purple-500'}`} />
            <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              {threshold.programName}
            </CardTitle>
          </div>
          {allMet ? (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
              Eligible!
            </span>
          ) : (
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {metCount} of {totalCount} met
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {progress.map((req) => (
          <div key={req.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {req.name}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {formatNumber(req.current)} / {formatNumber(req.required)}
                </span>
                {req.isMet ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <span className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {Math.round(req.percentage)}%
                  </span>
                )}
              </div>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${req.percentage}%`,
                  backgroundColor: req.isMet ? '#10b981' : platform?.accentColor || '#8b5cf6',
                }}
              />
            </div>
          </div>
        ))}

        {'note' in threshold && threshold.note && (
          <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {threshold.note}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
