import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const iconBgVariants = cva("grid place-items-center shadow rounded-full", {
	variants: {
		iconBgVariant: {
			default: "",
			"show-bg": "size-[22px] cursor-pointer",
			loader: "size-6 pointer-events-none",
		},
		iconBgColor: {
			default: "bg-white",
			variant: "bg-secondary",
			icon_bg: "bg-green-200",
		},

		defaultVariants: {
			iconBgVariant: "default",
			iconBgColor: "variant",
		},
	},
});

const iconVariants = cva("object-contain icon cursor-pointer", {
	variants: {
		iconColor: {
			default: "text-foreground-variant",
			white: "text-white",
			variant: "text-[#0A2211]",
			loader: "text-white",
		},
		iconSize: {
			default: "size-5",
			sm: "size-4 md:size-5",
		},
	},

	defaultVariants: {
		iconColor: "white",
		iconSize: "default",
	},
});

type IconBgVariantsProps = VariantProps<typeof iconBgVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconProps extends IconBgVariantsProps, IconVariantsProps {
	title?: string;
	action?: () => void;
	icon: any;
	className?: string;
	containerClassName?: string;
}

const CustomIcon = forwardRef<any, IconProps>(
	(
		{
			title = "",
			icon: Icon,
			action,
			iconColor,
			iconSize,
			iconBgVariant,
			iconBgColor = "variant",
			className,
			containerClassName,
		},
		ref
	) => {
		return (
			<div ref={ref}>
				{iconBgVariant === "show-bg" ? (
					<div
						title={title}
						className={cn(
							iconBgVariants({ iconBgVariant, iconBgColor }),
							containerClassName
						)}
						onClick={() => (action ? action?.() : null)}
					>
						<Icon
							className={cn(iconVariants({ iconColor, iconSize }), className)}
						/>
					</div>
				) : (
					<Icon
						title={title}
						onClick={() => (action ? action?.() : null)}
						className={cn(iconVariants({ iconColor, iconSize }), className)}
					/>
				)}
			</div>
		);
	}
);

export default CustomIcon;
