import { useState } from 'react'
import { Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareableLinkProps {
  platformId: string
  inputValues: Record<string, number>
  theme: 'dark' | 'light'
}

export function ShareableLink({ platformId, inputValues, theme }: ShareableLinkProps) {
  const [copied, setCopied] = useState(false)

  const generateLink = () => {
    const baseUrl = window.location.origin
    const params = new URLSearchParams()

    params.set('p', platformId)

    // Encode input values
    Object.entries(inputValues).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString())
      }
    })

    return `${baseUrl}?${params.toString()}`
  }

  const handleCopyLink = async () => {
    try {
      const link = generateLink()
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopyLink}
      className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
      title="Copy shareable link"
      aria-label="Copy shareable link with your metrics"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <Link2 className="w-4 h-4 text-cyan-500" />
      )}
    </Button>
  )
}
