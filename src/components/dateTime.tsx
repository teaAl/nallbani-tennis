import { useGlobalState } from "@/context/globalStateContext";
import CalendarView from "./calendar";
import HourPicker from "./hours/hourPicker";
import HourPickerList from "./hours/hourPickerList";
import NewCalendar from "./newCalendar";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import Lottie from "lottie-react";
import tennisBallThinking from "@/public/animations/tennisballthinking.json";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

const DateTime = () => {
	const { dateBooked, hourBooked, handleNextStep } = useGlobalState();
	const todayDate = new Date();

	return (
		<div className="md:grid md:grid-cols-2 flex flex-col gap-0 p-6 md:p-10 ">
			<div className="col-start-1 w-min">
				{/* <CalendarView /> */}
				<NewCalendar />
			</div>
			<div className="col-start-2 flex flex-col gap-4 justify-between items-center ">
				<div
					className={`transition-all duration-400 ${
						dateBooked ? "opacity-100 h-auto z-30" : "opacity-0 h-0 -z-30"
					}`}>
					<HourPicker date={dateBooked ? dateBooked : todayDate} />
				</div>
				<div
					className={`flex flex-col justify-between p-2 gap-4 transition-all duration-400 border-t-2 border-pink-300 border-opacity-10 ${
						dateBooked ? "opacity-0 h-0" : "opacity-100 h-auto"
					}`}>
					<p className="font-nunito text-sm text-pink-300 text-opacity-90 inline-flex gap-2 items-center py-6">
						<InformationCircleIcon className="w-4 h-4" />
						Please select a date on the calendar to check available hours
					</p>
				</div>
				<div
					className={`${
						hourBooked === null ? "opacity-0" : "opacity-100"
					} cursor-pointer duration-300 transition-all`}>
					<button
						className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
						onClick={handleNextStep}>
						Proceed
						<ChevronDoubleDownIcon className="w-10 h-10" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DateTime;
// Flip calendar after date selection to select hour and equipment
