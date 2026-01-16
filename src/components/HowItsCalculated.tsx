import { useState } from 'react'
import { ChevronDown, ChevronUp, Info, ExternalLink, AlertTriangle, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { getMethodologyByPlatformId } from '@/data/methodology'
import { useTheme } from '@/components/ThemeProvider'

interface HowItsCalculatedProps {
  platformId: string
}

export function HowItsCalculated({ platformId }: HowItsCalculatedProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme } = useTheme()
  const methodology = getMethodologyByPlatformId(platformId)

  if (!methodology) {
    return null
  }

  return (
    <Card className={`mb-6 overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
          theme === 'dark'
            ? 'hover:bg-zinc-800/50'
            : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <Info className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            How This Is Calculated
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`} />
        ) : (
          <ChevronDown className={`w-5 h-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`} />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <CardContent className={`pt-0 pb-6 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
          {/* How It Works */}
          <div className="mt-4 mb-6">
            <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <BookOpen className="w-4 h-4" />
              Overview
            </h4>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {methodology.howItWorks}
            </p>
          </div>

          {/* Formulas */}
          <div className="mb-6">
            <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Formulas
            </h4>
            <div className="space-y-3">
              {methodology.formulas.map((formula, index) => (
                <div
                  key={index}
                  className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}
                >
                  <div className={`px-4 py-2 border-b ${theme === 'dark' ? 'border-zinc-700 bg-zinc-800/80' : 'border-gray-200 bg-gray-50'}`}>
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
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
              {methodology.assumptions.map((assumption, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === 'dark' ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className={`mb-6 p-4 rounded-lg border ${
            theme === 'dark'
              ? 'bg-amber-950/20 border-amber-900/30'
              : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-amber-500' : 'text-amber-600'}`} />
              <p className={`text-sm ${theme === 'dark' ? 'text-amber-200/80' : 'text-amber-800'}`}>
                {methodology.disclaimer}
              </p>
            </div>
          </div>

          {/* Sources */}
          {methodology.sources.length > 0 && (
            <div className="mb-4">
              <h4 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                {methodology.sources.map((source, index) => (
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

          {/* Footer */}
          <div className={`pt-4 border-t ${theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'}`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Last updated: {methodology.lastUpdated} &bull; Formula {methodology.version}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
