import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/featuredUser/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
