"use client";

interface GeneralBannerProps {
	title: string;
}

const GeneralBanner = ({ title }: GeneralBannerProps) => {
	return (
		<div className="w-full rounded-2xl shadow-[-17px_-15px_0px_0px_#10182840] md:h-[calc(100vh-20rem)] h-[calc(100vh-31rem)] bg-[linear-gradient(to_bottom,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('../public/images/racketballsnet.jpg')] bg-cover /*bg-fixed*/ bg-center ">
			<div className="flex flex-col w-full h-full justify-center items-center my-auto md:gap-8 gap-4 ">
				<h1 className={`text-pear font-poppins font-bold md:text-6xl text-4xl`}>
					{title}
				</h1>
			</div>
		</div>
	);
};

export default GeneralBanner;
