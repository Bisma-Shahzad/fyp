import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "Login",
  initialState: {
  }, 
  reducers: {
    add(state, action) {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
    },
    del() {},
  },
});

export const { add, del } = LoginSlice.actions;
export default LoginSlice.reducer;