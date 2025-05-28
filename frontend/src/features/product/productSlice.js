import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./productThunk";

const initialState = {
  value: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value = [...state.value, ...action.payload.data.products];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value = [...state.value, ...action.payload.data];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value = state.value.map((item) => {
          if (item._id !== action.payload.data._id) return item;
          return action.payload.data;
        });
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.value = state.value.filter(
          (item) => item._id !== action.payload.data?._id
        );
      });
  },
});

export default productSlice.reducer;
