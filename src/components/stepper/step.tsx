import React from "react";
import CheckSVG from "../../../public/icons/checkIcon";
import { CalendarDateRangeIcon, CreditCardIcon, CheckBadgeIcon } from "@heroicons/react/24/solid";

type StepProps = {
	step: StepType;
	isLast: boolean;
};

const Step: React.FC<StepProps> = React.memo(({ step, isLast }) => {
	const { title, active, completed } = step;

	const stepMobileIcon = (className: string) => {
		if (title === "Date and Time") {
			return <CalendarDateRangeIcon className={className} />;
		}
		if (title === "Contact Information") {
			return <CreditCardIcon className={className} />;
		}
		if (title === "Confirmation") {
			return <CheckBadgeIcon className={className} />;
		}
	};

	return (
		<div
			className={`${active ? "md:gap-8 gap-4" : "md:gap-3 gap-2"
				} w-full z-10 flex md:flex-row flex-col duration-300 transition-all h-full md:items-start justify-center md:justify-end`}>
			{/* <div> */}
			<span className="md:hidden flex justify-around w-3/4">
				{stepMobileIcon(`w-9 h-9 ${active ? " text-pear bg-black rounded-full p-1.5" :
					completed ? "w-9 h-9 text-pear bg-black/60 rounded-full p-1.5" : "w-8 h-8 text-black/40"
					} transition-all duration-300`)}
			</span>
			<span
				className={`md:flex hidden mt-0 text-xs md:mt-1 md:text-base md:font-medium ${active
					? "text-pear scale-125"
					: completed
						? "md:text-pear/50 text-black"
						: "text-olive/100 md:text-olive-30"
					}`}>
				{title}
			</span>
			{/* </div> */}
			<div className="hidden md:flex flex-row md:flex-col items-center md:h-full h-0 md:scale-100 scale-75">
				<div
					className={`${active
						? " scale-125 bg-pear"
						: completed
							? "bg-pear/100"
							: "bg-olive/30"
						} rounded-full duration-300 transition-all`}>
					{completed ? (
						<div className="m-[2px] md:m-1 flex size-5 md:size-6 items-center p-1 justify-center rounded-full bg-black">
							<CheckSVG size="13" fill="#cddc3b" />
						</div>
					) : (
						<div
							className={`size-4 md:size-6 rounded-full border-4 md:border-8 border-black m-[2px] md:m-1 transition-all duration-300`}
						/>
					)}
				</div>
				{!isLast && (
					<div
						className={`hidden md:block border  ${completed ? "border-pear/100" : "border-olive/30"
							} h-full transition-all duration-300`}
					/>
				)}
			</div>
		</div>
	);
});

export default Step;
