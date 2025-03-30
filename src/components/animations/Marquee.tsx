"use client";

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
	list: any[];
	containerStyles?: string;
	renderItem: (item: any, index: number) => ReactNode;
};

const Marquee = ({ containerStyles, list, renderItem }: MarqueeProps) => {
	const [start, setStart] = useState(false);
	const direction = "left";
	const speed = "slow" as string;
	const pauseOnHover = true;
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollerRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);

	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);

				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef?.current) {
			if (direction === "left") {
				containerRef?.current.style.setProperty(
					"--animation-direction",
					"forwards"
				);
			} else {
				containerRef?.current.style.setProperty(
					"--animation-direction",
					"reverse"
				);
			}
		}
	};
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "20s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "50s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "140s");
			}
		}
	};
	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"row-flex-btwn w-max min-w-full shrink-0 flex-nowrap gap-16 py-4 max-sm:gap-8",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]",
					containerStyles
				)}
			>
				{list.map((item, idx) => {
					return <Fragment key={idx}>{renderItem(item, idx)}</Fragment>;
				})}
			</ul>
		</div>
	);
};

export default Marquee;
