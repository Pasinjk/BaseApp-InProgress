import { environment } from "./environments";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: environment.API_ENDPOINT,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers["X-API-KEY"] = environment.API_KEY;
  return config;
});
