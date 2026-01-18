import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailCaptureProps {
  variant?: 'inline' | 'card' | 'banner'
  title?: string
  description?: string
  buttonText?: string
  className?: string
}

export function EmailCapture({
  variant = 'card',
  title = 'Get Weekly Creator Insights',
  description = 'Join 5,000+ creators getting tips on monetization, growth strategies, and platform updates.',
  buttonText = 'Subscribe',
  className
}: EmailCaptureProps) {
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

    // Simulate API call - replace with actual newsletter service integration
    // Example: Mailchimp, ConvertKit, Buttondown, etc.
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Store locally for now (can be replaced with actual API)
      const subscribers = JSON.parse(localStorage.getItem('cc_subscribers') || '[]')
      if (!subscribers.includes(email)) {
        subscribers.push(email)
        localStorage.setItem('cc_subscribers', JSON.stringify(subscribers))
      }

      setStatus('success')
      setEmail('')

      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          event_category: 'engagement',
          event_label: variant
        })
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn(
        'flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20',
        className
      )}>
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
        <div>
          <p className="font-medium text-green-500">You're subscribed!</p>
          <p className="text-sm text-muted-foreground">Check your inbox for a welcome email.</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          className={cn(
            'flex-1',
            status === 'error' && 'border-red-500 focus-visible:ring-red-500'
          )}
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            buttonText
          )}
        </Button>
      </form>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={cn(
        'relative overflow-hidden rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-6',
        className
      )}>
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status === 'error') setStatus('idle')
              }}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 w-64"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                buttonText
              )}
            </Button>
          </form>
        </div>
        {status === 'error' && (
          <p className="text-sm text-red-200 mt-2">{errorMessage}</p>
        )}
      </div>
    )
  }

  // Default: card variant
  return (
    <Card className={cn('border-violet-500/20 bg-violet-500/5', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-violet-500/10 rounded-lg">
            <Sparkles className="h-5 w-5 text-violet-500" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="you@example.com"
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
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                {buttonText}
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
