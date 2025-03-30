import CustomEmptyList from "../components/reuseables/CustomEmptyList";
import { ReactNode, useMemo } from "react";

type Props = {
	data: any;
	isError: boolean;
	error: any;
	noResultTitle?: string;
	errorTitle?: string;
	noResultSubText?: string;
	errorSubText?: string;
	icon?: any;
};

function useEmptyState({
	data,
	isError,
	error,
	noResultTitle,
	errorTitle,
	noResultSubText,
	errorSubText,
	icon: Icon,
}: Props) {
	const emptyState: ReactNode = useMemo(() => {
		let title;
		let subText;

		if (data?.length === 0) {
			title = noResultTitle || "No results";
			subText = noResultSubText || "";
		} else if (isError) {
			title =
				(error as any)?.data?.message || errorTitle || "Something went wrong";
			subText = errorSubText || "Please try again!";
		}
		return (
			<CustomEmptyList
				title={title!}
				subText={subText!}
				{...(Icon && {
					icon: Icon,
				})}
			/>
		);
	}, [data, isError]);

	return { emptyState };
}

export default useEmptyState;
