import { useState } from 'react'
import { Camera, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { domToPng } from 'modern-screenshot'

interface ScreenshotExportProps {
  targetId: string
  filename: string
  theme: 'dark' | 'light'
}

export function ScreenshotExport({ targetId, filename, theme }: ScreenshotExportProps) {
  const [isCapturing, setIsCapturing] = useState(false)

  const handleCapture = async () => {
    const target = document.getElementById(targetId)
    if (!target) {
      console.error('Target element not found:', targetId)
      return
    }

    setIsCapturing(true)

    try {
      const dataUrl = await domToPng(target, {
        scale: 2,
        backgroundColor: theme === 'dark' ? '#09090b' : '#f9fafb',
      })

      const link = document.createElement('a')
      link.download = `${filename}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Screenshot failed:', error)
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCapture}
      disabled={isCapturing}
      className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
      title="Download as image"
    >
      {isCapturing ? (
        <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
      ) : (
        <Camera className="w-4 h-4 text-pink-500" />
      )}
    </Button>
  )
}
