import React from "react";
import GeneralBanner from "@/components/home/generalBanner";
import Layout from "@/layouts/homeLayout";

const ContactUsPage: React.FC = () => {
	return (
		<Layout>
			<div className="h-screen">
				<div className="h-1/2">
					<GeneralBanner title="Contact Us" />
				</div>
				<form>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" />

					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" />

					<label htmlFor="message">Message:</label>
					<textarea id="message" name="message" rows={4} />

					<button type="submit">Submit</button>
				</form>
			</div>
		</Layout>
	);
};

export default ContactUsPage;
