import { useGlobalState } from "@/context/globalStateContext";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const GroupForm = () => {
	const router = useRouter();
	const { partialBooking, setContactInfo, bookingType, bookingStatus } =
		useGlobalState();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [text, setText] = useState("");

	const addBooking = (event: React.FormEvent) => {
		// Add booking to database
		event.preventDefault();
		const formData = {
			bookingType: bookingType,
			// schedule: [
			// 	{
			// 		date: partialBooking?.firstDate,
			// 		hour: partialBooking?.firstHour,
			// 	},
			// 	{
			// 		date: partialBooking?.secondDate,
			// 		hour: partialBooking?.secondHour,
			// 	},
			// ],
			// firstDate: partialBooking?.firstDate,
			// secondDate: partialBooking?.secondDate,
			// firstHour: partialBooking?.firstHour,
			// secondHour: partialBooking?.secondHour,
			// recurring: bookingType === "serious" ? true : false,
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
	// const { setHasGroup, groupSize, setGroupSize } = useGlobalState();

	// const [hasGroupInternal, setHasGroupInternal] = useState<
	// 	"joinGroup" | "hasGroup"
	// >("joinGroup");

	// const handleHasGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.value === "joinGroup") {
	// 		setHasGroupInternal("joinGroup");
	// 		setGroupSize(0);
	// 	} else {
	// 		setHasGroupInternal("hasGroup");
	// 		setGroupSize(2);
	// 	}
	// };

	// const handleGroupSize = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const value = parseInt(e.target.value, 10);
	// 	if (value >= 0 && value <= 5) {
	// 		setGroupSize(value as 0 | 2 | 3 | 4 | 5);
	// 	}
	// };

	// useEffect(() => {
	// 	setHasGroup(hasGroupInternal === "hasGroup");
	// }, [hasGroupInternal]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [text]);

	return (
		<div className=" flex flex-col gap-6">
			<p className="font-nunito text-sm text-pink-300 text-opacity-90 inline-flex gap-2 items-center">
				<InformationCircleIcon className="w-4 h-4" />
				To find the best group to fit your needs, please fill out the following
				form and we will contact you as soon as possible.
			</p>
			<form onSubmit={(e) => addBooking(e)} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Name"
					className="group"
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Phone"
					className="group"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<textarea
					ref={textareaRef}
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="group"
					maxLength={200}
					placeholder="Leave a message(optional). Max 200 characters"
				/>
				{/* <input
					type="textarea"
					placeholder="fill some info"
					required
					className="group"
					onChange={(e) => setPhone(e.target.value)}
				/> */}
				<button
					type="submit"
					className="bg-opacity-70 cursor-pointer w-full bg-green-300  text-black rounded-sm p-2 font-poppins">
					Send
				</button>
			</form>
		</div>
		// <div className="w-full flex flex-col justify-between gap-6" id="group-form">
		// 	<div className="flex flex-row justify-between">
		// 		<p>Do you want to join a group?</p>
		// 		<div className="flex flex-row gap-6">
		// 			<label
		// 				className="flex flex-row gap-1 items-center cursor-pointer"
		// 				htmlFor={"joinGroup"}>
		// 				<input
		// 					type="radio"
		// 					className="hidden peer"
		// 					name={"joinGroup"}
		// 					value={"joinGroup"}
		// 					id={"joinGroup"}
		// 					checked={hasGroupInternal === "joinGroup"}
		// 					onChange={(e) => handleHasGroup(e)}
		// 				/>
		// 				<span className="w-4 h-4 border border-pink-300 rounded-full peer-checked:border-pink-300 peer-checked:border-4 peer-checked:bg-transparent"></span>
		// 				<span className="text-sm font-extrabold cursor-pointer">Yes</span>
		// 			</label>
		// 			<label
		// 				className="flex flex-row gap-1 items-center cursor-pointer"
		// 				htmlFor={"hasGroup"}>
		// 				<input
		// 					type="radio"
		// 					className="hidden peer"
		// 					name={"hasGroup"}
		// 					value={"hasGroup"}
		// 					id={"hasGroup"}
		// 					checked={hasGroupInternal === "hasGroup"}
		// 					onChange={(e) => handleHasGroup(e)}
		// 				/>
		// 				<span className="w-4 h-4 border border-pink-300 rounded-full peer-checked:border-pink-300 peer-checked:border-4 peer-checked:bg-transparent"></span>

		// 				<span className="text-sm font-extrabold cursor-pointer">
		// 					No, I have my group ready
		// 				</span>
		// 			</label>
		// 		</div>
		// 	</div>

		// 	{hasGroupInternal === "hasGroup" && (
		// 		<div className="flex flex-row justify-between">
		// 			<p>How many people are in your group?</p>
		// 			<input
		// 				type="number"
		// 				min={2}
		// 				max={5}
		// 				value={groupSize}
		// 				onChange={(e) => handleGroupSize(e)}
		// 				className="w-24 px-2 border rounded-sm"
		// 			/>
		// 		</div>
		// 	)}
		// </div>
	);
};

export default GroupForm;
