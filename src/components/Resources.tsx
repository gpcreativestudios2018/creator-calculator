import { useState, useMemo } from 'react'
import { X, ExternalLink, Search, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resources, resourceCategories } from '@/data/resources'

interface ResourcesProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function Resources({ theme, onClose }: ResourcesProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = useMemo(() => {
    let filtered = resources

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(r => r.category === activeCategory)
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [activeCategory, searchQuery])

  const featuredResources = useMemo(() =>
    resources.filter(r => r.featured),
    []
  )

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
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
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Creator Resources
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Tools, guides, and communities to help you grow
              </p>
            </div>
            <Button variant="outline" onClick={onClose} className={theme === 'dark' ? 'border-zinc-700' : ''}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : 'bg-white border-gray-300'}`}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {resourceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : theme === 'dark'
                      ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                      : 'bg-gray-200 text-zinc-600 hover:bg-gray-300'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Featured Section (only show on 'all' category with no search) */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              <Star className="w-5 h-5 text-yellow-500" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] border-2 border-yellow-500/30 ${
                    theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => handleResourceClick(resource.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{resource.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {resource.title}
                          </h3>
                          <ExternalLink className={`w-3 h-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        </div>
                        <p className={`text-sm mt-1 line-clamp-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Resources Grid */}
        <div>
          {activeCategory === 'all' && !searchQuery && (
            <h2 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              All Resources
            </h2>
          )}

          {filteredResources.length === 0 ? (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <p className="text-lg">No resources found</p>
              <p className="text-sm mt-1">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleResourceClick(resource.url)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{resource.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                            {resource.title}
                          </h3>
                          <ExternalLink className={`w-3 h-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        </div>
                        <p className={`text-sm mt-1 line-clamp-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {resource.description}
                        </p>
                        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded ${
                          theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-zinc-500'
                        }`}>
                          {resourceCategories.find(c => c.id === resource.category)?.name}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}
