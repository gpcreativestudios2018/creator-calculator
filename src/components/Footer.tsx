interface FooterProps {
  theme: 'dark' | 'light'
  onContactClick: () => void
}

export function Footer({ theme, onContactClick }: FooterProps) {
  return (
    <footer className={`py-4 px-6 border-t ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'}`}>
      <div className="flex items-center justify-center gap-1 text-sm">
        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
          SocialStacks by
        </span>
        <a
          href="https://www.gpcreativestudios.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-500 hover:text-purple-400 hover:underline"
        >
          GP Creative Studios
        </a>
        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
          (
        </span>
        <button
          onClick={onContactClick}
          className="text-purple-500 hover:text-purple-400 hover:underline"
        >
          contact
        </button>
        <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
          )
        </span>
      </div>
    </footer>
  )
}
