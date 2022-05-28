import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cartItems")) || [],
  reducers: {
    addProductToCart: (state, action) => {
      return [...state, action.payload];
    },
    removeProductFromCart: (state, action) => {
      return state.filter((product) => product._id !== action.payload);
    },
    clearCart: (state, action) => {
      return [];
    },
    increaseCartQty: (state, action) => {
      return state.map((c) => (c._id === action.payload ? { ...c, qty: c.qty + 1 } : c));
    },
    decreaseCartQty: (state, action) => {
      return state.map((c) =>
        c._id === action.payload ? { ...c, qty: Math.max(c.qty - 1, 1) } : c
      );
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  clearCart,
  increaseCartQty,
  decreaseCartQty,
} = cartSlice.actions;

export default cartSlice.reducer;
