import { ArrowLeft, ExternalLink, AlertTriangle, TrendingDown, Globe, Calendar, Users, Percent } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platforms } from '@/platforms/registry'
import { methodology } from '@/data/methodology'

interface MethodologyPageProps {
  onClose: () => void
  theme: 'dark' | 'light'
}

export function MethodologyPage({ onClose, theme }: MethodologyPageProps) {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-zinc-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b ${theme === 'dark' ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white/95 border-gray-200'} backdrop-blur-sm`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onClose}
            className={`flex items-center gap-2 text-sm font-medium mb-3 transition-colors ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Calculator
          </button>
          <h1 className="text-2xl font-bold">Calculation Methodology</h1>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Complete documentation of all formulas, assumptions, and data sources used in our revenue estimates.
            Understanding these calculations helps you make informed decisions about your creator business.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Platform Sections */}
        <div className="space-y-8">
          {platforms.map((platform) => {
            const platformMethodology = methodology[platform.id]
            if (!platformMethodology) return null

            const Icon = platform.icon

            return (
              <Card
                key={platform.id}
                className={`overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}
              >
                <CardHeader className="border-b" style={{ borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${platform.accentColor}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: platform.accentColor }} />
                    </div>
                    <div>
                      <CardTitle className={theme === 'dark' ? 'text-white' : 'text-zinc-900'}>
                        {platform.name}
                      </CardTitle>
                      <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {platform.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {/* How It Works */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      How It Works
                    </h4>
                    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {platformMethodology.howItWorks}
                    </p>
                  </div>

                  {/* Formulas */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Formulas
                    </h4>
                    <div className="space-y-3">
                      {platformMethodology.formulas.map((formula, index) => (
                        <div
                          key={index}
                          className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
                        >
                          <div
                            className={`px-4 py-2 border-b ${
                              theme === 'dark' ? 'border-zinc-700 bg-zinc-800/80' : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <span className="text-sm font-medium" style={{ color: platform.accentColor }}>
                              {formula.name}
                            </span>
                          </div>
                          <div className="px-4 py-3">
                            <code className={`block text-sm font-mono mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                              {formula.formula}
                            </code>
                            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                              {formula.explanation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assumptions */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      Key Assumptions
                    </h4>
                    <ul className={`space-y-1.5 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {platformMethodology.assumptions.map((assumption, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
                          <span>{assumption}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sources */}
                  {platformMethodology.sources.length > 0 && (
                    <div className="mb-4">
                      <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        Data Sources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {platformMethodology.sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                              theme === 'dark'
                                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                                : 'bg-gray-100 text-zinc-600 hover:bg-gray-200 hover:text-zinc-900'
                            }`}
                          >
                            {source.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Version Info */}
                  <div className={`pt-4 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
                    <p className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Last updated: {platformMethodology.lastUpdated} &bull; Formula {platformMethodology.version}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Why Earnings Vary Section */}
        <Card className={`mt-8 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <TrendingDown className="w-5 h-5 text-amber-500" />
              Why Your Actual Earnings May Vary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Our estimates provide a reasonable baseline, but real creator earnings can vary significantly due to several factors:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Geography */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Audience Geography
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  US/UK/EU audiences typically generate 2-5x higher ad revenue than viewers from developing countries. A channel with 80% US viewers will earn significantly more than one with 80% Indian viewers.
                </p>
              </div>

              {/* Seasonality */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Seasonality
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Q4 (Oct-Dec) typically sees 20-50% higher CPMs due to holiday advertising. January often sees the lowest rates as advertisers reset budgets.
                </p>
              </div>

              {/* Audience Demographics */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Audience Demographics
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Audiences with higher purchasing power (professionals, high-income demographics) command premium ad rates. A finance channel targeting executives earns more per view than one targeting students.
                </p>
              </div>

              {/* Engagement Quality */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-red-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Engagement Quality
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Watch time, retention rates, and click-through rates all affect revenue. Highly engaged audiences who watch longer and interact more generate better outcomes for sponsors.
                </p>
              </div>
            </div>

            <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              <h5 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Other Factors That Affect Earnings:
              </h5>
              <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li>• <strong>Content niche</strong> — Finance, tech, and B2B niches typically pay 5-10x more than entertainment</li>
                <li>• <strong>Content length</strong> — Longer videos (8+ min) can run more ads, increasing revenue per view</li>
                <li>• <strong>Upload consistency</strong> — Regular uploading improves algorithmic favorability</li>
                <li>• <strong>Platform algorithm changes</strong> — Reach and monetization rules change frequently</li>
                <li>• <strong>Advertiser demand</strong> — Economic conditions affect how much brands spend on ads</li>
                <li>• <strong>Content suitability</strong> — Some content gets limited ads or demonetized</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* General Disclaimer */}
        <Card className={`mt-8 ${theme === 'dark' ? 'bg-amber-950/30 border-amber-900/50' : 'bg-amber-50 border-amber-200'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'}`} />
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
                  Important Disclaimer
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800/80'}`}>
                  All calculations provided by Creator Calculator are estimates based on publicly available data and industry
                  research. Actual earnings vary significantly based on many factors outside our control. These estimates
                  should not be used as financial advice or for business planning without consulting appropriate professionals.
                  Platform policies, revenue share percentages, and monetization rules can change without notice.
                </p>
                <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-amber-200/60' : 'text-amber-800/60'}`}>
                  Last methodology review: January 2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              theme === 'dark'
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                : 'bg-gray-200 text-zinc-600 hover:bg-gray-300 hover:text-zinc-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Calculator
          </button>
        </div>
      </main>
    </div>
  )
}
