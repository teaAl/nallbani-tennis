import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/globalStateContext";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
	ChevronDoubleDownIcon,
	InformationCircleIcon,
} from "@heroicons/react/16/solid";

const validationSchema = z.object({
	name: z.string().min(2, { message: "Must be at least 2 characters long" }),
	email: z.string().email({ message: "Must be a valid email address" }),
	phone: z.string().regex(/^06[6789]\d{7}$/),
});

const ContactForm = () => {
	const router = useRouter();
	const { lessonType, dateBooked, hourBooked, needEquipment, handleNextStep } =
		useGlobalState();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const isValid =
			name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
		setIsFormValid(isValid);
	}, [name, email, phone]);

	const addBooking = (event: React.FormEvent) => {
		// Add booking to database
		event.preventDefault();
		const formData = {
			bookingType: lessonType,
			bookedDate: dateBooked,
			bookedHour: hourBooked,
			hasEquipment: !needEquipment,
			// schedule: [
			//     {
			//         date: partialBooking?.secondDate,
			//         hour: partialBooking?.secondHour,
			//     },
			// ],
			// firstDate: partialBooking?.firstDate,
			// secondDate: partialBooking?.secondDate,
			// firstHour: partialBooking?.firstHour,
			// secondHour: partialBooking?.secondHour,
			// recurring: bookingType === "serious" ? true : false,
			// bookingStatus: bookingStatus,
			contactInfo: {
				name: name,
				email: email,
				phone: phone,
			},
		};

		console.log(formData);

		// try {
		// 	// const validatedData = createBookingSchema.parse(formData);
		// 	console.log(formData);
		// 	router.push("/thank-you");
		// } catch (error) {
		// 	if (error instanceof z.ZodError) {
		// 		console.error("Validation errors: ", error.errors);
		// 	} else {
		// 		console.error("Unknown error: ", error);
		// 	}
		// }
	};

	return (
		<div className="h-full flex flex-col justify-between gap-6">
			{/* <h1 className="text-4xl font-nunito font-bold text-pink-300 text-right border-b border-pink-300 border-opacity-70 py-3">
				Contact information
			</h1> */}
			<form
				onSubmit={(e) => addBooking(e)}
				className="flex flex-col gap-6 justify-between">
				<div className="px-6 py-10 rounded-md flex flex-col gap-6">
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
						type="tel"
						placeholder="Phone"
						required
						onChange={(e) => setPhone(e.target.value)}
					/>
					{/* <button
					type="submit"
					className="bg-black text-pink-300 font-semibold font-poppins text-lg p-2 rounded-md hover:shadow-sm transform-all duration-150">
					Send
				</button> */}
					<p className="font-nunito text-sm text-pink-300 text-opacity-90 inline-flex gap-2 items-center border-t-2 border-pink-300 border-opacity-10 py-4">
						<InformationCircleIcon className="w-4 h-4" />
						We request these details to contact you in case of any changes
					</p>
				</div>
				<div
					className={`${
						!isFormValid ? "opacity-0 -z-50" : "opacity-100 z-50"
					} flex flex-row justify-around align-middle items-center duration-300 transition-all`}>
					<div className={`cursor-pointer`}>
						<button
							type="submit"
							className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
							onClick={handleNextStep}>
							Proceed
							<ChevronDoubleDownIcon className="w-10 h-10" />
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ContactForm;
