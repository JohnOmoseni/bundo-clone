import CustomIcon from "@/components/reuseables/CustomIcon";
import { SearchIcon } from "@/constants/icons";
import { CoordinatesType } from "@/context/LocationContext";
import { useState, useEffect, useRef } from "react";

const AddAddress = ({
	onSetAddress,
	closeModalContent,
}: {
	addressValue?: string;
	onSetAddress: (value: CoordinatesType) => void;
	closeModalContent: () => void;
}) => {
	const [query, setQuery] = useState<string>("");
	const [suggestions, setSuggestions] = useState<
		google.maps.places.AutocompletePrediction[]
	>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dropdownRef = useRef<HTMLUListElement | null>(null);
	const placesService = useRef<google.maps.places.PlacesService | null>(null);

	useEffect(() => {
		placesService.current = new google.maps.places.PlacesService(
			document.createElement("div")
		);
	}, []);

	useEffect(() => {
		if (!query || query.length < 3) {
			setSuggestions([]);
			setIsDropdownOpen(false);
			return;
		}

		const autocompleteService = new google.maps.places.AutocompleteService();
		autocompleteService.getPlacePredictions(
			{ input: query, types: ["address"] },
			(predictions, status) => {
				if (
					status === google.maps.places.PlacesServiceStatus.OK &&
					predictions
				) {
					setSuggestions(predictions);
					setIsDropdownOpen(true);
				} else {
					setSuggestions([]);
					setIsDropdownOpen(false);
				}
			}
		);
	}, [query]);

	// Handle suggestion selection
	const handleSelectSuggestion = (
		suggestion: google.maps.places.AutocompletePrediction
	) => {
		console.log("TEST", suggestion);
		const placeId = suggestion.place_id;
		placesService.current?.getDetails(
			{ placeId, fields: ["geometry", "formatted_address", "name"] },
			(place, status) => {
				if (status === "OK" && place?.geometry && place?.geometry.location) {
					const coordinates = {
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng(),
						name: place.formatted_address,
						label: place.name,
					};
					onSetAddress(coordinates);
					setQuery(place.formatted_address || suggestion.description);
					setTimeout(() => closeModalContent(), 1000);
				}
			}
		);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (
				inputRef.current &&
				!inputRef.current.contains(target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(target)
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative row-flex-start bg-secondary-100 w-full gap-3 rounded-lg border border-input pl-2.5 pr-3 py-3 max-w-[500px] mx-auto">
			<CustomIcon icon={SearchIcon} iconColor={"variant"} className="" />
			<input
				ref={inputRef}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search Address"
				className="w-full  outline-none bg-transparent"
			/>

			{/* Suggestions Dropdown */}
			{isDropdownOpen && suggestions.length > 0 && (
				<ul
					ref={dropdownRef}
					className="absolute top-full left-0 mt-1 w-full bg-background border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10 pointer-events-auto"
				>
					{suggestions.map((suggestion) => (
						<li
							key={suggestion.place_id}
							onClick={() => handleSelectSuggestion(suggestion)}
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
						>
							{suggestion.description}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default AddAddress;

// const AddAddress = ({
// 	onSetAddress,
// 	closeModalContent,
// }: {
// 	addressValue?: string;
// 	onSetAddress: (value: CoordinatesType) => void;
// 	closeModalContent: () => void;
// }) => {
// 	const [value, setValue] = useState<any>(null);

// 	const getLatAndLng = (place: any) => {
// 		const placeId = place.value.place_id;
// 		const service = new google.maps.places.PlacesService(
// 			document.createElement("div")
// 		);

// 		service.getDetails({ placeId }, (place, status) => {
// 			if (status === "OK" && place?.geometry && place?.geometry?.location) {
// 				const coordinates = {
// 					lat: place.geometry.location.lat(),
// 					lng: place.geometry.location.lat(),
// 					name: place.formatted_address,
// 					label: place.name,
// 				};

// 				onSetAddress(coordinates);
// 			}
// 		});
// 	};

// 	return (
// 		<div className="row-flex-start bg-secondary-100 w-full gap-3 rounded-lg border border-input pl-2.5 pr-3 py-1 max-w-[500px] mx-auto">
// 			<CustomIcon icon={SearchIcon} iconColor={"variant"} className="" />

// 			<GooglePlacesAutocomplete
// 				selectProps={{
// 					value,
// 					onChange: (place) => {
// 						getLatAndLng(place);
// 						setValue(place);
// 					},
// 					placeholder: "Search Address",
// 					isClearable: true,
// 					className: "w-full",
// 					// onPlaceSelected: getLatAndLng,
// 					components: {
// 						ClearIndicator: () => null,
// 						DropdownIndicator: () => null,
// 					},
// 					styles: {
// 						input: (provided) => ({
// 							...provided,
// 							color: "blue",
// 						}),
// 						option: (provided) => ({
// 							...provided,
// 							color: "blue",
// 						}),
// 						singleValue: (provided) => ({
// 							...provided,
// 							color: "blue",
// 						}),
// 					},
// 				}}
// 			/>
// 		</div>
// 	);
// };

// export default AddAddress;
