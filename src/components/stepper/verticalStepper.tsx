import React from "react";
import { useGlobalState } from "@/context/globalStateContext";
import Step from "./step";
import RoundedTriangleIcon from "@/public/icons/roundedTriangleIcon";


const Stepper = () => {
	const { steps, currentStepIndex, prevStep } = useGlobalState();
	const width = `${(100 / (steps.length)) * (currentStepIndex + 1) /** 1.1*/}%`
	return (
		<>
			<div className="max-w-full relative flex flex-row md:flex-col h-full justify-between md:justify-around md:items-end items-center">
				{steps?.map((step, index) => (
					<React.Fragment key={index}>
						<Step step={step} isLast={index === steps.length - 1} />
					</React.Fragment>
				))}
				<div className="absolute bottom-0 md:hidden max-w-screen-sm w-full bg-pink-300 bg-opacity-30 rounded-r-full md:rounded-full h-10">
					<div className="bg-pink-300 h-full /*rounded-r-full*/ transition-all duration-300" style={{ width: width }}>
						<div className="w-full justify-end flex items-center h-full translate-x-5 -translate-y-[2px]">
							<div className="text-right ">
								<RoundedTriangleIcon size="69" color="#86efac" />
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default Stepper;

//TODO: Change the name of the rounded triangle icon 