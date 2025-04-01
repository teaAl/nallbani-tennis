import Calendar from "react-calendar";

const Timetable = () => {
    return (
        <div className="bg-gray-800 h-full w-full flex flex-col justify-center items-center gap-8 p-10">
            <div className="flex flex-col gap-2 items-center">
                <span className="uppercase text-foreground font-light font-poppins">Events & Timetable</span>
                <h3 className="text-pear text-5xl font-poppins font-medium">The week in our club</h3>
            </div>
            {/* <Calendar /> */}
            <div className="grid grid-cols-6 grid-rows-5 gap-0 w-3/4 items-center">
                {/* CALENDAR HEADER */}
                <div className="row-span-1 col-span-6 bg-pear grid grid-cols-6 gap-0">
                    <span className="col-start-2 col-span-1 uppercase text-gray-900 font-light font-poppins text-center">mon</span>
                    <span className="uppercase text-gray-900 font-light font-poppins text-center">tue</span>
                    <span className="uppercase text-gray-900 font-light font-poppins text-center">wed</span>
                    <span className="uppercase text-gray-900 font-light font-poppins text-center">thu</span>
                    <span className="uppercase text-gray-900 font-light font-poppins text-center">fri</span>
                </div>
                {/* CALENDAR HOURS*/}
                <div className="col-span-1 row-span-5 border-l border-r border-foreground/30">
                    <div className="border-b border-b-foreground/30 w-full h-full">test</div>
                    <div className="border-b border-b-foreground/30 w-full h-full">test</div>
                    <div className="border-b border-b-foreground/30 w-full h-full">test</div>
                    <div className="border-b border-b-foreground/30 w-full h-full">test</div>
                </div>
                {/* CALENDAR CONTENT*/}
                <div className="col-span-5 row-span-4 grid grid-cols-6 gap-0 border-red-500">
                    <div className="row-span-1 col-span-4 grid grid-cols-5 gap-0">
                        <div className="col-span-1">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                    </div>
                    <div className="row-span-1 col-span-4 grid grid-cols-5 gap-0">
                        <div className="col-span-1">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                    </div>
                    <div className="row-span-1 col-span-4 grid grid-cols-5 gap-0">
                        <div className="col-span-1">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                    </div>
                    <div className="row-span-1 col-span-4 grid grid-cols-5 gap-0">
                        <div className="col-span-1">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                        <div className="">
                            test
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Timetable;

/*
TODO:
- rethink the design of this
*/