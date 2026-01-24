import { X, CheckCircle2, ExternalLink, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { monetizationThresholds } from '@/data/thresholds'
import { platforms } from '@/platforms/registry'
import { getPlatformColors } from '@/data/platformColors'

interface PlatformRequirementsModalProps {
  platformId: string
  theme: 'dark' | 'light'
  onClose: () => void
}

export function PlatformRequirementsModal({ platformId, theme, onClose }: PlatformRequirementsModalProps) {
  const threshold = monetizationThresholds.find(t => t.platformId === platformId)
  const platform = platforms.find(p => p.id === platformId)
  const colors = getPlatformColors(platformId)

  if (!threshold || !platform) {
    return null
  }

  const Icon = platform.icon

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
    return num.toLocaleString()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className={`relative max-w-lg w-full max-h-[90vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${colors.light}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: colors.light }} />
              </div>
            )}
            <div>
              <CardTitle className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {platform.name} Monetization
              </CardTitle>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {threshold.programName}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Requirements Section */}
          <div>
            <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2 ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
            }`}>
              <Award className="w-4 h-4" />
              Minimum Requirements
            </h3>
            <div className="space-y-3">
              {threshold.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                  }`}
                >
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                    {req.name}
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: colors.light }}
                  >
                    {req.required === 0 ? 'No minimum' : formatNumber(req.required)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          {threshold.benefits && threshold.benefits.length > 0 && (
            <div>
              <h3 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
                theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                What You Unlock
              </h3>
              <ul className="space-y-2">
                {threshold.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Note Section */}
          {threshold.note && (
            <div className={`p-3 rounded-lg border ${
              theme === 'dark' ? 'bg-zinc-800/50 border-zinc-700' : 'bg-amber-50 border-amber-200'
            }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-amber-800'}`}>
                💡 {threshold.note}
              </p>
            </div>
          )}

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full"
            style={{ backgroundColor: colors.light }}
          >
            Got it!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
