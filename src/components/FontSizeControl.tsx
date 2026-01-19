import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FontSizeControlProps {
  theme: 'dark' | 'light'
}

export function FontSizeControl({ theme }: FontSizeControlProps) {
  const increaseFontSize = () => {
    const html = document.documentElement
    const currentSize = parseFloat(getComputedStyle(html).fontSize)
    if (currentSize < 24) {
      html.style.fontSize = `${currentSize + 2}px`
      localStorage.setItem('fontSize', `${currentSize + 2}`)
    }
  }

  const decreaseFontSize = () => {
    const html = document.documentElement
    const currentSize = parseFloat(getComputedStyle(html).fontSize)
    if (currentSize > 12) {
      html.style.fontSize = `${currentSize - 2}px`
      localStorage.setItem('fontSize', `${currentSize - 2}`)
    }
  }

  const resetFontSize = () => {
    document.documentElement.style.fontSize = '16px'
    localStorage.setItem('fontSize', '16')
  }

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={decreaseFontSize}
        className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        aria-label="Decrease font size"
        title="Decrease font size"
      >
        <Minus className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={resetFontSize}
        className={`px-2 text-xs ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        aria-label="Reset font size"
        title="Reset font size"
      >
        Aa
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={increaseFontSize}
        className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        aria-label="Increase font size"
        title="Increase font size"
      >
        <Plus className="w-3 h-3" />
      </Button>
    </div>
  )
}
