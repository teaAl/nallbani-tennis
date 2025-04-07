
'use client';

import React, { useRef } from "react";
import { useIsVisible } from "@/utils/useIsVisible";
import GeneralBanner from "@/components/common/generalBanner";
import Image from "next/image";
import saliNallbani from "../../../../public/images/saliNallbani.jpeg";
import toni from "../../../../public/images/toni.jpeg";
import MilestonesSection from "@/components/about-us/milestones";
import { useTranslations } from "next-intl";

const AboutPage: React.FC = () => {
	const t = useTranslations('AboutPage');

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
			<GeneralBanner title={t('bannerTitle')} />
			{/* Section 1 */}
			<div className="w-full flex md:flex-row flex-col justify-center items-center gap-10 p-6 bg-gradient-to-br from-gray-900 to-gray-800">
				<div className="flex flex-col gap-4 md:w-1/2 w-full h-full justify-around ">
					<h3 className={`text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max
						${isTitle1Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
						ref={title1Ref}
					>
						{t('Section1.title')}
					</h3>
					<p className={`text-foreground font-poppins font-light
						${isParagraph1Visible ? "animate-fade-left animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph1Ref}
					>
						{t('Section1.p1')}
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
						{t('Section1.p2')}

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
						{t('Section3.title')}
					</h3>

					<p className={`text-foreground font-poppins font-light
						${isParagraph3Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph3Ref}
					>
						{t('Section3.p1')}

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
						{t('Section3.p2')}

					</p>
					<p className={`text-foreground font-poppins font-light
						${isParagraph5Visible ? "animate-fade-right animate-once animate-ease-linear" : "opacity-0"}`}
						ref={paragraph5Ref}
					>
						{t('Section3.p3')}
					</p>
				</div>

			</div>
		</div>
	);
};

export default AboutPage;