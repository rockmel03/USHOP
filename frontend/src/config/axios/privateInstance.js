import axios from "axios";
import { refreshAuthToken } from "../../features/auth/AuthThunk";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

// Create a variable to store the token getter function
let getToken = () => null;
let dispatch = null;

// Function to set the token getter and dispatch function
export const setAuthConfig = (tokenGetter, dispatchFn) => {
  getToken = tokenGetter;
  dispatch = dispatchFn;
};

const privateInstance = axios.create({
  baseURL: BASE_URL + "/api/v1",
  withCredentials: true,
});

// Request interceptor
privateInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
privateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Dispatch refresh token action using the stored dispatch function
        if (dispatch) {
          await dispatch(refreshAuthToken()).unwrap();

          // Get the new token using the token getter
          const newToken = getToken();

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with new token
          return privateInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default privateInstance;
