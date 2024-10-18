import React from "react";
import NavigationMenu from "./navigationMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-screen flex flex-col">
			<NavigationMenu />
			<main className={`flex-grow`}>{children}</main>
			<footer className="p-3 text-sm text-pink-300 text-center bg-white bg-opacity-10">
				&copy; 2024 Nallbani Tennis. All rights reserved.
			</footer>
		</div>
	);
};

export default Layout;
