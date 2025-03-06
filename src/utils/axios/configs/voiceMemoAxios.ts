import axios from "axios";

const baseURL = new URL("/api/voice-memos", import.meta.env.VITE_API_BASE_URL);

export const fetchVoiceMemo = axios.create({
    baseURL: baseURL.toString(),
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
    },
});