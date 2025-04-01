import axios from "axios";
import { cookies } from "next/headers"; 

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://efinas.api.aespinance.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


api.interceptors.response.use(
  (response) => {
    console.log("Raw API Response:", response.data); // Log full response
    return response.data; // ✅ Automatically extract `data`
  },
  (error) => {
    if (error.errorMessage) {
      console.error("API Error Status:", error.errorMessage);
    } else {
      console.error("API Error:", error);
    }
    return Promise.reject(error.response?.errorMessage || "An error occurred");
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Redirect to login or refresh token logic
        console.error("Unauthorized! Redirecting to login...");
        localStorage.removeItem("token"); 
        window.location.href = "/login";
      }
      
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
