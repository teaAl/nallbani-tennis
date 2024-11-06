"use client";

import { useGlobalState } from "@/context/globalStateContext";
import React from "react";
import HourPicker from "./hourPicker";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const HourPickerList = () => {
	const {
		firstDate,
		secondDate,
		setFirstDate,
		setSecondDate,
		setFirstHour,
		setSecondHour,
	} = useGlobalState();

	return (
		<>
			<div className="flex flex-col gap-5">
				{firstDate !== null && (
					<HourPicker
						date={firstDate}
						removeSelectedDate={() => {
							setFirstDate(null);
							setFirstHour(null);
						}}
					/>
				)}
				{secondDate !== null && (
					<HourPicker
						date={secondDate}
						removeSelectedDate={() => {
							setSecondDate(null);
							setFirstHour(null);
						}}
					/>
				)}
				{firstDate == null && secondDate == null && (
					<div className="flex flex-col justify-between p-2 gap-4">
						<p className="hidden md:flex font-nunito text-lg  border-b-2 border-pink-300 border-opacity-10 pb-4">
							You haven't booked any days for your sessions yet
						</p>
						<p className="font-nunito text-sm text-pink-300 text-opacity-90 inline-flex gap-2 items-center">
							<InformationCircleIcon className="w-4 h-4" />
							To get most out of your session, please select at least two dates
							available on the calendar
							{/* Please select at least two dates on the calendar */}
						</p>
					</div>
				)}
			</div>
		</>
	);
};

export default HourPickerList;
