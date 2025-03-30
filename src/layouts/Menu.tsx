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
	KeyboardArrowDown,
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
import { animateFn, animateMenu, slideinVariant } from "@/lib/animate";
import { motion } from "framer-motion";

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
		<motion.div
			style={{ zIndex: 9999 }}
			className="fixed inset-0 block h-dvh w-full overflow-hidden bg-black/30 backdrop-blur-sm md:hidden"
			{...animateFn(animateMenu)}
			onClick={() => dispatch(setOpenMenu(false))}
		>
			<motion.div
				{...animateFn(slideinVariant)}
				className="flex-column remove-scrollbar absolute inset-0 h-svh w-dvw bg-background overflow-x-clip overflow-y-auto py-5 px-4"
				onClick={(e) => e.stopPropagation()}
				style={{ zIndex: 999 }}
			>
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
													<KeyboardArrowDown className="size-5 transition-pointer-events-none transition-transform duration-200" />
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
			</motion.div>
		</motion.div>
	);
}

export default Menu;
