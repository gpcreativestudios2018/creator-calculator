import { Card, CardContent } from '@/components/ui/card'
import { Download, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeadMagnetProps {
  className?: string
  autoOpen?: boolean
  onClose?: () => void
}

export function LeadMagnet({ className, autoOpen = false, onClose }: LeadMagnetProps) {
  const handleDownload = () => {
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_magnet_download', {
        event_category: 'conversion',
        event_label: 'creator_monetization_guide'
      })
    }

    // Close modal if autoOpen
    if (autoOpen && onClose) {
      onClose()
    }
  }

  // If autoOpen, just trigger download and close
  if (autoOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="bg-zinc-900 rounded-xl p-6 max-w-md mx-4 text-center">
          <div className="p-3 bg-amber-500/20 rounded-lg w-fit mx-auto mb-4">
            <FileText className="h-8 w-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Free Creator Guide</h3>
          <p className="text-zinc-400 mb-6">
            The Creator Monetization Playbook — Your complete guide to earning across 25+ platforms.
          </p>
          <a
            href="/creator-monetization-playbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Download className="h-5 w-5" />
            Download Free PDF
          </a>
          <button
            onClick={onClose}
            className="block w-full mt-4 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <a
      href="/creator-monetization-playbook.pdf"
      target="_blank"
      rel="noopener noreferrer"
      download
      onClick={handleDownload}
      className="block"
    >
      <Card
        className={cn(
          'relative overflow-hidden cursor-pointer group border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:border-amber-500/50 transition-all',
          className
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg shrink-0">
              <FileText className="h-5 w-5 text-amber-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-amber-500">Free Guide</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                The Creator Monetization Playbook — 25+ pages of strategies
              </p>
              <span className="inline-flex items-center mt-2 text-xs text-amber-500 hover:text-amber-400">
                <Download className="h-3 w-3 mr-1" />
                Download Free PDF
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}
