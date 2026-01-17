import { AnimatedNumber } from '@/components/AnimatedNumber'

interface CircularGaugeProps {
  label: string
  value: number
  maxValue?: number
  format?: 'currency' | 'percent' | 'number'
  colorLight: string
  colorDark: string
  size?: 'sm' | 'md' | 'lg'
}

export function CircularGauge({
  label,
  value,
  maxValue = 100,
  format = 'number',
  colorLight,
  colorDark,
  size = 'md',
}: CircularGaugeProps) {
  // Calculate percentage for the gauge fill
  const percentage = Math.min((value / maxValue) * 100, 100)

  // SVG circle math
  const sizeMap = { sm: 100, md: 130, lg: 160 }
  const strokeMap = { sm: 8, md: 10, lg: 12 }
  const diameter = sizeMap[size]
  const strokeWidth = strokeMap[size]
  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Format the display value
  const formatValue = (val: number) => {
    if (format === 'currency') {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
      if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`
      return `$${val.toFixed(0)}`
    }
    if (format === 'percent') return `${val.toFixed(1)}%`
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`
    return val.toFixed(0)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: diameter, height: diameter }}>
        <svg
          width={diameter}
          height={diameter}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={colorDark}
            strokeWidth={strokeWidth}
            className="opacity-30"
          />
          {/* Foreground circle (the gauge) */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${label.replace(/\s+/g, '')})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient
              id={`gradient-${label.replace(/\s+/g, '')}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={colorLight} />
              <stop offset="100%" stopColor={colorDark} />
            </linearGradient>
          </defs>
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-foreground">
            {formatValue(value)}
          </span>
        </div>
      </div>
      {/* Label below */}
      <p className="mt-2 text-sm text-muted-foreground text-center">{label}</p>
    </div>
  )
}
