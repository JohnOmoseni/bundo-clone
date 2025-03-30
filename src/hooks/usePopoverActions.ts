import { useState } from "react";

type Props = {
	list: any[];
	onClickHandlers: { [index: number]: () => any };
};

function usePopoverActions({ list, onClickHandlers }: Props) {
	const [loadingStates, setLoadingStates] = useState<boolean[]>(
		list!?.map(() => false)
	);

	const handleItemClick = async (idx: number, showLoader?: boolean) => {
		if (!onClickHandlers || typeof onClickHandlers[idx] !== "function") return;

		if (showLoader) {
			setLoadingStates((prev) => {
				const newStates = [...prev];
				newStates[idx] = true;
				return newStates;
			});
		}

		try {
			await onClickHandlers[idx]();
		} finally {
			if (showLoader) {
				setLoadingStates((prev) => {
					const newStates = [...prev];
					newStates[idx] = false;
					return newStates;
				});
			}
		}
	};

	return { loadingStates, handleItemClick };
}

export default usePopoverActions;
