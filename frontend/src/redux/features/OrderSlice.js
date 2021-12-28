import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    order_details: null,
    isPaid: false,
    isDelivered: false,
  },
  reducers: {
    placeOrder(state, { payload }) {
      state.order_details = payload
    }
  },
  extraReducers: {

  }
})

export const { placeOrder } = OrderSlice.actions
export default OrderSlice.reducer