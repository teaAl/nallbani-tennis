import Link from "next/link";
// import { useState } from "react";

const NavigationMenu = () => {
	// const [nav, setNav] = useState(false);

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
		<div className="font-poppins p-3 absolute top-0 w-full flex flex-row justify-between">
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
	);
};

export default NavigationMenu;
