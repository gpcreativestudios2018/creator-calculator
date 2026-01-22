interface FooterProps {
  theme: 'dark' | 'light'
  onContactClick: () => void
}

export function Footer({ theme, onContactClick }: FooterProps) {
  return (
    <footer className={`w-full py-3 text-center text-sm ${theme === 'dark' ? 'bg-zinc-950 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
      SocialStacks by{' '}
      <a
        href="https://www.gpcreativestudios.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 hover:text-purple-400 hover:underline"
      >
        GP Creative Studios
      </a>
      {' '}({' '}
      <button
        onClick={onContactClick}
        className="text-purple-500 hover:text-purple-400 hover:underline"
      >
        contact
      </button>
      {' '})
    </footer>
  )
}
