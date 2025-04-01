import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";

export type StatusType = "Approved" | "Success" | "pending" | "Failed";

export type User = {
	userId: string;
	name: string;
	email: string;
	isVerified: boolean;
};

export type BusinessLocationType = {
	updatedAt: string;
	createdAt: string;
	ttl: number;
	businessName: string;
	address: string;
	id: string;
	lat: number;
	long: number;
};

export type OptionType = {
	label: string;
	value: string;
};

// Create typed hooks for useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
