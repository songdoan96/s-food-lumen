import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isLoading: false,
      currentUser: null,
      errors: [],
    },
    register: {
      isLoading: false,
      success: false,
      errors: [],
    },
    logout: {
      isLoading: false,
      success: false,
      errors: [],
    },
  },
  reducers: {
    loginStart: (state, action) => {
      state.login.errors = [];
      state.login.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.login.isLoading = false;
      state.login.currentUser = action.payload;
      state.login.errors = [];
    },
    loginFail: (state, action) => {
      state.login.isLoading = false;
      state.login.errors = action.payload;
    },
    registerStart: (state, action) => {
      state.register.errors = [];
      state.register.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.register.isLoading = false;
      state.register.success = true;
      state.register.errors = [];
    },
    registerFail: (state, action) => {
      state.register.isLoading = false;
      state.register.errors = action.payload;
    },
    logoutStart: (state, action) => {
      state.logout.errors = [];
      state.logout.isLoading = true;
    },
    logoutSuccess: (state, action) => {
      state.logout.isLoading = false;
      state.login.currentUser = null;
      state.logout.errors = [];
    },
    logoutFail: (state, action) => {
      state.logout.isLoading = false;
      state.logout.errors = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
} = authSlice.actions;

export default authSlice.reducer;
