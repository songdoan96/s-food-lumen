import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    getProducts: {
      status: null,
    },
    addProduct: {
      status: null,
      errors: [],
    },
    items: [],
  },
  reducers: {
    getLoading: (state, action) => {
      state.getProducts.status = "pending";
    },
    getSuccess: (state, action) => {
      state.getProducts.status = "success";
      state.items = [...action.payload];
    },
    getFail: (state, action) => {
      state.getProducts.status = "fail";
    },
    addLoading: (state, action) => {
      state.addProduct.errors = [];
      state.addProduct.status = "pending";
    },
    addSuccess: (state, action) => {
      state.addProduct.status = "success";
      state.items = [...state.items, action.payload];
      state.addProduct.errors = [];
    },
    addFail: (state, action) => {
      state.addProduct.status = "fail";
      state.addProduct.errors = action.payload;
    },

    updatedProduct: (state, action) => {
      state.items = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const {
  getLoading,
  getSuccess,
  getFail,
  addLoading,
  addSuccess,
  addFail,
  updatedProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;

export const loadProduct = () => async (dispatch) => {
  dispatch(getLoading());
  try {
    const response = await axios.get("api/product");
    dispatch(getSuccess(response.data.products));
  } catch (error) {
    dispatch(getFail(JSON.parse(error.response.data.message)));
  }
};
