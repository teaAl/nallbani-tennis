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
		<>
			<div className="flex max-w-md flex-col h-screen justify-around">
				{stepsData?.map((step, index) => (
					<Step
						key={index}
						step={step}
						isLast={index === stepsData.length - 1}
					/>
				))}
			</div>
		</>
	);
};

export default Stepper;
