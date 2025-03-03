import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/globalStateContext";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
	ChevronDoubleDownIcon,
	InformationCircleIcon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/16/solid";
import { UserIcon } from "@heroicons/react/20/solid";

const validationSchema = z.object({
	name: z.string().min(2, { message: "Must be at least 2 characters long" }),
	email: z.string().email({ message: "Must be a valid email address" }),
	phone: z.string().regex(/^06[6789]\d{7}$/),
});

const ContactForm = () => {
	const router = useRouter();
	const { lessonType, dateBooked, hourBooked, hasEquipment, setContactInfo, contactInfo, nextStep } =
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

	const addContactInfo = (event: React.FormEvent) => {
		// Add booking to database
		event.preventDefault();
		const formData = {
			bookingType: lessonType,
			bookedDate: dateBooked,
			bookedHour: hourBooked,
			hasEquipment: hasEquipment,
			contactInfo: {
				name: name,
				email: email,
				phone: phone,
			},
		};

		console.log(formData);
		setContactInfo({
			name: name,
			email: email,
			phone: phone,
		});
		console.log("Contact info: ", contactInfo);
		nextStep();
	};

	return (
		<div className="h-full flex flex-col justify-around gap-6">
			<form
				className="flex flex-col gap-6 justify-between">
				<div className="px-6 py-10 rounded-md flex flex-col gap-6">
					<div className="relative flex items-center group">
						<UserIcon className="absolute left-3 w-5 h-5 text-green-300 " />
						<input
							type="text"
							placeholder="Name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="relative flex items-center group">
						<EnvelopeIcon className="absolute left-3 w-5 h-5 text-green-300 " />
						<input
							type="email"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="relative flex items-center group">
						<PhoneIcon className="absolute left-3 w-5 h-5 text-green-300 " />
						<input
							type="tel"
							placeholder="Phone"
							required
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<p className="font-nunito text-sm text-pink-300 text-opacity-90 inline-flex gap-2 items-center border-t-2 border-pink-300 border-opacity-10 py-4">
						<InformationCircleIcon className="w-4 h-4" />
						We request these details to contact you in case of any changes
					</p>
				</div>
				<div
					className={`${!isFormValid ? "opacity-0 -z-50" : "opacity-100 z-50"
						} flex flex-row justify-around align-middle items-center duration-300 transition-all`}>
					<div className={`cursor-pointer`}>
						<button
							className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
							onClick={addContactInfo}>
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
