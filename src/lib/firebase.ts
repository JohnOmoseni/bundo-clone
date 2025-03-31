import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "<your-auth-domain>",
	projectId: "<your-project-id>",
	storageBucket: "<your-storage-bucket>",
	messagingSenderId: "<your-messaging-sender-id>",
	appId: "<your-app-id>",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestToken = async () => {
	try {
		const token = await getToken(messaging, {
			vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
		});
		return token;
	} catch (error) {
		console.error("Error fetching token:", error);
		return null;
	}
};

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
