import { Heart } from 'lucide-react'

interface FooterProps {
  theme: 'dark' | 'light'
  onContactClick: () => void
}

export function Footer({ theme, onContactClick }: FooterProps) {
  return (
    <footer className={`w-full py-4 border-t ${theme === 'dark' ? 'bg-zinc-950/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
      <div className="flex flex-col items-center gap-2">
        <div className={`flex items-center gap-1.5 text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
          <span>Built with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <span>by</span>
          <a
            href="https://www.gpcreativestudios.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-300 hover:via-pink-400 hover:to-purple-500 transition-all"
          >
            GP Creative Studios
          </a>
        </div>
        <div className={`flex items-center gap-3 text-xs ${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}`}>
          <button
            onClick={onContactClick}
            className="hover:text-purple-500 transition-colors"
          >
            Contact
          </button>
          <span>•</span>
          <span>© {new Date().getFullYear()} SocialStacks</span>
        </div>
      </div>
    </footer>
  )
}
