"use client";

import { useAppDispatch, useAppSelector } from "@/types";
import { setOpenMenu } from "@/redux/features/appSlice";
import { useEffect } from "react";
import { categories } from "@/constants/data";
import {
	Close,
	CartIcon,
	Logo,
	KeyboardArrowLeft,
	KeyboardArrowRight,
} from "@/constants/icons";

import Link from "next/link";
import CustomButton from "@/components/reuseables/CustomButton";
import CustomIcon from "@/components/reuseables/CustomIcon";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	AlertDialogDescription,
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Menu() {
	const dispatch = useAppDispatch();
	const { openMenu } = useAppSelector((state) => state.appState);

	useEffect(() => {
		if (openMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openMenu]);

	return (
		<AlertDialog
			open={openMenu}
			onOpenChange={() => dispatch(setOpenMenu(false))}
		>
			<AlertDialogContent
				style={{ zIndex: 999 }}
				className="block remove-scrollbar h-svh rounded-none w-dvw !max-w-[100%] overflow-x-clip overflow-y-auto py-5 px-4 md:px-5 shadow-lg border-0"
			>
				<AlertDialogHeader>
					<AlertDialogTitle className="">
						<div className="row-flex-btwn gap-6">
							<Link href="/" className="">
								<Logo className="w-full h-7" />
							</Link>

							<div className="row-flex-btwn gap-3.5">
								<div className="relative cursor-pointer">
									<CustomIcon icon={CartIcon} className="size-6" />
									<p className="size-[18px] grid place-items-center text-[10px] rounded-full bg-red-500 text-white clip-circle absolute -top-1.5 -right-1.5 leading-none">
										2
									</p>
								</div>

								<CustomIcon
									action={() => dispatch(setOpenMenu(false))}
									icon={Close}
									iconColor={"default"}
									className="size-7"
								/>
							</div>
						</div>
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="mt-12 flex-column gap-8">
					<div className="w-full flex-column gap-3 mx-auto">
						<Link href={"#"}>
							<CustomButton
								title="Sign In"
								variant={"outline"}
								className="w-full"
							/>
						</Link>
						<Link href={"#"}>
							<CustomButton title="Sell on Bundo" className="w-full" />
						</Link>
						<Link href={"#"}>
							<CustomButton
								title="Vendors Stores"
								variant={"outline"}
								className="w-full"
							/>
						</Link>
					</div>

					<nav className="flex-column gap-3">
						<h2 className="text-foreground-variant">Categories</h2>
						<ul className="flex-column gap-2 text-lg">
							{categories.map((item, idx) => (
								<Accordion
									type="single"
									collapsible
									className="w-full py-1"
									key={idx}
								>
									<AccordionItem
										value={`item-${idx}`}
										className="border-[#8893857f]"
									>
										<AccordionTrigger
											className="font-medium text-base break-words text-left sm:w-full"
											iconComponent={
												<div className="icon-div shrink-0 bg-transparent rounded-full">
													<KeyboardArrowLeft className="size-5 transition-pointer-events-none transition-transform duration-200" />
													<KeyboardArrowRight className="size-5 transition-pointer-events-none transition-transform duration-200" />
												</div>
											}
										>
											{item?.label}
										</AccordionTrigger>
										<AccordionContent>
											{Array.isArray(item.dropdown) &&
											item.dropdown?.length > 0 ? (
												<ul className="flex-column gap-3">
													{item.dropdown?.map((desc: any, idx: number) => (
														<li
															key={idx}
															className="font-light text-sm leading-5"
														>
															{desc.label}
														</li>
													))}
												</ul>
											) : (
												<p className="font-light text-sm leading-5">
													{item?.dropdown as string}
												</p>
											)}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</ul>
					</nav>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default Menu;
