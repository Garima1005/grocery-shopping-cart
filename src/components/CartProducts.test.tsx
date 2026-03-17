import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartProducts from './CartProducts'
import { addToCart, decrementQuantity } from '../features/cartSlice'

const dispatchMock = vi.fn()

vi.mock('../store', async () => {
  const actual = await vi.importActual<typeof import('../store')>('../store')
  return {
    ...actual,
    useAppDispatch: () => dispatchMock,
  }
})

describe('CartProducts', () => {
  beforeEach(() => {
    dispatchMock.mockClear()
  })

  afterEach(() => {
    cleanup()
  })

  const getRowForProduct = (name: string) => {
    const nameEl = screen.getAllByText(name)[0]
    let el: HTMLElement | null = nameEl.closest('div')
    while (el && !el.className.includes('p-4')) el = el.parentElement
    if (!el) throw new Error(`Could not find row container for ${name}`)
    return el
  }

  it('renders empty state', () => {
    render(<CartProducts items={[]} />)
    expect(screen.getByText(/no items in cart/i)).toBeInTheDocument()
  })

  it('shows item savings and correct total with offers', () => {
    render(
      <CartProducts
        items={[
          { id: 3, name: 'Cheese', price: 0.9, quantity: 2 }, // saving 0.9
          { id: 4, name: 'Soup', price: 0.6, quantity: 1 }, // no direct saving
          { id: 1, name: 'Bread', price: 1.1, quantity: 1 }, // saving 0.55
          { id: 5, name: 'Butter', price: 1.2, quantity: 1 }, // saving 0.4
        ]}
      />
    )

    // Savings lines appear for items with saving > 0
    const cheeseRow = getRowForProduct('Cheese')
    expect(within(cheeseRow).getByText(/Savings:\s*£0\.90/i)).toBeInTheDocument()

    const breadRow = getRowForProduct('Bread')
    expect(within(breadRow).getByText(/Savings:\s*£0\.55/i)).toBeInTheDocument()

    const butterRow = getRowForProduct('Butter')
    expect(within(butterRow).getByText(/Savings:\s*£0\.40/i)).toBeInTheDocument()

    // Total = sum(itemPrice - saving)
    // Cheese: 2*0.9 -0.9 = 0.9
    // Soup: 1*0.6 -0 = 0.6
    // Bread: 1*1.1 -0.55 = 0.55
    // Butter: 1*1.2 -0.4 = 0.8
    // Total = 2.85
    expect(screen.getByText(/total: £2\.85/i)).toBeInTheDocument()
  })

  it('dispatches addToCart when + clicked', async () => {
    const user = userEvent.setup()
    render(<CartProducts items={[{ id: 2, name: 'Milk', price: 0.5, quantity: 1 }]} />)

    const milkRow = getRowForProduct('Milk')
    const plus = within(milkRow).getByRole('button', { name: '+' })
    await user.click(plus)

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(addToCart({ id: 2, name: 'Milk', price: 0.5 }))
  })

  it('does not dispatch decrement when quantity is 0', async () => {
    const user = userEvent.setup()
    render(<CartProducts items={[{ id: 2, name: 'Milk', price: 0.5, quantity: 0 }]} />)

    const milkRow = getRowForProduct('Milk')
    const minus = within(milkRow).getByRole('button', { name: '-' })
    await user.click(minus)

    expect(dispatchMock).not.toHaveBeenCalled()
  })

  it('dispatches decrementQuantity when - clicked and quantity > 0', async () => {
    const user = userEvent.setup()
    render(<CartProducts items={[{ id: 2, name: 'Milk', price: 0.5, quantity: 1 }]} />)

    const milkRow = getRowForProduct('Milk')
    const minus = within(milkRow).getByRole('button', { name: '-' })
    await user.click(minus)

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock).toHaveBeenCalledWith(decrementQuantity(2))
  })
})

