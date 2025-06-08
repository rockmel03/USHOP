import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../config/axios/privateInstance";

export const getProfile = createAsyncThunk(
  "user/profile",
  async function (_, thunkApi) {
    try {
      const response = await axiosPrivate.get("/users/me", {
        signal: thunkApi.signal,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
