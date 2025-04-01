"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchToken, messaging } from "../../firebase";

async function getNotificationPermissionAndToken() {
	if (!("Notification" in window)) {
		console.info("This browser does not support desktop notification");
		return null;
	}

	if (Notification.permission === "granted") {
		return await fetchToken();
	}

	if (Notification.permission !== "denied") {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			return await fetchToken();
		}
	}

	console.log("Notification permission not granted.");
	return "fkjwT5tRdOMzEm6T9a3M0p:APA91bG_ZAvGRQGjN3DjGd5ow0o9UPg_8YxA4sU2fu2BgTIaXtWP87M3Y6IrMbE_uCULEoegl6oqRB4TcciiqnpPRtF-783Ymt5Q2ILSzFPUVT76lLFZYPI";
}

const useFcmToken = () => {
	const router = useRouter();
	const [notificationPermissionStatus, setNotificationPermissionStatus] =
		useState<NotificationPermission | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
	const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker
				.register("/firebase-messaging-sw.js")
				.then((registration) => {
					console.log("Service Worker registered:", registration);
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);
	const loadToken = async () => {
		if (isLoading.current) return;

		isLoading.current = true;
		const token = await getNotificationPermissionAndToken();

		if (Notification.permission === "denied") {
			setNotificationPermissionStatus("denied");
			console.info(
				"%cPush Notifications issue - permission denied",
				"color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
			);
			isLoading.current = false;
			return;
		}

		// refetching the token as initially the service worker may not be ready/installed yet. (up to 3times)
		if (!token) {
			if (retryLoadToken.current >= 3) {
				alert("Unable to load token, refresh the browser");
				console.info(
					"%cPush Notifications issue - unable to load token after 3 retries",
					"color: green; background: #c7c7c7; padding: 8px; font-size: 20px"
				);
				isLoading.current = false;
				return;
			}

			retryLoadToken.current += 1;
			console.error("An error occurred while retrieving token. Retrying...");
			isLoading.current = false;
			await loadToken();
			return;
		}

		setNotificationPermissionStatus(Notification.permission);
		setToken(token);
		isLoading.current = false;
	};

	useEffect(() => {
		if ("Notification" in window) {
			loadToken();
		}
	}, []);

	useEffect(() => {
		const setupListener = async () => {
			if (!token) return;

			console.log(`onMessage registered with token ${token}`);
			const m = await messaging();
			if (!m) return;

			// Register a listener for incoming FCM messages.
			const unsubscribe = onMessage(m, (payload) => {
				if (Notification.permission !== "granted") return;

				console.log("Foreground push notification received:", payload);
				const link = payload.fcmOptions?.link || payload.data?.link;

				if (link) {
					toast.info(
						`${payload.notification?.title}: ${payload.notification?.body}`,
						{
							action: {
								label: "Visit",
								onClick: () => {
									const link = payload.fcmOptions?.link || payload.data?.link;
									if (link) {
										router.push(link);
									}
								},
							},
						}
					);
				} else {
					toast.info(
						`${payload.notification?.title}: ${payload.notification?.body}`
					);
				}

				const n = new Notification(
					payload.notification?.title || "New message",
					{
						body: payload.notification?.body || "This is a new message",
						data: link ? { url: link } : undefined,
					}
				);

				n.onclick = (event) => {
					event.preventDefault();
					const link = (event.target as any)?.data?.url;
					if (link) {
						router.push(link);
					} else {
						console.log("No link found in the notification payload");
					}
				};
			});

			return unsubscribe;
		};

		let unsubscribe: Unsubscribe | null = null;

		setupListener().then((unsub) => {
			if (unsub) {
				unsubscribe = unsub;
			}
		});

		return () => unsubscribe?.();
	}, [token, router, toast]);

	return { token, notificationPermissionStatus };
};

export default useFcmToken;
