import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import products from "./slices/productsSlice";

export const store = configureStore({
  reducer: { auth, products },
});
