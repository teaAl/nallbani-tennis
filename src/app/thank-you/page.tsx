'use client';

import React from "react";
import { useRouter } from "next/navigation";
import HomeLayout from "@/layouts/homeLayout";
import withBookingConfirmation from "@/components/hoc/withBookingConfirmation";
import Lottie from "lottie-react";
import tennisgame from "@/public/animations/tennisgame.json";

const ThankYouPage: React.FC = () => {
	const router = useRouter();
	return (
		<HomeLayout>
			{/* flex flex-row items-center justify-center */}
			<div className="md:grid md:grid-col md:grid-cols-2 flex flex-col gap-10 p-6 md:p-10 md:h-full w-full mx-auto">
				<h1 className="md:hidden align-middle text-olive font-popins text-2xl font-bold text-center">
					Thank you for your booking!
				</h1>
				<Lottie animationData={tennisgame} />
				<div className="flex flex-col gap-6 justify-center">
					<h1 className="md:block hidden align-middle text-olive font-popins text-4xl font-bold">
						Thank you for your booking!
					</h1>
					<p className="text-left text-foreground font-poppins">
						You have received an email with the details of your booking.
					</p>
					<p className="text-left font-poppins text-foreground">One of our coaches will confirm your booking shortly.
						In the meantime, you can check out our <a href="/about" className="text-pear">About</a> page.</p>
					<div className="flex flex-row gap-6 justify-berween items-center">
						<button
							className="bg-olive px-4 py-2 rounded-md text-black font-nunito w-full"
							onClick={() => router.replace("/")}
						>
							Return Home
						</button>
						<button
							className="bg-pear px-4 py-2 rounded-md text-black font-nunito w-full"
							onClick={() => router.replace("/services")}
						>
							Services
						</button>
					</div>
				</div>
			</div>
		</HomeLayout>
	);
};

// export default withBookingConfirmation(ThankYouPage);
export default ThankYouPage;

/*
TODO: fix animation glitch

reference svg images used for lottie animations
https://storyset.com/illustration/tennis/amico
https://support.flaticon.com/s/article/Attribution-How-when-and-where-FI?language=en_US#:~:text=Place%20the%20attribution%20on%20the,the%20post%20or%20post%20comments

f9a8d4 - pink
86efac - green
455A64 - some gray
*/