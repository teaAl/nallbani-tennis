// import { useEffect, useState } from "react";
// import HourPicker from "./hourPicker";
// import NewCalendar from "./calendar";
// import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";
// import {
//   HandThumbDownIcon,
//   HandThumbUpIcon,
// } from "@heroicons/react/24/outline";

// const DateTime = () => {
//   const todayDate = new Date();

//   const [flipped, setFlipped] = useState(false);

//   return (
//     <div className="flex flex-col items-center w-full gap-6">
//       <div className="group w-full max-w-[380px] xs:max-w-[400px] md:h-[420px] md:max-w-[430px] [perspective:1000px]">
//         <div
//           className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
//             flipped ? "[transform:rotateY(180deg)]" : ""
//           }`}
//         >
//           {/* Front Face */}
//           <div className="absolute inset-0 h-full w-full mx-auto rounded-xl [backface-visibility:hidden]">
//             <NewCalendar />
//           </div>
//           {/* Back Face */}
//           <div className="h-full w-full rounded-xl p-2 bg-[#171717ba] backdrop-blur-xs text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
//             {/* <div className="flex min-h-full flex-col items-center justify-around gap-6">
// 							<HourPicker date={dateBooked || todayDate} />
// 						</div> */}
//           </div>
//         </div>
//       </div>
//       {/* <div
// 				className={`${!allowProceed ? "opacity-0 -z-50" : "opacity-100 z-50"
// 					} flex flex-row justify-around align-middle items-center duration-300 transition-all`}>
// 				<div className={`cursor-pointer`}>
// 					<button
// 						type="submit"
// 						className="bg-transparent text-pear justify-items-center p-4 rounded-full scale-95 animate-bounce duration-300 transition-all hover:scale-100"
// 						onClick={nextStep}>
// 						Proceed
// 						<ChevronDoubleDownIcon className="w-10 h-10" />
// 					</button>
// 				</div>
// 			</div> */}
//     </div>
//   );
// };

// export default DateTime;
