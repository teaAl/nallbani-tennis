import HomeLayout from "@/layouts/homeLayout";
import React from "react";

const ThankYouPage: React.FC = () => {
	return (
		<HomeLayout>
			<div className="flex flex-col h-full">
				<h1 className="align-middle my-auto text-center">
					Thank you for your booking. You will receive an email when your
					booking is confirmed from one of the coaches
				</h1>
			</div>
		</HomeLayout>
	);
};

export default ThankYouPage;
