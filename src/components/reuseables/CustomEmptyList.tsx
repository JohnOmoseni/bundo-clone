import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FC, ReactNode } from "react";

const emptyListVariants = cva("", {
	variants: {
		variant: {
			default:
				"md:min-h-[60vh] max-w-xl mx-auto grid min-h-[250px] w-full place-items-center px-3 py-4",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const iconVariants = cva("object-contain", {
	variants: {
		iconVariant: {
			default: "",
			"show-icon": "w-fit h-fit",
		},
	},
	defaultVariants: {
		iconVariant: "default",
	},
});

type EmptyListVariantsProps = VariantProps<typeof emptyListVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface EmptyListProps extends EmptyListVariantsProps, IconVariantsProps {
	title: string;
	subText: string;
	containerStyles?: string;
	titleStyles?: string;
	className?: string;
	icon?: any;
	footerSection?: ReactNode;
}

const CustomEmptyList: FC<EmptyListProps> = ({
	title,
	subText,
	iconVariant = "",
	containerStyles,
	titleStyles,
	className,
	icon: Icon = DefaultIcon,
	footerSection,
}) => {
	return (
		<>
			<div className={cn(emptyListVariants({}), containerStyles)}>
				{iconVariant === "show-icon" && (
					<Icon className={cn(iconVariants({ iconVariant }), className)} />
				)}

				<div
					className={cn(
						"flex-column gap-1.5",
						iconVariant === "show-icon" && "-mt-[5rem]"
					)}
				>
					<h3 className={cn("text-center font-semibold", titleStyles)}>
						{title || "No content"}
					</h3>
					<p className="text-gray-700 mx-auto text-center tracking-tight max-w-[40ch]">
						{subText}
					</p>
				</div>

				{footerSection && footerSection}
			</div>
		</>
	);
};

export default CustomEmptyList;

const DefaultIcon = () => {
	return (
		<svg
			width="119"
			height="165"
			viewBox="0 0 119 165"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M46.2119 26.446C49.4393 28.3885 52.6103 29.3269 54.0983 28.9438C57.831 27.9831 58.1738 14.3485 55.2859 8.97324C52.3985 3.59805 37.5521 1.2552 36.8041 11.9052C36.5445 15.6015 38.0983 18.9002 40.3947 21.5918L36.2773 40.7564H48.2377L46.2119 26.446Z"
				fill="#B28B67"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M39.477 23.989C37.9759 17.3199 33.6996 12.7738 34.3524 9.79303C35.0058 6.81224 37.8339 6.08572 37.8339 6.08572C37.8339 6.08572 39.2971 0.176143 47.2702 1.05858C55.2433 1.94102 60.1092 5.24752 58.0076 12.5233C56.076 12.5233 53.7437 11.8256 50.5194 13.0209C48.9845 13.5898 48.3237 16.5493 48.3237 16.5493H46.8665C46.8665 16.5493 44.745 13.0372 42.6829 13.9681C40.6207 14.899 41.7455 18.4905 41.7455 18.4905L41.0273 23.989H39.477Z"
				fill="#191847"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.6602 102.963H53.16L58.2048 164.672H0.894531L14.6602 102.963Z"
				fill="#C5CFD6"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.6602 102.963H26.5012L33.5883 164.672H0.894531L14.6602 102.963Z"
				fill="black"
				fillOpacity="0.1"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M74.3129 115.188C69.9867 124.351 63.2266 146.593 63.2266 146.593L68.9656 149.211C68.9656 149.211 83.5278 125.831 92.4274 109.848C92.0127 113.446 91.5906 117.497 91.1994 121.755C90.272 131.843 91.1989 153.637 91.6978 159.932C92.0112 163.889 97.3949 163.06 97.8973 159.922C97.9825 159.391 98.3293 157.525 98.8471 154.741C101.385 141.089 108.028 105.36 108.04 96.6115C108.044 93.0916 101.157 89.9291 97.0526 92.3905C94.2329 89.3861 88.8971 87.6548 85.8312 92.6174C83.8822 95.7725 79.2515 104.729 74.3129 115.188Z"
				fill="#B28B67"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M63.6367 138.357L83.335 91.7575C88.0544 84.1773 101.285 93.3002 99.6759 97.697C96.0225 107.678 77.441 139.993 76.3521 142.967L63.6367 138.357Z"
				fill={"#099145"}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M64.0178 143.861C63.6724 143.391 63.0041 143.279 62.5576 143.655C61.7428 144.339 60.5712 145.393 60.1481 146.124C59.4743 147.29 58.5703 149.751 58.5703 149.751C59.9243 150.532 82.9122 163.785 82.9122 163.785C82.9122 163.785 85.6721 161.2 83.7724 159.772C81.8722 158.343 80.6367 157.362 80.6367 157.362L72.2346 145.803C72.0696 145.576 71.7497 145.529 71.5274 145.7L69.7817 147.043C69.7817 147.043 67.3791 146.834 66.1961 146.151C65.4759 145.736 64.5959 144.648 64.0178 143.861Z"
				fill="#E4E4E4"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M91.8192 156.849C91.285 156.615 90.6501 156.852 90.4512 157.4C90.0885 158.399 89.6016 159.897 89.6016 160.742C89.6016 162.088 90.0506 164.67 90.0506 164.67C91.6144 164.67 118.159 164.67 118.159 164.67C118.159 164.67 119.254 161.053 116.894 160.765C114.533 160.477 112.972 160.244 112.972 160.244L99.9074 154.428C99.6508 154.314 99.3508 154.434 99.2436 154.693L98.4039 156.727C98.4039 156.727 96.2187 157.746 94.8527 157.746C94.0209 157.746 92.7143 157.242 91.8192 156.849Z"
				fill="#E4E4E4"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M109.42 100.192C109.42 113.413 103.132 144.252 103.128 147.163L89.6002 147.174C89.6002 147.174 92.5704 105.897 91.7068 105.452C90.8426 105.008 56.2985 108.896 45.9378 108.896C30.9983 108.896 24.8177 99.4883 24.3164 82.0605H53.9114C59.9375 82.7045 91.3689 89.0351 103.042 91.2114C108.039 92.1435 109.42 96.5497 109.42 100.192Z"
				fill={"#099145"}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M93.7642 25.3107L74.8747 30.9732L79.6978 38.9964L94.3846 30.3649C101.24 29.9572 104.48 29.282 104.102 28.3392C103.784 27.5443 103.027 27.4089 102.33 27.2841C101.787 27.1869 101.28 27.0962 101.045 26.7053C100.508 25.8126 102.389 23.4887 104.268 21.3596C106.148 19.2306 104.644 19.1314 103.736 19.3021C100.612 20.5686 97.288 22.5714 93.7642 25.3107ZM89.1021 75.8869L73.2058 64.2299L69.6914 72.9045L85.4333 79.4233C89.8855 84.6456 92.3748 86.8224 92.9016 85.9545C93.3461 85.2224 92.9987 84.5371 92.6788 83.9056C92.4296 83.4139 92.1969 82.9551 92.3683 82.5326C92.7595 81.5671 95.7501 81.6687 98.5837 81.8866C101.417 82.1041 100.592 80.845 99.9083 80.223C97.0159 78.4941 93.4139 77.0485 89.1021 75.8869Z"
				fill="#B28B67"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M48.5175 32.8374C57.1738 48.9559 69.6919 61.3121 87.8398 74.1571L80.968 81.8941C60.7056 74.3745 50.0115 69.8374 44.7599 54.6088C43.4418 50.7863 42.5209 38.6022 41.7305 32.1914L48.5175 32.8374Z"
				fill={"#099145"}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M24.3164 86.541H62.6893C62.6893 86.541 49.651 46.8323 49.3685 32.0339C49.359 31.5309 48.4286 30.6447 48.0174 30.7607C43.5029 32.0339 38.3559 29.8086 38.3559 29.8086C29.2585 44.4187 26.113 62.4073 24.3164 86.541Z"
				fill="#F2F2F2"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M47.9801 52.0993C53.9733 77.7712 53.6972 98.7866 40.4655 98.7866H20.0052C16.7557 76.9785 25.2962 46.7411 33.214 31.4893C33.5165 30.9069 34.1599 29.809 35.6763 29.809H41.6217C41.6242 29.8168 41.6266 29.8247 41.6296 29.8325C43.4182 29.8472 45.3887 29.9125 47.5221 29.9832C58.5063 30.3474 73.822 30.8551 91.056 25.3301L93.0877 35.469C77.5328 45.4591 61.7819 53.1981 47.9801 52.0993Z"
				fill={"#099145"}
			/>
		</svg>
	);
};
