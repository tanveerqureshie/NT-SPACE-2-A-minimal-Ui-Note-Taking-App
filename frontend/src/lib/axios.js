import axios from "axios";
//In production, the frontend and backend are served from the same domain, so we can use a relative URL for the API requests. In development, we need to specify the full URL to the backend server.
const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;