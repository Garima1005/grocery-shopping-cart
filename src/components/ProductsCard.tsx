import React from 'react'
import type { Product } from '../data/products'
import { addToCart, decrementQuantity } from '../features/cartSlice'
import { useAppDispatch, useAppSelector } from '../store'

const ProductsCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch()

  const quantity = useAppSelector(
    (state) => state.cart.items.find((item) => item.id === product.id)?.quantity ?? 0
  )

  const handleAddOrIncrement = () => {
    dispatch(addToCart(product))
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch(decrementQuantity(product.id))
    }
  }

  return (
    <div className="border p-4 rounded-md shadow flex justify-between my-2">
      <div>
        <h2 className="font-bold">{product.name}</h2>
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>

      <div>
        {quantity === 0 ? (
          <button
            onClick={handleAddOrIncrement}
            className="bg-blue-300 px-4 py-2 rounded-md text-white font-semibold"
          >
            Add
          </button>
        ) : (
          <span className="border border-gray-400 py-2 px-2 rounded-md w-28 inline-flex items-center justify-between">
            <button
              className="px-2 bg-gray-200 rounded"
              onClick={handleAddOrIncrement}
            >
              +
            </button>
            <span className="text-center w-8">{quantity}</span>
            <button
              className="px-2 bg-gray-200 rounded disabled:text-gray-400"
              onClick={handleDecrement}
              disabled={quantity === 0}
            >
              -
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductsCard