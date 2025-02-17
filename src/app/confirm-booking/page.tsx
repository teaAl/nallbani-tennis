"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/globalStateContext";
import HomeLayout from "@/components/homeLayout";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { z } from "zod";

const ContactUsPage: React.FC = () => {
	const router = useRouter();
	const { partialBooking, setContactInfo, bookingType, bookingStatus } =
		useGlobalState();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	//uncomment this code after development

	// useEffect(() => {
	// 	if (partialBooking === null) {
	// 		setTimeout(() => {
	// 			router.push("/");
	// 		}, 0);
	// 	}
	// }, [partialBooking, router]);

	const addBooking = (event: React.FormEvent) => {
		// Add booking to database
		event.preventDefault();
		const formData = {
			bookingType: bookingType,
			schedule: [
				{
					date: partialBooking?.firstDate,
					hour: partialBooking?.firstHour,
				},
				{
					date: partialBooking?.secondDate,
					hour: partialBooking?.secondHour,
				},
			],
			// firstDate: partialBooking?.firstDate,
			// secondDate: partialBooking?.secondDate,
			// firstHour: partialBooking?.firstHour,
			// secondHour: partialBooking?.secondHour,
			recurring: bookingType === "serious" ? true : false,
			bookingStatus: bookingStatus,
			contactInfo: {
				name: name,
				email: email,
				phone: phone,
			},
		};

		try {
			// const validatedData = createBookingSchema.parse(formData);
			console.log(formData);
			router.push("/thank-you");
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error("Validation errors: ", error.errors);
			} else {
				console.error("Unknown error: ", error);
			}
		}
	};

	return (
		<HomeLayout>
			<div className="grid grid-cols-2 h-full">
				<div className="flex flex-col gap-4 p-10">
					<div className="flex flex-col gap-4 align-middle my-auto">
						<h1 className="text-4xl font-nunito font-bold text-pink-300 border-b border-pink-300 border-opacity-55 py-3 flex flex-row justify-between items-center">
							Days booked
							<CalendarDaysIcon className="w-8 h-8" />
						</h1>

						<div className="flex flex-row justify-between bg-pink-300 bg-opacity-70 p-4 rounded-md">
							<p className="text-lg font-nunito text-black font-bold text-opacity-90 flex flex-row gap-2 items-center">
								{partialBooking?.firstDate?.toDateString()}
							</p>
							<p className="text-lg font-nunito text-black font-bold text-opacity-90 flex flex-row gap-2 items-center">
								{partialBooking?.firstHour}
							</p>
						</div>
						<div className="flex flex-row justify-between bg-pink-300 bg-opacity-70 p-4 rounded-md">
							<p className="text-lg font-nunito text-black font-bold text-opacity-90 flex flex-row gap-2 items-center">
								{partialBooking?.secondDate?.toDateString()}
							</p>
							<p className="text-lg font-nunito text-black font-bold text-opacity-90 flex flex-row gap-2 items-center">
								{partialBooking?.secondHour}
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 p-6 md:p-10 bg-pink-300 bg-opacity-70">
					<div className="flex flex-col gap-4 align-middle my-auto">
						<h1 className="text-4xl font-nunito font-bold text-black text-right border-b border-pink-300 border-opacity-70 py-3">
							Contact information
						</h1>
						<form
							onSubmit={(e) => addBooking(e)}
							className="flex flex-col gap-4">
							<input
								type="text"
								placeholder="Name"
								onChange={(e) => setName(e.target.value)}
							/>
							<input
								type="email"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="text"
								placeholder="Phone"
								required
								onChange={(e) => setPhone(e.target.value)}
							/>
							<button
								type="submit"
								className="bg-black text-pink-300 font-semibold font-poppins text-lg p-2 rounded-md hover:shadow-sm transform-all duration-150">
								Send
							</button>
						</form>
						{/* <p className="font-nunito text-sm text-pink-300 text-opacity-90 inline-flex gap-2 items-center border-t-2 border-pink-300 border-opacity-10 py-4">
							<InformationCircleIcon className="w-4 h-4" />
							We request these details to contact you in case of any changes
						</p> */}
					</div>
				</div>
			</div>
			{/* <div className="h-screen flex justify-center items-center">
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-nunito font-bold text-pink-300">
						Thank you for your booking!
					</h1>
					<p className="text-lg font-nunito text-pink-300 text-opacity-90">
						We will get back to you as soon as possible with the confirmation of
						your booking.
					</p>

					<form className="flex flex-col gap-4 p-4 bg-green-300 bg-opacity-70">
						<input type="text" placeholder="Name" />
						<input type="email" placeholder="Email" />
						<input type="text" placeholder="Subject" />
						<textarea placeholder="Message" />
						<button>Send</button>
					</form>
				</div>
			</div> */}
		</HomeLayout>
	);
};

export default ContactUsPage;
