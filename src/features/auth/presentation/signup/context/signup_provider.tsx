import { useCallback, useEffect, useMemo, useState } from "react";
import { SignupContext } from "./signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";
import { StorageKeys } from "../../../../../constants/storage_keys";
import type { CreateUserStepEntity } from "../../../domain/entity/crate_user_entity";
import { useParams } from "react-router-dom";

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [signupData, setSignupData] = useState<CreateUserStepEntity>(() => {
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

  useEffect(() => {
    sessionStorage.setItem(StorageKeys.SIGNUP_DATA, JSON.stringify(signupData));
  }, [signupData]);

  const { step } = useParams();

const currentStep =
  signupSteps.find((s) => s.stepKey === step)?.stepNumber ?? 1;

  useEffect(() => {
    sessionStorage.setItem(StorageKeys.CURRENT_STEP, currentStep.toString());
  }, [currentStep]);

  const totalSteps = signupSteps.length;

  const nextStep = () => {
    const next = Math.min(currentStep + 1, totalSteps);
    return signupSteps[next - 1].stepKey;
  };



  const updateSignupData = useCallback(
    (data: Partial<CreateUserStepEntity>) => {
      setSignupData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      totalSteps,
      currentStep,
      nextStep,
     
      signupData,
      updateSignupData,
    }),
    [
      totalSteps,
      currentStep,
      nextStep,
      
      signupData,
      updateSignupData,
    ],
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};
