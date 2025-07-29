import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../config/axios/privateInstance";

export const createPaymentOrder = createAsyncThunk(
  "payment/create-order",
  async function (data, thunkApi) {
    try {
      const response = await axiosPrivate.post("/payment/create-order", data, {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to create payment order"
      );
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async function (data, thunkApi) {
    try {
      const response = await axiosPrivate.post("/payment/verify", data, {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to Verify payment"
      );
    }
  }
);
