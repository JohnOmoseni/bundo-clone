"use client";

import Card from "@/app/_sections/Card";
import Collection from "@/app/_sections/Collection";
import CustomIcon from "@/components/reuseables/CustomIcon";
import Link from "next/link";
import { items, salesData, vendorsArray } from "@/constants/data";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@/constants/icons";
import { useLocation } from "@/context/LocationContext";
import { getAllVendors } from "@/server/actions";
import { useEffect, useRef, useState } from "react";
import { BusinessLocationType, useAppDispatch } from "@/types";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import { setGlobalProducts } from "@/redux/features/appSlice";

function FeaturedItems() {
	const [vendorProducts, setVendorProducts] = useState<BusinessLocationType[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const { userLocation } = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchVendors = async () => {
			setIsLoading(true);
			try {
				const res = await getAllVendors({
					lat: userLocation?.lat,
					lng: userLocation?.lng,
				});

				if (!res?.status) throw new Error(res?.message || "An error occurred");
				const data = res?.data || [];
				setVendorProducts(data);
				dispatch(setGlobalProducts(data));
			} catch (err: any) {
			} finally {
				setIsLoading(false);
			}
		};

		if (userLocation?.lat && userLocation?.lng) fetchVendors();
	}, [userLocation]);

	return (
		<div className="flex-column gap-6">
			<div className="row-flex-btwn gap-3">
				<h2>Featured Products</h2>

				<Link
					href="#"
					className="text-sm text-foreground-variant active:scale-[0.95] transition underline font-semibold whitespace-nowrap"
				>
					see all
				</Link>
			</div>

			{isLoading ? (
				<div className="loader-container">
					<FallbackLoader />
				</div>
			) : (
				<Collection data={vendorProducts} collectionType="Categories" />
			)}
		</div>
	);
}

export default FeaturedItems;

export function BiggestSales() {
	const sliderElementRef = useRef<any>(null);

	const slideLeft = (element: any) => {
		element.scrollLeft -= element.offsetWidth;
		// element.scrollLeft -= 500;
	};

	const slideRight = (element: any) => {
		element.scrollLeft += element.offsetWidth;
	};
	return (
		<div className="flex-column gap-6">
			<div className="row-flex-btwn gap-3">
				<h2>Biggest Sales</h2>

				<div className="row-flex gap-3">
					<CustomIcon
						icon={KeyboardArrowLeft}
						iconBgVariant={"show-bg"}
						className=""
						action={() => slideLeft(sliderElementRef.current)}
					/>

					<CustomIcon
						icon={KeyboardArrowRight}
						iconBgVariant={"show-bg"}
						className=""
						action={() => slideRight(sliderElementRef.current)}
					/>
				</div>
			</div>

			<div className="max-sm:mx-2 relative">
				{salesData ? (
					<ul
						ref={sliderElementRef}
						className="flex overflow-x-auto overflow-y-hidden overflow-scroll gap-6 remove-scrollbar"
					>
						{salesData.map((item, idx) => {
							return (
								<Card
									showDiscount
									item={item}
									key={idx}
									type={"vendors"}
									cardContainerStyles="flex-shrink-0 w-[280px] md:w-[300px] min-w-auto"
								/>
							);
						})}
					</ul>
				) : null}
			</div>
		</div>
	);
}

export function ExploreVendors() {
	return (
		<div className="flex-column gap-6">
			<div className="row-flex-btwn gap-3">
				<h2>Explore some of our Vendors</h2>

				<Link
					href="/explore"
					className="text-sm text-foreground-variant active:scale-[0.95] transition underline font-semibold whitespace-nowrap"
				>
					see all
				</Link>
			</div>

			<Collection data={vendorsArray} collectionType="VendorType" />
		</div>
	);
}

export function ElevateJewellery() {
	return (
		<div className="flex-column gap-6">
			<h2>Elevate your Jewellery</h2>

			<Collection data={items} collectionType="Categories" />
		</div>
	);
}

export function BestSellers() {
	return (
		<div className="flex-column gap-6">
			<h2>Best Sellers in Beauty & Personal Care</h2>

			<Collection data={items} collectionType="Categories" />
		</div>
	);
}
