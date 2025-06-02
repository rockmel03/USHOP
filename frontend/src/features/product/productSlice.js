import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./productThunk";

const initialState = {
  value: [],
  loading: false,
  error: null,
  filters: {
    minPrice: null,
    maxPrice: null,
    category: null,
    page: 1,
    limit: 5,
    sortBy: null,
    sortOrder: null,
  },
};

const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    setFilters(state, action) {
      Object.entries(action.payload).forEach(([key, value]) => {
        state.filters[key] = value;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        const { page } = action.meta.arg;
        if (page === 1) state.value = [];

        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const set = new Set(state.value.map((item) => item._id));
        const newData = action.payload.data.products;
        state.value.push(...newData.filter((item) => !set.has(item._id)));
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value.push(action.payload.data);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value.push(action.payload.data);
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

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
