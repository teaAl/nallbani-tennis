import { useGlobalState } from "@/context/globalStateContext";
import { UserCircleIcon, UsersIcon, UserGroupIcon, UserIcon, EnvelopeIcon, PhoneIcon, ClockIcon } from "@heroicons/react/24/outline";
import TennisRacket from "@/public/icons/tennisRacket";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";


const BookingConfirmation = () => {
    const router = useRouter();
    const { dateBooked, hourBooked, contactInfo, hasEquipment, lessonType, nextStep } = useGlobalState();
    const dateNumber = dateBooked?.toLocaleDateString('en-US', { day: 'numeric' });
    const monthString = dateBooked?.toLocaleDateString('en-US', { month: 'long' });
    const weekdayString = dateBooked?.toLocaleDateString('en-US', { weekday: 'long' });

    const confirmBooking = () => {
        // handleNextStep();
        nextStep()
        router.push('/thank-you');
        // clearBookingState();
        const booking = {
            bookingType: lessonType,
            date: dateBooked,
            hour: hourBooked,
            contactInfo: contactInfo,
            hasEquipment: hasEquipment,
            lessonType: lessonType
        }
        console.log(booking);
    };

    return (
        <div className="flex flex-col gap-6 w-full ">
            <h3 className="font-poppins md:text-xl text-base text-pink-300 w-full border-b border-b-pink-300 border-opacity-10 py-4">Please confirm your booking</h3>
            <div className="flex flex-row justify-between md:gap-6 gap-0 w-full cursor-default">
                <div className="w-full h-full relative">
                    <div className="absolute top-2 left-7 w-3 h-3 bg-[#0a0a0a] bg-opacity-50 rounded-full border border-white border-opacity-30"></div>
                    <div className="absolute top-2 right-7 w-3 h-3 bg-[#0a0a0a] bg-opacity-50 rounded-full border  border-white border-opacity-30"></div>
                    <div className="bg-[#171717] rounded-md gap-2 w-48 md:w-full h-auto flex flex-col items-center">
                        <div className="bg-pink-300 bg-opacity-60 w-full text-center pt-4 rounded-t-md">
                            <p className="font-poppins text-xl font-light text-white text-opacity-70 py-2">{weekdayString}</p>
                        </div>
                        <div className="p-3 flex flex-col gap-1 items-center">
                            <p className="font-poppins text-4xl font-bold text-center text-pink-300 rounded-full bg-pink-300 bg-opacity-5 p-6 border border-pink-300 border-opacity-5">{dateNumber}</p>
                            <p className="font-nunito text-lg font-semibold text-center text-pink-300">{monthString}</p>
                        </div>
                        <div className="w-full h-[0.5px] bg-pink-300 bg-opacity-30"></div>
                        <div className="flex flex-row justify-between w-full px-2 md:px-4 pb-2">
                            <div className="flex flex-row gap-2 justify-center items-center">
                                <ClockIcon className="w-4 h-4 text-pink-300 text-opacity-70" />
                                <p className="font-nunito text-sm text-pink-300 font-light text-center">{hourBooked}</p>
                            </div>
                            <div className="flex flex-row gap-2 justify-center items-center">
                                {lessonType === 'group' ?
                                    <UsersIcon className="w-4 h-4 text-green-300 text-opacity-70" />
                                    :
                                    <UserIcon className="w-4 h-4 text-green-300 text-opacity-70" />
                                }
                                <p className="font-nunito text-sm text-green-300 font-light text-center">{lessonType}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full text-white flex flex-col gap-6 p-6 ">
                    <div className="flex flex-row md:gap-4 gap-2 border-b border-green-300 border-opacity-10 pb-4 ">
                        <UserCircleIcon className="w-5 h-5 text-green-300 text-opacity-80" />
                        <p className="text-white text-opacity-70 font-poppins text-sm">{contactInfo?.name}</p>
                    </div>
                    <div className="flex flex-row md:gap-4 gap-2  border-b border-green-300 border-opacity-10 pb-4">
                        <EnvelopeIcon className="w-5 h-5 text-green-300 text-opacity-80" />
                        <p className="text-white text-opacity-70 font-poppins text-sm">{contactInfo?.email}</p>
                    </div>
                    <div className="flex flex-row md:gap-4 gap-2  border-b border-green-300 border-opacity-10 pb-4">
                        <PhoneIcon className="w-5 h-5 text-green-300 text-opacity-80" />
                        <p className="text-white text-opacity-70 font-poppins text-sm">{contactInfo?.phone}</p>
                    </div>
                    <div className="flex flex-row md:gap-4 gap-2  border-b border-green-300 border-opacity-10 pb-4">
                        <TennisRacket size="20" fill="#86efac" />
                        <p className="text-white text-opacity-70 font-poppins text-sm">{hasEquipment === false ? "Need equipment" : "Have equipment"}</p>
                    </div>
                </div>
            </div>
            <button onClick={confirmBooking} className="w-full bg-green-300 bg-opacity-70 text-black p-2 rounded-md"> Confirm booking</button>
        </div>
    );
}

export default BookingConfirmation;