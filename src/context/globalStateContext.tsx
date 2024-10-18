"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalStateContextProps {
	isGlobalBoolean: boolean;
	setIsGlobalBoolean: React.Dispatch<React.SetStateAction<boolean>>;
	isFirstDateSelected: boolean;
	setIsFirstDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
	isSecondDateSelected: boolean;
	setIsSecondDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
	firstDate: Date | null;
	setFirstDate: React.Dispatch<React.SetStateAction<Date | null>>;
	secondDate: Date | null;
	setSecondDate: React.Dispatch<React.SetStateAction<Date | null>>;
	bookingType: "exploring" | "serious" | null;
	setBookingType: React.Dispatch<
		React.SetStateAction<"exploring" | "serious" | null>
	>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
	undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
	const [isGlobalBoolean, setIsGlobalBoolean] = useState<boolean>(false);
	const [isFirstDateSelected, setIsFirstDateSelected] =
		useState<boolean>(false);
	const [isSecondDateSelected, setIsSecondDateSelected] =
		useState<boolean>(false);
	const [firstDate, setFirstDate] = useState<Date | null>(null);
	const [secondDate, setSecondDate] = useState<Date | null>(null);
	const [bookingType, setBookingType] = useState<
		"exploring" | "serious" | null
	>(null);

	return (
		<GlobalStateContext.Provider
			value={{
				isGlobalBoolean,
				setIsGlobalBoolean,
				isFirstDateSelected,
				setIsFirstDateSelected,
				isSecondDateSelected,
				setIsSecondDateSelected,
				firstDate,
				setFirstDate,
				secondDate,
				setSecondDate,
				bookingType,
				setBookingType,
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
