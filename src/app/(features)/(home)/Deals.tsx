"use client";

import Marquee from "@/components/animations/Marquee";
import { amazingDeals } from "@/constants/data";
import Image from "next/image";

function AmazingDeals() {
	return (
		<>
			<h2 className="text-center max-sm:px-1 lg:text-4xl">
				Amazing deals, updated daily
			</h2>

			<div className="mt-4 w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
				<Marquee
					list={amazingDeals}
					renderItem={(item, index) => {
						return (
							<>
								<li
									key={index}
									className="relative p-1 flex-column items-center gap-4"
								>
									<div className="rounded-full overflow-hidden size-[100px] lg:size-[130px] drop-shadow-[0_1px_8px_rgb(0_0_0_/_0.1)]">
										<Image
											src={item.avatar}
											alt=""
											width={1000}
											height={1000}
											className="object-cover"
										/>
									</div>

									<h3 className="text-center leading-6">{`${item.name}.`}</h3>
								</li>
							</>
						);
					}}
				/>
			</div>
		</>
	);
}
export default AmazingDeals;
