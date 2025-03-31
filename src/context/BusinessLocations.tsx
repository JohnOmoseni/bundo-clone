"use client";

import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from "react";

type BusinessLocationType = {
	updatedAt: string | number;
	createdAt: string | number;
	ttl?: number;
	businessName: string;
	address: string;
	id: string;
	lat: number;
	lng: number;
	draggable?: boolean;
};

type BusinessLocationContextType = {
	businessLocationsList: BusinessLocationType[];
	setBusinessLocationsList: Dispatch<SetStateAction<BusinessLocationType[]>>;
	selectedBusiness: BusinessLocationType | null;
	setSelectedBusiness: Dispatch<SetStateAction<BusinessLocationType | null>>;
};

const BusinessLocationContext = createContext<
	BusinessLocationContextType | undefined
>(undefined);

type BusinessLocationProviderType = PropsWithChildren;
export default function BusinessLocationProvider({
	children,
	...props
}: BusinessLocationProviderType) {
	const [businessLocationsList, setBusinessLocationsList] = useState<
		BusinessLocationType[]
	>([]);
	const [selectedBusiness, setSelectedBusiness] =
		useState<BusinessLocationType | null>(null);

	return (
		<BusinessLocationContext
			value={{
				businessLocationsList,
				setBusinessLocationsList,
				selectedBusiness,
				setSelectedBusiness,
			}}
			{...props}
		>
			{children}
		</BusinessLocationContext>
	);
}

export function useBusinessLocations() {
	const context = useContext(BusinessLocationContext);

	if (!context) {
		throw new Error(
			"useBusinessLocations must be used within the BusinessLocationProvider"
		);
	}

	return context;
}
