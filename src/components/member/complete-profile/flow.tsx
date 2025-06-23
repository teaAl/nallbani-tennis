// "use client";

// import AvatarStep from "./steps/avatarStep";
// import PersonalInfoStep from "./steps/personalInfo";
// import PreferenceStep from "./steps/prefereceStep";
// import ConfirmationStep from "./steps/confirmationStep";
// // import { useCompleteProfileProvider } from "@/context/completeProfileProvider";

// const ProfileCompletionFlow = ({ id }: { id: string }) => {
//   // const { nextStep, prevStep, totalSteps, currentStep, profileData } =
//   //   useCompleteProfileProvider();

//   // // Render the current step
//   // const renderStep = () => {
//   //   switch (currentStep) {
//   //     case 1:
//   //       return <AvatarStep />;
//   //     case 2:
//   //       return <PersonalInfoStep />;
//   //     case 3:
//   //       return <PreferenceStep />;
//   //     case 4:
//   //       return <ConfirmationStep id={id} />;
//   //     default:
//   //       return null;
//   //   }
//   // };

//   // const isStepValid = () => {
//   //   switch (currentStep) {
//   //     case 1: // AvatarStep
//   //       return !!profileData.avatar; // Ensure avatar is selected
//   //     case 2: // PersonalInfoStep
//   //       return (
//   //         profileData.phoneNumber && profileData.birthday && profileData.level
//   //       );
//   //     case 3: // PreferenceStep
//   //       return profileData.level !== null; // Ensure skill level is selected
//   //     case 4: // ConfirmationStep
//   //       return true; // No validation needed for confirmation step
//   //     default:
//   //       return false;
//   //   }
//   // };

//   return (
//     <div className="max-w-2xl mx-auto py-8 px-4">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-center mb-4 text-foreground">
//           Complete Your Profile
//         </h1>
//         <p className="text-center text-foreground/70">
//           Please complete your profile before accessing the app. Step{" "}
//           {currentStep} of {totalSteps}
//         </p>

//         <div className="flex justify-between w-full text-pear mt-4">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 1}
//             className={`disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer opacity-100`}
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => {
//               if (isStepValid()) {
//                 nextStep();
//               } else {
//                 alert("Please complete all required fields before proceeding.");
//               }
//             }}
//             disabled={currentStep === totalSteps}
//             className={`disabled:cursor-default disabled:opacity-50 cursor-pointer opacity-100`}
//           >
//             Next
//           </button>
//         </div>

//         {/* Progress bar */}
//         <div className="w-full bg-gray-800 rounded-full h-2.5 mt-6">
//           <div
//             className="bg-pear h-2.5 rounded-full transition-all"
//             style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       {renderStep()}
//     </div>
//   );
// };

// export default ProfileCompletionFlow;
