import SectionWrapper from "@/layouts/SectionWrapper";
import AmazingDeals from "./Deals";
import FAQ from "./FAQs";
import FeaturedItems, { BiggestSales, ExploreVendors } from "./FeaturedItems";
import GlobalSearch from "@/components/reuseables/GlobalSearch";
import { bundoApi } from "@/server/actions";

async function Home() {
	// const data = await bundoApi.getAllVendors();
	const data = await bundoApi.getAllBusinessLocations();

	console.log("DATA", data);

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
					<FeaturedItems />
					<BiggestSales />
					<ExploreVendors />
				</div>
			</SectionWrapper>
			<SectionWrapper containerStyles="">
				<AmazingDeals />
			</SectionWrapper>
			<SectionWrapper containerStyles="relative bg-[#F1E9DB]">
				<FAQ />
			</SectionWrapper>
		</main>
	);
}

export default Home;
