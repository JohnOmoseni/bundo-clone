"use client";

import { useAppDispatch, useAppSelector } from "@/types";
import { Suspense, useEffect } from "react";
import { setNetwork, setScreenSize } from "@/redux/features/appSlice";
import { AnimatePresence } from "framer-motion";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Menu from "@/layouts/Menu";
import Collection from "@/app/_sections/Collection";
import GlobalSearch from "@/components/reuseables/GlobalSearch";

function LayoutProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const { query, searchResults, openMenu } = useAppSelector(
		(state) => state.appState
	);

	useEffect(() => {
		const updateNetwork = () => {
			dispatch(setNetwork(navigator.onLine));
		};
		const getScreenSize = () => {
			dispatch(setScreenSize(window?.innerWidth));
		};

		getScreenSize();
		updateNetwork();

		window.addEventListener("resize", getScreenSize);
		window.addEventListener("online", updateNetwork);
		window.addEventListener("offline", updateNetwork);

		return () => {
			window.removeEventListener("resize", getScreenSize);
			window.removeEventListener("online", updateNetwork);
			window.removeEventListener("offline", updateNetwork);
		};
	}, []);

	return (
		<>
			<AnimatePresence>{openMenu && <Menu />}</AnimatePresence>
			<Header />
			<div className="flex-column gap-3 lg:hidden">
				<div className="py-1.5 px-3 bg-[#FFFADB] w-full">
					<h3 className="uppercase font-bold text-center leading-4">
						Black Friday Deals
					</h3>
				</div>

				<div className="px-3 w-full">
					<GlobalSearch containerStyles="w-full mx-auto" />
				</div>
			</div>

			<Suspense
				fallback={
					<div className="loader-container">
						<FallbackLoader />
					</div>
				}
			>
				{!query ? (
					children
				) : (
					<div className="pt-6 pb-5 px-3.5 min-h-[50vh] sm:px-[4%] flex-column gap-6">
						<h2>Search Results</h2>

						<Collection data={searchResults} collectionType="Categories" />
					</div>
				)}
			</Suspense>
			<Footer />
		</>
	);
}
export default LayoutProvider;
