"use client";

import React from "react";
import Lottie from "lottie-react";
import singlePlayer from "../../../public/animations/singleplayer.json";
import multiPlayer from "../../../public/animations/multiplayer.json";
import { useRouter } from "next/navigation";

const BookingType = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-10 p-6 md:p-10">
      <div className="flex flex-col md:grid md:grid-cols-8 md:grid-rows-2 gap-10">
        <p className="text-sm md:text-base font-nunito md:col-start-2 md:col-span-6 text-foreground md:pt-0 pt-10">
          <span className="text-xl md:text-3xl text-olive">
            Whether you're stepping onto the court for the first time or
            refining your skills, tennis challenges both{" "}
            <strong className="text-pear">body</strong> and{" "}
            <strong className="text-pear">mind</strong>. <br />
            <br />
          </span>{" "}
          It's a sport that teaches{" "}
          <strong className="text-pear">discipline</strong>,{" "}
          <strong className="text-pear">focus</strong>, and{" "}
          <strong className="text-pear">perseverance</strong> — values that
          extend far beyond the court. Even as a hobby, tennis asks for your
          <strong className="text-pear"> commitment</strong>, because{" "}
          <strong className="text-pear">growth </strong>
          doesn't come without practice. Every session you book brings you one
          step closer to <strong className="text-pear">mastery</strong>, and
          with <strong className="text-pear">consistency</strong>, this game can
          transform into a{" "}
          <strong className="text-pear">lifelong passion</strong>. So, why not
          take that first step today? Whether you're just testing the waters or
          ready to go all in,{" "}
          <strong className="text-pear">tennis is waiting for you</strong>.
        </p>
        <div className="grid md:grid-cols-2 gap-10 row-start-2 col-start-2 col-span-6">
          <div className=" bg-white/5 p-5 rounded-md flex flex-col gap-4 justify-between">
            <div className="grid grid-cols-4 gap-4">
              <div className=" flex flex-col justify-between gap-4 col-start-1 col-span-3">
                <h3 className="text-xl font-semibold text-pear font-poppins">
                  Individual Lesson
                </h3>
                <p className="text-foreground text-base">
                  Individual lessons are perfect if you want to learn faster and
                  lessons are tailored to your needs and requirements.
                </p>
              </div>
              <Lottie animationData={singlePlayer} />
            </div>
            {/* <button
							className="bg-pear px-4 py-2 rounded-md text-black font-nunito w-full font-semibold"
							onClick={() => (
								setLessonType("individual"), router.push("/book")
							)}>
							Book Individual Lesson
						</button> */}
          </div>

          <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-md justify-between">
            <div className="grid grid-cols-4 gap-4">
              <div className=" flex flex-col justify-between gap-4 col-start-1 col-span-3">
                <h3 className="text-xl font-semibold text-olive font-poppins">
                  Group Lesson
                </h3>
                <p className="text-gray-300 text-base">
                  You can join an existing group if experience level matches or
                  you can create your own group with friends.
                </p>
              </div>
              <Lottie animationData={multiPlayer} />
            </div>
            {/* <button
              className="bg-olive px-4 py-2 rounded-md text-black font-nunito w-full"
              onClick={() => (setLessonType("group"), router.push("/book"))}
            >
              Book Group Lesson
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingType;
/*
TODO: 
1. Fix the animation for the group lesson
2. Handle navigation to the booking page better
*/
