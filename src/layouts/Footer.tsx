"use client";

import { footerLinks, socials } from "@/constants";
import { Logo } from "@/constants/icons";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import images from "@/constants/images";

const Social = ({
	href,
	label,
	icon: Icon,
	tag,
}: {
	href: string;
	icon: IconType;
	label: string;
	tag: string;
}) => {
	return (
		<a
			href={href}
			title={tag}
			className="group row-flex-start gap-2 transition hover:scale-95"
		>
			<Icon className="text-foreground-variant size-5" />
			<p className="font-medium text-sm text-foreground-variant-100 underline">
				{label}
			</p>
		</a>
	);
};

const Footer = () => {
	return (
		<footer className="px-5 pt-8 max-md:pb-4 sm:px-[5%] sm:pt-[4%] bg-background">
			<FooterMobile />
			<FooterLarge />
		</footer>
	);
};

export default Footer;

const FooterMobile = () => {
	const pathname = usePathname();

	return (
		<div className="flex-column gap-8 md:!hidden">
			<div className="flex-column w-full gap-3">
				<Link href="/" className="group relative transition w-max">
					<Logo className="size-fit object-contain" />
				</Link>
				<p className="font-light text-xs">Simplifying Retail.</p>
			</div>

			<div className="grid grid-cols-2 gap-6">
				{footerLinks.map((item, idx) => {
					return (
						<div key={idx} className="flex-1 flex-column gap-4">
							<p className="text-base text-foreground-variant-100 font-semibold capitalize">
								{item.name}
							</p>

							<ul className="flex-column gap-2">
								{item.dropdown?.map((item: any, idx) => {
									const isActiveLink =
										pathname.includes(item?.tag || "") ||
										(pathname === item.href && item?.tag === "home");

									const linkStyles = cn(
										"w-full text-xs transition-colors hover:font-medium hover:text-secondary",
										isActiveLink && "text-foreground-variant-100 font-medium"
									);

									const externalLinks = ["email", "explore"];

									return externalLinks.includes(item.tag) ? (
										<a
											key={`${idx}-${item.tag}`}
											href={`${item.href}`}
											className={cn(linkStyles, "")}
										>
											{item.link}
										</a>
									) : ["text"].includes(item.tag) ? (
										<p key={idx} className={cn(linkStyles, "")}>
											{item.text}
										</p>
									) : (
										<Link
											key={idx}
											href={`#${item.tag}`}
											className={linkStyles}
											onClick={() => {
												const element = document.getElementById(item.tag ?? "");
												element?.scrollIntoView({ behavior: "smooth" });
											}}
										>
											{item.link}
										</Link>
									);
								})}
							</ul>
						</div>
					);
				})}
			</div>

			<div className="flex-column gap-4">
				<p className="capitalize text-base font-semibold">Keep up with us</p>

				<div className="row-flex-btwn !flex-wrap gap-4">
					{socials?.map((link, idx) => (
						<Social key={idx} {...link} />
					))}
				</div>
			</div>

			<div className="mt-6 min-w-[300px] w-full max-w-[450px] h-[400px] mx-auto overflow-hidden">
				<Image
					src={images.footer_image}
					alt=""
					width={1000}
					height={1000}
					className="size-fit mx-auto object-cover"
				/>
			</div>
		</div>
	);
};

const FooterLarge = () => {
	const pathname = usePathname();

	return (
		<div className="flex-column gap-10 max-sm:!hidden">
			<div className="flex-column w-full gap-3">
				<Link href="/" className="group relative transition w-max">
					<Logo className="size-fit object-contain" />
				</Link>
				<p className="max-sm:text-center font-light text-xs">
					Simplifying Retail.
				</p>
			</div>

			<div className="flex flex-row justify-between gap-10">
				<div className="shrink-0 w-fit h-[450px]">
					<Image
						src={images.footer_image}
						alt=""
						width={1000}
						height={1000}
						className="size-full object-cover"
					/>
				</div>

				<div className="h-[400px] self-stretch flex-column gap-4">
					<div className="row-flex-btwn !flex-wrap w-full !items-start self-center gap-5">
						{footerLinks.map((item, idx) => {
							return (
								<div key={idx} className="flex-1">
									<p className="mb-4 text-base text-foreground-variant-100 font-semibold capitalize max-sm:text-center">
										{item.name}
									</p>

									<ul className="flex-column gap-2">
										{item.dropdown?.map((item: any, idx) => {
											const isActiveLink =
												pathname.includes(item?.tag || "") ||
												(pathname === item.href && item?.tag === "home");

											const linkStyles = cn(
												"w-full text-xs transition-colors hover:font-medium hover:text-secondary max-sm:text-center",
												isActiveLink &&
													"text-foreground-variant-100 font-medium"
											);

											const externalLinks = ["email", "explore"];

											return externalLinks.includes(item.tag) ? (
												<a
													key={`${idx}-${item.tag}`}
													href={`${item.href}`}
													className={cn(linkStyles, "")}
												>
													{item.link}
												</a>
											) : ["text"].includes(item.tag) ? (
												<p key={idx} className={cn(linkStyles, "")}>
													{item.text}
												</p>
											) : (
												<Link
													key={idx}
													href={`#${item.tag}`}
													className={linkStyles}
													onClick={() => {
														const element = document.getElementById(
															item.tag ?? ""
														);
														element?.scrollIntoView({ behavior: "smooth" });
													}}
												>
													{item.link}
												</Link>
											);
										})}
									</ul>
								</div>
							);
						})}
					</div>

					<div className="row-flex-start mt-auto gap-6">
						<p className="capitalize text-base font-semibold">
							Keep up with us
						</p>

						<div className="row-flex-btwn !flex-wrap gap-x-4 gap-y-3">
							{socials?.map((link, idx) => (
								<Social key={idx} {...link} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// <Accordion type="single" collapsible key={idx}>
// 					<AccordionItem value={`item-${idx}`} className={cn("border-0")}>
// 						<AccordionTrigger className="font-medium text-base break-words text-left sm:w-full">
// 							<p className="text-base text-foreground-variant-100 font-semibold capitalize max-sm:text-center">
// 								{item.name}
// 							</p>
// 						</AccordionTrigger>
// 						<AccordionContent>
// 							<ul className="flex-column gap-2 pr-2">
// 								{item.dropdown?.map((item: any, idx) => {
// 									const isActiveLink =
// 										pathname.includes(item?.tag || "") ||
// 										(pathname === item.href && item?.tag === "home");

// 									const linkStyles = cn(
// 										"w-full text-base transition-colors hover:font-medium hover:text-secondary",
// 										isActiveLink && "text-foreground-variant-100 font-medium"
// 									);

// 									const externalLinks = ["email", "explore"];

// 									return externalLinks.includes(item.tag) ? (
// 										<a
// 											key={`${idx}-${item.tag}`}
// 											href={`${item.href}`}
// 											className={cn(linkStyles, "")}
// 										>
// 											{item.link}
// 										</a>
// 									) : ["text"].includes(item.tag) ? (
// 										<p key={idx} className={cn(linkStyles, "")}>
// 											{item.text}
// 										</p>
// 									) : (
// 										<Link
// 											key={idx}
// 											href={`#${item.tag}`}
// 											className={linkStyles}
// 											onClick={() => {
// 												const element = document.getElementById(
// 													item.tag ?? ""
// 												);
// 												element?.scrollIntoView({ behavior: "smooth" });
// 											}}
// 										>
// 											{item.link}
// 										</Link>
// 									);
// 								})}
// 							</ul>
// 						</AccordionContent>
// 					</AccordionItem>
// 				</Accordion>
