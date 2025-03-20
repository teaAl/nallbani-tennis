
const FacebookLogo = ({ size }: { size: string | number }) => {
    return (
        <svg
            // width="24"
            // height="24"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="1"
                y="1"
                width="22"
                height="22"
                rx="5"
                stroke="#CBDC3B"
                strokeWidth="2"
            />
            <path
                d="M12.9296 7.5498C12.9296 6.88259 13.5255 6.64291 14.1927 6.64291C14.8599 6.64291 15.5725 6.8502 15.5725 6.8502L16 4.31093C16 4.31093 15.0931 4 12.9296 4C11.6016 4 10.8308 4.50526 10.2672 5.2502C9.73603 5.95627 9.7166 7.08988 9.7166 7.82186V9.48664H8V11.9676H9.7166V20.583H12.9296V11.9676H15.4753L15.6632 9.48664H12.9296V7.5498Z"
                fill="#CBDC3B"
                stroke="#CBDC3B"
                strokeWidth="0.78125"
            />
        </svg>
    )
}

export default FacebookLogo;
