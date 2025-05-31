import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";
import axiosPrivate from "../../config/axios/privateInstance";

export const getAllCategory = createAsyncThunk(
  "category/getall",
  async (query, thunkApi) => {
    const searchParams = new URLSearchParams();
    searchParams.append("limit", query?.limit || 10);
    searchParams.append("page", query?.page || 1);

    try {
      const response = await axios.get(
        "/categories/?" + searchParams.toString(),
        { signal: thunkApi.signal }
      );

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
      const response = await axiosPrivate.post("/categories/", data, {
        signal: thunkApi.signal,
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
      const response = await axiosPrivate.put(`/categories/${_id}`, restData, {
        signal: thunkApi.signal,
      });
      if (response.data?.status) {
        return response.data;
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
      const response = await axiosPrivate.delete(`/categories/${id}`, {
        signal: thunkApi.signal,
      });
      if (response.data?.status) {
        return response.data;
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
