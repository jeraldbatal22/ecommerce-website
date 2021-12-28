import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './features/AuthSlice'
import CartSlice from './features/CartSlice'
import OrderSlice from './features/OrderSlice'
import ProductSlice from './features/ProductSlice'
import SignupSlice from './features/SignupSlice'

const store = configureStore({
  reducer: {
    product: ProductSlice,
    cart: CartSlice,
    auth: AuthSlice,
    signup: SignupSlice,
    order: OrderSlice
  }
})

export default store