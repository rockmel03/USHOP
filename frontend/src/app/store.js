import { configureStore } from "@reduxjs/toolkit";
import { setAuthConfig } from "../config/axios/privateInstance";

import AuthReducer from "../features/auth/AuthSlice";
import CategoryReducer from "../features/category/categorySlice";
import ProductsReducer from "../features/product/productSlice";
import CartReducer from "../features/cart/cartSlice";
import UserReducer from "../features/user/userSlice";
import LocationReducer from "../features/location/locationSlice";
import CheckoutReducer from "../features/checkout/checkoutSlice";
import OrderReducer from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    categories: CategoryReducer,
    products: ProductsReducer,
    cart: CartReducer,
    user: UserReducer,
    location: LocationReducer,
    checkout: CheckoutReducer,
    order: OrderReducer,
  },
});

// Initialize auth configuration for privateInstance
setAuthConfig(() => store.getState().auth.token, store.dispatch);

export default store;
