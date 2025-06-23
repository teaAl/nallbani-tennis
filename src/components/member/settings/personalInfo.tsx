// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Label } from "@/components/ui/label";
// import { Modal } from "@/components/ui/modal";
// import { Textarea } from "@/components/ui/textarea";
// import { useEffect, useState } from "react";
// import AvatarSelect from "../complete-profile/avatarSelect";
// import { X } from "lucide-react";

// const PersonalInfo = ({ user }: { user: UserNT }) => {
//   const [userData, setUserData] = useState({
//     avatar: user?.avatar,
//     // name: user?.name,
//     // email: user?.email,
//     // phone: user?.phoneNumber,
//     // address: user?.address,
//     bio: user?.bio,
//     playingLevel: user?.level,
//     preferredPlayTime: user?.preferedPlayTime,
//   });
//   const [isFormChanged, setIsFormChanged] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<string>(user.avatar);

//   useEffect(() => {
//     const hasChanges =
//       userData.avatar !== user?.avatar ||
//       userData.bio !== user?.bio ||
//       userData.playingLevel !== user?.level ||
//       userData.preferredPlayTime !== user?.preferedPlayTime;
//     setIsFormChanged(hasChanges);
//   }, [user, userData]);

//   const handleInputChange = (e: { target: { name: any; value: any } }) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCancel = () => {
//     setUserData({
//       avatar: user?.avatar,
//       bio: user?.bio,
//       playingLevel: user?.level,
//       preferredPlayTime: user?.preferedPlayTime,
//     });
//   };

//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/users/${user.id}/update-profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           avatar: userData.avatar,
//           bio: userData.bio,
//           level: userData.playingLevel,
//           preferedTime: userData.preferredPlayTime,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       const data = await response.json();
//       console.log("Profile updated successfully", data);
//       setUserData((prev) => ({
//         ...prev,
//         avatar: userData.avatar,
//         bio: userData.bio,
//         playingLevel: userData.playingLevel,
//         preferredPlayTime: userData.preferredPlayTime,
//       }));
//       setIsFormChanged(false);
//       setPreview(userData.avatar);
//       // setCurrentUser((prev) => {
//       //   if (!prev) return null;
//       //   const updatedUser: UserNT = {
//       //     ...prev,
//       //     avatar: userData.avatar,
//       //     bio: userData.bio,
//       //     level: userData.playingLevel,
//       //     preferedPlayTime: userData.preferredPlayTime,
//       //   };
//       //   return updatedUser;
//       // });
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 py-4">
//       <div className="flex flex-row items-center justify-around gap-6 mb-6">
//         <div className="flex flex-col items-center space-y-2 ">
//           <Avatar className="h-30 w-30 border border-pear">
//             <AvatarImage src={`/images/avatars/${userData.avatar}.jpg`} />
//           </Avatar>
//           <button
//             className="rounded-lg text-sm px-3 text-pear/70 hover:text-pear/100 transition-colors cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             {" "}
//             Change avatar
//           </button>
//         </div>

//         <div className="flex flex-col space-y-2">
//           <div className="space-y-2">
//             <Label htmlFor="bio" className="text-foreground/30">
//               Bio
//             </Label>
//             <Textarea
//               id="bio"
//               name="bio"
//               value={userData.bio || ""}
//               onChange={handleInputChange}
//               rows={4}
//             />
//           </div>
//           <div className="flex flex-row justify-around items-center gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="playingLevel" className="text-foreground/30">
//                 Skill level
//               </Label>
//               <select
//                 id="playingLevel"
//                 name="playingLevel"
//                 value={userData.playingLevel}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded-md text-foreground border-foreground/30 focus:outline-none focus:border-pear/40"
//               >
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Advanced">Advanced</option>
//                 <option value="Professional">Professional</option>
//               </select>
//             </div>
//             <div className="w-full">
//               <Label
//                 className="block text-foreground font-poppins text-xs mb-2"
//                 htmlFor="level"
//               >
//                 Prefered Time to play
//               </Label>
//               <select
//                 id="preferredPlayTime"
//                 name="preferredPlayTime"
//                 value={userData.preferredPlayTime}
//                 onChange={handleInputChange}
//                 className="w-full border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"
//               >
//                 <option value="MORNING">Morning</option>
//                 <option value="LATE_MORNING">Late Morning</option>
//                 <option value="AFTERNOON">Afternoon</option>
//                 <option value="EVENING">Evening</option>
//                 <option value="NIGHT">Night</option>
//                 <option value="ANYTIME">Anytime</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-row justify-center gap-4">
//         <button
//           className={`bg-foreground text-gray-900 ${
//             isFormChanged
//               ? "opacity-100 hover:bg-pear hover:text-gray-900 cursor-pointer"
//               : "opacity-70 cursor-not-allowed"
//           } w-max rounded px-2 py-1 font-bold text-sm transition-colors`}
//           disabled={!isFormChanged}
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           onClick={handleUpdate}
//           className={`bg-gray-900 text-pear ${
//             isFormChanged
//               ? "opacity-100 text-pear hover:bg-pear hover:text-gray-900 cursor-pointer"
//               : "opacity-70 cursor-not-allowed"
//           } w-max rounded px-2 py-1 font-bold text-sm transition-colors`}
//           disabled={!isFormChanged}
//         >
//           Save changes
//         </button>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="flex flex-row justify-between">
//           <h2 className="text-lg font-bold mb-4">Choose an Avatar</h2>
//           <X
//             className=" cursor-pointer"
//             onClick={() => setIsModalOpen(false)}
//           />
//         </div>
//         <AvatarSelect user={user} preview={preview} setPreview={setPreview} />
//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             className="bg-pear hover:bg-pear/80 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
//             onClick={() => {
//               setUserData((prev) => ({
//                 ...prev,
//                 avatar: preview,
//               }));
//               setIsModalOpen(false);
//             }}
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default PersonalInfo;
