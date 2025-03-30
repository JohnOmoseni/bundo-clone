"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	containerStyles?: string;
};

const SectionWrapper = ({ children, containerStyles }: Props) => {
	return (
		<section
			className={cn(
				"w-full pt-6 pb-5 px-3.5 min-h-[50vh] sm:pt-[4%] lg:pt-[5%] sm:px-[4%]",
				containerStyles
			)}
		>
			{children}
		</section>
	);
};

export default SectionWrapper;
