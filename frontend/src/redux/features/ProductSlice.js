import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../../helpers/axiosApi";

export const getAllProductsAsync = createAsyncThunk(
  'product/getAllProductsAsync',
  async () => {
    const data = await getRequest('products')
    return data
  }
)

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isLoading: true
  },
  reducers: {

  },
  extraReducers: {
    [getAllProductsAsync.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getAllProductsAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.products = payload.products
    }
  },
})

export default ProductSlice.reducer