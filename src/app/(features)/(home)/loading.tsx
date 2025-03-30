import FallbackLoader from "@/components/fallback/FallbackLoader";

function Loading() {
	return (
		<div className="laoder-container">
			<FallbackLoader loading={true} />
		</div>
	);
}

export default Loading;
