import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { routes, APP_ROLES } from "./constants";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("token");
	const userCookie = request.cookies.get("user");

	// if (!token || !userCookie) {
	// 	return NextResponse.redirect(new URL(routes.LOGIN, request.nextUrl));
	// }

	// const user = userCookie ? JSON.parse(userCookie as any) : null;

	// // Check if it's a public route (accessible to all)
	// const isPublicRoute = routes.PUBLIC_ROUTES.some((route) =>
	// 	pathname.startsWith(route)
	// );

	// if (isPublicRoute) {
	// 	return NextResponse.next();
	// }

	// // Check if it's an admin route
	// const isAdminRoute = routes.ADMIN_ROUTES.some((route) =>
	// 	pathname.startsWith(route)
	// );

	// if (isAdminRoute) {
	// 	// Check if the user has an Admin role or is included in allowed roles
	// 	const allowedRoles = [APP_ROLES.Admin]; // Define more allowed roles if necessary
	// 	if (!allowedRoles.includes(user.role)) {
	// 		return NextResponse.redirect(new URL(routes.UNAUTH, request.nextUrl));
	// 	}
	// }

	// Default behavior, continue to the requested page
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/profile"],
};
