"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SearchIcon } from "@/constants/icons";
import { useAppDispatch, useAppSelector } from "@/types";
import { setSearchQuery, setSearchResults } from "@/redux/features/appSlice";

type GlobalSearchProps = {
	containerStyles?: string;
	placeholder?: string;
};

function GlobalSearch({ containerStyles, placeholder }: GlobalSearchProps) {
	const [value, setValue] = useState("");
	const dispatch = useAppDispatch();
	const { query, globalProducts } = useAppSelector((state) => state.appState);

	useEffect(() => {
		const timeout = setTimeout(() => dispatch(setSearchQuery(value)), 100);

		return () => clearTimeout(timeout);
	}, [value]);

	useEffect(() => {
		const handleSearch = (searchTerm: string) => {
			if (searchTerm?.trim() === "") {
				dispatch(setSearchResults([]));
			} else {
				const searchResults =
					globalProducts?.length > 0 &&
					globalProducts?.filter((product: any) =>
						product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
					);
				dispatch(setSearchResults(searchResults || []));
			}
		};

		handleSearch(query);
	}, [query]);

	return (
		<div
			className={cn(
				"row-flex-start bg-secondary-100 w-56 rounded-lg border border-input pl-2 pr-3 py-1 sm:w-[300px]",
				containerStyles
			)}
		>
			<Input
				value={value}
				placeholder={placeholder ?? "Search"}
				className="!i-reset h-8"
				onChange={(e) => setValue(e.target.value)}
			/>
			<SearchIcon className="size-5 text-foreground-variant" />
		</div>
	);
}

export default GlobalSearch;
