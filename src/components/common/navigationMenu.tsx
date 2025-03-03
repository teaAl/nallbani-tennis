"use client";

import { XMarkIcon, Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
// import { useState } from "react";

const NavigationMenu = () => {
	const [showNav, setShowNav] = useState(false);

	const links = [
		{
			id: 1,
			link: "/",
			name: "Home",
		},
		{
			id: 2,
			link: "/about",
			name: "About Us",
		},
		{
			id: 3,
			link: "/services",
			name: "Services",
		},
		{
			id: 4,
			link: "/how-it-works",
			name: "How it works",
		},
		{
			id: 5,
			link: "/contact-us",
			name: "Contact Us",
		},
	];

	return (
		<>
			<div
				className={`${showNav ? "h-screen absolute" : " h-16 sticky"
					} md:hidden p-3 top-0 w-screen flex justify-between align-middle bg-black transition-all duration-300 z-20`}>
				<div className="text-2xl text-pink-300 opacity-70">LOGO</div>
				<>
					<div
						className={`${showNav ? "opacity-100 h-full z-20" : "opacity-0 -z-20 h-0"
							} flex flex-col /*gap-8*/ items-center justify-around p-8 transition-all duration-700`}>
						{showNav && links.map((link) => (
							<Link
								key={link.id}
								href={link.link}
								className={`active:scale-105 active:font-semibold active:text-pink-300 transition-all shadow-sm text-center uppercase text-gray-300 opacity-80 ${showNav ? "z-20" : "-z-20"}`}>
								<p>{link.name}</p>
							</Link>
						))}
					</div>
					{showNav ? (
						<XMarkIcon
							className="w-7 h-7 text-pink-300 opacity-70"
							onClick={() => setShowNav(!showNav)}
						/>
					) : (
						<Bars3Icon
							className="w-7 h-7 text-pink-300 opacity-70"
							onClick={() => setShowNav(!showNav)}
						/>
					)}
				</>
			</div>
			<div className="hidden font-poppins p-3 absolute top-0 w-full md:flex flex-row justify-between">
				<div>LOGO</div>
				<div className="flex flex-row gap-5">
					{links.map((link) => (
						<Link
							key={link.id}
							href={link.link}
							className="hover:scale-105 hover:font-semibold transition-all shadow-sm">
							<p>{link.name}</p>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};

export default NavigationMenu;
