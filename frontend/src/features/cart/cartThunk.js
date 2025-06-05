import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../config/axios/privateInstance";

export const getCart = createAsyncThunk(
  "cart/get-cart",
  async (_, thunkApi) => {
    try {
      const response = await axiosPrivate.get("/cart");

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(
        error.response.message || "Failed to fetch Cart"
      );
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/add-to-cart",
  async ({ productId, quantity = 1 }, thunkApi) => {
    try {
      const response = await axiosPrivate.post("cart/", {
        productId,
        quantity,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response.message || "Failed add to cart"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update-item",
  async ({ productId, quantity }, thunkApi) => {
    try {
      const response = await axiosPrivate.put(`/cart/${productId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response.message || "Failed update cart item"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/remove-item",
  async ({ productId }, thunkApi) => {
    try {
      const response = await axiosPrivate.delete(`/cart/${productId}`);

      return response.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response.message || "Failed remove cart item"
      );
    }
  }
);

export const clearCartItems = createAsyncThunk("cart/clear", async (_, thunkApi) => {
  try {
    const response = await axiosPrivate.delete("/cart");

    return response.data;
  } catch (error) {
    console.error(error);
    return thunkApi.rejectWithValue(
      error.response.message || "Failed clear cart"
    );
  }
});
