import HomeBanner from "@/components/homeBanner";
import NavigationMenu from "@/components/navigationMenu";
import HomeLayout from "@/components/homeLayout";

export default function Home() {
	return (
		<HomeLayout>
			<div className="h-screen">
				{/* <NavigationMenu /> */}
				<HomeBanner />
			</div>
		</HomeLayout>
	);
}
