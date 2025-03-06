import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/globalStateContext";
import HourPicker from "./hourPicker";
import NewCalendar from "./calendar";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";


const DateTime = () => {
	const { dateBooked, hourBooked, nextStep, hasEquipment, setHasEquipment } = useGlobalState();
	const todayDate = new Date();

	const [flipped, setFlipped] = useState(false);

	useEffect(() => {
		if (dateBooked) {
			setFlipped(true);
		} else {
			setFlipped(false);
		}
	}, [dateBooked]);

	const allowProceed = hourBooked && dateBooked && hasEquipment !== null;

	return (
		<div className="flex flex-col items-center w-full gap-6">
			<div className="group w-full max-w-[380px] xs:max-w-[400px] md:h-[420px] md:max-w-[430px] [perspective:1000px]">
				<div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
					{/* Front Face */}
					<div className="absolute inset-0 h-full w-full mx-auto rounded-xl [backface-visibility:hidden]">
						<NewCalendar />
					</div>
					{/* Back Face */}
					<div className="h-full w-full rounded-xl p-2 bg-[#171717ba] text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
						<div className="flex min-h-full flex-col items-center justify-center gap-6">
							<HourPicker date={dateBooked || todayDate} />
							<div className="flex flex-row justify-between items-center border-t border-t-pink-300 border-opacity-10 w-full pt-6 px-2">
								<p className="text-pink-300 font-poppins md:text-center text-left">Do you have your own tennis racket?</p>
								<div className="flex flex-row">
									<HandThumbDownIcon onClick={() => setHasEquipment(false)} className={`w-10 h-8 text-white px-2 cursor-pointer hover:scale-105 hover:bg-red-700 hover:bg-opacity-100 transition-all duration-300 ${hasEquipment === false ? 'bg-red-700 bg-opacity-100' : 'bg-white bg-opacity-10'}`} />
									<HandThumbUpIcon onClick={() => setHasEquipment(true)} className={`w-10 h-8 text-white  px-2 cursor-pointer hover:scale-105 hover:bg-green-700 transition-all duration-300 ${hasEquipment === true ? 'bg-green-700 bg-opacity-100' : 'bg-white bg-opacity-10'}`} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`${!allowProceed ? "opacity-0 -z-50" : "opacity-100 z-50"
					} flex flex-row justify-around align-middle items-center duration-300 transition-all`}>
				<div className={`cursor-pointer`}>
					<button
						type="submit"
						className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
						onClick={nextStep}>
						Proceed
						<ChevronDoubleDownIcon className="w-10 h-10" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DateTime;