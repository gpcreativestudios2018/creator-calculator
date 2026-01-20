import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SidebarSectionProps {
  title: string
  icon: LucideIcon
  iconColor: string
  theme: 'dark' | 'light'
  defaultOpen?: boolean
  children: React.ReactNode
}

export function SidebarSection({
  title,
  icon: Icon,
  iconColor,
  theme,
  defaultOpen = false,
  children,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition-all duration-200 ${
          theme === 'dark'
            ? 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
            : 'text-zinc-600 hover:bg-gray-100 hover:text-zinc-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-10 pr-3 py-1 space-y-1">
          {children}
        </div>
      </div>
    </div>
  )
}
