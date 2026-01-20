import { useState } from 'react'
import { X, Send, MessageSquare, Bug, HelpCircle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContactModalProps {
  theme: 'dark' | 'light'
  onClose: () => void
}

export function ContactModal({ theme, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    type: 'feedback',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/xeeerajg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: formData.type,
          email: formData.email,
          message: formData.message
        })
      })

      if (response.ok) {
        setStatus('success')
        setTimeout(() => onClose(), 2000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const typeOptions = [
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-500' },
    { id: 'support', label: 'Support', icon: HelpCircle, color: 'text-amber-500' },
    { id: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-green-500' }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`relative max-w-md w-full mx-4 rounded-xl p-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-gray-100 text-zinc-600 hover:text-zinc-900'}`}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
          Contact Us
        </h2>
        <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          We'd love to hear from you!
        </p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
              Message sent!
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                What's this about?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {typeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: option.id })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.type === option.id
                        ? theme === 'dark'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-purple-500 bg-purple-50'
                        : theme === 'dark'
                          ? 'border-zinc-700 hover:border-zinc-600'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option.icon className={`w-4 h-4 ${option.color} mb-1`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Your email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                    : 'bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>

            {/* Message */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what's on your mind..."
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500'
                    : 'bg-white border-gray-300 text-zinc-900 placeholder:text-zinc-400'
                }`}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}

            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
