import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface PreviewCardProps {
  title: string
  tooltip?: string
  colorLight: string
  colorDark: string
  onClick: () => void
  children: React.ReactNode
  theme?: 'dark' | 'light'
}

export function PreviewCard({
  title,
  tooltip,
  colorLight,
  colorDark,
  onClick,
  children,
  theme = 'dark',
}: PreviewCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full h-40 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-lg group text-left flex flex-col cursor-pointer ${
        theme === 'dark'
          ? 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
          : 'bg-white border border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Gradient accent bar at top */}
      <div
        className="h-0.5 w-full"
        style={{ background: `linear-gradient(90deg, ${colorLight}, ${colorDark})` }}
      />

      {/* Header with title and tooltip */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <h3 className="text-xs font-semibold text-foreground truncate pr-2">{title}</h3>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs z-[100]">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Chart/Content area */}
      <div className="flex-1 px-3 pb-2 overflow-hidden">
        {children}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">
          Click to expand
        </span>
      </div>
    </div>
  )
}
