"use client";

import Card from "@/app/_sections/Card";
import Collection from "@/app/_sections/Collection";
import CustomIcon from "@/components/reuseables/CustomIcon";
import { items } from "@/constants/data";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@/constants/icons";
import Link from "next/link";
import { useRef } from "react";

function FeaturedItems() {
	return (
		<div className="flex-column gap-6">
			<div className="row-flex-btwn gap-3">
				<h2>Featured Items</h2>

				<Link
					href="#"
					className="text-sm text-foreground-variant active:scale-[0.95] transition underline font-semibold"
				>
					see all
				</Link>
			</div>

			<Collection data={items} collectionType="Categories" />
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
				{/* <Collection
					data={items}
					collectionType="Categories"
					hasDifferentContainerStyles
					ref={sliderElementRef}
					containerStyles="flex overflow-x-auto overflow-scroll gap-6 remove-scrollbar"
					cardContainerStyles="flex-shrink-0 w-[300px] min-w-auto"
				/> */}

				<ul
					ref={sliderElementRef}
					className="flex overflow-x-auto overflow-scroll gap-6 remove-scrollbar"
				>
					{items.map((item, idx) => {
						return (
							<Card
								item={item}
								key={idx}
								type={"vendors"}
								cardContainerStyles="flex-shrink-0 w-[300px] min-w-auto"
							/>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export function ExploreVendors() {
	return (
		<div className="flex-column gap-6">
			<h2>Explore some of our Vendors</h2>

			<Collection data={items} collectionType="VendorType" />
		</div>
	);
}
