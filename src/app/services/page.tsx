import GeneralBanner from "@/components/common/generalBanner";
import Layout from "@/layouts/homeLayout";
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
