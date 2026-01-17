interface StatCardProps {
  label: string
  value: string
  subtitle?: string
  progress?: number // 0-100 percentage for the mini circle
  color: string
  theme?: 'dark' | 'light'
}

export function StatCard({
  label,
  value,
  subtitle,
  progress = 75,
  color,
  theme = 'dark',
}: StatCardProps) {
  // Mini circle dimensions
  const size = 44
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl ${
      theme === 'dark'
        ? 'bg-zinc-900 border border-zinc-800'
        : 'bg-white border border-gray-200'
    }`}>
      {/* Left side - Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium truncate ${
          theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          {label}
        </p>
        <p className={`text-xl font-bold truncate ${
          theme === 'dark' ? 'text-white' : 'text-zinc-900'
        }`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-zinc-500 truncate">{subtitle}</p>
        )}
      </div>

      {/* Right side - Mini circular indicator */}
      <div className="ml-3 flex-shrink-0">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
      </div>
    </div>
  )
}
