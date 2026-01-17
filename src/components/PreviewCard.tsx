import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface PreviewCardProps {
  title: string
  tooltip?: string
  colorLight: string
  colorDark: string
  onClick: () => void
  children: React.ReactNode
}

export function PreviewCard({
  title,
  tooltip,
  colorLight,
  colorDark,
  onClick,
  children,
}: PreviewCardProps) {
  return (
    <button
      onClick={onClick}
      className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[hsl(var(--dashboard-card))] border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group text-left flex flex-col"
      style={{
        background: `linear-gradient(135deg, hsl(var(--dashboard-card)) 0%, hsl(var(--dashboard-card)) 100%)`,
      }}
    >
      {/* Gradient accent bar at top */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${colorLight}, ${colorDark})` }}
      />

      {/* Header with title and tooltip */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <h3 className="text-sm font-semibold text-foreground truncate pr-2">{title}</h3>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-muted-foreground hover:text-foreground transition-colors">
                <Info className="w-4 h-4" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Chart/Content area */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        {children}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
          Click to expand
        </span>
      </div>
    </button>
  )
}
