"use client";

import { useAppDispatch, useAppSelector } from "@/types";
import { Suspense, useEffect } from "react";
import { setNetwork, setScreenSize } from "@/redux/features/appSlice";
import { AnimatePresence } from "framer-motion";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Menu from "@/layouts/Menu";

function LayoutProvider({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const { openMenu } = useAppSelector((state) => state.appState);

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
			<Suspense fallback={<FallbackLoader />}>{children}</Suspense>
			<Footer />
		</>
	);
}
export default LayoutProvider;
