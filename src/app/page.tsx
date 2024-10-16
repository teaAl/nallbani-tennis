import HomeBanner from "@/components/homeBanner";
import NavigationMenu from "@/components/navigationMenu";
import HomeLayout from "@/components/homeLayout";
import CalendarView from "@/components/calendar";

export default function Home() {
	return (
		<HomeLayout>
			<div className="h-screen">
				<HomeBanner />
			</div>
			<CalendarView />
		</HomeLayout>
	);
}
