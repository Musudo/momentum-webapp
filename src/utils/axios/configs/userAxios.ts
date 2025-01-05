import axios from "axios";

const baseURL = new URL("/api/users", import.meta.env.VITE_API_BASE_URL);

export const fetchUser = axios.create({
  baseURL: baseURL.toString(),
});