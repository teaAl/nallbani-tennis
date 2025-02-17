import CalendarView from "./calendar";
import HourPickerList from "./hours/hourPickerList";

const DateTime = () => {
	return (
		<div className="md:grid md:grid-cols-2 flex flex-col gap-32 p-6 md:p-10">
			<div className="col-start-1">
				<CalendarView />
			</div>
			<div className="col-start-2 flex flex-col gap-4">
				<HourPickerList />
				{/* <button
					onClick={confirmBooking}
					className={`${
						enableConfirmButton ? "opacity-100" : "opacity-35"
					} font-nunito text-lg bg-pink-300 text-black rounded-sm p-2 mt-2 hover:scale-105 transform-all duration-150`}
					disabled={!enableConfirmButton}>
					Confirm 
				</button> */}
			</div>
		</div>
	);
};

export default DateTime;
