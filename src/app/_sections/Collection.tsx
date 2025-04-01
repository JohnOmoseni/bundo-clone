import { cn } from "@/lib/utils";
import Card from "./Card";
import { RefObject } from "react";

type CollectionProps = {
	data: any[];
	emptyTitle?: string;
	emptySubText?: string;
	emptyContainerStyles?: string;
	emptyListElement?: any;
	containerStyles?: string;
	cardContainerStyles?: string;
	collectionType?: "VendorType" | "All" | "Categories";
	limit?: number;
	page?: number | string;
	hasDifferentContainerStyles?: boolean;
	urlParamName?: string;
	totalPages?: number;
	showDiscount?: boolean;
	ref?: RefObject<HTMLUListElement | null>;
};

function Collection({
	data,
	emptyTitle,
	emptySubText,
	containerStyles,
	cardContainerStyles,
	emptyContainerStyles,
	emptyListElement,
	collectionType,
	hasDifferentContainerStyles,
	ref,
	showDiscount,
}: CollectionProps) {
	return (
		<>
			{data && data?.length > 0 ? (
				<ul
					ref={ref}
					// {...(ref && {
					// 	ref: ref,
					// })}
					className={
						hasDifferentContainerStyles
							? containerStyles
							: cn(
									"grid w-full grid-cols-1 items-center gap-6 lg:gap-7 sm:grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]",
									containerStyles
							  )
					}
				>
					{data.map((item, idx) => {
						const vendorType = collectionType === "VendorType";
						const category = collectionType === "Categories";

						const type = vendorType ? "vendors" : category ? "category" : "All";

						return (
							<Card
								showDiscount={showDiscount}
								cardContainerStyles={cardContainerStyles}
								item={item}
								key={idx}
								type={type}
							/>
						);
					})}
				</ul>
			) : emptyListElement ? (
				emptyListElement
			) : (
				<div
					className={cn(
						"grid min-h-[200px] w-full place-items-center gap-2 px-3 py-4",
						emptyContainerStyles
					)}
				>
					<div className="flex-column">
						<h2 className="text-xl font-bold text-center italic">
							{emptyTitle || "No items found"}
						</h2>
						<p className="text-center text-sm">{emptySubText || ""}</p>
					</div>
				</div>
			)}
		</>
	);
}

export default Collection;
