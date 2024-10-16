import React from "react";
import NavigationMenu from "./navigationMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-screen flex flex-col">
			<NavigationMenu />
			<main className={`flex-grow`}>{children}</main>
			<footer className="p-2 text-sm text-gray-400">
				&copy; 2024 Nallbani Tennis. All rights reserved.
			</footer>
		</div>
	);
};

export default Layout;
