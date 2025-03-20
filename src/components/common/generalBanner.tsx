"use client";

interface GeneralBannerProps {
	title: string;
}

const GeneralBanner = ({ title }: GeneralBannerProps) => {
	return (
		<div className="h-full text-white text-center grid bg-cover bg-fixed bg-[url(../public/images/moreballs.jpg)]">
			<div className="col-start-1 row-start-1 bg-gray-800/80 w-full h-full"></div>
			<div className="col-start-1 row-start-1 mx-auto my-auto flex flex-col gap-8 md:gap-16">
				<h1 className="cursor-default font-extrabold text-5xl md:text-9xl font-poppins bg-[url(../public/images/net.png)] text-transparent bg-bottom md:bg-right-bottom opacity-90 bg-clip-text webkit-bg-clip-text">
					{title}
				</h1>
			</div>
		</div>
	);
};

export default GeneralBanner;
