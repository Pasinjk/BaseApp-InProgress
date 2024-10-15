import { environment } from "./environments";
import axios from "axios";

export const axiosInstace = axios.create({
  baseURL: environment.API_ENDPOINT,
  headers: { "X_API_KEY" : environment.API_KEY },
});
