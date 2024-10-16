"use client";

const HomeBanner = () => {
	const scrollToBook = () => {
		const calendar = document.getElementById("calendar");
		if (calendar) {
			calendar.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="h-full text-white text-center grid bg-cover bg-fixed bg-[url(../public/images/tennisbg.webp)]">
			<div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-80 w-full h-full"></div>
			<div className="col-start-1 row-start-1 mx-auto my-auto flex flex-col gap-16">
				<h1 className="cursor-default font-extrabold text-9xl font-poppins bg-[url(../public/images/net.png)] text-transparent bg-right-bottom opacity-90 bg-clip-text webkit-bg-clip-text">
					Nallbani Tennis
				</h1>
				<p className="cursor-default text-xl tracking-wider font-poppins font-semibold text-white opacity-90">
					Elevate your game with us
				</p>
				<div className="flex flex-row align-middle items-center justify-center gap-7">
					<button
						className="bg-white text-black px-4 py-2 rounded-md"
						onClick={scrollToBook}>
						Book your sessions
					</button>
					<button className="bg-white text-black px-4 py-2 rounded-md">
						Learn more about us
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
