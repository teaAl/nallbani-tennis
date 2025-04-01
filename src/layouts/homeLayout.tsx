import React from "react";
import NavigationMenu from "@/components/common/navbar/navigationMenu";
import Footer from "@/components/common/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="flex flex-col min-h-screen h-full">
				<NavigationMenu />
				<main className="/*min-h-screen*/ /*h-screen*/ flex-grow pt-16 shadow-md">
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;
