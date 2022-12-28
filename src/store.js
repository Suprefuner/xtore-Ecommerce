import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/user/userSlice"
import productsSlice from "./features/products/productsSlice"
import singleProductSlice from "./features/singleProduct/singleProductSlice"
import cartSlice from "./features/cart/cartSlice"
import filterSlice from "./features/filter/filterSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
    singleProduct: singleProductSlice,
    cart: cartSlice,
    filter: filterSlice,
  },
})
