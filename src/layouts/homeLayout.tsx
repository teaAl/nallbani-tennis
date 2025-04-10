import React from "react";
import NavigationMenu from "@/components/common/navbar/navigationMenu";
import Footer from "@/components/common/footer";
import { authOptions } from '@/lib/authOpts';
import { getServerSession } from 'next-auth';

async function Layout({ children }: { children: React.ReactNode })  {
	const session = await getServerSession(authOptions);
	return (
		<>
			<div className="flex flex-col min-h-screen h-full">
				<NavigationMenu session={session}/>
				<main className="/*min-h-screen*/ /*h-screen*/ flex-grow pt-16 shadow-md">
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layout;

/*
TODO: Not needed, delete this file after revising booking journey for guests.
*/