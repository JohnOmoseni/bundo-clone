import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment, PropsWithChildren, ReactNode } from "react";

import CustomIcon from "@/components/reuseables/CustomIcon";
import { cn } from "@/lib/utils";
import { OptionType } from "@/types";
import { KeyboardArrowDown } from "@/constants/icons";

type Props = PropsWithChildren & {
	trigger?: ReactNode;
	triggerStyles?: string;
	list: OptionType[];
	children?: ReactNode;
	containerStyles?: string;
	renderItem: (item: any, index: number) => ReactNode;
};
export function DropdownComponent({
	list,
	trigger,
	renderItem,
	containerStyles,
	triggerStyles,
}: Props) {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className={cn(triggerStyles)}>
					{trigger ? trigger : <CustomIcon icon={KeyboardArrowDown} />}
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className={cn("dropdown-menu right-0 max-h-[450px]", containerStyles)}
				>
					<ul className="flex-column gap-2">
						{list &&
							list?.map((item, idx) => (
								<Fragment key={idx}>
									{/* Render dropdown items */}
									{renderItem && renderItem(item, idx)}
								</Fragment>
							))}
						{list.length === 0 && (
							<DropdownMenuItem className="dropdown-item">
								No items
							</DropdownMenuItem>
						)}
					</ul>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
