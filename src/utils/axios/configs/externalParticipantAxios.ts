import axios from "axios";

const baseURL = new URL("/api/externalParticipants", import.meta.env.VITE_API_BASE_URL);

export const fetchExternalParticipant = axios.create({
  baseURL: baseURL.toString(),
});