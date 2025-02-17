import GeneralBanner from "@/components/generalBanner";
import Layout from "@/components/homeLayout";
import React from "react";

const ServicesPage: React.FC = () => {
	return (
		<Layout>
			<div className="h-screen">
				<div className="h-1/2">
					<GeneralBanner title="Services" />
				</div>
				{/* Add your services content here */}
			</div>
		</Layout>
	);
};

export default ServicesPage;
