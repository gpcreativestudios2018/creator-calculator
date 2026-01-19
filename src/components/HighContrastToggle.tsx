import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface HighContrastToggleProps {
  theme: 'dark' | 'light'
}

export function HighContrastToggle({ theme }: HighContrastToggleProps) {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('highContrast') === 'true'
  })

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    localStorage.setItem('highContrast', String(highContrast))
  }, [highContrast])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setHighContrast(!highContrast)}
      className={`p-2 ${highContrast ? 'bg-yellow-500 text-black border-yellow-500' : ''} ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
      aria-label={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
      title={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
    >
      <Eye className="w-4 h-4" />
    </Button>
  )
}
