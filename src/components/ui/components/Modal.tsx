import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";
import { Close } from "../../../constants/icons";
import { cn } from "../../../lib/utils";

type ModalProps = {
	title?: string;
	description?: string;
	children?: ReactNode;
	openModal: boolean;
	modalStyles?: string;
	showCloseIcon?: boolean;
	setOpenModal?: () => void;
};

export function Modal({
	title,
	description,
	children,
	openModal,
	showCloseIcon = true,
	setOpenModal,
	modalStyles,
}: ModalProps) {
	return (
		<AlertDialog
			open={openModal}
			onOpenChange={() => (setOpenModal ? setOpenModal() : null)}
		>
			{/* we will trigger the opening of the dialog somewhere else */}

			<AlertDialogContent
				style={{ zIndex: 999 }}
				className={cn(
					"block remove-scrollbar mx-auto max-h-[560px] md:max-h-[580px] min-h-[200px] max-w-lg overflow-x-clip overflow-y-auto rounded-xl py-5 px-4 md:px-5 shadow-lg max-sm:w-[90%]",
					modalStyles
				)}
			>
				<div className="absolute right-4 top-4">
					{showCloseIcon && (
						<span
							className="icon-div group active:scale-95"
							onClick={setOpenModal}
							title="close"
							style={{
								zIndex: "1000",
							}}
						>
							<Close
								size="18"
								className="transition-colors group-hover:text-foreground-100"
							/>
						</span>
					)}
				</div>

				<AlertDialogHeader>
					<AlertDialogTitle
						className={cn("text-xl sm:text-2xl hidden", title && "block")}
					>
						{title}
					</AlertDialogTitle>

					<AlertDialogDescription
						className={cn(
							"max-sm:text-center hidden leading-5",
							description && "block"
						)}
					>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}
