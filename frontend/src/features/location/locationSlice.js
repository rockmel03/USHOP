import { createSlice } from "@reduxjs/toolkit";
import { fetchCities, fetchCountries, fetchStates } from "./locationThunks";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    countries: [],
    states: [],
    cities: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload.data;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload.data;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload.data;
      });
  },
});

export default locationSlice.reducer