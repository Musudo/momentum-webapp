import axios from "axios";

const baseURL = new URL("/api/reviews", import.meta.env.VITE_API_BASE_URL);

export const fetchReview = axios.create({
  baseURL: baseURL.toString(),
});