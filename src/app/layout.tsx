import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import LocationProvider from "@/context/LocationContext";
import BusinessLocationProvider from "@/context/BusinessLocations";
import NextTopLoader from "nextjs-toploader";
import ReduxProvider from "@/providers/ReduxProvider";
import LayoutProvider from "@/providers/LayoutProvider";

import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/utils.css";

const tv2SansLight = localFont({
	src: "../assets/fonts/TV2SansDisplay-Light.woff",
	variable: "--font-tv2-sans-light",
});

const tv2SansRegular = localFont({
	src: "../assets/fonts/TV2SansDisplay-Regular.ttf",
	variable: "--font-tv2-sans-regular",
	weight: "300 400 ",
});

const tv2SansSemibold = localFont({
	src: "../assets/fonts/TV2SansDisplay-Bold.woff",
	variable: "--font-tv2-sans-bold",
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Bundo App",
	description: "bundo.app",
	icons: {
		icon: "../assets/svgs/bundo-logo.svg",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className={`${tv2SansLight.variable} ${tv2SansRegular.variable} ${tv2SansSemibold.variable} ${geistSans.variable} antialiased`}
			>
				<NextTopLoader />
				<div className="wrapper">
					<LocationProvider>
						<BusinessLocationProvider>
							<ReduxProvider>
								<LayoutProvider>{children}</LayoutProvider>
							</ReduxProvider>
						</BusinessLocationProvider>
					</LocationProvider>
				</div>
				<Toaster richColors className="py-1" />
			</body>
		</html>
	);
}
