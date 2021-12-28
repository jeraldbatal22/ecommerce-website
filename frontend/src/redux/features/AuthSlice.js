import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../helpers/axiosApi";
import { get, save, USER } from "../../helpers/storage";

export const authAsync = createAsyncThunk(
  'auth/authAsync',
  async (payload) => {
    const data = await postRequest('users/signin', payload)
    return data
  }
)

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    message: null,
    isAuth: get(USER) ? true : false,
    user: get(USER) ? get(USER) : null
  },
  reducers: {
    clearStateValidation(state, { payload }) {
      state.status = null
      state.isAuth = false
      state.message = null
    },
    clearStateAuth(state, { payload }) {
      state.status = null
      state.isAuth = false
      state.message = null
      state.user = null
    }
  },
  extraReducers: {
    [authAsync.fulfilled]: (state, { payload }) => {
      if (payload.status === 'error') {
        state.status = payload.status
        state.isAuth = payload.false
        state.message = payload.message
      } else {
        state.status = null
        state.isAuth = true
        state.user = payload.user
        state.message = null
        save(USER, payload.user)
      }
    }
  }
})

export const { clearStateValidation, clearStateAuth } = AuthSlice.actions
export default AuthSlice.reducer