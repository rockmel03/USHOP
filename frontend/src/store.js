import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./features/auth/AuthSlice";
import CategoryReducer from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    categories: CategoryReducer,
  },
});

export default store;
