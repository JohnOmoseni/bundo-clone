import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import CustomButton from "../reuseables/CustomButton";

interface FormWrapperProps {
	children: ReactNode;
	buttonLabel?: string;
	isSubmitting?: boolean;
	containerStyles?: string;
	formWrapperStyles?: string;
	btnStyles?: string;
	onSubmit?: () => void;
	footerSection?: ReactNode;
}

function FormWrapper({
	children,
	buttonLabel,
	isSubmitting,
	containerStyles,
	btnStyles,
	onSubmit,
	footerSection,
	formWrapperStyles,
}: FormWrapperProps) {
	return (
		<div className={cn("mt-4 h-full w-full max-w-lg mx-auto", containerStyles)}>
			<form
				onSubmit={footerSection ? () => null : onSubmit}
				className={cn("flex-column flex-1", !footerSection && "gap-6 sm:gap-8")}
			>
				<div className={cn("flex-column gap-2 space-y-2", formWrapperStyles)}>
					{children}
				</div>

				{footerSection ? (
					footerSection
				) : (
					<CustomButton
						type="submit"
						title={isSubmitting ? "Submitting..." : buttonLabel || "Submit"}
						className={cn("!mt-auto !w-full", btnStyles)}
						disabled={isSubmitting}
						isLoading={isSubmitting}
					/>
				)}
			</form>
		</div>
	);
}

export default FormWrapper;
