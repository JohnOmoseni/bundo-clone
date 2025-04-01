# Frontend Engineer Technical Assessment Project - JOHN OMOSENI

This is a Next.js application built as part of a technical assessment for a Frontend Engineer role. The project demonstrates my proficiency in Next.js, Tailwind CSS, Google Maps integration, Firebase Cloud Messaging for push notifications, and API integration. The application features a responsive UI with a map section (`/explore`) and a notifications section (`/notifications`).

## Features

- **Responsive UI**: A mobile-friendly page with a header (title and navigation menu), map section, and notifications section, styled using Tailwind CSS.
- **Google Maps Integration**:
  - Displays a map centered on a given location with markers for fetched locations (`/explore` route).
  - Integrates the Google Places API for place auto-suggestions and displays the user's current location.
  - Allows creating new locations by clicking on the map.
  - Supports click-and-drag functionality to move location pins.
- **API Integration**:
  - Fetches a list of locations from an API and displays them as map markers.
  - Creates new locations via an API route, with automatic page refresh to update the map (new locations have a TTL of 100 minutes).
- **Push Notifications**:
  - Configured Firebase Cloud Messaging for push notifications.
  - Implemented a service worker to handle notifications and allow background functionality.
  - Includes a button on the `/notifications` route to subscribe to notifications and trigger a test notification.
- **Performance**: Optimized for both desktop and mobile devices.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package manager of your choice)
- A Google Maps API key (for map functionality)
- A Firebase project with Cloud Messaging enabled (for push notifications)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/JohnOmoseni/bundo-clone
   cd bundo-clone

   ```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables: Create a .env.local file in the root directory and add the following:**

```bash
NEXT_PUBLIC_GOOGLE_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
NEXT_PUBLIC_API_BASE_URL=your-api-base-url
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

5. **Open the application: Visit http://localhost:3000 in your browser.**

6. **Explore the Application**

- Visit [/](https://bundo-clone.vercel.app/) for the homepage with featured products.
- Navigating to [/explore](https://bundo-clone.vercel.app/explore) to view the map section.
- Navigate to [/notifications](https://bundo-clone.vercel.app/notifications) to test push notification functionality.

You can view the hosted version of this project at: [https://bundo-clone.vercel.app/].
