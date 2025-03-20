"use client";

import HomeBanner from "@/components/common/homeBanner";
import Layout from "@/layouts/homeLayout";
import BookingType from "@/components/booking/bookingType";
import prisma from "@/lib/prisma";
import { useEffect } from "react";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;
console.log(url);

export default function Home() {

	// Example fetch in a component
	async function fetchBookings() {
		const response = await fetch(`api/bookings`);
		const data = await response.json();
		console.log(data); // List of bookings
	}

	useEffect(() => {
		fetchBookings();
	}, []);

	return (
		<Layout>
			<HomeBanner />
			<div
				className="md:h-screen flex justify-center items-center"
				id="start-booking">
				<BookingType />
			</div>
		</Layout>
	);
}

// #CDDC3B