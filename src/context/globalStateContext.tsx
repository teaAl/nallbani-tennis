"use client";
import { StepType } from "@/components/stepper/step";
import { stepsData } from "@/constants/bookSteps";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface GlobalStateContextProps {
	lessonType: "individual" | "group" | null;
	setLessonType: React.Dispatch<
		React.SetStateAction<"individual" | "group" | null>
	>;
	dateBooked: Date | null;
	setDateBooked: React.Dispatch<React.SetStateAction<Date | null>>;
	hourBooked: Hours | null;
	setHourBooked: React.Dispatch<React.SetStateAction<Hours | null>>;
	contactInfo: { name: string; email: string; phone: string } | null;
	setContactInfo: React.Dispatch<
		React.SetStateAction<{ name: string; email: string; phone: string } | null>
	>;
	hasEquipment: boolean | null;
	setHasEquipment: React.Dispatch<React.SetStateAction<boolean | null>>;
	steps: StepType[];
	setSteps: React.Dispatch<React.SetStateAction<StepType[]>>;
	currentStepIndex: number;
	nextStep: () => void;
	prevStep: () => void;
	goToStep: (index: number) => void;
	saveStateToLocalStorage: (path: string) => void;
	loadStateFromLocalStorage: (path: string) => void;
	clearBookingState: () => void;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(
	undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
	const [lessonType, setLessonType] = useState<"individual" | "group" | null>(
		null
	);
	const [dateBooked, setDateBooked] = useState<Date | null>(null);
	const [hourBooked, setHourBooked] = useState<Hours | null>(null);
	const [hasEquipment, setHasEquipment] = useState<boolean | null>(null);
	const [contactInfo, setContactInfo] = useState<{
		name: string;
		email: string;
		phone: string;
	} | null>(null);
	const [steps, setSteps] = useState<StepType[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	const updateSteps = (index: number) => {
		setSteps((prevSteps) =>
			prevSteps.map((step, i) => ({
				...step,
				active: i === index,
				completed: i < index,
			}))
		);
	};

	const nextStep = () => {
		setCurrentStepIndex((prevIndex) => {
			const newIndex = Math.min(prevIndex + 1, steps.length - 1);
			updateSteps(newIndex);
			return newIndex;
		});
	};

	const prevStep = () => {
		setCurrentStepIndex((prevIndex) => {
			const newIndex = Math.max(prevIndex - 1, 0);
			updateSteps(newIndex);
			return newIndex;
		});
	};

	const goToStep = (index: number) => {
		setCurrentStepIndex(index);
		updateSteps(index);
	};

	const saveStateToLocalStorage = (path: string) => {
		// Only save state if we're on the booking page
		if (path === "/book") {
			const state = {
				lessonType,
				// Convert Date object to ISO string for proper serialization
				dateBooked: dateBooked instanceof Date ? dateBooked.toISOString() : null,
				hourBooked,
				contactInfo,
				hasEquipment,
				steps,
				currentStepIndex,
			};
			localStorage.setItem("bookingState", JSON.stringify(state));
		}
	}

	// In GlobalStateContext
	const loadStateFromLocalStorage = (path: string) => {
		// Skip if not on booking page
		if (path !== "/book") return;

		try {
			const savedState = localStorage.getItem("bookingState");
			if (!savedState) return;

			// Parse stored state
			const state = JSON.parse(savedState);

			// Create a batch update to avoid multiple renders
			const updates = () => {
				if (state.lessonType) setLessonType(state.lessonType);
				if (state.dateBooked) setDateBooked(new Date(state.dateBooked));
				if (state.hourBooked) setHourBooked(state.hourBooked);
				if (state.contactInfo) setContactInfo(state.contactInfo);
				if (state.hasEquipment !== undefined) setHasEquipment(state.hasEquipment);
				if (state.steps && state.steps.length > 0) setSteps(state.steps);
				if (state.currentStepIndex !== undefined) setCurrentStepIndex(state.currentStepIndex);
			};

			// Execute all state updates at once
			updates();
		} catch (error) {
			console.error("Error loading booking state:", error);
		}
	};

	const clearBookingState = () => {
		localStorage.removeItem("bookingState");
	};

	return (
		<GlobalStateContext.Provider
			value={{
				lessonType,
				setLessonType,
				dateBooked,
				setDateBooked,
				hourBooked,
				setHourBooked,
				hasEquipment,
				setHasEquipment,
				contactInfo,
				setContactInfo,
				steps,
				setSteps,
				currentStepIndex,
				nextStep,
				prevStep,
				goToStep,
				saveStateToLocalStorage,
				loadStateFromLocalStorage,
				clearBookingState,
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

/*
To keep: 
1. lessonType, setLessonType -> individual, group
2. dateBooked, setDateBooked -> Date | null
3. hourBooked, setHourBooked -> Hours | null
4. contactInfo, setContactInfo -> { name: string; email: string; phone: string } | null
5. hasEquipment, setHasEquipment -> boolean
6. steps, setSteps -> StepType[]
7. currentStepIndex, nextStep, prevStep, goToStep
*/