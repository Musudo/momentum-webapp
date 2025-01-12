import axios from "axios";

const baseURL = new URL("/api/tasks", import.meta.env.VITE_API_BASE_URL);

export const fetchTask = axios.create({
  baseURL: baseURL.toString(),
});