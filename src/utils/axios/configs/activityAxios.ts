import axios from "axios";

const baseURL = new URL("/activities", import.meta.env.VITE_API_BASE_URL);

export const fetchActivity = axios.create({
  baseURL: baseURL.toString(),
});
