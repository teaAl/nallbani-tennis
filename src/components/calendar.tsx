"use client";

import { useState } from "react";
import Calendar from "react-calendar";

const CalendarView = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [availableHours, setAvailableHours] = useState<string[]>([]);
	const [bookedHours, setBookedHours] = useState<string[]>([]);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		setAvailableHours(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]);
	};

	const handleHourSelection = (hour: string) => {
		if (!bookedHours.includes(hour)) {
			// Proceed with booking logic
			alert(
				`Booking session at ${hour} on ${selectedDate?.toLocaleDateString()}`
			);
		}
	};

	const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
		if (view === "month") {
			return date.getDay() === 0;
		}
		return false;
	};

	return (
		<div className="w-full h-40" id="calendar">
			<Calendar
				// onChange={(date: Date | Date[]) => handleDateChange(date as Date)}
				value={selectedDate}
				tileDisabled={tileDisabled}
				className=""
			/>
		</div>
	);
};

export default CalendarView;
