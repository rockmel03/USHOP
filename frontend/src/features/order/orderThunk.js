import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../config/axios/privateInstance";

export const createOrder = createAsyncThunk(
  "orders/create",
  async function (data, thunkAPI) {
    try {
      const response = await axiosPrivate.post("/order/", data, {
        signal: thunkAPI.signal,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Order Creation Failed"
      );
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/get",
  async (orderId, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/order/${orderId}`, {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.rejectWithValue(
        error.response?.data?.message || "failed to find order"
      );
    }
  }
);
