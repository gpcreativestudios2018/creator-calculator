import { X, Play, Bell } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface VideoTutorialsProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function VideoTutorials({ theme, onClose }: VideoTutorialsProps) {
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
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Video Tutorials
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Learn how to maximize your creator earnings
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
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            {/* Play icon with pulse animation */}
            <div className="relative mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <Play className="w-12 h-12 text-purple-500 ml-1" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-20" />
            </div>

            <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Coming Soon!
            </h2>

            <p className={`max-w-md mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              We're creating video tutorials to help you get the most out of Creator Calculator.
              Topics will include platform-specific strategies, understanding your metrics, and maximizing revenue.
            </p>

            {/* Planned topics */}
            <div className={`w-full max-w-sm text-left p-4 rounded-lg mb-8 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-50'}`}>
              <p className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Planned tutorials:
              </p>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Getting started with Creator Calculator
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Understanding RPM, CPM, and engagement rates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Using AI tools to grow faster
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Creating your media kit and rate card
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Platform comparison and switching strategies
                </li>
              </ul>
            </div>

            {/* Notify button (non-functional placeholder) */}
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => alert('Notification feature coming soon!')}
            >
              <Bell className="w-4 h-4 mr-2" />
              Notify Me When Ready
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
