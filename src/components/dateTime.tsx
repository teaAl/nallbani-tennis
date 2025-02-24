import { useGlobalState } from "@/context/globalStateContext";
import CalendarView from "./calendar";
import HourPicker from "./hours/hourPicker";
import HourPickerList from "./hours/hourPickerList";
import NewCalendar from "./newCalendar";
import { InformationCircleIcon, WrenchScrewdriverIcon } from "@heroicons/react/16/solid";
import Lottie from "lottie-react";
import tennisBallThinking from "@/public/animations/tennisballthinking.json";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";


const DateTime = () => {
	const { dateBooked, hourBooked, handleNextStep } = useGlobalState();
	const todayDate = new Date();

	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		console.log(dateBooked);
		if (dateBooked) {
			setFlipped(true);
		} else {
			setFlipped(false);
		}
		console.log(flipped);
	}, [dateBooked]);

	return (
		<>
			<section className="py-16 mx-auto sm:py-20">
				<div className="mx-auto flex justify-center object-center px-4 pb-2 sm:pb-8 lg:max-w-7xl">
					<div className="flex justify-center object-center flex-col gap-12 sm:gap-16">
						<div className="mx-auto grid gap-12 space-y-10 md:space-y-0 sm:gap-16 lg:grid-cols-3">
							<div className="group h-[380px] w-[430px] [perspective:1000px]">
								<div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
									{/* Front Face */}
									<div className="absolute inset-0 h-full w-full mx-auto rounded-xl [backface-visibility:hidden]">
										{/* <Lottie animationData={tennisBallThinking} /> */}
										<NewCalendar />
									</div>
									{/* Back Face */}
									<div className="absolute inset-0 h-full w-full rounded-xl px-2 bg-white bg-opacity-5 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
										<div className="flex min-h-full flex-col items-center justify-center">
											<HourPicker date={dateBooked || todayDate} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div
				className={`${!hourBooked ? "opacity-0 -z-50" : "opacity-100 z-50"
					} flex flex-row justify-around align-middle items-center duration-300 transition-all`}>
				<div className={`cursor-pointer`}>
					<button
						type="submit"
						className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
						onClick={handleNextStep}>
						Proceed
						<ChevronDoubleDownIcon className="w-10 h-10" />
					</button>
				</div>
			</div>
		</>
	);
};

export default DateTime;