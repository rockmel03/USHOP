import { createSlice } from "@reduxjs/toolkit";
import {
  addNewCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./categoryThunk";

const initialState = {
  value: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.value = [...state.value, ...action.payload.data.categories];
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.value = [...state.value, action.payload.data];
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.value = state.value.map((category) => {
          if (category._id !== action.payload._id) return category;
          return action.payload;
        });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.value = state.value.filter(
          (category) => category._id !== action.payload._id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
