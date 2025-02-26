import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/globalStateContext";
import Step from "./step";

interface StepperProps {
	stepsData: StepType[];
}

const Stepper = () => {
	const { steps, currentStepIndex, nextStep, prevStep } = useGlobalState();

	return (
		<>
			<div className="max-w-md flex flex-col h-full justify-around items-end">

				{steps?.map((step, index) => (
					<Step key={index} step={step} isLast={index === steps.length - 1} />
				))}
			</div>
		</>
	);
};

export default Stepper;
