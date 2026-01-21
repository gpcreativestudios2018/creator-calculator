import { useState } from 'react'
import { X, Gift, Loader2, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { usePro } from '@/contexts/ProContext'
import { checkPromoCode, redeemPromoCode } from '@/services/subscription'

interface SecretPromoProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function SecretPromo({ theme, onClose }: SecretPromoProps) {
  const { user } = useAuth()
  const { setTier } = usePro()
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!code.trim()) {
      setStatus('error')
      setErrorMessage('Please enter a promo code')
      return
    }

    if (!user) {
      setStatus('error')
      setErrorMessage('Please sign in first to redeem a promo code')
      return
    }

    setStatus('loading')

    try {
      const promo = await checkPromoCode(code)
      
      if (!promo) {
        setStatus('error')
        setErrorMessage('Invalid promo code')
        return
      }

      if (promo.uses_remaining !== null && promo.uses_remaining <= 0) {
        setStatus('error')
        setErrorMessage('This promo code has expired')
        return
      }

      await redeemPromoCode(user.id, promo.id)
      
      if (promo.type === 'lifetime') {
        setTier('lifetime')
        localStorage.setItem('socialstacks_tier', 'lifetime')
      } else {
        setTier('pro')
        localStorage.setItem('socialstacks_tier', 'pro')
      }

      setStatus('success')
    } catch (error: any) {
      setStatus('error')
      if (error.message?.includes('duplicate')) {
        setErrorMessage('You have already redeemed a promo code')
      } else {
        setErrorMessage('Failed to redeem code. Please try again.')
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`relative max-w-md w-full mx-4 rounded-xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-zinc-500 hover:text-zinc-900'}`}
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              You're Pro for Life! 🎉
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              All Pro features are now unlocked forever. Enjoy!
            </p>
            <Button onClick={onClose} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Start Exploring
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                <Gift className="w-8 h-8 text-purple-500" />
              </div>
              <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                🤫 Secret Promo
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                You found the secret! Enter a promo code below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter promo code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase())
                  if (status === 'error') setStatus('idle')
                }}
                className={`text-center text-lg tracking-widest ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''} ${status === 'error' ? 'border-red-500' : ''}`}
              />
              {status === 'error' && (
                <p className="text-sm text-red-500 text-center">{errorMessage}</p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Redeem Code'
                )}
              </Button>
            </form>

            {!user && (
              <p className={`text-xs text-center mt-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                You'll need to sign in to redeem a promo code.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}