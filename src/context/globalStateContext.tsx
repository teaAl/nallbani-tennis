"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalStateContextProps {
	isFirstDateSelected: boolean;
	setIsFirstDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
	isSecondDateSelected: boolean;
	setIsSecondDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
	firstDate: Date | null;
	setFirstDate: React.Dispatch<React.SetStateAction<Date | null>>;
	secondDate: Date | null;
	setSecondDate: React.Dispatch<React.SetStateAction<Date | null>>;
	firstHour: Hours | null;
	setFirstHour: React.Dispatch<React.SetStateAction<Hours | null>>;
	secondHour: Hours | null;
	setSecondHour: React.Dispatch<React.SetStateAction<Hours | null>>;
	bookingType: BookingType;
	setBookingType: React.Dispatch<React.SetStateAction<BookingType>>;
	partialBooking: {
		bookingType: BookingType;
		firstDate: Date | null;
		secondDate: Date | null;
		firstHour: Hours | null;
		secondHour: Hours | null;
		bookingStatus: Status;
	} | null;
	setPartialBooking: React.Dispatch<
		React.SetStateAction<{
			bookingType: BookingType;
			firstDate: Date | null;
			secondDate: Date | null;
			firstHour: Hours | null;
			secondHour: Hours | null;
			bookingStatus: Status;
		} | null>
	>;
	// partialBooking: Partial<Booking> | null;
	// setPartialBooking: React.Dispatch<
	// 	React.SetStateAction<Partial<Booking> | null>
	// >;
	bookingStatus: Status;
	setBookingStatus: React.Dispatch<React.SetStateAction<Status>>;
	contactInfo: { name: string; email: string; phone: string } | null;
	setContactInfo: React.Dispatch<
		React.SetStateAction<{ name: string; email: string; phone: string } | null>
	>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
	undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
	const [isFirstDateSelected, setIsFirstDateSelected] =
		useState<boolean>(false);
	const [isSecondDateSelected, setIsSecondDateSelected] =
		useState<boolean>(false);
	const [firstDate, setFirstDate] = useState<Date | null>(null);
	const [secondDate, setSecondDate] = useState<Date | null>(null);
	const [firstHour, setFirstHour] = useState<Hours | null>(null);
	const [secondHour, setSecondHour] = useState<Hours | null>(null);
	const [bookingType, setBookingType] = useState<BookingType>(null);
	// const [partialBooking, setPartialBooking] = useState<Partial<Booking> | null>(
	// 	null
	// );
	const [partialBooking, setPartialBooking] = useState<{
		bookingType: BookingType;
		firstDate: Date | null;
		secondDate: Date | null;
		firstHour: Hours | null;
		secondHour: Hours | null;
		bookingStatus: Status;
	} | null>(null);
	const [bookingStatus, setBookingStatus] = useState<Status>("pending");
	const [contactInfo, setContactInfo] = useState<{
		name: string;
		email: string;
		phone: string;
	} | null>(null);

	return (
		<GlobalStateContext.Provider
			value={{
				bookingStatus,
				setBookingStatus,
				partialBooking,
				setPartialBooking,
				isFirstDateSelected,
				setIsFirstDateSelected,
				isSecondDateSelected,
				setIsSecondDateSelected,
				firstDate,
				setFirstDate,
				secondDate,
				setSecondDate,
				firstHour,
				setFirstHour,
				secondHour,
				setSecondHour,
				bookingType,
				setBookingType,
				contactInfo,
				setContactInfo,
			}}>
			{children}
		</GlobalStateContext.Provider>
	);
};

export const useGlobalState = () => {
	const context = useContext(GlobalStateContext);
	if (context === undefined) {
		throw new Error("useGlobalState must be used within a GlobalStateProvider");
	}
	return context;
};
