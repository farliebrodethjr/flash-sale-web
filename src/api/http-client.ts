import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:9920/v1";

export const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function setHeaderAuth(token: string | null) {
  if (token) {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete httpClient.defaults.headers.common.Authorization;
  }
}

export default httpClient;
