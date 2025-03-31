import Explore from "./Explore";
import { Suspense } from "react";
import { getAllBusinessLocations } from "@/server/actions";

async function ExplorePage() {
	const data = await getAllBusinessLocations();
	const locations = data?.data || [];

	console.log("LOCATIONS", locations);

	return (
		<Suspense fallback={<div className="loader-container">Loading...</div>}>
			<div className="pt-6 pb-5 px-3.5 min-h-[50vh] sm:px-[4%]">
				<Explore data={locations} />
			</div>
		</Suspense>
	);
}

export default ExplorePage;
