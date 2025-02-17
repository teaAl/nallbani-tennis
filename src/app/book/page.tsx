"use client";

import HomeBanner from "@/components/homeBanner";
import Layout from "@/components/homeLayout";
import CalendarView from "@/components/calendar";
import HourPickerList from "@/components/hours/hourPickerList";
import BookingType from "@/components/bookingType";
import { useGlobalState } from "@/context/globalStateContext";
import prisma from "@/lib/prisma";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GeneralBanner from "@/components/generalBanner";
import Stepper, { StepType } from "@/components/stepper/verticalStepper";
import IndividualOrGroup from "@/components/individualOrGroup";
import CompletedStep from "@/components/stepper/completedStep";
import DateTime from "@/components/dateTime";
import FlipLessonCard from "@/components/tezd";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;
console.log(url);

const stepsData: StepType[] = [
	{
		title: "Individual or Group",
		completed: false,
		active: true,
	},
	{
		title: "Equipment",
		completed: false,
		active: false,
	},
	{
		title: "Date and Time",
		completed: false,
		active: false,
	},
	{
		title: "Personal Info",
		completed: false,
		active: false,
	},
	{
		title: "Confirmation",
		completed: false,
		active: false,
	},
];

const stepComponents = {
	"Individual or Group": () => <IndividualOrGroup />,
	Equipment: () => <div>Equipment</div>,
	"Date and Time": () => <DateTime />,
	"Personal Info": () => <div>Personal Info</div>,
	Confirmation: () => <div>Confirmation</div>,
};

const getStepComponent = (step: StepType) => {
	const stepComponents = {
		"Individual or Group": () =>
			step.active ? (
				<IndividualOrGroup />
			) : step.completed ? (
				<CompletedStep />
			) : null,
		Equipment: () =>
			step.active ? (
				<div>Equipment</div>
			) : step.completed ? (
				<CompletedStep />
			) : null,
		"Date and Time": () =>
			step.active ? <DateTime /> : step.completed ? <CompletedStep /> : null,
		"Personal Info": () =>
			step.active ? (
				<div>Personal Info</div>
			) : step.completed ? (
				<CompletedStep />
			) : null,
		Confirmation: () =>
			step.active ? (
				<div>Confirmation</div>
			) : step.completed ? (
				<CompletedStep />
			) : null,
	};

	return stepComponents[step.title as keyof typeof stepComponents]();
};

export default function Book() {
	const router = useRouter();
	const { steps, setSteps, handleNextStep } = useGlobalState();
	// const [steps, setSteps] = useState(stepsData);

	useEffect(() => {
		if (steps.length === 0) {
			setSteps(stepsData);
		}
	}, [steps, setSteps]);

	// const handleNextStep = () => {
	// 	setSteps((prevSteps) => {
	// 		const nextActiveIndex = prevSteps.findIndex((step) => step.active) + 1;

	// 		return prevSteps.map((step, index) => {
	// 			return {
	// 				...step,
	// 				active: index === nextActiveIndex,
	// 				completed: index < nextActiveIndex,
	// 			};
	// 		});
	// 	});
	// 	// console.log(steps);
	// };

	const activeStep = steps.find((step) => step.active);
	const ActiveStepContent = activeStep
		? stepComponents[activeStep.title as keyof typeof stepComponents]
		: null;

	// const {
	// 	bookingType,
	// 	firstDate,
	// 	secondDate,
	// 	firstHour,
	// 	secondHour,
	// 	partialBooking,
	// 	setPartialBooking,
	// 	bookingStatus,
	// 	showCalendar,
	// } = useGlobalState();

	// const enableConfirmButton =
	// 	firstDate && secondDate && firstHour && secondHour ? true : false;

	// const confirmBooking = () => {
	// 	const data = {
	// 		bookingType,
	// 		firstDate,
	// 		secondDate,
	// 		firstHour,
	// 		secondHour,
	// 		bookingStatus,
	// 	};
	// 	console.log(data);
	// 	setPartialBooking(data);
	// 	router.push("/confirm-booking");
	// };

	return (
		<Layout>
			<div className="h-screen grid grid-cols-5 mt-[2em] p-4 gap-4">
				<div className="col-start-1 col-span-1 border-opacity-50">
					<Stepper stepsData={steps} />
				</div>
				<div className="h-full flex flex-col justify-around col-span-4">
					{/* THIS IS FOR THE COMPLETED STEP COMPONENT  
                    {steps.map((step, index) => (
						<div
							key={index}
							className={`transition-all duration-300 ${
								step.active ? "" : ""
							}`}>
							{getStepComponent(step)}
						</div>
					))} */}
					{/* {activeStep && <div>{activeStep.title}</div>} */}
					{/* {ActiveStepContent && <ActiveStepContent />} */}
					<IndividualOrGroup />
					{/* <FlipLessonCard /> */}
					{/* <button
						onClick={() => handleNextStep()}
						// disabled={steps[steps.length - 1].completed}
						disabled={steps.length === 0 || steps[steps.length - 1].completed}
						aria-label="Proceed to the Next Step"
						className="rounded-md bg-white px-10 py-2 text-xl text-black transition-all duration-300 hover:scale-105 disabled:opacity-0">
						{steps.length > 0 && steps[steps.length - 1].active
							? "Done"
							: "Next"}
					</button> */}
				</div>
				{/* <div className="h-1/2">
				<GeneralBanner title="Book your session" />
			</div>
			{bookingType && (
				<div className="flex flex-col gap-10 p-6 md:p-10">
					<IndividualOrGroup />
				</div>
			)}
			{showCalendar && (
				<div className="md:grid md:grid-cols-2 flex flex-col gap-10 p-6 md:p-10">
					<div className="col-start-1">
						<CalendarView />
					</div>
					<div className="col-start-2 flex flex-col gap-4">
						<HourPickerList />
						<button
							onClick={confirmBooking}
							className={`${
								enableConfirmButton ? "opacity-100" : "opacity-35"
							} font-nunito text-lg bg-pink-300 text-black rounded-sm p-2 mt-2 hover:scale-105 transform-all duration-150`}
							disabled={!enableConfirmButton}>
							Confirm
						</button>
					</div>
				</div>
			)} */}
			</div>
		</Layout>
	);
}
