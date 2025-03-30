import FallbackLoader from "@/components/fallback/FallbackLoader";

function Loading() {
	return (
		<div className="laoder-full relative">
			<FallbackLoader loading={true} />
		</div>
	);
}

export default Loading;
