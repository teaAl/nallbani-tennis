"use client";

import HomeBanner from "@/components/homeBanner";
import Layout from "@/layouts/homeLayout";
import CalendarView from "@/components/calendar";
import HourPickerList from "@/components/hours/hourPickerList";
import BookingType from "@/components/bookingType";
import { useGlobalState } from "@/context/globalStateContext";
import prisma from "@/lib/prisma";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IndividualOrGroup from "@/components/individualOrGroup";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;
console.log(url);

export default function Home() {
	const router = useRouter();
	const {
		bookingType,
		firstDate,
		secondDate,
		firstHour,
		secondHour,
		partialBooking,
		setPartialBooking,
		bookingStatus,
		showCalendar,
	} = useGlobalState();

	// Example fetch in a component
	async function fetchBookings() {
		const response = await fetch(`api/bookings`);
		const data = await response.json();
		console.log(data); // List of bookings
	}

	// const enableConfirmButton =
	// 	firstDate && secondDate && firstHour && secondHour ? true : false;

	// const confirmBooking = () => {
	// 	const data = {
	// 		bookingType,
	// 		firstDate,
	// 		secondDate,
	// 		firstHour,
	// 		secondHour,
	// 		bookingStatus,
	// 	};
	// 	console.log(data);
	// 	setPartialBooking(data);
	// 	router.push("/confirm-booking");
	// };

	useEffect(() => {
		fetchBookings();

		// this will be used to disable days and hours on calendar
		// mockData.forEach((booking) => {
		// 	if (booking.bookingType === "serious") {
		// 		console.log(
		// 			"these days and hours should be disabled on calendar always",
		// 			booking.schedule
		// 		);
		// 	} else {
		// 		console.log(
		// 			"these days and hours should be disabled on calendar only once",
		// 			booking.schedule
		// 		);
		// 	}
		// });
	}, []);

	return (
		<Layout>
			<div className="h-screen">
				<HomeBanner />
			</div>

			<div
				className="md:h-screen flex justify-center items-center"
				id="bookingType">
				<BookingType />
			</div>
			{/* {bookingType && (
				<div className="flex flex-col gap-10 p-6 md:p-10">
					<IndividualOrGroup />
				</div>
			)}

			{showCalendar && (
				<div className="md:grid md:grid-cols-2 flex flex-col gap-10 p-6 md:p-10">
					<div className="col-start-1">
						<CalendarView />
					</div>
					<div className="col-start-2 flex flex-col gap-4">
						<HourPickerList />
						<button
							onClick={confirmBooking}
							className={`${
								enableConfirmButton ? "opacity-100" : "opacity-35"
							} font-nunito text-lg bg-pink-300 text-black rounded-sm p-2 mt-2 hover:scale-105 transform-all duration-150`}
							disabled={!enableConfirmButton}>
							Confirm
						</button>
					</div>
				</div>
			)} */}
		</Layout>
	);
}
