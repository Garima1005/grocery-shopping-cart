import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing && existing.quantity > 0) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
    },
  },
});

export const { addToCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;