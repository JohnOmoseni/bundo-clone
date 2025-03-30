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

const containerStyle = {
	width: "100%",
	height: window.innerWidth * 0.4,
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
	// 	googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "YOUR_API_KEY",
	// });
	const { userLocation, addressObject } = useLocation();
	const [center, setCenter] = useState(default_center);
	const [map, setMap] = useState<any>(null);

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
	}, [addressObject, userLocation]);

	const onLoad = useCallback(function callback(map: any) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map: any) {
		setMap(null);
	}, []);

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={12}
			onLoad={(map) => setMap(map)}
			onUnmount={onUnmount}
			options={options}
		>
			{center ? (
				<MarkerF
					position={center}
					icon={{
						url: "/images/map_marker.png",
						// @ts-ignore
						scaledSize: {
							width: 20,
							height: 20,
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
						<div className="row-flex p-1 bg-background rounded-full size-14 clip-circle"></div>
					</OverlayViewF>
				</MarkerF>
			) : null}

			{businessLocations && businessLocations?.length > 0
				? businessLocations?.map((location: any) => (
						<Markers key={location?.id} businessLocation={location} />
				  ))
				: null}
		</GoogleMap>
	);
	// isLoaded ? (

	// ) : (
	// 	<></>
	// );
}
