import { configureStore } from "@reduxjs/toolkit";
import { setAuthConfig } from "./config/axios/privateInstance";

import AuthReducer from "./features/auth/AuthSlice";
import CategoryReducer from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    categories: CategoryReducer,
  },
});

// Initialize auth configuration for privateInstance
setAuthConfig(() => store.getState().auth.token, store.dispatch);

export default store;
