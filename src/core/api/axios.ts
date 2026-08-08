import axios from "axios";
import { StorageKeys } from "../../constants/storage_keys";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem(StorageKeys.TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(StorageKeys.TOKEN);
      window.location.href = "/login"; // should change latter to use react router
    }

    return Promise.reject(error);
  }
);