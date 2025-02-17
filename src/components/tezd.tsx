"use client";

import { useEffect, useState, useRef } from "react";
import { useGlobalState } from "@/context/globalStateContext";
import { scrollIntoView } from "@/utils/scrollToView";
import singleplayer from "@/public/animations/singleplayer.json";
import multiplayer from "@/public/animations/multiplayer.json";
import proceedbtn from "@/public/animations/proceedbtn.json";
import GroupForm from "./group-individual/groupForm";
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Lottie from "lottie-react";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

// const experienceLevels = [
// 	"Beginner",
// 	"Novice",
// 	"Intermediate",
// 	"Advanced",
// 	"Professional",
// ];

const IndividualOrGroupWithFlip = () => {
	const {
		// setIndividual,
		// setShowCalendar,
		// setIsGroup,
		// groupSize,
		// hasGroup,
		// setNeedEquipment,
		steps,
		lessonType,
		setLessonType,
		handleNextStep,
	} = useGlobalState();
	const [flipped, setFlipped] = useState<string | null>(null);

	const handleProceed = () => {
		handleNextStep();

		if (lessonType) {
			setFlipped((prev) => (prev === lessonType ? null : lessonType));
		}
	};

	// const sliderRef = useRef<HTMLInputElement>(null);
	// const sliderValueRef = useRef<HTMLDivElement>(null);

	// const [selected, setSelected] = useState<"individual" | "group">(
	// 	"individual"
	// );

	// const [equipment, setEquipment] = useState<
	// 	"hasEquipments" | "needEquipments"
	// >("hasEquipments");

	// const [expLevel, setExpLevel] = useState<number>(25);

	// const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.value === "individual") {
	// 		setSelected("individual");
	// 		setTimeout(() => {
	// 			scrollIntoView("individual-form");
	// 		}, 0);
	// 	} else {
	// 		setSelected("group");
	// 		setTimeout(() => {
	// 			scrollIntoView("group-form");
	// 		}, 0);
	// 	}
	// };

	// const handleGroupEquipment = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.value === "hasEquipments") {
	// 		setEquipment("hasEquipments");
	// 	} else {
	// 		setEquipment("needEquipments");
	// 	}
	// };

	// useEffect(() => {
	// 	if (selected === "individual") {
	// 		setIndividual(true);
	// 		setIsGroup(false);
	// 	} else {
	// 		setIndividual(false);
	// 		setIsGroup(true);
	// 	}
	// }, [selected]);

	// useEffect(() => {
	// 	setNeedEquipment(equipment === "needEquipments");
	// }, [equipment]);

	// const handleExpLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setExpLevel(parseInt(e.target.value, 10));
	// };

	// const showCalendar = () => {
	// 	setShowCalendar(true);
	// 	setTimeout(() => {
	// 		scrollIntoView("calendar");
	// 	}, 0);
	// };

	// useEffect(() => {
	// 	const sliderEl = sliderRef.current;
	// 	const sliderValueEl = sliderValueRef.current;
	// 	if (sliderEl && sliderValueEl) {
	// 		const handleInput = (event: Event) => {
	// 			const target = event.target as HTMLInputElement;
	// 			const tempSliderValue = Number(target.value);
	// 			// sliderValueEl.textContent = tempSliderValue.toString();
	// 			sliderValueEl.textContent =
	// 				expLevel < 20
	// 					? experienceLevels[0]
	// 					: expLevel < 40
	// 					? experienceLevels[1]
	// 					: expLevel < 60
	// 					? experienceLevels[2]
	// 					: expLevel < 80
	// 					? experienceLevels[3]
	// 					: experienceLevels[4];
	// 			const progress = (tempSliderValue / Number(target.max)) * 100;
	// 			sliderEl.style.background = `linear-gradient(to right, #86efac ${progress}%, #ffffff10 ${progress}%)`;
	// 			sliderEl.style.setProperty(
	// 				"--thumb-rotate",
	// 				`${(tempSliderValue / 100) * 2160}deg`
	// 			);
	// 		};
	// 		sliderEl.addEventListener("input", handleInput);
	// 		return () => {
	// 			sliderEl.removeEventListener("input", handleInput);
	// 		};
	// 	}
	// }, [expLevel]);

	const activeClass = "scale-110 bg-opacity-30";
	// const

	return (
		<div className="flex flex-col gap-10 items-center justify-center h-full w-full">
			<div className="flex flex-row justify-around align-middle items-center duration-500 w-full">
				{/* Individual Lesson Card */}
				<div
					className={`relative h-[400px] transition-transform duration-500 [transform-style:preserve-3d] ${
						// flipped === "individual" ? "[transform:rotateY(180deg)]" : ""
						flipped === "individual"
							? "w-full max-w-3xl"
							: flipped === "group"
							? "opacity-0 w-0 overflow-hidden"
							: "w-[300px]"
					}`}
					style={{ perspective: "1000px" }}>
					{/* Front Side */}
					<div
						className={`${lessonType === "individual" && activeClass} 
						absolute inset-0 [backface-visibility:hidden] bg-pink-300 bg-opacity-10 p-4 flex flex-col gap-4 justify-center w-auto rounded-lg`}>
						<div
							className={`max-w-96 h-auto
							${flipped === "individual" ? "opacity-0" : "opacity-100"}`}>
							<Lottie animationData={singleplayer} />
						</div>
						<div>
							<button
								className={` cursor-pointer w-full bg-pink-300  text-black p-2 font-poppins rounded-lg scale-95 hover:scale-100 duration-300 transition-all
									${flipped === "individual" ? "opacity-0" : "opacity-100"}`}
								onClick={() => setLessonType("individual")}>
								Individual lesson
							</button>
						</div>
					</div>
					{/* Back Side */}
					<div
						className={`absolute inset-0 flex items-center justify-center bg-gray-800 text-white rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]
						${flipped === "individual" ? "opacity-100" : "opacity-0"}`}>
						<p className="text-lg font-semibold">Flipped Individual Content</p>
					</div>
				</div>
				{/* Group Lesson Card */}
				<div
					className={`relative h-[400px] transition-all duration-500 [transform-style:preserve-3d] ${
						flipped === "group"
							? "w-full max-w-3xl"
							: flipped === "individual"
							? "opacity-0 w-0 overflow-hidden"
							: "w-[300px]"
					}`}
					style={{ perspective: "1000px" }}>
					{/* Front Side */}
					<div
						className={`${lessonType === "group" && activeClass} 
					absolute inset-0 [backface-visibility:hidden] flex flex-col justify-center items-center  w-auto  bg-green-300 bg-opacity-10 p-4 rounded-lg`}>
						<div
							className={`max-w-96 h-auto
							${flipped === "group" ? "opacity-0" : "opacity-100"}`}>
							<Lottie animationData={multiplayer} />
						</div>
						<button
							className={`cursor-pointer w-full bg-green-300 text-black p-2 font-poppins rounded-lg scale-95 hover:scale-100 duration-300 transition-all
								${flipped === "group" ? "opacity-0" : "opacity-100"}`}
							onClick={() => setLessonType("group")}>
							Group lesson
						</button>
					</div>

					{/* Back Side */}
					<div
						className={`absolute inset-0 flex items-center justify-center bg-gray-800 text-white rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]
						${flipped === "group" ? "opacity-100" : "opacity-0"}`}>
						<p className="text-lg font-semibold">Flipped Group Content</p>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-around align-middle items-center">
				<div
					className={`${
						lessonType === null ? "opacity-0" : "opacity-100"
					} cursor-pointer duration-300 transition-all`}>
					<button
						className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
						onClick={handleProceed}>
						Proceed
						<ChevronDoubleDownIcon className="w-10 h-10" />
					</button>
				</div>
			</div>
		</div>

		// <div
		// 	id="individual-or-group"
		// 	className="flex flex-col bg-white bg-opacity-5 shadow-lg rounded-b-lg font-poppins flex-wrap border-t-2 border-green-300 border-opacity-30 p-4 gap-6">
		// 	<div className="flex justify-center space-x-4">
		// 		<div className="flex flex-row gap-4 justify-start w-full">
		// 			<label
		// 				// className="flex flex-row gap-1 items-center cursor-pointer"
		// 				className={`flex flex-row gap-1 items-center cursor-pointer py-2 px-4 transition-all duration-150 bg-white bg-opacity-5 rounded-t-md border-b-2 ${
		// 					selected === "individual"
		// 						? " border-green-300 text-green-300"
		// 						: "border-white border-opacity-5"
		// 				}`}
		// 				htmlFor={"individual"}>
		// 				<input
		// 					type="radio"
		// 					// className="hidden peer"
		// 					className="hidden"
		// 					name={"individual"}
		// 					value={"individual"}
		// 					id={"individual"}
		// 					checked={selected === "individual"}
		// 					onChange={(e) => handleSelection(e)}
		// 				/>
		// 				{/* <span className="w-4 h-4 border border-pink-300 rounded-full peer-checked:border-green-300 peer-checked:border-4 peer-checked:bg-transparent"></span> */}
		// 				<span className="text-sm font-extrabold cursor-pointer">
		// 					Individual
		// 				</span>
		// 			</label>
		// 			<label
		// 				// className="flex flex-row gap-1 items-center cursor-pointer"
		// 				className={`flex flex-row gap-1 items-center cursor-pointer py-2 px-4 transition-all duration-150 bg-white bg-opacity-5 rounded-t-md border-b-2 ${
		// 					selected === "group"
		// 						? " border-green-300 text-green-300"
		// 						: "border-white border-opacity-5"
		// 				}`}
		// 				htmlFor={"group"}>
		// 				<input
		// 					type="radio"
		// 					// className="hidden peer"
		// 					className="hidden"
		// 					name={"group"}
		// 					value={"group"}
		// 					id={"group"}
		// 					checked={selected === "group"}
		// 					onChange={(e) => handleSelection(e)}
		// 				/>
		// 				{/* <span className="w-4 h-4 border border-pink-300 rounded-full peer-checked:border-green-300 peer-checked:border-4 peer-checked:bg-transparent"></span> */}
		// 				<span className="text-sm font-extrabold cursor-pointer">Group</span>
		// 			</label>
		// 		</div>
		// 	</div>

		// 	{selected === "individual" && (
		// 		<>
		// 			<div className="flex flex-row justify-between">
		// 				<p>Do you need equipments?</p>
		// 				<div className="flex flex-row gap-6">
		// 					<label
		// 						className="flex flex-row gap-1 items-center cursor-pointer"
		// 						htmlFor={"hasEquipments"}>
		// 						<input
		// 							type="radio"
		// 							className="hidden peer"
		// 							name={"hasEquipments"}
		// 							value={"hasEquipments"}
		// 							id={"hasEquipments"}
		// 							checked={equipment === "hasEquipments"}
		// 							onChange={(e) => handleGroupEquipment(e)}
		// 						/>
		// 						<span className="w-4 h-4 border border-pink-300 rounded-full peer-checked:border-pink-300 peer-checked:border-4 peer-checked:bg-transparent"></span>
		// 						<span className="text-sm font-extrabold cursor-pointer">
		// 							Yes
		// 						</span>
		// 					</label>
		// 					<label
		// 						className="flex flex-row gap-1 items-center cursor-pointer"
		// 						htmlFor={"needEquipments"}>
		// 						<input
		// 							type="radio"
		// 							className="hidden peer"
		// 							name={"needEquipments"}
		// 							value={"needEquipments"}
		// 							id={"needEquipments"}
		// 							checked={equipment === "needEquipments"}
		// 							onChange={(e) => handleGroupEquipment(e)}
		// 						/>
		// 						<span className="w-4 h-4 border border-pink-300 rounded-full peer-checked:border-pink-300 peer-checked:border-4 peer-checked:bg-transparent"></span>
		// 						<span className="text-sm font-extrabold cursor-pointer">
		// 							No, I have my racquet
		// 						</span>
		// 					</label>
		// 				</div>
		// 			</div>
		// 			<div className="flex flex-row justify-between items-center">
		// 				<p>What is your experience level?</p>
		// 				<ChevronDoubleRightIcon className="w-5 h-5 text-pink-300" />
		// 				<span
		// 					ref={sliderValueRef}
		// 					className="px-6 py-2 bg-white bg-opacity-5 border-b-2 border-pink-300 border-opacity-30 rounded-t-md">
		// 					Novice
		// 				</span>
		// 				<ChevronDoubleLeftIcon className="w-5 h-5 text-pink-300" />

		// 				<div className="flex flex-row gap-6 items-center">
		// 					<input
		// 						type="range"
		// 						min={0}
		// 						max={100}
		// 						value={expLevel}
		// 						// step={25}
		// 						onChange={(e) => handleExpLevel(e)}
		// 						className=""
		// 						ref={sliderRef}
		// 					/>
		// 					{/* <span ref={sliderValueRef} className="value" /> */}
		// 				</div>
		// 			</div>
		// 			<button
		// 				className={`bg-opacity-70 cursor-pointer w-full bg-green-300  text-black rounded-sm p-2 font-poppins`}
		// 				onClick={showCalendar}>
		// 				Continue
		// 			</button>
		// 		</>
		// 	)}
		// 	{selected === "group" && <GroupForm />}
		// </div>
	);
};

export default IndividualOrGroupWithFlip;
