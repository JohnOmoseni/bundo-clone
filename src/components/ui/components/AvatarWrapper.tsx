import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { cn } from "../../../lib/utils";
import images from "@/constants/images";

type AvatarProps = {
	src?: string;
	fallback?: string;
	containerClassName?: string;
};

function AvatarWrapper({
	src,
	fallback = "ASL",
	containerClassName,
}: AvatarProps) {
	return (
		<Avatar
			className={cn(
				"icon place-items-center leading-none bg-[#F4ECEC] transition-all clip-circle group overflow-hidden",
				containerClassName
			)}
		>
			<AvatarImage
				src={src || (images.profile as any)}
				className="group-hover:scale-105 user-select-none"
			/>
			{/* <AvatarFallback className="leading-none mt-px tracking-wider">
				{fallback}
			</AvatarFallback> */}
		</Avatar>
	);
}

export default AvatarWrapper;
