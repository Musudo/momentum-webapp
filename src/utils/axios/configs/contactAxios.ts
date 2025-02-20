import axios from "axios";

const baseURL = new URL("/api/contacts", import.meta.env.VITE_API_BASE_URL);

export const fetchContact = axios.create({
    baseURL: baseURL.toString(),
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
    }
});