import { describe, it, expect } from 'vitest'

// Test the YouTube calculation logic
describe('YouTube Revenue Calculations', () => {
  it('calculates ad revenue correctly', () => {
    const monthlyViews = 100000
    const cpm = 4
    const creatorShare = 0.55

    const adRevenue = (monthlyViews / 1000) * cpm * creatorShare

    expect(adRevenue).toBeCloseTo(220)
  })

  it('calculates yearly revenue from monthly', () => {
    const monthlyRevenue = 500
    const yearlyRevenue = monthlyRevenue * 12

    expect(yearlyRevenue).toBe(6000)
  })

  it('handles zero views', () => {
    const monthlyViews = 0
    const cpm = 4
    const creatorShare = 0.55

    const adRevenue = (monthlyViews / 1000) * cpm * creatorShare

    expect(adRevenue).toBe(0)
  })
})

describe('Take-Home Calculations', () => {
  it('calculates take-home after taxes and expenses', () => {
    const grossAnnual = 10000
    const taxRate = 0.25
    const expenseRate = 0.15

    const taxes = grossAnnual * taxRate
    const expenses = grossAnnual * expenseRate
    const takeHome = grossAnnual - taxes - expenses

    expect(takeHome).toBe(6000)
  })
})
