"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import CustomIcon from "@/components/reuseables/CustomIcon";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import {
	HeartFill,
	HeartOutline,
	LocationMarker,
	LocationOutlineIcon,
	RatingFilledStar,
	RatingOutlineStar,
	TagIcon,
} from "@/constants/icons";
import images from "@/constants/images";
import { cn, formatPrice, showToast, truncateString } from "@/lib/utils";
import { toggleWishlistItem } from "@/redux/features/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/types";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
	item: any;
	cardContainerStyles?: string;
	type: "vendors" | "category" | "All";
};

function Card({ item, type, cardContainerStyles }: CardProps) {
	const dispatch = useAppDispatch();

	const wishlist = useAppSelector((state: any) => state.wishlist.items);
	const isFavorited = wishlist.includes(item._id);

	const handleWishlistClick = async () => {
		const action = isFavorited ? "remove" : "add";

		try {
			dispatch(toggleWishlistItem(item._id));

			let message = `Item ${
				action === "add" ? "added to" : "removed from"
			} favourites successfully`;
			showToast("success", message);
		} catch (error: any) {
			console.error("Error updating wishlist:", error);
			dispatch(toggleWishlistItem(item.id));
			let message = `Error ${
				action === "add" ? "adding to" : "removing from"
			} favorites`;
			showToast("error", message);
		}
	};

	return (
		<li
			className={cn(
				"flex-column group relative size-full overflow-hidden transition-sm min-w-[300px] min-h-[320px] rounded-lg border border-border px-3 py-2.5",
				cardContainerStyles
			)}
		>
			{type === "vendors" ? (
				<VendorCard
					item={item}
					type="vendors"
					isFavorited={isFavorited}
					handleWishlistClick={handleWishlistClick}
				/>
			) : (
				<>
					<Link
						href={"#"}
						className="flex relative h-[220px] w-full flex-grow flex-shrink-0 bg-center overflow-hidden rounded bg-card "
					>
						<Image
							src={item?.business_profile_picture || images.item_1}
							alt=""
							width={1000}
							height={1000}
							className="w-full object-contain object-center"
						/>

						<div
							className={cn(
								"icon-div absolute right-2 top-2 pointer-events-auto transition-colors",
								isFavorited ? "!bg-foreground-variant" : ""
							)}
							onClick={() => handleWishlistClick()}
						>
							{isFavorited ? (
								<HeartFill className="size-4 text-white" />
							) : (
								<HeartOutline className="size-4 " />
							)}
						</div>
					</Link>

					<div className="flex-column w-full gap-1 px-1 pt-4 pb-2">
						<Link href={`#`} className="inline-flex">
							<h3 className="line-clamp-2 font-semibold leading-6 text-xl tracking-wide">
								{item?.name}
							</h3>
						</Link>

						{Array.isArray(item.categories) && item.categories?.length > 0 ? (
							<p className="flex items-center line-clamp-2 gap-1 w-full">
								{item.categories?.map((desc: any, idx: number) => (
									<span
										key={idx}
										className="font-light w-max leading-5 md:whitespace-nowrap"
									>
										{desc}
										{idx !== item.categories.length - 1 && ","}
									</span>
								))}
							</p>
						) : (
							<p className="font-light leading-5 md:whitespace-nowrap">
								{item?.categories}
							</p>
						)}

						<div className="ml-0.5 row-flex-start gap-3 mt-2">
							{Array.from({ length: 5 }).map((_, idx) => {
								const Icon =
									item?.total_ratings > idx
										? RatingFilledStar
										: RatingOutlineStar;

								return (
									<Icon
										key={idx}
										className={cn(
											"size-6 transition",
											item?.total_ratings > idx
												? "fill-foreground-variant"
												: "stroke-foreground-variant"
										)}
									/>
								);
							})}
							<span className="text-sm self-end font-semibold leading-5">
								({item.total_reviews})
							</span>
						</div>

						<div className="row-flex-btwn gap-4 mt-3.5">
							<p className="text-2xl md:text-3xl font-semibold ml-1 mt-1 leading-5">
								<span className="text-lg">₦</span>
								{formatPrice(item?.actual_price)}
							</p>

							{/* <div className="ml-auto row-flex gap-2.5">
								<span className="font-semibold text-sm text-grey line-through">
									₦2,500
								</span>

								<StatusBadge
									status="Success"
									value={
										item?.discount && (
											<span className="font-semibold text-xs text-white">
												{item.discount} off
											</span>
										)
									}
									containerStyles=""
								/>
							</div> */}
						</div>
					</div>
				</>
			)}
		</li>
	);
}

