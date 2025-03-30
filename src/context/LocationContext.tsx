"use client";

import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
export type CoordinatesType = {
	lat: number;
	lng: number;
	name: string | undefined;
	label: string | undefined;
};

type UserLocationType = {
	lat: number;
	lng: number;
};

type LocationContextType = {
	userLocation: UserLocationType | null;
	addressObject: CoordinatesType | null;
	setUserLocation: React.Dispatch<
		React.SetStateAction<UserLocationType | null>
	>;
	setAddressObject: React.Dispatch<
		React.SetStateAction<CoordinatesType | null>
	>;
};

const LocationContext = createContext<LocationContextType | undefined>(
	undefined
);

type LocationProviderType = PropsWithChildren;
export default function LocationProvider({
	children,
	...props
}: LocationProviderType) {
	const [userLocation, setUserLocation] = useState<UserLocationType | null>(
		null
	);
	const [addressObject, setAddressObject] = useState<CoordinatesType | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getUserLocation = async () => {
			if (navigator.geolocation) {
				try {
					navigator.geolocation.getCurrentPosition(function (pos) {
						const location = {
							lat: pos.coords.latitude,
							lng: pos.coords.longitude,
						};
						setUserLocation(location);
						sessionStorage.setItem("userLocation", JSON.stringify(location));
					});
				} catch (error) {
					console.log("Error getting user location:", error);
				}
			} else {
			}
		};

		getUserLocation();
	}, []);

	return (
		<LocationContext
			value={{
				userLocation,
				setUserLocation,
				addressObject,
				setAddressObject,
			}}
			{...props}
		>
			{children}
		</LocationContext>
	);
}

export function useLocation() {
	const context = useContext(LocationContext);

	if (!context) {
		throw new Error("useUserLocation must be used within the LocationProvider");
	}

	return context;
}
