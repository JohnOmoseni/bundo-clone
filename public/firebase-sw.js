importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js"
);

const firebaseConfig = {
	apiKey: "<your-api-key>",
	authDomain: "<your-auth-domain>",
	projectId: "<your-project-id>",
	storageBucket: "<your-storage-bucket>",
	messagingSenderId: "<your-messaging-sender-id>",
	appId: "<your-app-id>",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/images/map_marker.png",
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});
