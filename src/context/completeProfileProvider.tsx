"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  PROFESSIONAL = "PROFESSIONAL",
}

export enum PreferedPlayTime {
  MORNING = "MORNING",
  LATE_MORNING = "LATE_MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  ANYTIME = "ANYTIME",
}

interface Step {
  title: string;
  active: boolean;
  completed: boolean;
}

interface CompleteProfileContextProps {
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  //   goToStep: (index: number) => void;
  totalSteps: number;

  profileData: {
    avatar: string | null;
    phoneNumber: string | null;
    birthday: string; //TODO: change to Date of Birth or Birthday
    level: SkillLevel;
    bio: string | null;
    preferedTime: PreferedPlayTime;
    notesForCoach: string;
    // isParent: boolean;
    // interestedInLessons: boolean;
  };
  setProfileData: React.Dispatch<
    React.SetStateAction<{
      avatar: string | null;
      phoneNumber: string | null;
      birthday: string;
      level: SkillLevel;
      bio: string | null;
      preferedTime: PreferedPlayTime;
      notesForCoach: string;
      //   isParent: boolean;
      //   interestedInLessons: boolean;
    }>
  >;
}

const CompleteProfileContext = createContext<
  CompleteProfileContextProps | undefined
>(undefined);

export const CompleteProfileProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const updateSteps = (index: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, i) => ({
        ...step,
        active: i === index,
        completed: i < index,
      }))
    );
  };

  const nextStep = () => {
    setCurrentStep((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, totalSteps);
      updateSteps(newIndex);
      return newIndex;
    });
  };

  const prevStep = () => {
    setCurrentStep((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 1);
      updateSteps(newIndex);
      return newIndex;
    });
  };

  //   const goToStep = (index: number) => {
  //     setCurrentStep(index);
  //     updateSteps(index);
  //   };

  const [profileData, setProfileData] = useState<{
    avatar: string | null;
    phoneNumber: string | null;
    birthday: string;
    level: SkillLevel;
    bio: string | null;
    preferedTime: PreferedPlayTime;
    notesForCoach: string;
  }>({
    avatar: null,
    phoneNumber: null,
    birthday: "",
    level: SkillLevel.BEGINNER,
    bio: null,
    preferedTime: PreferedPlayTime.ANYTIME,
    notesForCoach: "",
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "profileCompleteData",
      JSON.stringify({ currentStep, profileData })
    );
  }, [currentStep, profileData]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("profileCompleteData");
    if (savedData) {
      const { currentStep: savedStep, profileData: savedProfileData } =
        JSON.parse(savedData);
      setCurrentStep(savedStep || 1);
      setProfileData(savedProfileData || {});
    }
  }, []);

  return (
    <CompleteProfileContext.Provider
      value={{
        steps,
        setSteps,
        currentStep,
        nextStep,
        prevStep,
        // goToStep,
        totalSteps,
        profileData,
        setProfileData,
      }}
    >
      {children}
    </CompleteProfileContext.Provider>
  );
};

export const useCompleteProfileProvider = () => {
  const context = useContext(CompleteProfileContext);
  if (!context) {
    throw new Error(
      "useCompleteProfile must be used within a CompleteProfileProvider"
    );
  }
  return context;
};
