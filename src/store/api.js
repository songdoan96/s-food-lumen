import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
} from "./authSlice";

import { setToast } from "./toastSlice";
import { clearCart } from "./cartSlice";
import { addLoading, addSuccess, addFail } from "./productSlice";
import { checkoutStart, checkoutSuccess, checkoutFail } from "./checkoutSlice";
import { userOrderFail, userOrderStart, userOrderSuccess } from "./userOrderSlice";
// Auth
async function loginUser(loginForm, dispatch, navigate) {
  dispatch(loginStart());
  try {
    const response = await axios.post("api/auth/login", loginForm);
    dispatch(loginSuccess(response.data.user));
    dispatch(setToast({ message: "Đăng nhập thành công." }));
    navigate(0);
  } catch (error) {
    dispatch(loginFail(JSON.parse(error.response.data.message)));
  }
}
async function registerUser(registerForm, dispatch, navigate) {
  dispatch(registerStart());
  try {
    const response = await axios.post("api/auth/register", registerForm);
    dispatch(registerSuccess());
    dispatch(setToast({ message: response.data.message }));

    navigate("/login");
  } catch (error) {
    dispatch(registerFail(JSON.parse(error.response.data.message)));
  }
}

async function logoutUser(token, dispatch, navigate) {
  dispatch(logoutStart());
  try {
    const response = await axios.post(
      "api/auth/logout",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch(logoutSuccess());
    dispatch(setToast({ message: "Đăng xuất thành công." }));
    navigate(0);
  } catch (error) {
    dispatch(logoutFail({ message: "Lỗi đăng xuất." }));
    dispatch(setToast({ message: "Lỗi đăng xuất.", type: "danger" }));
  }
}

function checkAuthenticated(dispatch) {
  dispatch(logoutStart());
  dispatch(loginSuccess(null));
  localStorage.clear();
  dispatch(setToast({ message: "Đăng nhập để tiếp tục.", type: "danger" }));
}

// Product
async function addProduct(newProduct, token, dispatch, navigate) {
  dispatch(addLoading());
  try {
    const response = await axios.post("api/product", newProduct, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch(addSuccess(response.data.product));
    dispatch(setToast({ message: "Thêm thành công." }));
    // navigate("/");
  } catch (error) {
    dispatch(addFail(JSON.parse(error.response.data.message)));
  }
}

async function checkoutProduct(formData, token, dispatch, navigate) {
  dispatch(checkoutStart());
  try {
    const response = await axios.post("api/checkout", formData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch(checkoutSuccess());
    dispatch(setToast({ message: response.data.message }));
    dispatch(clearCart());
    navigate("/");
  } catch (error) {
    dispatch(checkoutFail(JSON.parse(error.response.data.message)));
  }
}

async function getUserOrders(token, dispatch, navigate) {
  dispatch(userOrderStart());
  try {
    const response = await axios.get("api/user-orders", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch(userOrderSuccess(response.data.orders));
    // dispatch(setToast({ message: response.data.message }));
    // dispatch(clearCart());
    // navigate("/");
  } catch (error) {
    dispatch(userOrderFail({ message: error.message }));
  }
}

export {
  loginUser,
  registerUser,
  logoutUser,
  checkAuthenticated,
  addProduct,
  checkoutProduct,
  getUserOrders,
};
