"use client";

import HomeBanner from "@/components/homeBanner";
import Layout from "@/layouts/homeLayout";
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
import NewCalendar from "@/components/newCalendar";
import ContactForm from "@/components/bookingContactForm";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;
console.log(url);

const stepsData: StepType[] = [
	{
		title: "Date and Time",
		completed: false,
		active: true,
	},
	{
		title: "Contact Information",
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
	"Date and Time": () => (
		// <div className="grid grid-cols-10 w-full">
		// 	<div className="col-span-8 col-start-2">
		<div>
			<DateTime />
		</div>
		// 	</div>
		// </div>
	),
	// "Date and Time": () => <NewCalendar />,
	"Contact Information": () => (
		<div className="grid grid-cols-6 w-full">
			<div className="col-span-4 col-start-2">
				<ContactForm />
			</div>
		</div>
	),
	Confirmation: () => <div>Confirmation</div>,
};

const getStepComponent = (step: StepType) => {
	const stepComponents = {
		"Date and Time": () =>
			step.active ? <DateTime /> : step.completed ? <CompletedStep /> : null,
		"Contact Information": () =>
			step.active ? <ContactForm /> : step.completed ? <CompletedStep /> : null,
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

	const activeStep = steps.find((step) => step.active);
	const ActiveStepContent = activeStep
		? stepComponents[activeStep.title as keyof typeof stepComponents]
		: null;

	return (
		<Layout>
			<div className="h-full grid grid-cols-5 mt-[2em] p-4 gap-4">
				<div className="col-start-1 col-span-1 border-opacity-50 flex justify-center">
					<div className="grid grid-rows-6 gap-0 h-full">
						<div className="row-start-2 row-span-5">
							<Stepper stepsData={steps} />
						</div>
					</div>
				</div>
				<div className="h-full flex flex-col col-span-4 flex-wrap max-w-full items-center justify-center">
					{/* THIS IS FOR THE COMPLETED STEP COMPONENT */}
					{/* {steps.map((step, index) => (
						<div
							key={index}
							className={`transition-all duration-300 ${
								step.active ? "" : ""
							}`}>
							{getStepComponent(step)}
						</div>
					))} */}
					{/* {activeStep && <div>{activeStep.title}</div>} */}
					{ActiveStepContent && <ActiveStepContent />}
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
			</div>
		</Layout>
	);
}
