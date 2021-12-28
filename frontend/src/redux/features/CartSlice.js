import { createSlice } from "@reduxjs/toolkit";
import { save, CART, get, remove } from '../../helpers/storage'
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    // carts: [],
    carts: get(CART) ? get(CART) : [],
    shippingAddress: null,
    paymentMethod: null,
  },
  reducers: {
    addTocartProduct(state, { payload }) {
      const newItem = payload.product
      const carts = [...state.carts, { ...newItem, count: payload.count }]
      save(CART, carts)
      return { ...state.carts, carts }
    },
    addQuantityToProduct(state, { payload }) {
      state.carts.map(item => {
        // return item.slug === payload.slug && item.count += 1
        if (item.slug === payload.slug) {
          return item.count += 1
        }
        return item
      })
      save(CART, state.carts)
    },
    minusQuantityToProduct(state, { payload }) {
      state.carts.map(item => {
        if (item.slug === payload.slug) {
          return item.count -= 1
        }
        return item
      })
      save(CART, state.carts)
    },
    removeFromTheCart(state, { payload }) {
      console.log(payload.slug)
      const newCarts = state.carts.filter(cart => cart.slug !== payload.slug)
      state.carts = newCarts
      return save(CART, state.carts)
    },
    cartShippingAddress(state, { payload }) {
      state.shippingAddress = payload
    },
    // getAllDataCarts(state, {payload}) {
    //   state.carts = state.carts
    // }
    savePaymentMethod(state, { payload }) {
      state.paymentMethod = payload
    },
    placeOrderItems(state, { payload }) {
      state.carts = []
      state.shippingAddress = null
      state.paymentMethod = null
      return remove(CART)
    }
  },
  extraReducers: {
  }
})

export const { addTocartProduct, addQuantityToProduct, minusQuantityToProduct, removeFromTheCart, cartShippingAddress, savePaymentMethod, placeOrderItems } = CartSlice.actions
export default CartSlice.reducer