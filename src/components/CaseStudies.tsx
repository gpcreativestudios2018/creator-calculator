import { useState } from 'react'
import { X, DollarSign, TrendingUp, Lightbulb, Quote, ChevronRight, Users, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { platforms } from '@/platforms/registry'
import { getPlatformColors } from '@/data/platformColors'

interface CaseStudiesProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function CaseStudies({ theme, onClose }: CaseStudiesProps) {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)

  const formatCurrency = (num: number) => `$${num.toLocaleString()}`

  const getPlatformIcon = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId)
    return platform?.icon
  }

  const getPlatformColor = (platformId: string) => {
    return getPlatformColors(platformId).light
  }

  // Detail view for a single case study
  if (selectedStudy) {
    const primaryPlatform = selectedStudy.platforms[0]
    const colors = getPlatformColors(primaryPlatform)

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
              <button
                onClick={() => setSelectedStudy(null)}
                className={`flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                ← Back to all case studies
              </button>
              <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Hero */}
          <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{selectedStudy.avatar}</div>
                <div className="flex-1">
                  <h1 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {selectedStudy.name}
                  </h1>
                  <p className={`text-lg mb-3 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {selectedStudy.niche}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedStudy.platforms.map(pId => {
                      const Icon = getPlatformIcon(pId)
                      return Icon ? (
                        <span
                          key={pId}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: `${getPlatformColor(pId)}20`, color: getPlatformColor(pId) }}
                        >
                          <Icon className="w-4 h-4" />
                          {platforms.find(p => p.id === pId)?.name}
                        </span>
                      ) : null
                    })}
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Monthly Revenue</p>
                      <p className="text-3xl font-bold text-emerald-500">{formatCurrency(selectedStudy.monthlyRevenue)}</p>
                    </div>
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>Timeline</p>
                      <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{selectedStudy.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story */}
          <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                <Users className="w-5 h-5" style={{ color: colors.light }} />
                Their Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {selectedStudy.journey}
              </p>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                <DollarSign className="w-5 h-5 text-emerald-500" />
                Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedStudy.revenueBreakdown.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{item.source}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {item.percentage}%
                      </span>
                      <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${item.percentage}%`, backgroundColor: colors.light }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                <Calendar className="w-5 h-5 text-blue-500" />
                Key Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedStudy.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors.light }}
                      />
                      {idx < selectedStudy.milestones.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-1 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-300'}`} />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {milestone.period}
                      </p>
                      <p className={theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}>
                        {milestone.achievement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Strategies */}
          <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Key Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedStudy.keyStrategies.map((strategy, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}
                  >
                    <ChevronRight className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.light }} />
                    <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>{strategy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Advice */}
          <Card
            className="border-2"
            style={{
              backgroundColor: theme === 'dark' ? '#18181b' : '#fff',
              borderColor: colors.light
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 flex-shrink-0" style={{ color: colors.light }} />
                <div>
                  <p className={`text-lg italic mb-4 ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>
                    "{selectedStudy.advice}"
                  </p>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    — {selectedStudy.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Learned */}
          <Card className={theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}>
            <CardHeader className="pb-3">
              <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Biggest Lesson Learned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {selectedStudy.lessonLearned}
              </p>
            </CardContent>
          </Card>

          <div className="h-8" />
        </div>
      </div>
    )
  }

  // List view
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
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Creator Success Stories
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Real strategies from creators earning $8K-$42K/month
              </p>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-4">
          {caseStudies.map((study) => {
            const primaryColor = getPlatformColors(study.platforms[0]).light

            return (
              <Card
                key={study.id}
                className={`cursor-pointer transition-all hover:scale-[1.01] ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                style={{ borderLeftWidth: '4px', borderLeftColor: primaryColor }}
                onClick={() => setSelectedStudy(study)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{study.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {study.name}
                          </h3>
                          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {study.niche}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-500">
                            {formatCurrency(study.monthlyRevenue)}
                          </p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            per month
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {study.platforms.map(pId => {
                          const Icon = getPlatformIcon(pId)
                          return Icon ? (
                            <span
                              key={pId}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                              style={{ backgroundColor: `${getPlatformColor(pId)}20`, color: getPlatformColor(pId) }}
                            >
                              <Icon className="w-3 h-3" />
                              {platforms.find(p => p.id === pId)?.name}
                            </span>
                          ) : null
                        })}
                      </div>

                      <p className={`mt-3 text-sm line-clamp-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {study.journey}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {study.timeline}
                        </span>
                        <span className="text-sm font-medium" style={{ color: primaryColor }}>
                          Read story →
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}
