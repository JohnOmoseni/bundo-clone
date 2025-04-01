import SectionWrapper from "@/layouts/SectionWrapper";
import AmazingDeals from "./Deals";
import FAQ from "./FAQs";
import FeaturedItems, {
	BestSellers,
	BiggestSales,
	ElevateJewellery,
	ExploreVendors,
} from "./FeaturedItems";

async function Home() {
	return (
		<main className="mx-auto w-full max-w-[1200px]">
			<SectionWrapper containerStyles="!sm:pt-[3%]">
				<div className="flex-column gap-12">
					<FeaturedItems />

					<BiggestSales />
					<ExploreVendors />
					<ElevateJewellery />
					<BestSellers />
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
