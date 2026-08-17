import { useCallback, useEffect, useMemo, useState } from "react";
import { SignupContext } from "./signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";
import { StorageKeys } from "../../../../../constants/storage_keys";
import type { SignupEntity } from "../../../domain/entity/signup_entity";

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [signupData, setSignupData] = useState<SignupEntity>(() => {
    const savedData = sessionStorage.getItem(StorageKeys.SIGNUP_DATA);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      fullName: "",
      email: "",
      password: "",
    };
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = sessionStorage.getItem(StorageKeys.CURRENT_STEP);

    return savedStep ? Number(savedStep) : 1;
  });

  useEffect(() => {
    sessionStorage.setItem(StorageKeys.CURRENT_STEP, currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
  sessionStorage.setItem(
    StorageKeys.SIGNUP_DATA,
    JSON.stringify(signupData)
  );
}, [signupData]);

  

  const totalSteps = signupSteps.length;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps);

      return next;
    });
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => {
      const prevStep = Math.max(1, prev - 1);

      return prevStep;
    });
  }, []);

  const updateSignupData = (data: Partial<SignupEntity>) => {
    setSignupData((prev) => ({
      ...prev,
      ...data,
    }));
   
  };

  const value = useMemo(
    () => ({
      totalSteps,
      currentStep,
      nextStep,
      previousStep,
      signupData,
      updateSignupData,
    }),
    [
      totalSteps,
      currentStep,
      nextStep,
      previousStep,
      signupData,
      updateSignupData,
    ],
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};
