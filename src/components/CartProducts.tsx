import React, { useMemo } from 'react'
import { calculateSavings } from '../utils/offers'
import { addToCart, decrementQuantity } from '../features/cartSlice'
import { useAppDispatch } from '../store'

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartProductsProps {
  items: CartItem[]
}

const CartProducts: React.FC<CartProductsProps> = ({ items }) => {
  const dispatch = useAppDispatch()

  const savingsMap = useMemo(() => calculateSavings(items), [items])

  const totalCost = useMemo(() => {
    return items.reduce((sum, item) => {
      const itemPrice = item.price * item.quantity
      const saving = savingsMap.get(item.id) ?? 0
      return sum + (itemPrice - saving)
    }, 0)
  }, [items, savingsMap])

  const handleIncrement = (item: CartItem) => dispatch(addToCart(item))
  const handleDecrement = (item: CartItem) => {
    if (item.quantity > 0) dispatch(decrementQuantity(item.id))
  }

  if (items.length === 0) {
    return <div className="text-center py-4">No items in cart</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map(item => {
        const itemPrice = item.price * item.quantity
        const saving = savingsMap.get(item.id) ?? 0
        const itemCost = itemPrice - saving

        return (
          <div key={item.id} className="p-4 border-b flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <span className="w-24 font-medium">{item.name}</span>
                <span className="text-gray-600">£{item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleIncrement(item)}
                  className="bg-blue-500 text-white w-8 h-8 rounded flex items-center justify-center font-bold"
                >
                  +
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => handleDecrement(item)}
                  className="border border-blue-400 text-blue-500 w-8 h-8 rounded flex items-center justify-center font-bold"
                >
                  -
                </button>
              </div>
            </div>

            <div className="text-right text-sm text-gray-500">
              Item price: £{item.price.toFixed(2)} × {item.quantity} = £{itemPrice.toFixed(2)}
            </div>

            {saving > 0 && (
              <div className="text-right text-sm text-red-500">
                Savings: £{saving.toFixed(2)}
              </div>
            )}

            <div className="text-right text-sm font-medium">
              Item cost: £{itemCost.toFixed(2)}
            </div>
          </div>
        )
      })}

      <div className="text-right text-lg font-semibold mt-4">
        Total: £{totalCost.toFixed(2)}
      </div>
    </div>
  )
}

export default CartProducts