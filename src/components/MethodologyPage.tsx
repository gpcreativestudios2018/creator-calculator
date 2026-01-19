import { useState } from 'react'
import { ArrowLeft, ExternalLink, AlertTriangle, TrendingDown, Globe, Calendar, Users, Percent, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { platforms } from '@/platforms/registry'
import { methodology } from '@/data/methodology'

interface MethodologyPageProps {
  onClose: () => void
  theme: 'dark' | 'light'
}

export function MethodologyPage({ onClose, theme }: MethodologyPageProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const selectedMethodology = selectedPlatform ? methodology[selectedPlatform] : null
  const selectedPlatformData = selectedPlatform ? platforms.find(p => p.id === selectedPlatform) : null

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-zinc-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b ${theme === 'dark' ? 'bg-zinc-900/95 border-zinc-800' : 'bg-white/95 border-gray-200'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={onClose}
            className={`flex items-center gap-2 text-sm font-medium mb-3 transition-colors ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Calculator
          </button>
          <h1 className="text-2xl font-bold">How It Works</h1>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Click on any platform to see the calculation methodology, formulas, and data sources.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Platform Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {platforms.map((platform) => {
            const platformMethodology = methodology[platform.id]
            if (!platformMethodology) return null

            const Icon = platform.icon

            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`p-4 rounded-xl border transition-all hover:scale-105 hover:shadow-lg text-center ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${platform.accentColor}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: platform.accentColor }} />
                </div>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {platform.name}
                </p>
              </button>
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
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Audience Geography
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  US/UK/EU audiences typically generate 2-5x higher ad revenue than viewers from developing countries.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Seasonality
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Q4 (Oct-Dec) typically sees 20-50% higher CPMs due to holiday advertising.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Audience Demographics
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Audiences with higher purchasing power command premium ad rates.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-red-500" />
                  <h5 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    Engagement Quality
                  </h5>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Watch time, retention, and click-through rates all affect revenue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className={`mt-8 ${theme === 'dark' ? 'bg-amber-950/30 border-amber-900/50' : 'bg-amber-50 border-amber-200'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'}`} />
              <div>
                <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-amber-200' : 'text-amber-800'}`}>
                  Important Disclaimer
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800/80'}`}>
                  All calculations are estimates based on publicly available data. Actual earnings vary significantly.
                  Platform policies and revenue share percentages can change without notice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
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

      {/* Platform Modal */}
      {selectedPlatform && selectedMethodology && selectedPlatformData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${
            theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
          }`}>
            <button
              onClick={() => setSelectedPlatform(null)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${selectedPlatformData.accentColor}20` }}
                >
                  <selectedPlatformData.icon className="w-6 h-6" style={{ color: selectedPlatformData.accentColor }} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {selectedPlatformData.name}
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    {selectedPlatformData.description}
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  How It Works
                </h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {selectedMethodology.howItWorks}
                </p>
              </div>

              {/* Formulas */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Formulas
                </h4>
                <div className="space-y-3">
                  {selectedMethodology.formulas.map((formula, index) => (
                    <div
                      key={index}
                      className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
                    >
                      <div
                        className={`px-4 py-2 border-b ${
                          theme === 'dark' ? 'border-zinc-700 bg-zinc-800/80' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-medium" style={{ color: selectedPlatformData.accentColor }}>
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
                  {selectedMethodology.assumptions.map((assumption, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
                      <span>{assumption}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources */}
              {selectedMethodology.sources.length > 0 && (
                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Data Sources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMethodology.sources.map((source, index) => (
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
                  Last updated: {selectedMethodology.lastUpdated} • Formula {selectedMethodology.version}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
