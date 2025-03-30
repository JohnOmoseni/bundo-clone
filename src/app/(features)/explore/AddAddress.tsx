import CustomIcon from "@/components/reuseables/CustomIcon";
import { SearchIcon } from "@/constants/icons";
import { CoordinatesType } from "@/context/LocationContext";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const AddAddress = ({
	onSetAddress,
	closeModalContent,
}: {
	addressValue?: string;
	onSetAddress: (value: CoordinatesType) => void;
	closeModalContent: () => void;
}) => {
	const [value, setValue] = useState<any>(null);

	const getLatAndLng = (place: any) => {
		const placeId = place.value.place_id;
		const service = new google.maps.places.PlacesService(
			document.createElement("div")
		);

		service.getDetails({ placeId }, (place, status) => {
			if (status === "OK" && place?.geometry && place?.geometry?.location) {
				const coordinates = {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lat(),
					name: place.formatted_address,
					label: place.name,
				};

				onSetAddress(coordinates);
			}
		});
	};

	return (
		<div className="row-flex-start bg-secondary-100 w-56 rounded-lg border border-input pl-2 pr-3 py-1 sm:w-[300px]">
			<CustomIcon icon={SearchIcon} iconColor={"variant"} className="" />

			<GooglePlacesAutocomplete
				selectProps={{
					value,
					onChange: (place) => {
						getLatAndLng(place);
						setValue(place);
					},
					placeholder: "Search Address",
					isClearable: true,
					className: "w-full",
					// onPlaceSelected: getLatAndLng,
					components: {
						ClearIndicator: () => null,
						DropdownIndicator: () => null,
					},
					styles: {
						input: (provided) => ({
							...provided,
							color: "blue",
						}),
						option: (provided) => ({
							...provided,
							color: "blue",
						}),
						singleValue: (provided) => ({
							...provided,
							color: "blue",
						}),
					},
				}}
			/>
		</div>
	);
};

export default AddAddress;
