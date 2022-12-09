import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.qty++;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      item.qty++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item.qty === 1) {
        item.qty = 1
      } else {
        item.qty--;
      }
    },
    removeItem: (state, action) => {
      const item = state.cart.filter(item => item.id !== action.payload);
      state.cart = item
    },
    removeAllItem: (state, action)=>{
      state.cart = []
    }
  }
})

const { actions, reducer } = cartSlice;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem
} = actions;

export default reducer