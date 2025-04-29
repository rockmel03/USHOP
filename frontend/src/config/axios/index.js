import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL + "/api/v1",
});

export default instance;
