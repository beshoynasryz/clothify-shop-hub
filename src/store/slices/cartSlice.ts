
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/context/CartContext';

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.id === action.payload.id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
