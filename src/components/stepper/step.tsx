import React from "react";
import CheckSVG from "@/public/icons/checkIcon";
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
				{stepMobileIcon(`${active ? "w-9 h-9 text-green-300 bg-black bg-opacity-60 rounded-full p-1" :
					completed ? "w-9 h-9 text-pink-300 bg-black bg-opacity-30 rounded-full p-1" : "w-8 h-8 text-black text-opacity-40"
					} transition-all duration-300`)}
			</span>
			<span
				className={`md:flex hidden mt-0 text-xs md:mt-1 md:text-base md:font-medium ${active
					? "text-green-300 scale-125"
					: completed
						? "md:text-green-300 text-black"
						: "text-pink-300 text-opacity-100 md:text-opacity-30"
					}`}>
				{title}
			</span>
			{/* </div> */}
			<div className="hidden md:flex flex-row md:flex-col items-center md:h-full h-0 md:scale-100 scale-75">
				<div
					className={`bg-pink-300 ${active
						? " scale-125"
						: completed
							? "bg-opacity-100"
							: "bg-opacity-30"
						} rounded-full duration-300 transition-all`}>
					{completed ? (
						<div className="m-[2px] md:m-1 flex size-5 md:size-6 items-center p-1 justify-center rounded-full bg-black">
							<CheckSVG size="13" />
						</div>
					) : (
						<div
							className={`size-4 md:size-6 rounded-full border-4 md:border-8 border-black m-[2px] md:m-1 transition-all duration-300`}
						/>
					)}
				</div>
				{!isLast && (
					<div
						className={`hidden md:block border border-pink-300 ${completed ? "border-opacity-100" : " border-opacity-30"
							} h-full transition-all duration-300`}
					/>
				)}
			</div>
		</div>
	);
});

export default Step;
