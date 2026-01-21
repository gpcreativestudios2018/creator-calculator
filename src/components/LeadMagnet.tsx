import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Download, Mail, CheckCircle, Loader2, FileText, TrendingUp, DollarSign, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeadMagnetProps {
  className?: string
  autoOpen?: boolean
  onClose?: () => void
}

export function LeadMagnet({ className, autoOpen = false, onClose }: LeadMagnetProps) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Store subscriber
      const subscribers = JSON.parse(localStorage.getItem('cc_subscribers') || '[]')
      if (!subscribers.includes(email)) {
        subscribers.push(email)
        localStorage.setItem('cc_subscribers', JSON.stringify(subscribers))
      }

      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'lead_magnet_download', {
          event_category: 'conversion',
          event_label: 'creator_monetization_guide'
        })
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const guideTopics = [
    { icon: DollarSign, text: 'Platform-by-platform monetization breakdown' },
    { icon: TrendingUp, text: 'Growth strategies that actually work' },
    { icon: Target, text: 'Setting realistic income goals' },
  ]

  return (
    <>
      {!autoOpen && (
        <Card
          className={cn(
            'relative overflow-hidden cursor-pointer group border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:border-amber-500/50 transition-all',
            className
          )}
          onClick={() => setIsOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg shrink-0">
                <FileText className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-amber-500">Free Guide</h3>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  The Creator Monetization Blueprint — 25+ pages of strategies
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="mt-2 h-7 px-2 text-xs text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 p-0"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Get Free Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        if (!open && onClose) onClose()
      }}>
        <DialogContent className="sm:max-w-md">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <DialogTitle className="text-xl mb-2">Check Your Inbox!</DialogTitle>
              <DialogDescription className="mb-4">
                We've sent the Creator Monetization Blueprint to your email.
              </DialogDescription>
              <Button onClick={() => setIsOpen(false)}>
                Got It
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <FileText className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-xs font-medium text-amber-500 uppercase tracking-wide">
                    Free Download
                  </span>
                </div>
                <DialogTitle className="text-xl">
                  The Creator Monetization Blueprint
                </DialogTitle>
                <DialogDescription>
                  A 25+ page guide to maximizing your creator income across every platform.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 my-4">
                {guideTopics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="p-1.5 bg-muted rounded">
                      <topic.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span>{topic.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  className={cn(
                    status === 'error' && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
                {status === 'error' && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
                <Button type="submit" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Me The Guide
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
