"use server";

import { handleApiError } from "@/lib/utils";
import { AxiosResponse } from "axios";
import axiosInstance from "../axios";

type CreateVendorLocationParasms = {
	id: string;
	lat: number;
	long: number;
	businessName: string;
	address: string;
	businessProfilePicture: string;
};

const getAllVendors = async ({
	page = 1,
	limit = 10,
	lat = -34.397,
	lng = 150.644,
}: {
	page: number;
	limit: number;
	lat: number;
	lng: number;
}): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.get(
			`/Stage?lat=${lat}&lng=${lng}&page=${page}&limit=${limit}`
		);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const getAllBusinessLocations = async (): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.get("/Stage/businessLocations");

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

const createVendorLocation = async (
	payload: CreateVendorLocationParasms
): Promise<AxiosResponse["data"]> => {
	try {
		const response = await axiosInstance.post(`/Stage`, payload);

		return response.data;
	} catch (error) {
		handleApiError(error);
	}
};

export const bundoApi = {
	getAllVendors,
	getAllBusinessLocations,
	createVendorLocation,
};
