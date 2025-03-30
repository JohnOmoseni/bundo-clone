"use client";

import React from "react";
import { MarkerF, OverlayView, OverlayViewF } from "@react-google-maps/api";

export default function Markers({
	businessLocation,
}: {
	businessLocation: any;
}) {
	const position = {
		lat: businessLocation?.lat,
		lng: businessLocation?.long,
	};
	return (
		<MarkerF
			position={position}
			icon={{
				url: "/images/map_marker.png",
				// @ts-ignore
				scaledSize: {
					width: 20,
					height: 20,
				},
			}}
		>
			<OverlayViewF
				position={position}
				mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
			>
				<div className="row-flex p-1 bg-background rounded-full size-14 clip-circle">
					<p>{businessLocation?.businessName}</p>
					<p>{businessLocation?.address}</p>
				</div>
			</OverlayViewF>
		</MarkerF>
	);
}
