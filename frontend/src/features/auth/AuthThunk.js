import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios/index";
import { jwtDecode } from "jwt-decode";

const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "/users/login",
        credentials // {email : "user@example.com", password: "@Test123"}
      );
      // decode token
      const token = response.data?.data?.accessToken;
      let user;
      if (token) {
        let decoded = jwtDecode(token);
        if (decoded) {
          user = decoded.user;
        }
      }
      console.log(response);
      return { token, user };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

const logoutUser = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/users/logout");
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
    thunkAPI.rejectWithValue("Logout Failed");
  }
});

export { loginUser, logoutUser };
