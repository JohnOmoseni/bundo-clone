"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
	GoogleMap,
	MarkerF,
	OverlayView,
	OverlayViewF,
} from "@react-google-maps/api";
import { useLocation } from "@/context/LocationContext";
import Markers from "./Markers";
import { v4 as uuidv4 } from "uuid";
import { useBusinessLocations } from "@/context/BusinessLocations";
import { createVendorLocation } from "@/server/actions";
import { showToast } from "@/lib/utils";
import { useRouter } from "next/navigation";

const containerStyle = {
	width: "100%",
	height: window.innerWidth * 0.7,
};

// Default center
const default_center = {
	lat: -34.397,
	lng: 150.644,
};

const options = {
	mapId: "",
};

export default function GoogleMapView({
	businessLocations,
}: {
	businessLocations: any;
}) {
	// const { isLoaded } = useJsApiLoader({
	// 	googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
	// });
	const { userLocation, addressObject } = useLocation();
	const [center, setCenter] = useState(default_center);
	const [map, setMap] = useState<any>(null);
	const { businessLocationsList, setBusinessLocationsList } =
		useBusinessLocations();
	const router = useRouter();

	useEffect(() => {
		if (addressObject && map) {
			setCenter({
				lat: addressObject.lat,
				lng: addressObject.lng,
			});
		} else if (userLocation && map) {
			setCenter({
				lat: userLocation.lat,
				lng: userLocation.lng,
			});
		}
	}, [addressObject, userLocation, map]);

	const onLoad = useCallback(function callback(map: any) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map: any) {
		setMap(null);
	}, []);

	// Handle map click to create new location
	const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
		if (event.latLng) {
			const lat = event.latLng.lat();
			const lng = event.latLng.lng();

			const geocoder = new google.maps.Geocoder();
			geocoder.geocode({ location: { lat, lng } }, async (results, status) => {
				let newLocation: any;

				if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
					const address = results[0].formatted_address;

					newLocation = {
						id: uuidv4(),
						lat,
						long: lng,
						draggable: true,
						updatedAt: Date.now(),
						createdAt: Date.now(),
						ttl: 100,
						businessName: "New Business",
						address,
					};

					setBusinessLocationsList((prev) => [...prev, newLocation]);
				} else {
					newLocation = {
						id: uuidv4(),
						lat,
						long: lng,
						draggable: true,
						updatedAt: Date.now(),
						createdAt: Date.now(),
						ttl: 100,
						businessName: "New Business",
						address: "Unknown address",
					};

					console.log("Geocoding failed", status, event);
					setBusinessLocationsList((prev) => [...prev, newLocation]);
				}

				const data = {
					id: uuidv4(),
					lat: newLocation?.lat,
					long: newLocation?.long,
					businessName: newLocation?.business,
					businessProfilePicture: "",
					address: newLocation?.address,
				};

				try {
					const res = await createVendorLocation(data);

					if (!res?.status)
						throw new Error(res?.message || "An error occurred");

					showToast("success", "Location created successfully");
					router.push("/explore");
				} catch (error: any) {
					showToast("error", "Error creating location");
				}
			});
		}
	}, []);

	const handleMarkerDragEnd = useCallback(
		(id: string | number, event: google.maps.MapMouseEvent) => {
			if (event.latLng) {
				setBusinessLocationsList((prev) =>
					prev.map((loc) =>
						loc.id == id
							? {
									...loc,
									lat: event.latLng!.lat(),
									long: event.latLng!.lng(),
							  }
							: loc
					)
				);
			}
		},
		[]
	);

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={9}
			onLoad={(map) => setMap(map)}
			onUnmount={onUnmount}
			options={options}
			onClick={handleMapClick}
		>
			{center ? (
				<MarkerF
					position={center}
					icon={{
						url: "/images/map_marker.png",
						// @ts-ignore
						scaledSize: {
							width: 35,
							height: 35,
							// equals(other: any) {
							// 	return other.width === 20 && other.height === 20;
							// },
						},
					}}
				>
					<OverlayViewF
						position={center}
						mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					>
						<div className="py-1 px-2 bg-background rounded-md flex-column gap-0.5 clip-circle">
							<h3 className="text-center text-sm">User Location</h3>
						</div>
					</OverlayViewF>
				</MarkerF>
			) : null}

			{businessLocations && businessLocations?.length > 0
				? businessLocations?.map((location: any) => (
						<Markers key={location?.id} businessLocation={location} />
				  ))
				: null}

			{businessLocationsList.map((location) => (
				<MarkerF
					key={location.id}
					position={{ lat: location.lat, lng: location.long }}
					draggable={true}
					onDragEnd={(event) => handleMarkerDragEnd(location.id, event)}
					icon={{
						url: "/images/map_marker.png",
						// @ts-ignore
						scaledSize: {
							width: 20,
							height: 20,
						},
					}}
				/>
			))}
		</GoogleMap>
	);
	// isLoaded ? (

	// ) : (
	// 	<></>
	// );
}
