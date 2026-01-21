import { useState } from 'react'
import { X, Mail, Loader2, CheckCircle, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function AuthModal({ theme, onClose }: AuthModalProps) {
  const { user, signInWithEmail, signOut } = useAuth()
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

    const { error } = await signInWithEmail(email)

    if (error) {
      setStatus('error')
      setErrorMessage(error.message)
    } else {
      setStatus('success')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  // If user is already logged in, show account info
  if (user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className={`relative max-w-md w-full mx-4 rounded-xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-zinc-500 hover:text-zinc-900'}`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center py-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <User className="w-8 h-8 text-purple-500" />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              You're signed in!
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {user.email}
            </p>
            <div className="space-y-3">
              <Button onClick={onClose} className="w-full">
                Continue to App
              </Button>
              <Button onClick={handleSignOut} variant="outline" className={`w-full ${theme === 'dark' ? 'border-zinc-700' : ''}`}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
            <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Check your email!
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Didn't receive it? Check your spam folder.
            </p>
            <Button onClick={onClose} className="mt-4">
              Got it
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                <Mail className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Sign in to SocialStacks
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                No password needed — we'll email you a magic link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  className={`${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : ''} ${status === 'error' ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {status === 'error' && (
                  <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Magic Link
                  </>
                )}
              </Button>
            </form>

            <p className={`text-xs text-center mt-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              By signing in, you agree to our Terms of Service.
            </p>
          </>
        )}
      </div>
    </div>
  )
}