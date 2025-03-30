"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import { PlusIcon } from "@/constants/icons";
import { useState } from "react";
import AddBusiness from "./AddBusiness";
import GoogleMapView from "@/app/_sections/GoogleMapView";
import { LoadScript } from "@react-google-maps/api";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import SectionWrapper from "@/layouts/SectionWrapper";

function Explore() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<SectionWrapper>
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
						<GoogleMapView />
					</div>
				</LoadScript>
			</div>

			{openModal && (
				<AddBusiness
					openModal={openModal}
					closeModal={() => setOpenModal(false)}
				/>
			)}
		</SectionWrapper>
	);
}

export default Explore;
