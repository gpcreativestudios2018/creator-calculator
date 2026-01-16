export interface TimePeriod {
  id: string
  name: string
  shortName: string
  multiplier: number
}

export const timePeriods: TimePeriod[] = [
  {
    id: 'daily',
    name: 'Daily',
    shortName: 'day',
    multiplier: 1 / 30,
  },
  {
    id: 'weekly',
    name: 'Weekly',
    shortName: 'week',
    multiplier: 0.25,
  },
  {
    id: 'monthly',
    name: 'Monthly',
    shortName: 'month',
    multiplier: 1.0,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    shortName: 'year',
    multiplier: 12.0,
  },
]

export const DEFAULT_TIME_PERIOD = 'monthly'

export function getTimePeriodById(id: string): TimePeriod {
  return timePeriods.find(t => t.id === id) ?? timePeriods.find(t => t.id === DEFAULT_TIME_PERIOD)!
}
