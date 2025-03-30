"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import { PlusIcon } from "@/constants/icons";
import { useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import AddBusiness from "./AddBusiness";
import GoogleMapView from "@/app/_sections/GoogleMapView";

function Explore({ data }: { data: any }) {
	const [openModal, setOpenModal] = useState(false);
	const [businessLocations, setBusinessLocations] = useState(data);

	useEffect(() => {
		setBusinessLocations(data);
	}, [data]);

	return (
		<>
			<div className="flex-column gap-6">
				<div className="row-flex-btwn !flex-wrap gap-y-3 gap-x-6">
					<h2>Explore Business</h2>

					<CustomButton
						icon={PlusIcon}
						title="Add Business"
						onClick={() => setOpenModal(true)}
						className="bg-secondary-200 min-w-[160px]"
					/>
				</div>

				<LoadScript
					googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}
					libraries={["places"]}
					loadingElement={
						<div className="loader-container">
							<FallbackLoader loading />
						</div>
					}
				>
					<div className="rounded-xl overflow-hidden overflow-x-clip w-full">
						<GoogleMapView businessLocations={businessLocations} />
					</div>
				</LoadScript>
			</div>

			{openModal && <AddBusiness closeModal={() => setOpenModal(false)} />}
		</>
	);
}

export default Explore;
