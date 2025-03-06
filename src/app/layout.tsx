import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import { GlobalStateProvider } from "@/context/globalStateContext";
import { sql } from "@vercel/postgres";
import BookingLayout from "@/layouts/bookingLayout";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["200", "300", "400", "600", "700", "800", "900"],
	variable: "--font-nunito",
});

export const metadata: Metadata = {
	title: "Nallbani Tennis",
	description: "Elevate your game with us",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GlobalStateProvider>
			<BookingLayout>
				<html lang="en">
					<body className={`${poppins.variable} ${nunito.variable} antialiased`}>
						{children}
					</body>
				</html>
			</BookingLayout>
		</GlobalStateProvider>
	);
}
