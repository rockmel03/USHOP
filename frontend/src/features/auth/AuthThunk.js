import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";
import { jwtDecode } from "jwt-decode";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials);
      const token = response.data?.data?.accessToken;
      let user;
      if (token) {
        let decoded = jwtDecode(token);
        if (decoded) {
          user = decoded.user;
        }
      }
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration Failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      const token = response.data?.data?.accessToken;
      let user;
      if (token) {
        let decoded = jwtDecode(token);
        if (decoded) {
          user = decoded.user;
        }
      }
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  "/auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        "/auth/refresh",
        {},
        { signal: thunkAPI.signal }
      );
      const token = response.data?.data?.accessToken;
      let user;
      if (token) {
        let decoded = jwtDecode(token);
        if (decoded) {
          user = decoded.user;
        }
      }
      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/auth/logout");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout Failed"
      );
    }
  }
);
