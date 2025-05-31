import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";
import axiosPrivate from "../../config/axios/privateInstance";

export const getAllProducts = createAsyncThunk(
  "products/get",
  async (query, thunkApi) => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      params.append(key, value);
    });

    try {
      const response = await axios.get(`/products/?${params.toString()}`, {
        signal: thunkApi.signal,
      });
      if (response.data?.status) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products!"
      );
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/get-one",
  async (productId, thunkApi) => {
    try {
      const response = await axios.get(`/products/${productId}`, {
        signal: thunkApi.signal,
      });
      if (response.data?.status) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to get product"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (data, thunkApi) => {
    try {
      const response = await axiosPrivate.post("/products/", data, {
        signal: thunkApi.signal,
      });
      if (response.data?.status) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to create product!"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ([id, data], thunkApi) => {
    try {
      const response = await axiosPrivate.put(`/products/${id}`, data, {
        signal: thunkApi.signal,
      });

      if (response.data?.status) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId, thunkApi) => {
    try {
      const response = await axiosPrivate.delete(`/products/${productId}`);
      if (response.data?.status) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);
