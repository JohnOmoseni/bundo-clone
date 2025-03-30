import clsx from "clsx";

import { StatusType } from "../../types";
import { ReactNode } from "react";

export const StatusBadge = ({
	status,
	value,
	containerStyles,
}: {
	status: StatusType;
	value: ReactNode;
	containerStyles?: string;
}) => {
	const green = ["Completed", "Success"];
	const error = ["Failed"];
	const yellow = ["Pending"];

	return (
		<div
			className={clsx(
				"row-flex rounded border px-2 w-max py-1",
				"bg-slate-300 border border-slate-700",
				{
					"!bg-green-500 !border-green-600": green.includes(status),
					"!bg-red-100 !border-red-600": error.includes(status),
					"!bg-yellow-100 !border-yellow-600": yellow.includes(status),
				},
				containerStyles
			)}
		>
			<p
				className={clsx(
					"whitespace-nowrap text-sm font-semibold !capitalize",
					"text-slate-600",

					{
						"!text-green-800": green.includes(status),
						"!text-red-500": error.includes(status),
						"!text-yellow-500": yellow.includes(status),
					}
				)}
			>
				{value || "Unknown"}
			</p>
		</div>
	);
};
