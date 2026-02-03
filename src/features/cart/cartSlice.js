import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
    const savedCount = localStorage.getItem('itx_cart_count');
    return savedCount ? parseInt(savedCount, 10) : 0;
};

const initialState = {
  count: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartCount: (state, action) => {
      state.count += action.payload;
      localStorage.setItem('itx_cart_count', state.count.toString());
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
      localStorage.setItem('itx_cart_count', state.count.toString());
    }
  },
});

export const { updateCartCount, setCartCount } = cartSlice.actions;

export const selectCartCount = (state) => state.cart.count;

export default cartSlice.reducer;
