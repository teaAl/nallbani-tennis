"use client";

import Layout from "@/layouts/homeLayout";
import { useGlobalState } from "@/context/globalStateContext";
import prisma from "@/lib/prisma";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Stepper from "@/components/stepper/verticalStepper";
import { stepsData } from "@/constants/bookSteps";
import DateTime from "@/components/booking/dateTime";
import ContactForm from "@/components/booking/contactForm";
import BookingConfirmation from "@/components/booking/confirmation";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import withBookingType from "@/components/hoc/withBookingType";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;
console.log(url);

const stepComponents = {
	"Date and Time": () => (
		<DateTime />
	),
	"Contact Information": () => (
		<div className="grid grid-cols-6 w-full">
			<div className="col-span-4 col-start-2">
				<ContactForm />
			</div>
		</div>
	),
	Confirmation: () => (
		<div className="grid grid-cols-6 w-full">
			<div className="col-span-4 col-start-2">
				<BookingConfirmation />
			</div>
		</div>
	),
};

const Book = () => {
	const { steps, setSteps, currentStepIndex, prevStep, saveStateToLocalStorage, loadStateFromLocalStorage, hourBooked, dateBooked } = useGlobalState();
	const pathName = usePathname();
	const prevValues = useRef({ steps, currentStepIndex, dateBooked, hourBooked });

	useEffect(() => {
		if (steps.length === 0) {
			setSteps(stepsData);
		}
	}, []);

	useEffect(() => {
		// Compare with previous values to avoid unnecessary saves
		const prev = prevValues.current;
		const hasChanged =
			steps.length !== prev.steps.length ||
			currentStepIndex !== prev.currentStepIndex ||
			dateBooked !== prev.dateBooked ||
			hourBooked !== prev.hourBooked;

		if (hasChanged && steps.length > 0) {
			saveStateToLocalStorage(pathName);

			// Update the ref with current values
			prevValues.current = { steps, currentStepIndex, dateBooked, hourBooked };
		}
	}, [steps, currentStepIndex, dateBooked, hourBooked, saveStateToLocalStorage, pathName]);

	const activeStep = steps.find((step) => step.active);
	const ActiveStepContent = activeStep
		? stepComponents[activeStep.title as keyof typeof stepComponents]
		: null;

	return (
		<Layout>
			<div className="h-full grid grid-cols-5 mt-[2em] p-4 gap-4">
				<div className="col-start-1 col-span-1 border-opacity-50 flex justify-center">
					<div className="grid grid-rows-6 gap-0 h-full">
						<div className="row-start-1 row-span-1 w-full flex justify-end items-center">
							<button
								onClick={prevStep}
								disabled={currentStepIndex === 0}
								className={` text-green-300 p-2 border border-green-300 bg-white bg-opacity-5 rounded-full disabled:opacity-30`}
							>
								<ArrowUturnLeftIcon className="w-5 h-5" />
							</button>
						</div>
						<div className="row-start-2 row-span-5">
							<Stepper />
						</div>
					</div>
				</div>
				<div className="col-span-4 flex w-full items-center justify-around">
					{ActiveStepContent && <ActiveStepContent />}
				</div>
			</div>
		</Layout>
	);
}

export default withBookingType(Book);