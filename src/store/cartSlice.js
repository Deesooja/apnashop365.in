import { createSlice } from '@reduxjs/toolkit';
import CartPersistence from '../services/CartPersistence';
import ProductService from '../services/ProductService';

const initialItems = CartPersistence.load().filter((item) => {
  const product = ProductService.getProductById(item.id);
  return product && product.inStock;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialItems,
  },
  reducers: {
    addItem(state, action) {
      const { id, quantity = 1 } = action.payload;
      const product = ProductService.getProductById(id);
      if (!product || !product.inStock) return;

      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, quantity });
      }
      CartPersistence.save(state.items);
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = ProductService.getProductById(id);
      if (!product || !product.inStock) return;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const existing = state.items.find((item) => item.id === id);
        if (existing) {
          existing.quantity = quantity;
        } else {
          state.items.push({ id, quantity });
        }
      }
      CartPersistence.save(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      CartPersistence.save(state.items);
    },
    clearCart(state) {
      state.items = [];
      CartPersistence.clear();
    },
  },
});

export const { addItem, setQuantity, removeItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
