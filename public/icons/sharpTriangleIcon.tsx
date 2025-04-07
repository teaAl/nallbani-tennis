
const SharpTriangleIcon = ({ size, color }: { size: string, color: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="24"
            // height="24"
            fill={color}
            width={size}
            viewBox="0 0 24 24"
        >
            <path d="M24 22h-24l12-20z" />
        </svg>
    )
}

export default SharpTriangleIcon;