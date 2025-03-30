import { useMemo } from "react";

function useUser() {
	const userInfo = useMemo(() => {
		try {
			return JSON.parse(localStorage.getItem("currentUser") || "{}");
		} catch (e) {
			return {};
		}
	}, []);
	return { userInfo };
}

export default useUser;
