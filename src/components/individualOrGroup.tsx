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

const IndividualOrGroup = () => {
	const { lessonType, setLessonType, handleNextStep } = useGlobalState();
	const [flipped, setFlipped] = useState<string | null>(null);

	const handleProceed = () => {
		handleNextStep();

		if (lessonType) {
			setFlipped((prev) => (prev === lessonType ? null : lessonType));
		}
	};

	const activeClass = "scale-110 bg-opacity-30";
	// const

	return (
		<div className="flex flex-col gap-10 items-center justify-center h-full w-full">
			<div className="flex flex-row justify-around align-middle items-center duration-500 w-full">
				{/* Individual Lesson Card */}
				<div
					className={`relative h-[400px] transition-transform duration-500 [transform-style:preserve-3d] ${
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
	);
};

export default IndividualOrGroup;
