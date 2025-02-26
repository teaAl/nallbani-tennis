import React from "react";
import NavigationMenu from "@/components/common/navigationMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col h-screen">
			<NavigationMenu />
			<main className={`flex-grow h-screen-20`}>
				{children}
				<footer className="p-3 text-sm text-pink-300 text-center bg-white bg-opacity-10 ">
					&copy; 2024 Nallbani Tennis. All rights reserved.
				</footer>
			</main>
		</div>
	);
};

export default Layout;
