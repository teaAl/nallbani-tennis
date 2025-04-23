"use client";
import { useCompleteProfileProvider } from "@/context/completeProfileProvider";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ConfirmationStep = ({ id }: { id: string }) => {
  const router = useRouter();
  const { profileData } = useCompleteProfileProvider();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const getLevelName = (level: string): string => {
    const levels: Record<string, string> = {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      professional: "Professional",
    };
    return levels[level] || level;
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      console.log("Submitting profile data:", profileData);
      const response = await fetch(`/api/users/${id}/complete-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        console.error("Failed to update profile:", response);
        throw new Error("Failed to update profile");
      }

      // Clear local storage
      localStorage.removeItem("profileCompleteData");

      // Refresh the session to update the token
      await fetch("/api/auth/session?update=true");

      const { update } = useSession();
      await update();

      const data = await response.json();
      console.log("Profile updated successfully:", data);
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
      // router.push("/profile");
    }
  };

  return (
    <div className="bg-pana/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-pear">
        Confirm Your Profile
      </h2>

      <div className="mb-6 flex flex-row justify-evenly items-center gap-8">
        <div className="flex items-center justify-start">
          <div className="min-w-32 w-60 min-h-32 h-60 rounded-full overflow-hidden border-2 border-pear relative">
            {profileData.avatar ? (
              <div className="relative w-full h-full">
                <Image
                  src={`/images/avatars/${profileData.avatar}.jpg`}
                  alt="Avatar preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full gap-3 justify-between w-full">
          <div className="flex flex-row justify-between items-center gap-4 border-b border-l border-pear/10 p-2">
            <p className="text-foreground">Phone:</p>
            <p className="font-medium text-pear">{profileData.phoneNumber}</p>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 border-b border-r border-pear/10 p-2">
            <p className="text-foreground">Birthday:</p>
            <p className="font-medium text-pear">
              {formatDate(profileData.birthday)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 border-b border-l border-pear/10 p-2">
            <p className="text-foreground">Skill Level:</p>
            <p className="font-medium text-pear">
              {getLevelName(profileData.level)}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center gap-4 border-b border-r border-pear/10 p-2">
            <p className="text-foreground">Prefered Time to Play:</p>
            <p className="font-medium text-pear">{profileData.preferedTime}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-1 border-b border-l border-pear/10 p-2 shadow-sm">
            <p className="text-foreground">Bio:</p>
            <p className="font-medium text-pear">{profileData.bio || ""}</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-1 border-b border-r  border-pear/10 p-2">
            <p className="text-foreground">Notes for your coach:</p>
            <p className="font-medium text-pear">
              {profileData.notesForCoach || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-pear hover:bg-pear/80 text-gray-800 py-2 px-6 rounded flex justify-end cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Complete Profile"
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
