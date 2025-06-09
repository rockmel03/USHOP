import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";

export const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async (_, thunkApi) => {
    try {
      const res = await axios.get("/locations/countries", {
        signal: thunkApi.signal,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch countries"
      );
    }
  }
);

export const fetchStates = createAsyncThunk(
  "location/fetchStates",
  async (countryCode, thunkApi) => {
    try {
      const res = await axios.get(`/locations/states/${countryCode}`, {
        signal: thunkApi.signal,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch states"
      );
    }
  }
);

export const fetchCities = createAsyncThunk(
  "location/fetchCities",
  async ({ countryCode, stateCode }, thunkApi) => {
    try {
      const res = await axios.get(
        `/locations/cities/${countryCode}/${stateCode}`,
        {
          signal: thunkApi.signal,
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cities"
      );
    }
  }
);
