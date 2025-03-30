import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type ToastType = "success" | "info" | "error";

export const truncateString = (str: string, length: number): string => {
	return str.length > length ? `${str.substring(0, length - 2)}...` : str;
};

export function showToast(type: ToastType, message: string, desc?: string) {
	toast[type](
		<div className="flex-column gap-2 mt-2">
			<h3 className="font-semibold leading-0 text-base">{message}</h3>
			{desc && <p className="text-sm">{desc}</p>}
		</div>
	);
}

export const formatPrice = (price: string | number) => {
	if (!price) return 0;
	return new Intl.NumberFormat("en-NG", {
		maximumFractionDigits: 0,
	}).format(Number(price));
};

export const handleApiError = (error: any, message?: string) => {
	console.error(`API Error - ${message}:`, error);
	if (error.response) {
		// Server returned a responnse not in the 200 range
		console.error("Error Response data:", error.response.data);
		console.error("Response status:", error.response.status);
	} else if (error.request) {
		console.error("Request data:", error.request);
	} else {
		// No response from server - 404
		console.error("Error message:", error.message);
	}
	throw error;
};
