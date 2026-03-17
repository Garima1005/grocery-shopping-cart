import { describe, expect, it } from 'vitest'
import { calculateSavings } from './offers'

describe('calculateSavings', () => {
  it('applies cheese BOGO (buy one get one free)', () => {
    const items = [{ id: 3, name: 'Cheese', price: 0.9, quantity: 3 }]
    const map = calculateSavings(items)
    // floor(3/2)=1 free cheese
    expect(map.get(3)).toBeCloseTo(0.9, 10)
  })

  it('applies soup + bread (half price bread per soup)', () => {
    const items = [
      { id: 4, name: 'Soup', price: 0.6, quantity: 2 },
      { id: 1, name: 'Bread', price: 1.1, quantity: 1 },
    ]
    const map = calculateSavings(items)
    // min(soup=2, bread=1) * (1.1/2) = 0.55
    expect(map.get(1)).toBeCloseTo(0.55, 10)
  })

  it('applies butter third off', () => {
    const items = [{ id: 5, name: 'Butter', price: 1.2, quantity: 2 }]
    const map = calculateSavings(items)
    // 2 * (1.2/3) = 0.8
    expect(map.get(5)).toBeCloseTo(0.8, 10)
  })
})

