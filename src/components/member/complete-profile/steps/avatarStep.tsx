"use client";
import { useState } from "react";
import Image from "next/image";
import avatar1 from "../../../../../public/images/avatars/avatar1.jpg";
import avatar2 from "../../../../../public/images/avatars/avatar2.jpg";
import avatar3 from "../../../../../public/images/avatars/avatar3.jpg";
import avatar4 from "../../../../../public/images/avatars/avatar4.jpg";
import { useCompleteProfileProvider } from "@/context/completeProfileProvider";

const AvatarStep = () => {
  const { profileData, setProfileData } = useCompleteProfileProvider();
  const [preview, setPreview] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof typeof profileData,
    value: string | boolean | null
  ): void => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-pana/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-pear">
        Choose Your Avatar
      </h2>
      <div className="flex flex-col items-center">
        {profileData.avatar ? (
          <div className="flex flex-col justify-around items-center">
            <div className="min-w-32 w-100 min-h-32 h-100 rounded-full border-2 border-pear flex items-center justify-center overflow-hidden relative">
              <Image
                src={`/images/avatars/${profileData.avatar}.jpg`}
                alt="Avatar preview"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <button
                className="text-gray-800 cursor-pointer rounded-lg bg-pear text-sm px-2"
                onClick={() => {
                  setPreview(null);
                  handleInputChange("avatar", null);
                }}
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-around gap-4 items-center">
            <div className="flex flex-row justify-around gap-4">
              <button
                className={`${
                  preview && preview === "avatar1"
                    ? "ring-2 ring-pear"
                    : "ring-0"
                } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-all duration-200`}
                onClick={() => setPreview("avatar1")}
              >
                <Image src={avatar1} alt="Avatar1" />
              </button>
              <button
                className={`${
                  preview && preview === "avatar2"
                    ? "ring-2 ring-pear"
                    : "ring-0"
                } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-transform duration-200`}
                onClick={() => setPreview("avatar2")}
              >
                <Image src={avatar2} alt="Avatar2" />
              </button>
            </div>
            <div className="flex flex-row justify-around gap-4">
              <button
                className={`${
                  preview && preview === "avatar3"
                    ? "ring-2 ring-pear"
                    : "ring-0"
                } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-transform duration-200`}
                onClick={() => setPreview("avatar3")}
              >
                <Image src={avatar3} alt="Avatar3" />
              </button>
              <button
                className={`${
                  preview && preview === "avatar4"
                    ? "ring-2 ring-pear"
                    : "ring-0"
                } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-transform duration-200`}
                onClick={() => setPreview("avatar4")}
              >
                <Image src={avatar4} alt="Avatar4" />
              </button>
            </div>
            {preview && (
              <button
                className="text-pear cursor-pointer"
                onClick={() => handleInputChange("avatar", preview)}
              >
                Choose this Avatar {" >"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarStep;
