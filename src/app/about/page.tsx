import React from "react";
import GeneralBanner from "@/components/common/generalBanner";
import Image from "next/image";
import saliNallbani from "@/public/images/saliNallbani.jpeg";
import toni from "@/public/images/toni.jpeg";
import pose1 from "@/public/icons/pose1.svg";
import pose2 from "@/public/icons/pose2.svg";
import pose3 from "@/public/icons/pose3.svg";
import pose4 from "@/public/icons/pose4.svg";

const AboutPage: React.FC = () => {
	return (
		<div className="flex flex-col gap-0">
			<div className="h-full bg-gradient-to-r from-pear via-gray-800 to-gray-800">
				<div className="p-6">
					<GeneralBanner title="About Us" />
				</div>
			</div>
			<div className="w-full flex flex-row justify-center items-center gap-10 p-6 bg-gradient-to-br from-gray-900 to-gray-800">
				<div>
					<span className="font-poppins uppercase text-xs font-light text-gray-900 tracking-wider bg-pear px-2">Sali Nallbani</span>
					<Image src={saliNallbani} alt="Sali Nallbani" className="shadow-[-17px_-15px_0px_0px_#1e2939]" width={250} height={250} />
				</div>
				<div className="flex flex-col gap-4 w-1/2 h-full justify-around">
					<h3 className="text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max ">
						How Tennis Nallbani was born
					</h3>
					<p className="text-foreground font-poppins font-light">Tennis Nallbani was founded in 2014 by a highly experienced
						tennis coach with a deep-rooted passion for the sport. Co-founder Toni Nallbani comes from a family with a strong
						tennis legacy. <br />
					</p>
					<p className="text-foreground font-poppins font-light">
						His grandfather, Sali Nallbani, was the first Albanian tennis champion, holding 26 international titles
						along with numerous national championships. His family played a crucial role in popularizing tennis in Albania
						from 1930 to 1964, a tradition later continued by his uncle, Fatos Nallbani.
					</p>
				</div>
			</div>
			<div className="bg-gray-900 text-foreground w-full bg-[linear-gradient(to_bottom,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('../public/images/stonesgray.svg')] bg-contain bg-right bg-no-repeat">
				<div className="flex flex-col gap-4 p-6">
					<div className="w-full flex flex-row justify-end">
						<h3 className="text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max ">
							Milestones and Growth
						</h3>
					</div>
					<div className="/flex /flex-row /justify-between grid grid-cols-4 h-80 gap-10">
						<div className="flex flex-col justify-end">
							<div className="h-full bg-gray-800 shadow-2xl relative">
								<Image src={pose4} alt="pose4" className="absolute bottom-0 left-0" />
								<div className="absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800">
									<div className="relative w-full flex flex-row justify-end">
										<span className="absolute -top-12 text-pear font-poppins text-2xl">2025</span>
									</div>
									<p className="font-poppins text-sm text-foreground">With fresh ideas and a clear vision, Tennis Nallbani is set to further expand and popularize the sport in Tirana and Albania. The passion for tennis continues to grow, inspiring future generations</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col justify-end">
							<div className="h-3/4 bg-gray-800 shadow-2xl relative">
								<Image src={pose3} alt="pose3" className="absolute bottom-0 left-0" />
								<div className="absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800">
									<div className="relative w-full flex flex-row justify-end">
										<span className="absolute -top-12 text-pear font-poppins text-2xl">2024</span>
									</div>
									<p className="font-poppins text-sm text-foreground">Tennis Nallbani makes a strong comeback, resuming training for all age groups at Petro Nini Luarasi School, thanks to the support of passionate tennis enthusiasts</p>
								</div>
								{/* Alternative design */}
								{/* <div className="absolute bottom-0 -right-2 w-3/5 p-4 bg-pear">
									<div className="relative w-full flex flex-row justify-end">
										<span className="absolute -top-12 text-pear font-poppins text-2xl">2024</span>
									</div>
									<p className="font-poppins text-sm text-gray-900">Tennis Nallbani makes a strong comeback, resuming training for all age groups at Petro Nini Luarasi School, thanks to the support of passionate tennis enthusiasts</p>
								</div> */}
							</div>
						</div>
						<div className="flex flex-col justify-end">
							<div className="h-1/2 bg-gray-800 shadow-2xl relative">
								<Image src={pose2} alt="pose2" className="absolute bottom-0 left-0" />
								<div className="absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800">
									<div className="relative w-full flex flex-row justify-end">
										<span className="absolute -top-12 text-pear font-poppins text-2xl">2022</span>
									</div>
									<p className="font-poppins text-sm text-foreground">He shifted his focus exclusively to children’s tennis by coaching at the American School of Tirana (TIS), aiming to cultivate young talent</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col justify-end">
							<div className="h-1/4 bg-gray-800 shadow-2xl relative">
								<Image src={pose1} alt="pose1" className="absolute bottom-0 left-0" />

								<div className="absolute bottom-0 -right-2 w-3/5 p-4 bg-gradient-to-r to-pear/30 from-gray-800">
									<div className="relative w-full flex flex-row justify-end">
										<span className="absolute -top-12 text-pear font-poppins text-2xl">2017</span>
									</div>
									<p className="font-poppins text-sm text-foreground /text-gray-900">Toni achieved his first major successes as a coach when his students won several junior and adult tournaments</p>
								</div>
								{/* Alternative design */}
								{/* <div className="absolute bottom-0 -right-2 w-3/5 p-4 border border-pear/30 bg-gray-800/40 /bg-pear">
									<div className="relative w-full flex flex-row justify-end">
										<span className="absolute -top-12 text-pear font-poppins text-2xl">2017</span>
									</div>
									<p className="font-poppins text-sm text-foreground /text-gray-900">Toni achieved his first major successes as a coach when his students won several junior and adult tournaments</p>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-row justify-center items-center gap-10 p-6 bg-gradient-to-tr from-gray-900 to-gray-800">

				<div className="flex flex-col gap-4 w-1/2 h-full justify-around">
					<h3 className="text-gray-900 bg-pear font-semibold md:text-2xl text-xl font-poppins w-max">
						Coach Toni
					</h3>

					<p className="text-foreground font-poppins font-light">
						Toni grew up and developed his skills as a player at Tirana Club, where he became a multi-time Albanian
						champion in the U14-U16 categories and a finalist in several competitions. In 2014, he seized the
						opportunity to work as a professional coach at Tirana Club, initially training close friends and later
						expanding his activities over the years.
					</p>
					<p className="text-foreground font-poppins font-light">
						While pursuing his career as a part-time tennis coach, Toni also completed his university studies in Architecture.
						After graduation, he worked as an architect for several years, continuing to coach tennis on the side.
						His passion for the sport never faded, and he constantly gained experience from fellow players and coaches.
					</p>
					<p className="text-foreground font-poppins font-light">
						In 2014, he earned his ITF coaching license and also worked as an international referee for Tennis Europe events in Tirana.
						Through these years, Toni faced a pivotal life decision and realized that tennis was his true calling. His mission became clear:
						to promote the sport and develop new generations of junior and adult players in Tirana and across Albania.
					</p>
				</div>

				<div>
					<span className="font-poppins uppercase text-xs font-light text-gray-900 tracking-wider bg-pear px-2">Meriton Nallbani</span>
					<Image src={toni} alt="Meriton Nallbani" className="shadow-[-17px_-15px_0px_0px_#cbdc3b] " width={270} height={270} />
				</div>
			</div>
		</div>
	);
};

export default AboutPage;