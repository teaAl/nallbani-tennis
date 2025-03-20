"use client";

import WhatsappIcon from "@/public/icons/whatsappIcon";
import { scrollIntoView } from "@/utils/scrollToView";
import { useRouter } from "next/navigation";

const HomeBanner = () => {
	const router = useRouter();

	const goToBook = () => {
		router.push("/book");
	};
	return (
		<div className="h-10/12 text-white text-center grid bg-cover bg-fixed bg-bottom bg-[url(../public/images/tennisbg.webp)]">
			<div className="col-start-1 row-start-1 bg-gray-800/80 w-full h-full"></div>
			<div className="col-start-1 row-start-1 mx-auto my-auto flex flex-col gap-8 md:gap-16">
				<h1 className="cursor-default font-extrabold text-5xl md:text-9xl font-poppins bg-[url(../public/images/net.png)] text-transparent bg-bottom md:bg-right-bottom opacity-90 bg-clip-text webkit-bg-clip-text">
					Nallbani Tennis
				</h1>
				<p className="cursor-default md:text-xl tracking-wider font-poppins font-semibold text-foreground opacity-90">
					Elevate your <span className="text-pear underline">game</span>{" "}
					with us
				</p>
				{/* <div className="flex flex-row align-middle items-center justify-center gap-7">
					<button
						className="bg-pear text-black px-4 py-2 rounded-md hover:bg-pear/65 hover:scale-105 transition-all"
						onClick={() => scrollIntoView("start-booking")}>
						Book Online
					</button>
					<button
						className="bg-black text-olive px-4 py-2 rounded-md hover:bg-black/65 hover:scale-105 transition-all inline-flex gap-2 items-center"
						onClick={() => window.open("https://wa.me/355683188648", "_blank")}>
						<WhatsappIcon fill="#648767" size={"20"} />
						Chat with us
					</button>
				</div> */}
			</div>
		</div>
	);
};

export default HomeBanner;
