import { configureStore } from "@reduxjs/toolkit";
import loginslice from "../reducer/loginslice";
import AuthReducer from "../reducer/AuthReducer";

const store = configureStore({
  reducer: {
    Login: loginslice,
    AuthReducer: AuthReducer,
  },
});

export default store;