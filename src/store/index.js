import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import uiReducer from "./slices/uiSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    ui: uiReducer,
    order: orderReducer,
  },
});
