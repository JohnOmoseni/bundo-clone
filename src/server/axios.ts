import axios from "axios";

export const API_DOMAIN =
	process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

if (!API_DOMAIN) {
	throw new Error("API_DOMAIN is not defined in the environment variables.");
}

const axiosInstance = axios.create({
	baseURL: API_DOMAIN,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const tokenItem = sessionStorage.getItem("token");
		const token = tokenItem ? JSON.parse(tokenItem) : null;
		const platform = JSON.parse(localStorage.getItem("platform") || "{}");

		if (token) config.headers.Authorization = `Bearer ${token}`;

		config.headers["platform"] = platform?.slug ?? platform?.sub_domain;
		if (!config.headers.language) {
			config.headers.language = platform?.default_language;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const axiosBaseUrl = axios.create({
	baseURL: API_DOMAIN,
});

export default axiosInstance;
