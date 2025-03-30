import { ArrowBack } from "../../constants/icons";
import { ReactNode } from "react";
import CustomIcon from "./CustomIcon";
import { useRouter } from "next/navigation";

function BackArrow({
	icon = ArrowBack,
	onHandleGoBack,
	showLabel,
	children,
}: {
	icon?: any;
	showLabel?: boolean;
	children?: ReactNode;
	onHandleGoBack?: (() => void) | null;
}) {
	const router = useRouter();

	return (
		<div
			className="w-max"
			onClick={() => (onHandleGoBack ? onHandleGoBack() : router.back())}
		>
			{children ? (
				children
			) : (
				<>
					<CustomIcon icon={icon} iconBgVariant={"show-bg"} />

					{showLabel && (
						<p className="mt-0.5 text-sm font-medium capitalize transition">
							Back
						</p>
					)}
				</>
			)}
		</div>
	);
}

export default BackArrow;
