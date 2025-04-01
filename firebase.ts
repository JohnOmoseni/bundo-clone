import {
	getMessaging,
	getToken,
	isSupported,
	onMessage,
} from "firebase/messaging";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyC6jbu00DBFtfoqNt2IYYaqXv1WzRMzn-M",
	authDomain: "bundo-clone-354b2.firebaseapp.com",
	projectId: "bundo-clone-354b2",
	storageBucket: "bundo-clone-354b2.firebasestorage.app",
	messagingSenderId: "931315189094",
	appId: "1:931315189094:web:1340499b7070e8218374a7",
	measurementId: "G-RLF0NC78SQ",
};

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
export const messaging = async () => {
	const supported = await isSupported();
	return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
	try {
		const fcmMessaging = await messaging();
		if (fcmMessaging) {
			const token = await getToken(fcmMessaging, {
				vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
			});
			return token;
		}
		return null;
	} catch (err) {
		console.error("An error occurred while fetching the token:", err);
		return null;
	}
};

// export const fetchToken = async () => {
// 	try {
// 		const token = await getToken(messaging, {
// 			vapidKey:
// 				"BGQT59LCUe2c7WKyoqsQClDxvNA4BTL8EQDS9H4JCAR3yCbqY3XbG5_6OzlEWvnIACqA2MCJ0oW4LRlBTyMrN7Q",
// 		});
// 		return token;
// 	} catch (error) {
// 		console.error("Error fetching token:", error);
// 		return null;
// 	}
// };

export const onMessageListener = () => {
	// if (messaging !== null) {
	return new Promise((resolve) => {
		// @ts-ignore
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
	// }
};
