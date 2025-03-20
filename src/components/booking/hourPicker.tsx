import React, { useEffect, useState } from "react";
import { XMarkIcon, ArrowUturnLeftIcon, HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/20/solid";
import { hours } from "@/constants/hours";
import { useGlobalState } from "@/context/globalStateContext";

interface HourPickerProps {
	date: Date;
}

const HourPicker = ({ date }: HourPickerProps) => {
	const { setHourBooked, hourBooked, setDateBooked, setHasEquipment, hasEquipment } = useGlobalState();
	const setActiveHour = (hour: Hours) => {
		if (hourBooked === hour) {
			return "bg-pear text-black";
		} else {
			return "bg-white/5";
		}
	};

	return (
		<div className="bg-transparent rounded-xs gap-6 flex flex-col w-full justify-between min-h-full h-80 px-2">
			<div className="flex flex-row justify-between gap-4 border-b-2 border-pear/10 py-3">
				<p className="font-nunito md:text-lg text-base md:text-center text-left text-foreground">
					Select available hours for{" "}
					<span className="font-nunito font-bold text-pear">
						{date instanceof Date ? date.toDateString() : ''}
					</span>
				</p>
				<ArrowUturnLeftIcon
					className="w-6 h-6 cursor-pointer text-pear hover:scale-110 transition-all bg-white/15 rounded-full p-1"
					onClick={() => {
						setHourBooked(null);
						setDateBooked(null);
						setHasEquipment(null);
					}}
				/>
			</div>
			<div className="flex flex-col gap-4 w-full h-full items-center justify-center">
				<div className="flex flex-row flex-wrap gap-5 items-baseline justify-center">
					{hours.map((hour) => (
						<button
							key={hour}
							className={` ${setActiveHour(hour)}
								font-nunito md:text-lg text-sm rounded-sm p-2 transform-all duration-150 hover:scale-110 shadow-sm`}
							onClick={() => setHourBooked(hour)}>
							{hour}
						</button>
					))}
				</div>
			</div>
			{/* Equipment */}
			<div className="flex flex-row justify-between items-center border-t border-t-pear/10 w-full pt-6 px-2">
				<p className="text-pear font-poppins md:text-center text-left">Do you have your own tennis racket?</p>
				<div className="flex flex-row">
					<HandThumbDownIcon onClick={() => setHasEquipment(false)} className={`w-10 h-8 text-foreground px-2 cursor-pointer hover:scale-105 hover:bg-red-700/100 transition-all duration-300 ${hasEquipment === false ? 'bg-red-700/100' : 'bg-white/10'}`} />
					<HandThumbUpIcon onClick={() => setHasEquipment(true)} className={`w-10 h-8 text-foreground  px-2 cursor-pointer hover:scale-105 hover:bg-green-700 transition-all duration-300 ${hasEquipment === true ? 'bg-green-700/100' : 'bg-white/10'}`} />
				</div>
			</div>
		</div>
	);
};

export default HourPicker;
