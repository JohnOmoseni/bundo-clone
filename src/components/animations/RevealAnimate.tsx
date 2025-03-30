"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls, useInView } from "framer-motion";

const revealVariants = {
	initial: { opacity: 0, y: 50 },
	enter: { opacity: 1, y: 0 },
};

export type RevealAnimateProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
};

function RevealAnimate({ children, className, delay }: RevealAnimateProps) {
	const ref = useRef<HTMLDivElement>(null);
	const revealControls = useAnimationControls();
	const isInView = useInView(ref, { once: false, amount: 0.2 });

	useEffect(() => {
		if (isInView) {
			revealControls.start("animate");
		}
	}, [isInView]);

	return (
		<motion.div
			ref={ref}
			variants={revealVariants}
			initial="hidden"
			animate={revealControls}
			transition={{ duration: 0.7, delay: delay ? delay : 0.3 }}
			className={cn("w-full", className)}
		>
			{children}
		</motion.div>
	);
}

export default RevealAnimate;
