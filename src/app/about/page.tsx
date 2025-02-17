import React from "react";
import Layout from "@/components/homeLayout";
import GeneralBanner from "@/components/generalBanner";

const AboutPage: React.FC = () => {
	return (
		<Layout>
			<div className="h-screen">
				<div className="h-1/2">
					<GeneralBanner title="About Us" />
				</div>
				<div className="flex flex-col gap-10 p-6 md:p-10">
					<p>
						Welcome to our website! We are a passionate team dedicated to
						providing the best tennis experience.
					</p>
					<p>
						Our mission is to promote the sport of tennis and help players of
						all levels improve their skills.
					</p>
					<p>
						Feel free to explore our website and learn more about our services
						and programs.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default AboutPage;
