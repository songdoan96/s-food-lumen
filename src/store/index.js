import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import userOrderReducer from "./userOrderSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["toast"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  product: productReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  userOrder: userOrderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
