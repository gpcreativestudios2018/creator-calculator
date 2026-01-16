import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  formatter?: (value: number) => string
  className?: string
}

export function AnimatedNumber({
  value,
  duration = 500,
  formatter = (v) => v.toString(),
  className = ''
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const startValue = displayValue
    const endValue = value
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValue + (endValue - startValue) * easeOut
      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return <span className={className}>{formatter(displayValue)}</span>
}
