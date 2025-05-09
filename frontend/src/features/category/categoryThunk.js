import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";

export const getAllCategory = createAsyncThunk(
  "category/getall",
  async (query, thunkApi) => {
    const searchParams = new URLSearchParams();
    searchParams.append("limit", query?.limit || 10);
    searchParams.append("page", query?.page || 1);
    const abortController = new AbortController();
    try {
      const response = await axios.get(
        "/categories/?" + searchParams.toString(),
        { signal: abortController.signal }
      );

      if (thunkApi.signal.aborted) {
        abortController.abort();
        return thunkApi.rejectWithValue("Request Aborted");
      }

      if (response.data?.status) {
        return response.data;
      }
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
      const response = await axios.post("/categories/", data, {
        headers: {
          Authorization: "Bearer " + thunkApi.getState().auth?.token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add new category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ _id, ...restData }, thunkApi) => {
    try {
      const response = await axios.put(`/categories/${_id}`, restData);
      if (response.data?.status) {
        return response.data.data;
      }
      return thunkApi.rejectWithValue("Failed to update");
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update Category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`/categories/${id}`);
      if (response.data?.status) {
        return response.data.data;
      }
      return thunkApi.rejectWithValue("Failed to delete");
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete Category"
      );
    }
  }
);