export default Card;

function VendorCard({
	item,
	isFavorited,
	handleWishlistClick,
}: CardProps & {
	isFavorited: boolean;
	handleWishlistClick: () => Promise<void>;
}) {
	return (
		<>
			<Link
				href={`#`}
				className="flex relative size-[75px] flex-shrink-0 bg-center overflow-hidden rounded-full bg-card clip-circle"
			>
				<Image
					src={item?.business_profile_picture}
					alt=""
					width={1000}
					height={1000}
					className="w-full object-contain object-center"
				/>
			</Link>

			<div
				className={cn(
					"icon-div absolute right-2 top-3 pointer-events-auto transition-colors",
					isFavorited ? "!bg-foreground-variant" : ""
				)}
				onClick={() => handleWishlistClick()}
			>
				{isFavorited ? (
					<HeartFill className="size-4 text-white" />
				) : (
					<HeartOutline className="size-4 " />
				)}
			</div>

			<div className="flex-column w-full gap-1 px-1 py-4 pb-2">
				<div className="flex-column gap-1">
					<Link href={`#`} className="inline-flex">
						<h3 className="line-clamp-2 leading-6 text-xl tracking-wide">
							{item?.name}
						</h3>
					</Link>

					<div className="row-flex-start gap-1.5">
						<Image
							src={images.location_image}
							alt=""
							width={20}
							height={20}
							className="object-cover w-5 h-fit object-center"
						/>
						<span className="font-light text-xs">
							{item?.dist?.calculated
								? `${item?.dist?.calculated || 0} minutes away from you`
								: "5 minutes away from you"}
						</span>
					</div>
				</div>

				<p className="text-lg leading-5 line-clamp-4 my-4">
					{item?.description
						? truncateString(item?.description, 100)
						: "Affordable and mouth watering food for all kinds of occasion. Fried rice, plantain...."}
				</p>

				<div className="flex-column gap-2">
					<div className="row-flex-start gap-2">
						<CustomIcon
							icon={LocationOutlineIcon}
							iconBgVariant={"show-bg"}
							iconBgColor={"icon_bg"}
							iconColor={"variant"}
							containerClassName="size-7"
						/>

						<span className="text-base leading-5 md:whitespace-nowrap line-clamp-1 w-full">
							{item?.address || "Ikeja, Lagos"}
						</span>
					</div>

					<div className="row-flex-start gap-3">
						<CustomIcon
							icon={TagIcon}
							iconBgVariant={"show-bg"}
							iconBgColor={"icon_bg"}
							iconColor={"variant"}
							containerClassName="size-7"
							className="size-[18px]"
						/>

						{Array.isArray(item.categories) && item.categories?.length > 0 ? (
							<p className="line-clamp-2 w-full pr-1">
								{item.categories?.map((desc: any, idx: number) => (
									<Link
										href={"#"}
										key={idx}
										className={cn(
											"text-foreground-variant w-max text-base underline leading-5 ",
											idx !== item.categories.length - 1 && "mr-1.5"
										)}
									>
										{desc}
										{idx !== item.categories.length - 1 && ","}
									</Link>
								))}
							</p>
						) : (
							<p className="text-foreground-variant text-base underline leading-5">
								{item?.categories}
							</p>
						)}
					</div>

					<div className="ml-0.5 row-flex-start gap-3 mt-3.5">
						{Array.from({ length: 5 }).map((_, idx) => {
							const Icon =
								item?.total_ratings > idx
									? RatingFilledStar
									: RatingOutlineStar;

							return (
								<Icon
									key={idx}
									className={cn(
										"size-6 transition",
										item?.total_ratings > idx
											? "fill-foreground-variant"
											: "stroke-foreground-variant"
									)}
								/>
							);
						})}
					</div>
				</div>

				<CustomButton
					title="View Page"
					className="mt-6 bg-foreground-variant w-full mx-auto"
				/>
			</div>
		</>
	);
}
