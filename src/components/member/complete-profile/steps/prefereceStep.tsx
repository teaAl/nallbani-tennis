// import { useCompleteProfileProvider } from "@/context/completeProfileProvider";
import { ChangeEvent, FormEvent, useState } from "react";

const PreferenceStep = () => {
  // const { profileData, setProfileData } = useCompleteProfileProvider();

  const handleInputChange = (
    // field: keyof typeof profileData,
    value: string | boolean | File | null
  ): void => {
    // setProfileData((prev) => ({
    //   ...prev,
    //   [field]: value,
    // }));
  };

  return (
    <div className="bg-pana/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-pear">
        Notes for your coach{" "}
        <span className="text-foreground/40 text-lg font-light">
          (optional)
        </span>
      </h2>
      {/* <div className="w-full">
        <textarea
          id="bio"
          value={profileData.notesForCoach || ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleInputChange("notesForCoach", e.target.value)
          }
          rows={4}
          placeholder="You can specify any requests, preferences, or anything else you want your coach to know"
          maxLength={200}
          className="w-full h-32 border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"
        >
          {profileData.notesForCoach
            ? profileData.notesForCoach
            : "Tell us about yourself (optional)"}
        </textarea>
      </div> */}
    </div>
  );
};

export default PreferenceStep;
