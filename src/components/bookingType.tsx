"use client";
import React, { useState } from "react";
import Lottie from "lottie-react";
import tennisBallThinking from "@/public/animations/tennisballthinking.json";
import tennisDribble from "@/public/animations/racquetani.json";
import { useGlobalState } from "@/context/globalStateContext";
import { scrollIntoView } from "@/utils/scrollToView";

const BookingType = () => {
	const { setBookingType } = useGlobalState();

	const setSeriousBookingType = () => {
		setBookingType("serious");
		setTimeout(() => {
			scrollIntoView("calendar");
		}, 0);
	};

	const setExploringBookingType = () => {
		setBookingType("exploring");
		setTimeout(() => {
			scrollIntoView("calendar");
		}, 0);
	};

	return (
		<div className="flex flex-col gap-10 p-10">
			<div className="grid grid-cols-8 grid-rows-2 gap-10">
				<p className="text-base font-nunito col-start-2 col-span-6 text-gray-300">
					<span className="text-3xl text-pink-300">
						Whether you're stepping onto the court for the first time or
						refining your skills, tennis challenges both{" "}
						<strong className="text-green-300">body</strong> and{" "}
						<strong className="text-green-300">mind</strong>. <br />
						<br />
					</span>{" "}
					It's a sport that teaches{" "}
					<strong className="text-pink-300">discipline</strong>,{" "}
					<strong className="text-pink-300">focus</strong>, and{" "}
					<strong className="text-pink-300">perseverance</strong> — values that
					extend far beyond the court. Even as a hobby, tennis asks for your
					<strong className="text-pink-300"> commitment</strong>, because{" "}
					<strong className="text-pink-300">growth </strong>
					doesn't come without practice. Every session you book brings you one
					step closer to <strong className="text-pink-300">mastery</strong>, and
					with <strong className="text-pink-300">consistency</strong>, this game
					can transform into a{" "}
					<strong className="text-pink-300">lifelong passion</strong>. So, why
					not take that first step today? Whether you're just testing the waters
					or ready to go all in,{" "}
					<strong className="text-pink-300">tennis is waiting for you</strong>.
				</p>
				<div className="grid grid-cols-2 gap-10 row-start-2 col-start-2 col-span-6">
					<div className=" bg-white bg-opacity-5 p-5 rounded-md flex flex-col gap-4">
						<div className="grid grid-cols-4 gap-4">
							<div className=" flex flex-col justify-between gap-4 col-start-1 col-span-3">
								<h3 className="text-xl font-semibold text-green-300 font-poppins">
									Just Exploring
								</h3>
								<p className="text-gray-300 text-base">
									Perfect if you want to try a couple of sessions without
									commitment.
								</p>
							</div>
							<Lottie animationData={tennisBallThinking} />
						</div>
						<button
							className="bg-green-300 bg-opacity-50 px-4 py-2 rounded-md text-black font-nunito w-full"
							onClick={setExploringBookingType}>
							Let's Give It a Try!
						</button>
					</div>

					<div className="flex flex-col gap-4 bg-white bg-opacity-5 p-5 rounded-md">
						<div className="grid grid-cols-4 gap-4">
							<div className=" flex flex-col justify-between gap-4 col-start-1 col-span-3">
								<h3 className="text-xl font-semibold text-pink-300 font-poppins">
									Serious Commitment
								</h3>
								<p className="text-gray-300 text-base">
									Ideal for students who want to schedule recurring lessons and
									make steady progress.
								</p>
							</div>
							<Lottie animationData={tennisDribble} />
						</div>
						<button
							className="bg-pink-300 bg-opacity-50 px-4 py-2 rounded-md text-black font-nunito w-full"
							onClick={setSeriousBookingType}>
							Start My Learning Journey!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingType;
