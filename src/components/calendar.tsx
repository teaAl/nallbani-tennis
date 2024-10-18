"use client";

import { use, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useGlobalState } from "@/context/GlobalStateContext";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarView = () => {
	const {
		setIsFirstDateSelected,
		setIsSecondDateSelected,
		firstDate,
		setFirstDate,
		secondDate,
		setSecondDate,
	} = useGlobalState();

	const [value, onChange] = useState<Value>(new Date());

	const handleDateClick = (date: Date) => {
		// If firstDate is null, set it; otherwise, set secondDate
		if (!firstDate) {
			setFirstDate(date);
		} else if (!secondDate && date.getTime() !== firstDate.getTime()) {
			setSecondDate(date);
		} else {
			// If both firstDate and secondDate are set and new date is selected, reset both
			setFirstDate(date);
			setSecondDate(null);
		}
	};

	useEffect(() => {
		setIsFirstDateSelected(firstDate !== null);
	}, [firstDate, setIsFirstDateSelected]);

	useEffect(() => {
		setIsSecondDateSelected(secondDate !== null);
	}, [secondDate, setIsSecondDateSelected]);

	const tileClassName = ({ date, view }: { date: Date; view: string }) => {
		let baseClass = `flex justify-center items-center aspect-square p-4`;

		if (view === "month") {
			if (
				(firstDate && date.toDateString() === firstDate.toDateString()) ||
				(secondDate && date.toDateString() === secondDate.toDateString())
			) {
				return `${baseClass} react-calendar__tile--active`;
			}
		}

		return baseClass;
	};

	return (
		<div
			id="calendar"
			className="bg-white bg-opacity-5 shadow-lg rounded-lg font-poppins flex-wrap">
			<Calendar
				className="aspect-auto"
				value={value}
				onChange={onChange}
				onClickDay={handleDateClick}
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
	);
};

export default CalendarView;
