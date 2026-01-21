import { useState } from 'react'
import { X, Play, Clock, ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoTutorialsProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

interface Video {
  id: string
  youtubeId: string
  title: string
  channel: string
  duration: string
  category: 'getting-started' | 'monetization' | 'growth' | 'brand-deals'
  description: string
}

const videos: Video[] = [
  {
    id: '1',
    youtubeId: 'G8aDsx9NQWU',
    title: 'How to Start a YouTube Channel - Beginner\'s Guide to YouTube',
    channel: 'Think Media',
    duration: '23:41',
    category: 'getting-started',
    description: 'Complete step-by-step guide to launching your YouTube channel the right way.'
  },
  {
    id: '2',
    youtubeId: 'XzxVfKCx5gY',
    title: 'How Much Money YouTube Pays Me (With 100K Subscribers)',
    channel: 'Cathrin Manning',
    duration: '14:28',
    category: 'monetization',
    description: 'Real earnings breakdown from a creator with 100K subscribers.'
  },
  {
    id: '3',
    youtubeId: 'unkIjvTIFQ4',
    title: 'My 9 Sources of Income (Passive Income Ideas)',
    channel: 'Ali Abdaal',
    duration: '20:27',
    category: 'monetization',
    description: 'Building multiple income streams as a content creator.'
  },
  {
    id: '4',
    youtubeId: '6SpP_VIfFu4',
    title: 'How to Get Sponsored on YouTube (With ANY Size Channel)',
    channel: 'Roberto Blake',
    duration: '12:33',
    category: 'brand-deals',
    description: 'Practical strategies to land your first sponsorship as a small creator.'
  },
  {
    id: '5',
    youtubeId: 'iLtPqfP4Xec',
    title: 'TikTok Creativity Program - How Much I Made',
    channel: 'Hayls World',
    duration: '11:45',
    category: 'monetization',
    description: 'Honest breakdown of TikTok earnings and monetization strategies.'
  },
  {
    id: '6',
    youtubeId: 'FFjP82vMX0U',
    title: 'How to Grow on Instagram in 2024 (NEW Algorithm)',
    channel: 'Vanessa Lau',
    duration: '18:24',
    category: 'growth',
    description: 'Understanding the Instagram algorithm to grow your following faster.'
  },
  {
    id: '7',
    youtubeId: 'LJ2gKKJAfCc',
    title: 'YouTube CPM Explained - How YouTubers Get Paid',
    channel: 'vidIQ',
    duration: '10:15',
    category: 'monetization',
    description: 'Understanding CPM, RPM, and how YouTube ad revenue actually works.'
  },
  {
    id: '8',
    youtubeId: 'VJuP-eCGnEw',
    title: 'The Creator Economy: How to Build a Business',
    channel: 'Colin and Samir',
    duration: '19:32',
    category: 'getting-started',
    description: 'Understanding the business of being a content creator in the modern era.'
  }
]

const categories = [
  { id: 'all', label: 'All Videos' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'monetization', label: 'Monetization' },
  { id: 'growth', label: 'Growth' },
  { id: 'brand-deals', label: 'Brand Deals' }
]

export function VideoTutorials({ theme, onClose }: VideoTutorialsProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const filteredVideos = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory)

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-zinc-950' : 'bg-gray-50'}`}>
        {/* Header */}
        <div
          className="sticky top-0 z-10 border-b backdrop-blur-sm"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(9, 9, 11, 0.95)' : 'rgba(249, 250, 251, 0.95)',
            borderColor: theme === 'dark' ? '#27272a' : '#e5e7eb'
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  Creator Tutorials 🎬
                </h1>
                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Learn from top creators about monetization, growth, and building your brand
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => selectedVideo ? setSelectedVideo(null) : onClose()}
                className={theme === 'dark' ? 'border-zinc-700' : ''}
              >
                <X className="w-4 h-4 mr-2" />
                {selectedVideo ? 'Back' : 'Close'}
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-purple-600 text-white'
                      : theme === 'dark'
                        ? 'bg-zinc-800 text-zinc-400 hover:text-white'
                        : 'bg-gray-200 text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {selectedVideo ? (
            /* Video Player View */
            <div>
              <button
                onClick={() => setSelectedVideo(null)}
                className={`flex items-center gap-2 text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to all videos
              </button>

              {/* Embedded YouTube Player */}
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="max-w-4xl mx-auto">
                <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                  {selectedVideo.title}
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    {selectedVideo.channel}
                  </span>
                  <span className={`flex items-center gap-1 text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                </div>
                <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {selectedVideo.description}
                </p>

                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 mt-4 text-sm ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Watch on YouTube
                </a>
              </div>
            </div>
          ) : (
            /* Video Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`group cursor-pointer rounded-xl overflow-hidden border transition-all hover:scale-[1.02] hover:shadow-lg ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-zinc-800">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <div className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'bg-black/80 text-white' : 'bg-black/80 text-white'}`}>
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className={`font-semibold mb-1 line-clamp-2 group-hover:text-purple-500 transition-colors ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {video.title}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                      {video.channel}
                    </p>
                    <p className={`text-sm mt-2 line-clamp-2 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <p className={theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}>
                No videos in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
