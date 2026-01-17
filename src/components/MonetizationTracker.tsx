import { useState, useMemo } from 'react'
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Award, Lock, Unlock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { monetizationThresholds } from '@/data/thresholds'
import { platforms } from '@/platforms/registry'
import { getPlatformColors } from '@/data/platformColors'

interface MonetizationTrackerProps {
  theme: 'dark' | 'light'
  allInputValues: Record<string, Record<string, number>>
  onClose: () => void
}

export function MonetizationTracker({ theme, allInputValues, onClose }: MonetizationTrackerProps) {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'eligible' | 'inProgress'>('all')

  const platformStatus = useMemo(() => {
    return monetizationThresholds.map(threshold => {
      const platform = platforms.find(p => p.id === threshold.platformId)
      const colors = getPlatformColors(threshold.platformId)
      const currentValues = allInputValues[threshold.platformId] || {}

      const requirements = threshold.requirements.map(req => {
        const current = currentValues[req.metric] || 0
        const percentage = req.required === 0 ? 100 : Math.min((current / req.required) * 100, 100)
        const isMet = req.required === 0 || current >= req.required

        return {
          ...req,
          current,
          percentage,
          isMet,
        }
      })

      const metCount = requirements.filter(r => r.isMet).length
      const totalCount = requirements.length
      const isEligible = metCount === totalCount
      const overallProgress = totalCount > 0 ? (requirements.reduce((sum, r) => sum + r.percentage, 0) / totalCount) : 100

      return {
        ...threshold,
        platform,
        colors,
        requirements,
        metCount,
        totalCount,
        isEligible,
        overallProgress,
      }
    })
  }, [allInputValues])

  const filteredPlatforms = useMemo(() => {
    switch (filter) {
      case 'eligible':
        return platformStatus.filter(p => p.isEligible)
      case 'inProgress':
        return platformStatus.filter(p => !p.isEligible && p.overallProgress > 0)
      default:
        return platformStatus
    }
  }, [platformStatus, filter])

  const stats = useMemo(() => {
    const eligible = platformStatus.filter(p => p.isEligible).length
    const inProgress = platformStatus.filter(p => !p.isEligible && p.overallProgress > 0).length
    const notStarted = platformStatus.filter(p => p.overallProgress === 0 && !p.isEligible).length
    return { eligible, inProgress, notStarted, total: platformStatus.length }
  }, [platformStatus])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toLocaleString()
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-zinc-950/95 border-zinc-800' : 'bg-gray-50/95 border-gray-200'} border-b backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-500" />
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Monetization Tracker
              </h1>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              Close
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              onClick={() => setFilter('eligible')}
              className={`p-3 rounded-lg text-center transition-all ${
                filter === 'eligible'
                  ? 'bg-emerald-500/20 ring-2 ring-emerald-500'
                  : theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Unlock className="w-4 h-4 text-emerald-500" />
                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {stats.eligible}
                </span>
              </div>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Eligible</span>
            </button>

            <button
              onClick={() => setFilter('inProgress')}
              className={`p-3 rounded-lg text-center transition-all ${
                filter === 'inProgress'
                  ? 'bg-blue-500/20 ring-2 ring-blue-500'
                  : theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Circle className="w-4 h-4 text-blue-500" />
                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {stats.inProgress}
                </span>
              </div>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>In Progress</span>
            </button>

            <button
              onClick={() => setFilter('all')}
              className={`p-3 rounded-lg text-center transition-all ${
                filter === 'all'
                  ? 'bg-purple-500/20 ring-2 ring-purple-500'
                  : theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Award className="w-4 h-4 text-purple-500" />
                <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {stats.total}
                </span>
              </div>
              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>All Platforms</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid gap-3">
          {filteredPlatforms.map((item) => {
            const isExpanded = expandedPlatform === item.platformId
            const Icon = item.platform?.icon

            return (
              <Card
                key={item.platformId}
                className={`overflow-hidden transition-all ${
                  theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                } ${isExpanded ? 'ring-2' : ''}`}
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: item.colors.primary,
                  ...(isExpanded ? { ringColor: item.colors.primary } : {})
                }}
              >
                <button
                  onClick={() => setExpandedPlatform(isExpanded ? null : item.platformId)}
                  className="w-full text-left"
                >
                  <CardHeader className="py-3 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${item.colors.primary}20` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: item.colors.primary }} />
                          </div>
                        )}
                        <div>
                          <CardTitle className={`text-base ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {item.platform?.name || item.platformId}
                          </CardTitle>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {item.programName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.isEligible ? (
                          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-500">
                            <CheckCircle2 className="w-5 h-5" />
                            Eligible
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className={`w-24 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${item.overallProgress}%`,
                                  backgroundColor: item.colors.primary,
                                }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              {Math.round(item.overallProgress)}%
                            </span>
                          </div>
                        )}
                        {isExpanded ? (
                          <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        ) : (
                          <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </button>

                {isExpanded && (
                  <CardContent className={`pt-0 pb-4 px-4 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-100'}`}>
                    {/* Requirements */}
                    <div className="mt-4 space-y-3">
                      <h4 className={`text-xs font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Requirements
                      </h4>
                      {item.requirements.map((req) => (
                        <div key={req.name} className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                              {req.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                {formatNumber(req.current)} / {formatNumber(req.required)}
                              </span>
                              {req.isMet ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Lock className="w-4 h-4 text-zinc-500" />
                              )}
                            </div>
                          </div>
                          <div className={`h-1.5 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${req.percentage}%`,
                                backgroundColor: req.isMet ? '#10b981' : item.colors.primary,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    {item.benefits && item.benefits.length > 0 && (
                      <div className="mt-4">
                        <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          What You Unlock
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.benefits.map((benefit, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.isEligible
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-zinc-600'
                              }`}
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Note */}
                    {item.note && (
                      <p className={`text-xs mt-3 italic ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {item.note}
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {filteredPlatforms.length === 0 && (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            No platforms match this filter. Enter data in the calculator to track progress!
          </div>
        )}
      </div>
    </div>
  )
}
