import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: null,
  phoneNumber: null,
  shippingAddress: null,
  paymentMethod: "razorpay",
  paymentInfo: null,
  cartItems: [],
  totalAmount: 0,
  isPaid: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setPaymentInfo: (state, action) => {
      state.isPaid = true;
      state.paymentInfo = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const { setCheckoutInfo, setPaymentInfo, resetCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
