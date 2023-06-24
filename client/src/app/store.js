import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import productSlice from "../features/product/productSlice";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: authSlice,
    product: productSlice,
    cart: cartSlice,
  },
});
