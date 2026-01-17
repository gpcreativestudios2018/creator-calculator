import { type LucideIcon } from 'lucide-react'
import { AnimatedNumber } from '@/components/AnimatedNumber'

interface DashboardCardProps {
  platformId: string
  platformName: string
  icon: LucideIcon
  monthlyRevenue: number
  primaryMetric: {
    label: string
    value: string | number
  }
  gradient: string
  onClick: () => void
}

export function DashboardCard({
  platformName,
  icon: Icon,
  monthlyRevenue,
  primaryMetric,
  gradient,
  onClick,
}: DashboardCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-5
        bg-[hsl(var(--dashboard-card))]
        border border-white/10
        hover:border-white/20
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-xl
        text-left w-full group
      `}
    >
      {/* Gradient accent bar at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

      {/* Platform icon and name */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-foreground">{platformName}</span>
      </div>

      {/* Monthly revenue - big number */}
      <div className="mb-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Monthly Revenue</p>
        <p className="text-2xl font-bold text-foreground">
          $<AnimatedNumber value={monthlyRevenue} />
        </p>
      </div>

      {/* Primary metric */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{primaryMetric.label}</span>
        <span className="font-medium text-foreground">{primaryMetric.value}</span>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground">Click for details →</span>
      </div>
    </button>
  )
}
