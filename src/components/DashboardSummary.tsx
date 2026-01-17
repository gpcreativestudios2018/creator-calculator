import { TrendingUp, Wallet, PieChart, Target } from 'lucide-react'
import { AnimatedNumber } from '@/components/AnimatedNumber'

interface DashboardSummaryProps {
  totalMonthly: number
  totalYearly: number
  activePlatforms: number
  topPlatform: {
    name: string
    revenue: number
  } | null
}

export function DashboardSummary({
  totalMonthly,
  totalYearly,
  activePlatforms,
  topPlatform,
}: DashboardSummaryProps) {
  const stats = [
    {
      label: 'Monthly Revenue',
      value: totalMonthly,
      prefix: '$',
      icon: Wallet,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Yearly Projection',
      value: totalYearly,
      prefix: '$',
      icon: TrendingUp,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      label: 'Active Platforms',
      value: activePlatforms,
      prefix: '',
      icon: PieChart,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Top Earner',
      value: topPlatform?.revenue || 0,
      prefix: '$',
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      subtitle: topPlatform?.name || 'None',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-2xl p-5 bg-[hsl(var(--dashboard-card))] border border-white/10"
        >
          {/* Gradient accent */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />

          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {stat.label}
            </p>
            <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </div>

          <p className="text-2xl font-bold text-foreground">
            {stat.prefix}<AnimatedNumber value={stat.value} />
          </p>

          {stat.subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{stat.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  )
}
