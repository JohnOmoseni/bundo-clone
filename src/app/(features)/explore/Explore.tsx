"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import { PlusIcon } from "@/constants/icons";
import { useEffect, useState } from "react";
import { Libraries, LoadScript } from "@react-google-maps/api";
import { useBusinessLocations } from "@/context/BusinessLocations";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import AddBusiness from "./AddBusiness";
import GoogleMapView from "@/app/_sections/GoogleMapView";

const libraries: Libraries = ["places"];

function Explore({ data }: { data: any }) {
	const [openModal, setOpenModal] = useState(false);
	const { businessLocationsList, setBusinessLocationsList } =
		useBusinessLocations();

	useEffect(() => {
		if (!data && data?.length === 0) return;
		setBusinessLocationsList(data);
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
					libraries={libraries}
					loadingElement={
						<div className="loader-container">
							<FallbackLoader loading />
						</div>
					}
				>
					<div className="rounded-xl overflow-hidden overflow-x-clip w-full">
						<GoogleMapView businessLocations={businessLocationsList || []} />
					</div>
				</LoadScript>
			</div>

			{openModal && <AddBusiness closeModal={() => setOpenModal(false)} />}
		</>
	);
}

export default Explore;
