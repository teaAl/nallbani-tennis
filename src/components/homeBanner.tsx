"use client";

import { scrollIntoView } from "@/utils/scrollToView";

const HomeBanner = () => {
	return (
		<div className="h-full text-white text-center grid bg-cover bg-fixed bg-[url(../public/images/tennisbg.webp)]">
			<div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-80 w-full h-full"></div>
			<div className="col-start-1 row-start-1 mx-auto my-auto flex flex-col gap-8 md:gap-16">
				<h1 className="cursor-default font-extrabold text-5xl md:text-9xl font-poppins bg-[url(../public/images/net.png)] text-transparent bg-bottom md:bg-right-bottom opacity-90 bg-clip-text webkit-bg-clip-text">
					Nallbani Tennis
				</h1>
				<p className="cursor-default md:text-xl tracking-wider font-poppins font-semibold text-pink-300 opacity-90">
					Elevate your <span className="text-green-300 underline">game</span>{" "}
					with us
				</p>
				<div className="flex flex-row align-middle items-center justify-center gap-7">
					<button
						className="bg-green-300 bg-opacity-60 text-black px-4 py-2 rounded-md hover:bg-opacity-65 hover:scale-105 transition-all"
						onClick={() => scrollIntoView("bookingType")}>
						Book your sessions
					</button>
					<button className="bg-pink-300 bg-opacity-60 text-black px-4 py-2 rounded-md hover:bg-opacity-65 hover:scale-105 transition-all">
						Learn more about us
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
