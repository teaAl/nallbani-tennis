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
		<div id="calendar" className="p-9">
			<Calendar
				// onChange={handleDateChange}
				value={selectedDate}
				tileDisabled={tileDisabled}
				className="w-full mx-auto border rounded-lg shadow-lg p-4 text-center flex flex-col gap-8"
			/>
			{selectedDate && (
				<div className="mt-4">
					<h2 className="text-xl font-semibold">
						Available Hours on {selectedDate.toLocaleDateString()}
					</h2>
					<div className="flex flex-wrap gap-2 mt-2">
						{availableHours.map((hour) => (
							<button
								key={hour}
								className={`px-4 py-2 rounded-md ${
									bookedHours.includes(hour)
										? "bg-gray-400 cursor-not-allowed"
										: "bg-blue-500 text-white"
								}`}
								onClick={() => handleHourSelection(hour)}
								disabled={bookedHours.includes(hour)}>
								{hour}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CalendarView;
