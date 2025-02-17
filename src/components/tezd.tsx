import { useState } from "react";

export default function FlipLessonCard() {
	const [lessonType, setLessonType] = useState<string | null>(null);
	const [flippedCard, setFlippedCard] = useState<string | null>(null);

	const handleProceed = () => {
		if (lessonType) {
			setFlippedCard((prev) => (prev === lessonType ? null : lessonType));
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-full bg-red-400">
			<div className="flex flex-row justify-around items-center gap-6">
				{/* Individual Lesson Card */}
				<div
					className={`relative w-[300px] h-[400px] transition-transform duration-500 [transform-style:preserve-3d] ${
						flippedCard === "individual" ? "[transform:rotateY(180deg)]" : ""
					}`}
					style={{ perspective: "1000px" }}>
					{/* Front Side */}
					<div className="absolute inset-0 flex flex-col justify-center items-center bg-pink-300 bg-opacity-10 p-4 rounded-lg [backface-visibility:hidden]">
						<div className="max-w-96 h-auto">
							{/* <Lottie animationData={singleplayer} /> */}
							Single Player
						</div>
						<button
							className="cursor-pointer w-full bg-pink-300 text-black p-2 font-poppins rounded-lg scale-95 hover:scale-100 duration-300 transition-all"
							onClick={() => setLessonType("individual")}>
							Individual lesson
						</button>
					</div>

					{/* Back Side */}
					<div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
						<p className="text-lg font-semibold">Flipped Individual Content</p>
					</div>
				</div>

				{/* Group Lesson Card */}
				<div
					className={`relative w-[300px] h-[400px] transition-transform duration-500 [transform-style:preserve-3d] ${
						flippedCard === "group" ? "[transform:rotateY(180deg)]" : ""
					}`}
					style={{ perspective: "1000px" }}>
					{/* Front Side */}
					<div className="absolute inset-0 flex flex-col justify-center items-center bg-green-300 bg-opacity-10 p-4 rounded-lg [backface-visibility:hidden]">
						<div className="max-w-96 h-auto">
							{/* <Lottie animationData={multiplayer} /> */}
							Multiplayer
						</div>
						<button
							className="cursor-pointer w-full bg-green-300 text-black p-2 font-poppins rounded-lg scale-95 hover:scale-100 duration-300 transition-all"
							onClick={() => setLessonType("group")}>
							Group lesson
						</button>
					</div>

					{/* Back Side */}
					<div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
						<p className="text-lg font-semibold">Flipped Group Content</p>
					</div>
				</div>
			</div>

			{/* Proceed Button */}
			<div className="flex flex-row justify-around items-center mt-4">
				<div
					className={`${
						lessonType === null ? "opacity-0" : "opacity-100"
					} cursor-pointer duration-300 transition-all`}>
					<button
						className="bg-transparent text-pink-300 justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
						onClick={handleProceed}>
						Proceed
						{/* <ChevronDoubleDownIcon className="w-10 h-10" /> */}
					</button>
				</div>
			</div>
		</div>
	);
}
