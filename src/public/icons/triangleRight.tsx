
const TriangleRightIcon = ({ size, color }: { size: string, color: string }) => {
	return (
		<svg
			// fill="#000000"
			width={size}
			fill={color}
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path d="M9,18l7-6L9,6V18z" />
			<rect fill="none" width="24" height="24" />
			<rect fill="none" width="24" height="24" />
		</svg>
	);
};

export default TriangleRightIcon;