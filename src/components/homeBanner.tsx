import tennisbg from "../public/images/tennisbg.webp";

const HomeBanner = () => {
	return (
		<div className="h-full text-white text-center grid bg-cover bg-[url(../public/images/tennisbg.webp)]">
			<div className="col-start-1 row-start-1 bg-gray-800 bg-opacity-70 w-full h-full"></div>
			<div className="col-start-1 row-start-1 mx-auto my-auto flex flex-col gap-7">
				<h1 className="font-bold text-7xl">Nallbani Tennis</h1>
				<p>Elevate your game with us</p>
				<div className="flex flex-row align-middle items-center justify-center gap-7">
					<button className="bg-white text-black px-4 py-2 rounded-md">
						Book a session
					</button>
					<button className="bg-white text-black px-4 py-2 rounded-md">
						Learn more
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;
