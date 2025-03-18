import axios from "axios";

const baseURL = new URL("/api/activities", import.meta.env.VITE_API_BASE_URL);

export const fetchActivity = axios.create({
    baseURL: baseURL.toString(),
    // TODO: generalize this by adding to service or something
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
    },
});
