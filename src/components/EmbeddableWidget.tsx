import { useState } from 'react'
import { X, Code, Copy, Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmbeddableWidgetProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function EmbeddableWidget({ theme, onClose }: EmbeddableWidgetProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<'minimal' | 'full' | 'button'>('minimal')

  const baseUrl = window.location.origin

  const embedCodes = {
    minimal: `<iframe
  src="${baseUrl}?embed=true&style=minimal"
  width="400"
  height="300"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
></iframe>`,
    full: `<iframe
  src="${baseUrl}?embed=true&style=full"
  width="100%"
  height="600"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
></iframe>`,
    button: `<a
  href="${baseUrl}"
  target="_blank"
  style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; text-decoration: none; border-radius: 8px; font-family: system-ui, sans-serif; font-weight: 600;"
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
  Calculate Your Earnings
</a>`,
  }

  const handleCopy = (type: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const styles = [
    { id: 'minimal', name: 'Minimal Widget', description: 'Compact calculator for sidebars' },
    { id: 'full', name: 'Full Calculator', description: 'Complete calculator experience' },
    { id: 'button', name: 'CTA Button', description: 'Simple link button' },
  ] as const

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
                Embed Creator Calculator
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Add the calculator to your website or blog
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className={`rounded-xl p-6 mb-8 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/30' : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'}`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <Code className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h2 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Embed on Your Site
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Help your audience calculate their potential earnings by embedding Creator Calculator on your website,
                blog, or landing page. Choose from different styles below.
              </p>
            </div>
          </div>
        </div>

        {/* Style Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedStyle === style.id
                  ? theme === 'dark'
                    ? 'bg-purple-500/20 border-2 border-purple-500'
                    : 'bg-purple-50 border-2 border-purple-500'
                  : theme === 'dark'
                    ? 'bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <p className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                {style.name}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {style.description}
              </p>
            </button>
          ))}
        </div>

        {/* Preview */}
        <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-6">
            <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Preview
            </h3>
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
              {selectedStyle === 'button' ? (
                <div className="flex justify-center">
                  <a
                    href={baseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    Calculate Your Earnings
                  </a>
                </div>
              ) : (
                <div className={`flex items-center justify-center ${selectedStyle === 'minimal' ? 'h-48' : 'h-64'}`}>
                  <div className={`text-center ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    <ExternalLink className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {selectedStyle === 'minimal' ? '400×300 widget preview' : 'Full-width calculator preview'}
                    </p>
                    <a
                      href={`${baseUrl}?embed=true&style=${selectedStyle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:text-purple-400 text-sm mt-2 inline-block"
                    >
                      Open preview →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Embed Code */}
        <Card className={`mb-6 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Embed Code
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(selectedStyle, embedCodes[selectedStyle])}
                className={theme === 'dark' ? 'border-zinc-700' : ''}
              >
                {copied === selectedStyle ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <pre className={`p-4 rounded-lg overflow-x-auto text-sm ${theme === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-zinc-700'}`}>
              <code>{embedCodes[selectedStyle]}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className={`${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
          <CardContent className="p-6">
            <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              How to Use
            </h3>
            <ol className={`space-y-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-sm font-semibold">1</span>
                <span>Choose a widget style that fits your website design</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-sm font-semibold">2</span>
                <span>Click "Copy Code" to copy the embed code to your clipboard</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-sm font-semibold">3</span>
                <span>Paste the code into your website's HTML where you want the widget to appear</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-sm font-semibold">4</span>
                <span>Adjust the width/height values if needed to fit your layout</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="h-8" />
      </div>
    </div>
  )
}
