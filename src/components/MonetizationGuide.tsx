import { useMemo } from 'react'
import { X, ExternalLink, CheckCircle2, XCircle, Lightbulb, AlertTriangle, DollarSign, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { monetizationGuides } from '@/data/monetizationGuides'
import { platforms } from '@/platforms/registry'
import { getPlatformColors } from '@/data/platformColors'

interface MonetizationGuideProps {
  platformId: string
  theme: 'dark' | 'light'
  onClose: () => void
}

export function MonetizationGuide({ platformId, theme, onClose }: MonetizationGuideProps) {
  const guide = useMemo(() =>
    monetizationGuides.find(g => g.platformId === platformId),
    [platformId]
  )

  const platform = useMemo(() =>
    platforms.find(p => p.id === platformId),
    [platformId]
  )

  const colors = getPlatformColors(platformId)

  if (!guide || !platform) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <Card className={`max-w-md mx-4 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
          <CardContent className="p-6 text-center">
            <p className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
              Guide not available for this platform yet.
            </p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const Icon = platform.icon

  const potentialColors = {
    low: { bg: 'bg-zinc-500/20', text: 'text-zinc-400', label: 'Low' },
    medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', label: 'Medium' },
    high: { bg: 'bg-emerald-500/20', text: 'text-emerald-500', label: 'High' },
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b backdrop-blur-sm"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(9, 9, 11, 0.95)' : 'rgba(249, 250, 251, 0.95)',
          borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${colors.light}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: colors.light }} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {guide.title}
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Complete monetization guide
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Overview */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <BookOpen className="w-5 h-5" style={{ color: colors.light }} />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {guide.overview}
            </p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: colors.light }} />
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Revenue Streams */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <DollarSign className="w-5 h-5 text-green-500" />
              Revenue Streams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {guide.revenueStreams.map((stream, idx) => {
                const potential = potentialColors[stream.potential]
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {stream.name}
                      </h4>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${potential.bg} ${potential.text}`}>
                        {potential.label} Potential
                      </span>
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {stream.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {guide.tips.map((tip, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-500/5' : 'bg-yellow-50'}`}
                >
                  <span className="text-yellow-500 font-bold text-sm mt-0.5">{idx + 1}</span>
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Common Mistakes */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {guide.mistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{mistake}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
          <CardHeader className="pb-3">
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <ExternalLink className="w-5 h-5" style={{ color: colors.light }} />
              Official Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {guide.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      : 'bg-gray-100 text-zinc-700 hover:bg-gray-200'
                  }`}
                >
                  {resource.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom padding for scroll */}
        <div className="h-8" />
      </div>
    </div>
  )
}
