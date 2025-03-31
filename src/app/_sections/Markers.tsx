"use client";

import React from "react";
import { MarkerF, OverlayView, OverlayViewF } from "@react-google-maps/api";
import { truncateString } from "@/lib/utils";

export default function Markers({
	businessLocation,
}: {
	businessLocation: any;
}) {
	const position = {
		lat: businessLocation?.lat,
		lng: businessLocation?.lng,
	};
	return (
		<MarkerF
			position={position}
			icon={{
				url: "/images/map_marker.png",
				// @ts-ignore
				scaledSize: {
					width: 30,
					height: 30,
				},
			}}
		>
			<OverlayViewF
				position={position}
				mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
			>
				<div className="py-1 px-2 bg-background rounded-md flex-column gap-0.5 clip-circle">
					<h3 className="text-center text-sm">
						{businessLocation?.businessName}
					</h3>
					<p className="text-center text-xs">
						{businessLocation?.address
							? truncateString(businessLocation?.address, 20)
							: ""}
					</p>
				</div>
			</OverlayViewF>
		</MarkerF>
	);
}
