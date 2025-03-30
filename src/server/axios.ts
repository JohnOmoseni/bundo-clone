import axios from "axios";

export const API_DOMAIN =
	process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

if (!API_DOMAIN) {
	throw new Error("API_DOMAIN is not defined in the environment variables.");
}

const axiosInstance = axios.create({
	baseURL: API_DOMAIN,
});

export default axiosInstance;
