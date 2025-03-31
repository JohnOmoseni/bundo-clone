"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import SectionWrapper from "@/layouts/SectionWrapper";
import { requestToken, onMessageListener } from "@/lib/firebase";
import { useEffect } from "react";

export default function Notifications() {
	const requestNotificationPermission = async () => {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const token = await requestToken();
			console.log("FCM Token:", token);
		} else {
			console.log("Notification permission denied");
		}
	};

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/firebase-sw.js")
				.then((registration) => {
					console.log("Service Worker registered:", registration);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);

	const handleNotification = async () => {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			const token = await requestToken();
			if (token) {
				new Notification("Location Update", {
					body: "A new location has been added!",
					icon: "/images/map_marker.png",
				});
			} else {
				console.log("No FCM token available");
				new Notification("Location Update", {
					body: "A new location has been added!",
					icon: "/images/map_marker.png",
				});
			}
		} else {
			console.log("Notification permission denied");
		}
	};

	useEffect(() => {
		// requestNotificationPermission();

		onMessageListener().then((payload) => {
			console.log("Foreground Notification:", payload);
		});
	}, []);

	return (
		<SectionWrapper>
			<div className="flex-column gap-6">
				<h3>Notifications</h3>

				<div className="grid place-items-center">
					<CustomButton
						title="	Send Notification"
						onClick={handleNotification}
						className="bg-secondary-200 min-w-[160px]"
					/>
				</div>
			</div>
		</SectionWrapper>
	);
}
