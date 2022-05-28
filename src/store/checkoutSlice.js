import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    isLoading: false,
    errors: [],
  },
  reducers: {
    checkoutStart: (state, action) => {
      state.errors = [];
      state.isLoading = true;
    },
    checkoutSuccess: (state, action) => {
      state.isLoading = false;
      state.errors = [];
    },
    checkoutFail: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const { checkoutStart, checkoutSuccess, checkoutFail } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
