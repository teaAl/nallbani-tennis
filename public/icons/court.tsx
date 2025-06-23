const CourtIcon = ({ fill, size }: { fill?: string; size?: string }) => {
  return (
    <svg
      // fill="#afafaf"
      fill={fill ? fill : "#afafaf"}
      //   height="200px"
      // width="21px"
      width={size ? size : "21px"}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M0,79.175v353.65h512V79.175H0z M263.918,147.794H385.32v100.289H263.918V147.794z M263.918,263.918H385.32v100.289 H263.918V263.918z M15.835,147.794h95.01v216.412h-95.01V147.794z M248.082,416.99H15.835v-36.948h232.247V416.99z M248.082,364.206H126.68V263.918h121.402V364.206z M248.082,248.082H126.68V147.794h121.402V248.082z M248.082,131.959H15.835 V95.01h232.247V131.959z M496.165,416.99H263.918v-36.948h232.247V416.99z M496.165,364.206h-95.01V147.794h95.01V364.206z M496.165,131.959H263.918V95.01h232.247V131.959z"></path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};

export default CourtIcon;
