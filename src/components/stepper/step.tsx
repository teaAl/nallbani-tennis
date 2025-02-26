import React from "react";
import TennisBallIcon from "@/public/icons/tennisBallIcon";

const CheckSVG = () => (
	<svg
		width="13"
		height="11"
		viewBox="0 0 13 11"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.0964 0.390037L3.93638 7.30004L2.03638 5.27004C1.68638 4.94004 1.13638 4.92004 0.736381 5.20004C0.346381 5.49004 0.236381 6.00004 0.476381 6.41004L2.72638 10.07C2.94638 10.41 3.32638 10.62 3.75638 10.62C4.16638 10.62 4.55638 10.41 4.77638 10.07C5.13638 9.60004 12.0064 1.41004 12.0064 1.41004C12.9064 0.490037 11.8164 -0.319963 11.0964 0.380037V0.390037Z"
			fill="#86efac"
		/>
	</svg>
);

export interface StepType {
	title: string;
	completed: boolean;
	active: boolean;
}

type StepProps = {
	step: StepType;
	isLast: boolean;
};

const Step: React.FC<StepProps> = React.memo(({ step, isLast }) => {
	const { title, active, completed } = step;

	return (
		<div
			className={`${active ? "gap-8" : "gap-3"
				} flex duration-300 transition-all h-full justify-end`}>
			<div>
				<h3
					className={`mt-1 text-sm font-medium ${active
							? "text-green-300 scale-125"
							: completed
								? "text-pink-300"
								: "text-pink-300 text-opacity-30"
						}`}>
					{title}
				</h3>
			</div>
			<div className="flex flex-col items-center">
				<div
					className={`bg-pink-300 ${active
							? " scale-125"
							: completed
								? "bg-opacity-100"
								: "bg-opacity-30"
						} rounded-full duration-300 transition-all`}>
					{completed ? (
						<div className="m-1 flex size-6 items-center p-1 justify-center rounded-full bg-black">
							{/* <TennisBallIcon size={"10"} /> */}
							<CheckSVG />
						</div>
					) : (
						<div
							className={`size-6 rounded-full border-8 border-black m-1 transition-all duration-300`}
						/>
					)}
				</div>
				{!isLast && (
					<div
						className={`border border-pink-300 ${completed ? "border-opacity-100" : " border-opacity-30"
							} h-full transition-all duration-300`}
					/>
				)}
			</div>
		</div>
	);
});

export default Step;
