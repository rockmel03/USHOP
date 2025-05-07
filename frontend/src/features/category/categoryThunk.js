import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";

export const getAllCategory = createAsyncThunk(
  "category/getall",
  async (query, thunkApi) => {
    const searchParams = new URLSearchParams();
    searchParams.append("limit", query?.limit || 10);
    searchParams.append("page", query?.page || 1);

    try {
      const response = await axios.get(
        "/categories/?" + searchParams.toString()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to load categories"
      );
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "category/add",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/categories/");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add new category"
      );
    }
  }
);
