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
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

const url = process.env.NEXT_PUBLIC_BASE_API_URL;
console.log(url);

const stepComponents = {
	"Date and Time": () => (
		<DateTime />
	),
	"Contact Information": () => (
		<div className="md:grid md:grid-cols-6 w-full h-full">
			<div className="md:col-span-4 md:col-start-2">
				<ContactForm />
			</div>
		</div>
	),
	Confirmation: () => (
		<div className="md:grid md:grid-cols-6 w-full">
			<div className="md:col-span-4 md:col-start-2">
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
			<div className="h-full flex flex-col md:grid md:grid-cols-5 mt-0 md:mt-[2em] p-4 gap-6">
				<div className="md:col-start-1 md:col-span-1 border-opacity-50 flex md:justify-center justify-evenly w-full">
					<div className="flex md:grid md:grid-rows-6 gap-0 h-full w-full">
						<div className="md:row-start-1 md:row-span-1 md:w-full w-auto flex justify-start md:justify-end items-center">
							<button
								onClick={prevStep}
								disabled={currentStepIndex === 0}
								className={`h-10 md:mr-0 mr-1 md:h-auto md:text-green-300 text-black p-2 md:border border-0 md:border-green-300 md:bg-white bg-pink-300 md:bg-opacity-5 bg-opacity-100 rounded-l-full md:rounded-full md:disabled:opacity-30 `}
							>
								<ArrowUturnLeftIcon className="md:block hidden md:w-5 md:h-5 w-5 h-5" />
								<ChevronDoubleLeftIcon className="md:hidden block w-5 h-5" />
							</button>
						</div>
						<div className="md:row-start-2 md:row-span-5 w-full">
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