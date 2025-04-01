"use client";

import CustomButton from "@/components/reuseables/CustomButton";
import useFcmToken from "@/hooks/useFcmToken";
import { useState } from "react";

export default function Notifications() {
	const { token, notificationPermissionStatus } = useFcmToken();
	const [isLoading, setIsLoading] = useState(false);

	const handleTestNotification = async () => {
		setIsLoading(true);
		console.log("TOKEN", token);
		try {
			const response = await fetch("/send-notification", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: token,
					title: "Test Notification - A new location has been added!",
					message: "This is a test notification",
					link: "/explore",
				}),
			});

			const data = await response.json();
			console.log(data);
		} catch (err: any) {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="py-6 px-3.5 md:py-12 min-h-[25vh] sm:px-[4%]">
			<h2>Notifications - Firebase Cloud Messaging</h2>

			{notificationPermissionStatus === "granted" ? (
				<p>Permission to receive notifications has been granted.</p>
			) : notificationPermissionStatus !== null ? (
				<p>
					You have not granted permission to receive notifications. Please
					enable notifications in your browser settings.
				</p>
			) : null}

			<div className="grid place-items-center mt-8">
				<CustomButton
					title="	Send Notification"
					onClick={handleTestNotification}
					isLoading={isLoading}
					className="bg-secondary-200 min-w-[160px]"
				/>
			</div>
		</div>
	);
}
