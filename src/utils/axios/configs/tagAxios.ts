import axios from "axios";

const baseURL = new URL("/tags", import.meta.env.VITE_API_BASE_URL);

export const fetchTag = axios.create({
  baseURL: baseURL.toString(),
});