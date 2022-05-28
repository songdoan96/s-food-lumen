import { createSlice } from "@reduxjs/toolkit";

export const userOrderSlice = createSlice({
  name: "userOrder",
  initialState: {
    isLoading: false,
    errors: [],
    orders: [],
  },
  reducers: {
    userOrderStart: (state, action) => {
      state.errors = null;
      state.isLoading = true;
    },
    userOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.errors = null;
    },
    userOrderFail: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

export const { userOrderStart, userOrderSuccess, userOrderFail } =
  userOrderSlice.actions;

export default userOrderSlice.reducer;
