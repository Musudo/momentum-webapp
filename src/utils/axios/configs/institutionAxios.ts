import axios from "axios";

const baseURL = new URL("/institutions", import.meta.env.VITE_API_BASE_URL);

export const fetchInstitution = axios.create({
  baseURL: baseURL.toString(),
});
