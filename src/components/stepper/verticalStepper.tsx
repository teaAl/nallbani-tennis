import { useEffect, useState } from "react";
import Step from "./step";

export interface StepType {
	title: string;
	completed: boolean;
	active: boolean;
}

interface StepperProps {
	stepsData: StepType[];
}

const Stepper = ({ stepsData }: StepperProps) => {
	return (
		<div className="max-w-md flex flex-col h-full justify-around items-end">
			{stepsData?.map((step, index) => (
				<Step key={index} step={step} isLast={index === stepsData.length - 1} />
			))}
		</div>
	);
};

export default Stepper;
