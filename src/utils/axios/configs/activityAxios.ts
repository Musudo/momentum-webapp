import axios from "axios";

const baseURL = new URL("/api/activities", import.meta.env.VITE_API_BASE_URL);

export const fetchActivity = axios.create({
  baseURL: baseURL.toString(),
  headers: {
    "Content-Type": "application/ld+json",
    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
  },
});
