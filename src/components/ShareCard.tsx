import { useState, useRef } from 'react'
import { Camera, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { domToPng } from 'modern-screenshot'
import { platforms } from '@/platforms/registry'

interface ShareCardProps {
  platformId: string
  monthlyRevenue: number
  yearlyRevenue: number
  theme: 'dark' | 'light'
  onClose: () => void
}

export function ShareCard({ platformId, monthlyRevenue, yearlyRevenue, theme, onClose }: ShareCardProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const platform = platforms.find(p => p.id === platformId)
  if (!platform) return null

  const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  const handleDownload = async () => {
    if (!cardRef.current) return

    setIsCapturing(true)

    try {
      const dataUrl = await domToPng(cardRef.current, {
        scale: 2,
        backgroundColor: '#09090b',
      })

      const link = document.createElement('a')
      link.download = `${platform.name.toLowerCase()}-earnings-card.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Screenshot failed:', error)
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className={`relative max-w-md w-full ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} rounded-xl p-6`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-zinc-500 hover:text-zinc-900'}`}
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Download Share Card
        </h3>

        {/* The Card to Capture */}
        <div
          ref={cardRef}
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: '#09090b' }}
        >
          {/* Header with gradient */}
          <div
            className="p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${platform.accentColor}40, ${platform.accentColor}10)`,
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <platform.icon className={`w-8 h-8 ${platform.iconColor}`} />
              <span className="text-2xl font-bold text-white">{platform.name}</span>
            </div>
            <p className="text-zinc-400 text-sm">Estimated Creator Earnings</p>
          </div>

          {/* Revenue Display */}
          <div className="p-6 space-y-4">
            <div className="text-center">
              <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">Monthly Revenue</p>
              <p className="text-4xl font-bold text-emerald-500">{formatCurrency(monthlyRevenue)}</p>
            </div>

            <div className="h-px bg-zinc-800" />

            <div className="text-center">
              <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">Yearly Projection</p>
              <p className="text-3xl font-bold text-blue-500">{formatCurrency(yearlyRevenue)}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-4 flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">CC</span>
            </div>
            <span className="text-zinc-500 text-sm">creator-calculator.vercel.app</span>
          </div>
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownload}
          disabled={isCapturing}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isCapturing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              Download Image
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
