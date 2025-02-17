import React from "react";
import Layout from "@/layouts/homeLayout";
import GeneralBanner from "@/components/generalBanner";

const HowItWorksPage: React.FC = () => {
	return (
		<Layout>
			<div className="h-screen">
				<div className="h-1/2">
					<GeneralBanner title="How It Works" />
				</div>
				{/* Add your content here */}
			</div>
		</Layout>
	);
};

export default HowItWorksPage;
