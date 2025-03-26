'use client';

import React, { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import GeneralBanner from "@/components/common/generalBanner";
import Image from "next/image";
import saliNallbani from "@/public/images/saliNallbani.jpeg";
import toni from "@/public/images/toni.jpeg";
import MilestonesSection from "@/components/about-us/milestones";

const AboutPage: React.FC = () => {
	const title1Ref = useRef<HTMLHeadingElement | null>(null);
	const isTitle1Visible = useIsVisible(title1Ref);
	const image1Ref = useRef<HTMLImageElement | null>(null);
	const isImage1Visible = useIsVisible(image1Ref);
	const image1MobileRef = useRef<HTMLImageElement | null>(null);
	const isImage1MobileVisible = useIsVisible(image1MobileRef);
	const alt1Ref = useRef<HTMLSpanElement | null>(null);
	const isAlt1Visible = useIsVisible(alt1Ref);
	const alt1MobileRef = useRef<HTMLSpanElement | null>(null);
	const isAlt1MobileVisible = useIsVisible(alt1MobileRef);
	const paragraph1Ref = useRef<HTMLParagraphElement | null>(null);
	const isParagraph1Visible = useIsVisible(paragraph1Ref);
	const paragraph2Ref = useRef<HTMLParagraphElement | null>(null);
	const isParagraph2Visible = useIsVisible(paragraph2Ref);

	const title3Ref = useRef<HTMLHeadingElement | null>(null);
	const isTitle3Visible = useIsVisible(title3Ref);
	const image3Ref = useRef<HTMLImageElement | null>(null);
	const isImage3Visible = useIsVisible(image3Ref);
	const image3MobileRef = useRef<HTMLImageElement | null>(null);
	const isImage3MobileVisible = useIsVisible(image3MobileRef);
	const alt3Ref = useRef<HTMLSpanElement | null>(null);
	const isAlt3Visible = useIsVisible(alt3Ref);
	const alt3RefMobile = useRef<HTMLSpanElement | null>(null);
	const isAlt3MobileVisible = useIsVisible(alt3RefMobile);
	const paragraph3Ref = useRef<HTMLParagraphElement | null>(null);
	const isParagraph3Visible = useIsVisible(paragraph3Ref);
	const paragraph4Ref = useRef<HTMLParagraphElement | null>(null);
	const isParagraph4Visible = useIsVisible(paragraph4Ref);
	const paragraph5Ref = useRef<HTMLParagraphElement | null>(null);
	const isParagraph5Visible = useIsVisible(paragraph5Ref);



	return (
		<div className="flex flex-col gap-0">
			<GeneralBanner title="About Us" />
			{/* Section 1 */}
			<div className="w-full flex md:flex-row flex-col justify-center items-center gap-10 p-6 bg-gradient-to-br from-gray-900 to-gray-800">
				<div className="flex flex-col gap-4 md:w-1/2 w-full h-full justify-around ">
					<h3 className={`text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max
						${isTitle1Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
						ref={title1Ref}
					>
						How Tennis Nallbani was born
					</h3>
					<p className={`text-foreground font-poppins font-light
						${isParagraph1Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph1Ref}
					>
						Tennis Nallbani was founded in 2014 by a highly experienced
						tennis coach with a deep-rooted passion for the sport. Co-founder Toni Nallbani comes from a family with a strong
						tennis legacy.
					</p>

					<div className="block md:hidden px-2">
						<span className={`font-poppins uppercase text-xs font-light text-gray-900 tracking-wider bg-pear px-2 relative z-10
						${isAlt1MobileVisible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
							ref={alt1MobileRef}
						>
							Sali Nallbani
						</span>
						<Image src={saliNallbani}
							alt="Sali Nallbani"
							className={`shadow-[-17px_-15px_0px_0px_#1e2939]
							${isImage1MobileVisible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
							ref={image1MobileRef}
						/>
					</div>

					<p className={`text-foreground font-poppins font-light
						${isParagraph2Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph2Ref}
					>
						His uncle, Sali Nallbani, was the first Albanian tennis champion, holding 26 international titles
						along with numerous national championships. His family played a crucial role in popularizing tennis in Albania
						from 1930 to 1964, a tradition later continued by his uncle, Fatos Nallbani.
					</p>
				</div>
				<div className="md:block hidden">
					<span className={`font-poppins uppercase text-xs font-light text-gray-900 tracking-wider bg-pear px-2 relative z-10
						${isAlt1Visible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
						ref={alt1Ref}
					>
						Sali Nallbani
					</span>
					<Image src={saliNallbani}
						alt="Sali Nallbani"
						className={`shadow-[-17px_-15px_0px_0px_#1e2939]
							${isImage1Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						width={250}
						height={250}
						ref={image1Ref}
					/>
				</div>
			</div>
			{/* Section 2 */}
			<MilestonesSection />
			{/* Section 3 */}
			<div className="w-full flex md:flex-row flex-col justify-center items-center gap-10 p-6 bg-gradient-to-tr from-gray-900 to-gray-800">
				<div className="md:block hidden">
					<span className={`font-poppins uppercase text-xs font-light text-gray-900 tracking-wider bg-pear px-2 relative z-10
						${isAlt3Visible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
						ref={alt3Ref}
					>
						Meriton Nallbani
					</span>
					<Image src={toni} alt="Meriton Nallbani"
						className={`shadow-[-17px_-15px_0px_0px_#cbdc3b]
							${isImage3Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
						width={270}
						height={270}
						ref={image3Ref}
					/>
				</div>
				<div className="flex flex-col gap-4 md:w-1/2 w-full h-full justify-around">
					<h3 className={`text-gray-900 bg-pear font-semibold md:text-2xl text-xl font-poppins w-max
						${isTitle3Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						ref={title3Ref}
					>
						Coach Toni
					</h3>

					<p className={`text-foreground font-poppins font-light
						${isParagraph3Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph3Ref}
					>
						Toni grew up and developed his skills as a player at Tirana Club, where he became a multi-time Albanian
						champion in the U14-U16 categories and a finalist in several competitions. In 2014, he seized the
						opportunity to work as a professional coach at Tirana Club, initially training close friends and later
						expanding his activities over the years.
					</p>

					<div className="block md:hidden px-2">
						<span className={`font-poppins uppercase text-xs font-light text-gray-900 tracking-wider bg-pear px-2 relative z-10
						${isAlt3MobileVisible ? "animate-fade animate-once animate-ease-linear" : "opacity-0"}`}
							ref={alt3RefMobile}
						>
							Meriton Nallbani
						</span>
						<Image src={toni} alt="Meriton Nallbani"
							className={`shadow-[-17px_-15px_0px_0px_#cbdc3b] w-full
							${isImage3MobileVisible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
							ref={image3MobileRef}
						/>
					</div>
					<p className={`text-foreground font-poppins font-light
						${isParagraph4Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph4Ref}
					>
						While pursuing his career as a part-time tennis coach, Toni also completed his university studies in Architecture.
						After graduation, he worked as an architect for several years, continuing to coach tennis on the side.
						His passion for the sport never faded, and he constantly gained experience from fellow players and coaches.
					</p>
					<p className={`text-foreground font-poppins font-light
						${isParagraph5Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph5Ref}
					>
						In 2014, he earned his ITF coaching license and also worked as an international referee for Tennis Europe events in Tirana.
						Through these years, Toni faced a pivotal life decision and realized that tennis was his true calling. His mission became clear:
						to promote the sport and develop new generations of junior and adult players in Tirana and across Albania.
					</p>
				</div>

			</div>
		</div>
	);
};

export default AboutPage;