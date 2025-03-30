"use client";

import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
	display: "block",
};

type LoaderProps = {
	loading?: boolean;
	showLabel?: boolean;
	label?: string;
	spinner?: ReactNode;
	containerStyles?: string;
};

const FallbackLoader = ({
	loading = true,
	label,
	showLabel,
	spinner,
	containerStyles,
}: LoaderProps) => {
	if (!loading) return null;

	return (
		<div
			className={cn(
				"pointer-events-auto absolute inset-0 grid w-full select-none place-items-center",
				containerStyles
			)}
			style={{ zIndex: 99 }}
		>
			<div className="row-flex-start gap-2">
				{spinner ? (
					spinner
				) : (
					<ClipLoader
						color={"#34a853"}
						loading={loading}
						cssOverride={override}
						size={30}
						aria-label="Loading"
						data-testid="loader"
					/>
				)}

				{showLabel && (
					<h3 className="animate-pulse transition-all">
						{label ?? "Loading..."}
					</h3>
				)}
			</div>
		</div>
	);
};

export default FallbackLoader;

export const BtnLoader = ({
	color,
	isLoading,
}: {
	color?: string;
	isLoading: boolean;
}) => {
	return (
		<ClipLoader
			loading={isLoading}
			size={18}
			color={color || "red"}
			cssOverride={override}
			aria-label="Loading"
			data-testid="loader"
			className="row-flex mr-1.5 text-secondary"
		/>
	);
};
