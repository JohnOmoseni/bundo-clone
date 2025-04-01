importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyC6jbu00DBFtfoqNt2IYYaqXv1WzRMzn-M",
	authDomain: "bundo-clone-354b2.firebaseapp.com",
	projectId: "bundo-clone-354b2",
	storageBucket: "bundo-clone-354b2.firebasestorage.app",
	messagingSenderId: "931315189094",
	appId: "1:931315189094:web:1340499b7070e8218374a7",
	measurementId: "G-RLF0NC78SQ",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);

	// payload.fcmOptions?.link comes from our backend API route handle
	// payload.data.link comes from the Firebase Console where link is the 'key'
	const link = payload.fcmOptions?.link || payload.data?.link;

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "./logo.png",
		data: { url: link },
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
	console.log("[firebase-messaging-sw.js] Notification click received.");

	event.notification.close();

	// This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
	event.waitUntil(
		clients
			// https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
			.matchAll({ type: "window", includeUncontrolled: true })
			.then(function (clientList) {
				const url = event.notification.data.url;

				if (!url) return;

				for (const client of clientList) {
					if (client.url === url && "focus" in client) {
						return client.focus();
					}
				}

				if (clients.openWindow) {
					console.log("OPENWINDOW ON CLIENT");
					return clients.openWindow(url);
				}
			})
	);
});
