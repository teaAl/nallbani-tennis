import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import { useCompleteProfileProvider } from "@/context/completeProfileProvider";
import { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import PhoneInput from "react-phone-input-2";
import { StepBack, StepForward } from "lucide-react";

const PersonalInfoStep = () => {
  const { profileData, setProfileData } = useCompleteProfileProvider();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const years = Array.from(
    { length: new Date().getFullYear() - 1960 + 1 },
    (_, i) => 1960 + i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleInputChange = (
    field: keyof typeof profileData,
    value: string | boolean | File | null
  ): void => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    handleInputChange("birthday", date ? date.toISOString() : null);
  };

  return (
    <div className="bg-pana/10 backdrop-blur-lg p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-pear">
        Personal Information
      </h2>
      <form className="flex flex-col gap-6">
        <div className="">
          <label
            className="block text-foreground font-poppins text-xs mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number <span className="text-red-400">*</span>
          </label>
          <PhoneInput
            country={"al"}
            value={profileData.phoneNumber || ""}
            onChange={(phone: string) =>
              handleInputChange("phoneNumber", phone)
            }
            inputProps={{
              name: "phoneNumber",
              required: true,
            }}
            containerClass="w-full"
            inputClass="!w-full !py-5 !border !border-pear/30 !rounded !bg-transparent !focus:outline-none !focus:bg-pana/5 !text-foreground !transition-colors !duration-200"
            buttonClass="!border-0 !bg-transparent !border-r !border-r-pear/30 !rounded-l !focus:outline-none !focus:bg-pana/5 !hover:bg-transparent !text-foreground !transition-colors !duration-200"
            dropdownClass="!bg-gray-800 !backdrop-blur-lg !border !border-pear/30 !rounded !shadow-md"
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-4">
          <div className="w-full">
            <label
              className="block text-foreground font-poppins text-xs mb-2"
              htmlFor="age"
            >
              Birthday <span className="text-red-400">*</span>
            </label>
            <DatePicker
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex flex-row justify-around items-center rounded-lg p-2">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    <StepBack className="w-5 h-5 text-pear cursor-pointer" />
                  </button>
                  <div className="flex flex-row gap-2">
                    <select
                      value={date.getFullYear()}
                      onChange={({ target: { value } }) =>
                        changeYear(Number(value))
                      }
                      className="w-full border border-pear/30 rounded px-3 py-1 bg-pear focus:outline-none focus:bg-pear/70 text-gray-800 transition-colors duration-200 cursor-pointer"
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={months[date.getMonth()]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                      className="w-full border border-pear/30 rounded px-3 py-1 bg-pear focus:outline-none focus:bg-pear/70 text-gray-800 transition-colors duration-200 cursor-pointer"
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    <StepForward className="w-5 h-5 text-pear cursor-pointer" />
                  </button>
                </div>
              )}
              dateFormat="dd/MM/yyyy"
              selected={
                profileData.birthday
                  ? new Date(profileData.birthday)
                  : startDate
              }
              onChange={(date) => handleDateChange(date)}
              className="w-full border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-foreground font-poppins text-xs mb-2"
              htmlFor="level"
            >
              Skill Level
            </label>
            <select
              id="level"
              value={profileData.level}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleInputChange(
                  "level",
                  e.target.value as
                    | "beginner"
                    | "intermediate"
                    | "advanced"
                    | "professional"
                )
              }
              required
              className="w-full border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
              <option value="PROFESSIONAL">Professional</option>
            </select>
          </div>
        </div>

        {/* <div className="w-full">
          <label
            className="block text-foreground font-poppins text-xs mb-2"
            htmlFor="isParent"
          >
            Notes for the Coach
          </label>
          <textarea className="w-full h-32 border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"></textarea>
        </div> */}

        <div className="w-full">
          <label
            className="block text-foreground font-poppins text-xs mb-2"
            htmlFor="isParent"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={profileData.bio || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange("bio", e.target.value)
            }
            rows={4}
            placeholder="Tell us about yourself (optional)"
            maxLength={200}
            className="w-full h-32 border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"
          >
            {profileData.bio
              ? profileData.bio
              : "Tell us about yourself (optional)"}
          </textarea>
        </div>
        <div className="w-full">
          <label
            className="block text-foreground font-poppins text-xs mb-2"
            htmlFor="level"
          >
            Prefered Time to play
          </label>
          <select
            id="level"
            value={profileData.preferedTime}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(
                "preferedTime",
                e.target.value as
                  | "MORNING"
                  | "LATE_MORNING"
                  | "AFTERNOON"
                  | "EVENING"
                  | "NIGHT"
                  | "ANYTIME"
              )
            }
            className="w-full border border-pear/30 rounded px-3 py-2 focus:outline-none focus:bg-pana/5 text-foreground transition-colors duration-200"
          >
            <option value="MORNING">Morning</option>
            <option value="LATE_MORNING">Late Morning</option>
            <option value="AFTERNOON">Afternoon</option>
            <option value="EVENING">Evening</option>
            <option value="NIGHT">Night</option>
            <option value="ANYTIME">Anytime</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
