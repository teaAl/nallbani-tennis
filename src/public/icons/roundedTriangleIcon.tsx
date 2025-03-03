
const RoundedTriangleIcon = ({ size, color }: { size: string, color: string }) => {
    return (

        <svg
            width={size}
            fill={color}
            viewBox="0 0 17.00 17.00"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            // fill="#000000"
            transform="rotate(90)"
        >
            <g id="SVGRepo_bgCarrier"
                stroke-width="0"
            ></g>
            <g id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <title>1116</title>
                <defs> </defs>
                <g stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                >
                    <g transform="translate(4.000000, 1.000000)"
                        fill={color}
                    >
                        <path d="M4.973,4.175 L9.975,7.919 L9.975,3.979 L4.973,0.036 L0.004,4.078 L0.004,7.996 L0.016,8.007 L4.973,4.175 Z"

                        > </path>
                        <path d="M4.973,11.958 L9.975,15.909 L9.975,11.971 L4.973,8.005 L0.004,12.069 L0.004,15.987 L0.016,15.997 L4.973,11.958 Z"

                        > </path>
                    </g> </g> </g>
        </svg>

        // <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     // width="24"
        //     // height="24"
        //     fill={color}
        //     width={size}
        //     viewBox="0 0 24 24"
        // >
        //     <path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z" />
        // </svg>
    );
}

export default RoundedTriangleIcon;