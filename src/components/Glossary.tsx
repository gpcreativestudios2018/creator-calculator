import { useState, useMemo, useRef } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { glossary, type GlossaryTerm } from '@/data/glossary'

interface GlossaryProps {
  onClose: () => void
  theme: 'dark' | 'light'
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'business', label: 'Business' },
] as const

type CategoryFilter = 'all' | GlossaryTerm['category']

export function Glossary({ onClose, theme }: GlossaryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const filteredTerms = useMemo(() => {
    let terms = glossary

    // Filter by category
    if (activeCategory !== 'all') {
      terms = terms.filter(term => term.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      terms = terms.filter(
        term =>
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query)
      )
    }

    return terms
  }, [searchQuery, activeCategory])

  const scrollToTerm = (termName: string) => {
    // Clear filters to show all terms
    setActiveCategory('all')
    setSearchQuery('')

    // Wait for re-render then scroll
    setTimeout(() => {
      const ref = termRefs.current[termName]
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Add highlight effect
        ref.classList.add('ring-2', 'ring-purple-500')
        setTimeout(() => {
          ref.classList.remove('ring-2', 'ring-purple-500')
        }, 2000)
      }
    }, 100)
  }

  const getCategoryColor = (category: GlossaryTerm['category']) => {
    switch (category) {
      case 'revenue':
        return theme === 'dark' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
      case 'metrics':
        return theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-700'
      case 'platforms':
        return theme === 'dark' ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-700'
      case 'business':
        return theme === 'dark' ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-100 text-amber-700'
    }
  }

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
          <h1 className="text-2xl font-bold">Creator Economy Glossary</h1>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {glossary.length} essential terms every creator should know
          </p>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
            <Input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-10 ${
                theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                  : 'bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-900'}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      : 'bg-gray-200 text-zinc-600 hover:bg-gray-300 hover:text-zinc-900'
                }`}
              >
                {category.label}
                {category.id !== 'all' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({glossary.filter(t => t.category === category.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {filteredTerms.length === 0 ? (
          <div className={`text-center py-12 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No terms found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <Card
                key={term.term}
                ref={(el) => { termRefs.current[term.term] = el }}
                className={`overflow-hidden transition-all duration-300 ${
                  theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {term.term}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getCategoryColor(term.category)}`}>
                      {term.category}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {term.definition}
                  </p>
                  {term.related && term.related.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-dashed" style={{ borderColor: theme === 'dark' ? '#3f3f46' : '#e5e7eb' }}>
                      <p className={`text-xs mb-1.5 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Related:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {term.related.map((relatedTerm) => (
                          <button
                            key={relatedTerm}
                            onClick={() => scrollToTerm(relatedTerm)}
                            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                              theme === 'dark'
                                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                                : 'bg-gray-100 text-zinc-600 hover:bg-gray-200 hover:text-zinc-900'
                            }`}
                          >
                            {relatedTerm}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results count */}
        {filteredTerms.length > 0 && (
          <p className={`text-center mt-8 text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Showing {filteredTerms.length} of {glossary.length} terms
          </p>
        )}

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
