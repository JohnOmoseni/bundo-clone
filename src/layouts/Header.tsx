"use client";

import { CartIcon, KeyboardArrowDown, Logo, UserIcon } from "@/constants/icons";
import { DropdownComponent } from "@/components/ui/components/DropdownComponent";
import { categories, helpList } from "@/constants/data";

import Link from "next/link";
import CustomButton from "@/components/reuseables/CustomButton";
import CustomIcon from "@/components/reuseables/CustomIcon";
import AvatarWrapper from "@/components/ui/components/AvatarWrapper";
import GlobalSearch from "@/components/reuseables/GlobalSearch";
import { Menu } from "lucide-react";
import { useAppDispatch } from "@/types";
import { setOpenMenu } from "@/redux/features/appSlice";

function Header() {
	const dispatch = useAppDispatch();
	return (
		<header className="sticky top-0 bg-background drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.04)] z-[99] max-h-[80px] w-full">
			<div className="row-flex-btwn gap-6 p-3 md:p-4 mx-auto md:w-[97%]">
				<div className="row-flex gap-3 lg:gap-4">
					<CustomIcon
						icon={Menu}
						action={() => dispatch(setOpenMenu(true))}
						className="grid lg:!hidden text-foreground-variant size-7"
					/>

					<Link href="/" className="-mt-0.5">
						<Logo className="w-fit h-auto" />
					</Link>

					<div className="hidden lg:row-flex gap-3">
						<DropdownComponent
							trigger={
								<div className="row-flex-btwn gap-2">
									<p className="w-full break-words text-xs max-w-[10ch] text-center font-semibold leading-4 line-clamp-2">
										Categories
									</p>

									<CustomIcon
										icon={KeyboardArrowDown}
										iconBgVariant={"show-bg"}
									/>
								</div>
							}
							list={categories}
							renderItem={(item, idx) => {
								return (
									<div
										key={idx}
										className="row-flex-start w-full gap-2.5 p-2 rounded hover:bg-secondary-100 transition cursor-pointer"
									>
										{item?.icon && <item.icon className="size-5" />}

										<span className="leading-4 font-semibold text-sm text-grey">
											{item?.label}
										</span>
									</div>
								);
							}}
						/>

						<DropdownComponent
							trigger={
								<div className="row-flex-btwn gap-2">
									<p className="w-full break-words text-xs max-w-[10ch] text-center font-semibold leading-4 line-clamp-2">
										Help
									</p>

									<CustomIcon
										icon={KeyboardArrowDown}
										iconBgVariant={"show-bg"}
									/>
								</div>
							}
							list={helpList}
							renderItem={(item, idx) => {
								return (
									<div
										key={idx}
										className="row-flex-start w-full gap-2.5 p-2 rounded hover:bg-secondary-100 transition cursor-pointer"
									>
										{item?.icon && <item.icon className="size-5" />}

										<span className="leading-4 font-semibold text-sm text-grey">
											{item?.label}
										</span>
									</div>
								);
							}}
						/>
					</div>
				</div>

				<div className="hidden lg:block">
					<GlobalSearch onChange={() => {}} />
				</div>

				<div className="hidden lg:row-flex gap-2">
					<CustomButton title="Sell on Bundo" className="" />
					<CustomButton
						title="Vendor's Store"
						variant={"outline"}
						className=""
					/>
				</div>

				<div className="row-flex gap-2.5">
					<CustomIcon
						icon={UserIcon}
						iconBgVariant={"show-bg"}
						iconBgColor={"icon_bg"}
						iconColor={"variant"}
						containerClassName="size-8 lg:hidden grid"
					/>

					<Link href="#" className="hidden lg:block">
						<AvatarWrapper containerClassName="max-sm:order-2" />
					</Link>

					<p className="hidden xl:block w-full break-words text-xs text-grey text-center leading-4 ">
						Accounts & Orders
					</p>

					<div className="relative cursor-pointer">
						<CustomIcon icon={CartIcon} className="size-6" />
						<p className="size-[18px] grid place-items-center text-[10px] rounded-full bg-red-500 text-white clip-circle absolute -top-1.5 -right-1.5 leading-none">
							2
						</p>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
