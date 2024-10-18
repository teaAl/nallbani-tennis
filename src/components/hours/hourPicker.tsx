import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { hours } from "@/constants/hours";

interface HourPickerProps {
	date: Date;
	removeSelectedDate: () => void;
}

const HourPicker = ({ date, removeSelectedDate }: HourPickerProps) => {
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
					onClick={removeSelectedDate}
				/>
			</div>
			<div className="bg-opacity-5 rounded-sm">
				<div className="flex flex-row flex-wrap gap-2">
					{hours.map((hour) => (
						<button className="font-nunito text-lg bg-white bg-opacity-5 rounded-sm p-2">
							{hour}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default HourPicker;
