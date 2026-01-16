export interface GrowthScenario {
  id: string
  name: string
  monthlyGrowthRate: number
}

export const growthScenarios: GrowthScenario[] = [
  {
    id: 'slow',
    name: 'Slow Growth (2%/mo)',
    monthlyGrowthRate: 0.02,
  },
  {
    id: 'moderate',
    name: 'Moderate (5%/mo)',
    monthlyGrowthRate: 0.05,
  },
  {
    id: 'fast',
    name: 'Fast Growth (10%/mo)',
    monthlyGrowthRate: 0.10,
  },
  {
    id: 'viral',
    name: 'Viral (20%/mo)',
    monthlyGrowthRate: 0.20,
  },
]

export const DEFAULT_GROWTH_SCENARIO = 'moderate'

export interface ProjectedMonth {
  month: number
  revenue: number
}

/**
 * Calculate projected revenue over time using compound growth
 * @param currentMonthlyRevenue - Starting monthly revenue
 * @param monthlyGrowthRate - Growth rate as decimal (e.g., 0.05 for 5%)
 * @param months - Number of months to project
 * @returns Array of { month, revenue } for each month from 0 to months
 */
export function calculateProjectedRevenue(
  currentMonthlyRevenue: number,
  monthlyGrowthRate: number,
  months: number
): ProjectedMonth[] {
  const projections: ProjectedMonth[] = []

  for (let month = 0; month <= months; month++) {
    const revenue = currentMonthlyRevenue * Math.pow(1 + monthlyGrowthRate, month)
    projections.push({
      month,
      revenue,
    })
  }

  return projections
}

/**
 * Calculate how many months needed to reach a revenue goal
 * @param currentMonthlyRevenue - Starting monthly revenue
 * @param goalRevenue - Target revenue to reach
 * @param monthlyGrowthRate - Growth rate as decimal (e.g., 0.05 for 5%)
 * @returns Number of months to reach goal, or null if rate is 0 or goal is unreachable
 */
export function calculateTimeToGoal(
  currentMonthlyRevenue: number,
  goalRevenue: number,
  monthlyGrowthRate: number
): number | null {
  // Cannot calculate if no growth rate
  if (monthlyGrowthRate <= 0) {
    return null
  }

  // Already at or above goal
  if (currentMonthlyRevenue >= goalRevenue) {
    return 0
  }

  // Cannot reach goal if starting from 0
  if (currentMonthlyRevenue <= 0) {
    return null
  }

  // Using logarithm to solve: goal = current * (1 + rate)^months
  // months = log(goal / current) / log(1 + rate)
  const months = Math.log(goalRevenue / currentMonthlyRevenue) / Math.log(1 + monthlyGrowthRate)

  return Math.ceil(months)
}

export function getGrowthScenarioById(id: string): GrowthScenario {
  return growthScenarios.find(s => s.id === id) ?? growthScenarios.find(s => s.id === DEFAULT_GROWTH_SCENARIO)!
}
