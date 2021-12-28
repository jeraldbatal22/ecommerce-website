import { createSlice } from "@reduxjs/toolkit";

const Signup = createSlice({
  name: 'signup',
  initialState: {
    status: null,
    errors: [],
    message: null,
    user: null
  },
  reducers: {

  },
  extraReducers: {

  }
})

// export const { } = Signup.actions
export default Signup.reducer