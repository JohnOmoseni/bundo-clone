"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SearchIcon } from "@/constants/icons";

type GlobalSearchProps = {
	containerStyles?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
};

function GlobalSearch({
	onChange,
	containerStyles,
	placeholder,
}: GlobalSearchProps) {
	const [value, setValue] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => onChange?.(value), 50);

		return () => clearTimeout(timeout);
	}, [value]);

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
