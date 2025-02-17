"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useGlobalState } from "@/context/globalStateContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewCalendar = () => {
	const { dateBooked, setDateBooked, hourBooked, setHourBooked } =
		useGlobalState();
	const [value, onChange] = useState<Value>(new Date());

	const tileClassName = ({ date, view }: { date: Date; view: string }) => {
		let baseClass = `flex justify-center items-center aspect-square p-4`;

		if (view === "month") {
			if (dateBooked && date.toDateString() === dateBooked.toDateString()) {
				return `${baseClass} react-calendar__tile--active`;
			}
		}

		return baseClass;
	};

	return (
		<>
			<div
				id="calendar"
				className="bg-white bg-opacity-5 shadow-lg rounded-lg font-poppins flex-wrap">
				<Calendar
					className="aspect-auto"
					value={value}
					onChange={onChange}
					onClickDay={(value) => (setDateBooked(value), setHourBooked(null))}
					minDetail="month"
					maxDetail="month"
					maxDate={new Date(2025, 12, 31)}
					minDate={new Date()}
					tileClassName={tileClassName}
					nextLabel={
						<ChevronRightIcon className="h-8 w-8 text-pink-300 bg-white bg-opacity-10 p-1 rounded-full aspect-square" />
					}
					prevLabel={
						<ChevronLeftIcon className="h-8 w-8 text-pink-300 bg-white bg-opacity-10 p-1 rounded-full aspect-square" />
					}
					tileDisabled={({ date }) => {
						const today = new Date();
						today.setHours(0, 0, 0, 0);
						return date.getTime() < today.getTime();
					}}
				/>
			</div>
		</>
	);
};

export default NewCalendar;
