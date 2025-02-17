"use client";
import { StepType } from "@/components/stepper/step";
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
	bookingStatus: Status;
	setBookingStatus: React.Dispatch<React.SetStateAction<Status>>;
	contactInfo: { name: string; email: string; phone: string } | null;
	setContactInfo: React.Dispatch<
		React.SetStateAction<{ name: string; email: string; phone: string } | null>
	>;
	individual: boolean | null;
	setIndividual: React.Dispatch<React.SetStateAction<boolean | null>>;
	isGroup: boolean;
	setIsGroup: React.Dispatch<React.SetStateAction<boolean>>;
	hasGroup: boolean;
	setHasGroup: React.Dispatch<React.SetStateAction<boolean>>;
	groupSize: 0 | 2 | 3 | 4 | 5;
	setGroupSize: React.Dispatch<React.SetStateAction<0 | 2 | 3 | 4 | 5>>;
	needEquipment: boolean;
	setNeedEquipment: React.Dispatch<React.SetStateAction<boolean>>;
	showContinueButton: boolean;
	setShowContinueButton: React.Dispatch<React.SetStateAction<boolean>>;
	showCalendar: boolean;
	setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
	// updated booking flow
	steps: StepType[];
	setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
	handleNextStep: () => void;
	lessonType: "individual" | "group" | null;
	setLessonType: React.Dispatch<
		React.SetStateAction<"individual" | "group" | null>
	>;
	dateBooked: Date | null;
	setDateBooked: React.Dispatch<React.SetStateAction<Date | null>>;
	hourBooked: Hours | null;
	setHourBooked: React.Dispatch<React.SetStateAction<Hours | null>>;
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
	const [individual, setIndividual] = useState<boolean | null>(null);
	const [isGroup, setIsGroup] = useState<boolean>(false);
	const [hasGroup, setHasGroup] = useState<boolean>(false);
	const [groupSize, setGroupSize] = useState<0 | 2 | 3 | 4 | 5>(0);
	const [showCalendar, setShowCalendar] = useState<boolean>(false);
	const [needEquipment, setNeedEquipment] = useState<boolean>(false);
	const [showContinueButton, setShowContinueButton] = useState<boolean>(false);
	const [steps, setSteps] = useState<StepType[]>([]);
	const [lessonType, setLessonType] = useState<"individual" | "group" | null>(
		null
	);
	const [dateBooked, setDateBooked] = useState<Date | null>(null);
	const [hourBooked, setHourBooked] = useState<Hours | null>(null);

	const handleNextStep = () => {
		setSteps((prevSteps) => {
			const nextActiveIndex = prevSteps.findIndex((step) => step.active) + 1;

			return prevSteps.map((step, index) => {
				return {
					...step,
					active: index === nextActiveIndex,
					completed: index < nextActiveIndex,
				};
			});
		});
		console.log(steps);
	};

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
				individual,
				setIndividual,
				isGroup,
				setIsGroup,
				hasGroup,
				setHasGroup,
				groupSize,
				setGroupSize,
				showCalendar,
				setShowCalendar,
				needEquipment,
				setNeedEquipment,
				showContinueButton,
				setShowContinueButton,
				steps,
				setSteps,
				handleNextStep,
				lessonType,
				setLessonType,
				dateBooked,
				setDateBooked,
				hourBooked,
				setHourBooked,
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
