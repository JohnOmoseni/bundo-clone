export function animateFn(variants: any, delay: number = 0, custom?: number) {
	return {
		initial: "initial",
		animate: "enter",
		exit: "exit",
		transition: { duration: 0.75, delay: delay },
		custom,
		variants,
	};
}

export const pageVariant = {
	initial: {
		opacity: 0,
		clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
	},
	enter: {
		opacity: 1,
		clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
		transition: {
			ease: "easeInOut",
			duration: 0.75,
		},
	},
	exit: { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
};

export const slideupVariant = {
	initial: {
		opacity: 0,
		y: 30,
	},
	enter: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeInOut",
			duration: 5,
		},
	},
};

export const slideinVariant = {
	initial: { opacity: 0, x: "100vw" },
	enter: {
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.1,
			duration: 0.8,
			type: "spring",
			mass: 0.3,
			ease: "easeIn",
			when: "beforeChildren",
		},
	},
	exit: {
		x: "100vw",
		opacity: 0,
		transition: {
			duration: 1,
			ease: "easeOut",
		},
	},
};

export const animateMenu = {
	initial: { opacity: 0, x: "100vw" },
	enter: {
		opacity: 1,
		x: 0,
		transition: {
			delay: 0.1,
			duration: 0.8,
			type: "spring",
			mass: 0.3,
			ease: "easeIn",
			when: "beforeChildren",
			delayChildren: 0.2,
			staggerChildren: 0.4,
		},
	},
	exit: {
		x: "100vw",
		opacity: 0,
		transition: {
			duration: 1,
			ease: "easeOut",
		},
	},
};

export const linksAni = {
	initial: { opacity: 0, x: 100 },
	enter: (custom: number) => {
		return {
			opacity: 1,
			x: 0,
			transition: {
				ease: "easeIn",
				delay: custom * 0.3,
				duration: 0.8,
				type: "spring",
			},
		};
	},
};
