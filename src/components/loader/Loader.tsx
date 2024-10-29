const Loader = ({ label }: { label?: string }) => <>
	<div className="loader" />
	{label && <span className="loaderLabel">{label}</span>}
</>

export default Loader;