import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { hours } from "@/constants/hours";
import { useGlobalState } from "@/context/globalStateContext";

interface HourPickerProps {
	date: Date;
}

const HourPicker = ({ date }: HourPickerProps) => {
	const { setHourBooked, hourBooked, setDateBooked } = useGlobalState();

	// const setSelectedHours = (date: Date, hour: Hours) => {
	// 	if (firstDate && firstDate === date) {
	// 		setFirstHour(hour);
	// 	} else if (secondDate && secondDate === date) {
	// 		setSecondHour(hour);
	// 	}
	// };

	const setActiveHour = (hour: Hours) => {
		// if (firstDate && firstDate === date && firstHour === hour) {
		// 	return "bg-pink-300 text-black";
		// } else if (secondDate && secondDate === date && secondHour === hour) {
		// 	return "bg-pink-300 text-black";
		// } else {
		// 	return "bg-white bg-opacity-5";
		// }
		if (hourBooked === hour) {
			return "bg-pink-300 text-black";
		} else {
			return "bg-white bg-opacity-5";
		}
	};

	return (
		<div className="bg-white bg-opacity-5 rounded-sm p-4 gap-4 flex flex-col">
			<div className="flex flex-row justify-between p-2 gap-4 border-b-2 border-pink-300 border-opacity-10">
				<p className="font-nunito text-lg">
					Select available hours for{" "}
					<span className="font-nunito font-bold text-pink-300">
						{date.toDateString()}
					</span>
				</p>
				<XMarkIcon
					className="w-7 h-7 cursor-pointer text-pink-300 hover:scale-110 transition-all bg-white bg-opacity-15 rounded-full p-1"
					onClick={() => {
						setHourBooked(null);
						setDateBooked(null);
					}}
				/>
			</div>
			<div className="bg-opacity-5 rounded-sm">
				<div className="flex flex-row flex-wrap gap-5 items-center justify-center">
					{hours.map((hour) => (
						<button
							key={hour}
							className={` ${setActiveHour(hour)}
								font-nunito text-lg  rounded-sm p-2 transform-all duration-150 hover:scale-110 shadow-sm`}
							onClick={() => setHourBooked(hour)}>
							{hour}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default HourPicker;
