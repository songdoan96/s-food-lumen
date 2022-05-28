import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  show: false,
  message: null,
  type: "success",
  position: "bottom-end",
  delay: 3000,
};
export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.position = action.payload.position ?? initialState.position;
      state.type = action.payload.type ?? initialState.type;
      state.delay = action.payload.delay ?? initialState.delay;
    },
    hideToast: (state, action) => {
      state.show = false;
      state.message = null;
    },
  },
});

export const { setToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
