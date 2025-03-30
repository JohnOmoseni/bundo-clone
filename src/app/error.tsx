"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import images from "@/constants/images";
import Image from "next/image";
import { useEffect } from "react";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error?: Error;
	reset: () => void;
}) {
	useEffect(() => {
		if (error) {
			console.error("[Error caught by ErrorBoundary:]", error);
		}
	}, [error]);
	return (
		<div className="fixed left-0 top-0 grid h-dvh w-full place-items-center bg-background">
			<div className="group absolute left-3 top-3 transition hover:scale-95 sm:left-5 sm:top-5">
				<Image
					src={images.logo}
					alt=""
					width={1000}
					height={1000}
					className="h-fit w-24 object-contain"
				/>
			</div>

			<div className="flex-column !items-center gap-10 px-6">
				<h2 className="line-clamp-5 max-w-[45ch] break-words text-center text-2xl sm:text-3xl">
					<span className="font-semibold text-red-500">Error</span> |{" "}
					{error?.message ?? "Something went wrong"}.
				</h2>

				<CustomButton
					title="Try again"
					onClick={() => reset()}
					className="max-w-max px-14 py-6 !text-lg"
				/>
			</div>
		</div>
	);
}
