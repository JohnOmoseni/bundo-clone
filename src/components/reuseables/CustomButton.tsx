import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { FC } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const buttonVariants = cva(
	"row-flex min-w-[150px] max-[400px]:text-sm md:whitespace-nowrap leading-4 rounded font-semibold capitalize tracking-wide subpixel-antialiased shadow-xs filter transition duration-150 active:translate-y-0.5 active:brightness-90 disabled:border-none disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "w-max bg-secondary text-white hover:brightness-75",
				outline:
					"border border-border-variant text-foreground-variant disabled:pointer-events-none",
				accent: "bg-accent text-white w-max",
			},
			size: {
				default: "max-h-14 py-3 lg:py-3.5 lg:px-5 px-4",
				sm: "px-3 px-2.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariantsProps {
	title: string;
	className?: string;
	type?: "button" | "submit" | "reset";
	icon?: any;
	isLoading?: boolean;
	dir?: "left" | "right";
	disabled?: boolean;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: FC<ButtonProps> = ({
	title,
	className,
	type = "button",
	dir = "left",
	icon: Icon,
	onClick,
	isLoading = false,
	disabled = false,
	variant,
	size,
}) => {
	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			onClick={onClick}
			className={cn(
				buttonVariants({ variant, size }),
				className,
				Icon && "gap-2"
			)}
		>
			{isLoading ? (
				<ClipLoader
					size={20}
					aria-label="Loading"
					data-testid="loader"
					className="row-flex mr-1.5 text-white"
				/>
			) : (
				<>
					{Icon && dir === "left" && <Icon className="size-5 text-white " />}
					{title}
					{Icon && dir === "right" && <Icon className="size-5 text-white" />}
				</>
			)}
		</button>
	);
};

export default CustomButton;
