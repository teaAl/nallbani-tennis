"use client";

import HomeBanner from "@/components/homeBanner";
import HomeLayout from "@/components/homeLayout";
import CalendarView from "@/components/calendar";
import HourPickerList from "@/components/hours/hourPickerList";
import BookingType from "@/components/bookingType";
import { useGlobalState } from "@/context/globalStateContext";
import prisma from "@/lib/prisma";
import { useEffect } from "react";

export default function Home() {
	const { bookingType } = useGlobalState();

	// Example fetch in a component
	async function fetchBookings() {
		const response = await fetch("/api/bookings");
		const data = await response.json();
		console.log(data); // List of bookings
	}

	useEffect(() => {
		fetchBookings();
	}, []);

	return (
		<HomeLayout>
			<div className="h-screen">
				<HomeBanner />
			</div>
			<div
				className="md:h-screen flex justify-center items-center"
				id="bookingType">
				<BookingType />
			</div>
			{bookingType && (
				<div className="md:grid md:grid-cols-2 flex flex-col gap-10 p-6 md:p-10">
					<div className="col-start-1">
						<CalendarView />
					</div>
					<div className="col-start-2 flex flex-col gap-4">
						<HourPickerList />
						{/* <button className="font-nunito text-lg bg-pink-300 text-black rounded-sm p-2 mt-2">
						Confirm
					</button> */}
					</div>
				</div>
			)}
		</HomeLayout>
	);
}
