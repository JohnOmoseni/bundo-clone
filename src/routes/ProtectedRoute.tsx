import FallbackLoader from "../components/fallback/FallbackLoader";
import { useAuth } from "../context/AuthContext";
import Header from "../layouts/Header";
import { useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoute() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isAuthorized, setIsAuthorized] = useState(false);

	useLayoutEffect(() => {
		// If user is null (not authenticated) or undefined (still loading)
		if (!user) {
			setIsAuthorized(false);

			// Only redirect if we're sure user is null (not authenticated)
			if (user === null) {
				navigate("/signin", {
					replace: true,
					state: { returnTo: location.pathname },
				});
			}
			return;
		}

		setIsAuthorized(true);
	}, [navigate, user, location]);

	// Show loader while checking authentication or when user is undefined
	if (!isAuthorized) {
		return <FallbackLoader />;
	}

	return (
		<>
			<Header />
			<div className="py-4 px-3.5 md:p-6 lg:px-8 w-full h-[calc(100vh-62px)]">
				<Outlet />
			</div>
		</>
	);
}

export default ProtectedRoute;
