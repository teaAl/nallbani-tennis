"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    let baseClass = `flex justify-center items-center aspect-square p-4`;

    // if (view === "month") {
    // 	if (dateBooked instanceof Date && date.toDateString() === dateBooked.toDateString()) {
    // 		return `${baseClass} react-calendar__tile--active`;
    // 	}
    // }

    return baseClass;
  };

  return (
    <>
      <div
        id="calendar"
        className="bg-pear/10 bg-[#171717ba] backdrop-blur-xs py-4 px-4 shadow-lg rounded-lg font-poppins flex-wrap items-center justify-center"
      >
        <Calendar
          className="aspect-auto w-full h-full"
          value={value}
          onChange={onChange}
          // onClickDay={(value) => (setDateBooked(value), setHourBooked(null))}
          minDetail="month"
          maxDetail="month"
          maxDate={new Date(2025, 12, 31)}
          minDate={new Date()}
          tileClassName={tileClassName}
          nextLabel={
            <ChevronRightIcon className="h-6 w-6 sm:h-8 sm:w-8 text-pear bg-white/10 p-1 rounded-full aspect-square" />
          }
          prevLabel={
            <ChevronLeftIcon className="h-6 w-6 sm:h-8 sm:w-8 text-pear bg-white/10 p-1 rounded-full aspect-square" />
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
