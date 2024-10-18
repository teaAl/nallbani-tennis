import HomeBanner from "@/components/homeBanner";
import HomeLayout from "@/components/homeLayout";
import CalendarView from "@/components/calendar";
import HourPickerList from "@/components/hours/hourPickerList";

export default function Home() {
	return (
		<HomeLayout>
			<div className="h-screen">
				<HomeBanner />
			</div>
			<div className="grid grid-cols-2 gap-10 p-10">
				<div className="col-start-1">
					<CalendarView />
				</div>
				<div className="col-start-2 flex flex-col gap-4">
					<HourPickerList />
					{/* <button className="font-nunito text-lg bg-pink-300 text-black rounded-sm p-2 mt-2">
						Confirm
					</button> */}
				</div>
			</div>
		</HomeLayout>
	);
}
