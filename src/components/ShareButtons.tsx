import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface ShareButtonsProps {
  platform: string
  monthlyRevenue: number
  yearlyRevenue: number
  theme: 'dark' | 'light'
}

export function ShareButtons({ platform, monthlyRevenue, yearlyRevenue, theme }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  const shareText = `I just calculated my potential ${platform} earnings with Creator Calculator!\n\n💰 Monthly: ${formatCurrency(monthlyRevenue)}\n📈 Yearly: ${formatCurrency(yearlyRevenue)}\n\nCheck yours:`
  const shareUrl = 'https://creator-calculator.vercel.app'

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>Share:</span>

      <Button
        variant="outline"
        size="sm"
        onClick={handleTwitterShare}
        className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        title="Share on X (Twitter)"
        aria-label="Share on X (Twitter)"
      >
        <Twitter className="w-4 h-4 text-sky-500" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleLinkedInShare}
        className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-blue-600" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleFacebookShare}
        className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-blue-500" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className={`p-2 ${theme === 'dark' ? 'border-zinc-700 hover:bg-zinc-800' : 'border-gray-300 hover:bg-gray-100'}`}
        title="Copy link"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Link2 className="w-4 h-4 text-purple-500" />
        )}
      </Button>
    </div>
  )
}
