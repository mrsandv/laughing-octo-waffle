export default function Loader({ label }: { label?: string }) {
	return (
		<>
			<div className="loader" />{label && <span className="loaderLabel" >{label}</span>}
		</>
	);
}
