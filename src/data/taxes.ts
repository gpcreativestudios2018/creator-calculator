export interface TaxBracket {
  id: string
  name: string
  rate: number
  description: string
}

export const taxBrackets: TaxBracket[] = [
  {
    id: 'none',
    name: 'No Tax / Hobby',
    rate: 0,
    description: 'Not treating as business income',
  },
  {
    id: 'low',
    name: 'Low (~15%)',
    rate: 0.15,
    description: 'Lower income bracket',
  },
  {
    id: 'medium',
    name: 'Medium (~25%)',
    rate: 0.25,
    description: 'Middle income bracket',
  },
  {
    id: 'high',
    name: 'High (~35%)',
    rate: 0.35,
    description: 'Higher income bracket',
  },
  {
    id: 'veryhigh',
    name: 'Very High (~45%)',
    rate: 0.45,
    description: 'Top bracket / high-tax country',
  },
]

export const DEFAULT_TAX_BRACKET = 'medium'

export interface ExpenseProfile {
  id: string
  name: string
  rate: number
  description: string
}

export const expenseProfiles: ExpenseProfile[] = [
  {
    id: 'minimal',
    name: 'Minimal (~5%)',
    rate: 0.05,
    description: 'Basic software, phone',
  },
  {
    id: 'low',
    name: 'Low (~10%)',
    rate: 0.10,
    description: 'Software, basic equipment',
  },
  {
    id: 'moderate',
    name: 'Moderate (~20%)',
    rate: 0.20,
    description: 'Equipment, editing, some outsourcing',
  },
  {
    id: 'high',
    name: 'High (~30%)',
    rate: 0.30,
    description: 'Team, studio, heavy production',
  },
  {
    id: 'veryhigh',
    name: 'Very High (~40%)',
    rate: 0.40,
    description: 'Full team, studio, agency fees',
  },
]

export const DEFAULT_EXPENSE_PROFILE = 'low'

export interface TakeHomeResult {
  grossRevenue: number
  expenses: number
  taxableIncome: number
  taxes: number
  netIncome: number
}

/**
 * Calculate take-home income after expenses and taxes
 * @param grossRevenue - Total revenue before any deductions
 * @param taxRate - Tax rate as decimal (e.g., 0.25 for 25%)
 * @param expenseRate - Expense rate as decimal (e.g., 0.10 for 10%)
 * @returns Object with grossRevenue, expenses, taxableIncome, taxes, netIncome
 */
export function calculateTakeHome(
  grossRevenue: number,
  taxRate: number,
  expenseRate: number
): TakeHomeResult {
  const expenses = grossRevenue * expenseRate
  const taxableIncome = grossRevenue - expenses
  const taxes = taxableIncome * taxRate
  const netIncome = taxableIncome - taxes

  return {
    grossRevenue,
    expenses,
    taxableIncome,
    taxes,
    netIncome,
  }
}

export function getTaxBracketById(id: string): TaxBracket {
  return taxBrackets.find(t => t.id === id) ?? taxBrackets.find(t => t.id === DEFAULT_TAX_BRACKET)!
}

export function getExpenseProfileById(id: string): ExpenseProfile {
  return expenseProfiles.find(e => e.id === id) ?? expenseProfiles.find(e => e.id === DEFAULT_EXPENSE_PROFILE)!
}
