import SectionWrapper from "@/layouts/SectionWrapper";
import AmazingDeals from "./Deals";
import FAQ from "./FAQs";
import FeaturedItems, { BiggestSales, ExploreVendors } from "./FeaturedItems";
import GlobalSearch from "@/components/reuseables/GlobalSearch";
import { getAllBusinessLocations, getAllVendors } from "@/server/actions";
import { Suspense } from "react";

async function Home() {
	const products = await getAllVendors({});
	const data = await getAllBusinessLocations();
	const featuredProducts = products?.data || [];

	return (
		<main className="mx-auto w-full max-w-[1200px]">
			<div className="flex-column gap-3 sm:hidden">
				<div className="py-1 px-3 bg-[#FFFADB] w-full">
					<h3 className="uppercase font-bold text-center leading-4">
						Black Friday Deals
					</h3>
				</div>

				<div className="px-3 w-full">
					<GlobalSearch containerStyles="w-full" />
				</div>
			</div>

			<SectionWrapper containerStyles="!sm:pt-[3%]">
				<div className="flex-column gap-12">
					<Suspense
						fallback={<div className="loader-container">Loading...</div>}
					>
						<FeaturedItems featuredProducts={featuredProducts} />
					</Suspense>
					<BiggestSales />
					<ExploreVendors />
				</div>
			</SectionWrapper>
			<SectionWrapper containerStyles="min-h-auto mb-9 md:mb-12">
				<AmazingDeals />
			</SectionWrapper>
			<SectionWrapper containerStyles="relative bg-[#F1E9DB]">
				<FAQ />
			</SectionWrapper>
		</main>
	);
}

export default Home;
