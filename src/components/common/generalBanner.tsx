"use client";

import { useIsVisible } from "@/utils/useIsVisible";
import { useRef } from "react";

interface GeneralBannerProps {
	title: string;
}

const GeneralBanner = ({ title }: GeneralBannerProps) => {
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const isTitleVisible = useIsVisible(titleRef);
	const bannerRef = useRef<HTMLDivElement | null>(null);
	const isBannerVisible = useIsVisible(bannerRef);

	return (
		<div className="bg-gradient-to-r from-pear via-gray-800 to-gray-800">
			<div className={`p-6
					${isBannerVisible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
				ref={bannerRef}
			>
				<div className="w-full rounded-2xl shadow-[-17px_-15px_0px_0px_#10182840] md:h-[calc(100vh-20rem)] h-[calc(100vh-40rem)] bg-[linear-gradient(to_bottom,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('../public/images/racketballsnet.jpg')] bg-cover /*bg-fixed*/ bg-center ">
					<div className="flex flex-col w-full h-full justify-center items-center my-auto md:gap-8 gap-4 ">
						<h1 className={`text-pear font-poppins font-bold md:text-6xl text-4xl
				${isTitleVisible ? "animate-fade-down animate-once animate-ease-linear" : "opacity-0"}`}
							ref={titleRef}
						>
							{title}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GeneralBanner;
