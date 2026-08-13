import { useCallback, useMemo, useState } from "react";
import { SignupContext } from "./signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
 
  const totalSteps = signupSteps.length;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps);
     
      return next;
    });
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

 

  const value = useMemo(
    () => ({
      totalSteps,
      currentStep,
    
      nextStep,
      previousStep,
     
    }),
    [totalSteps, currentStep,nextStep, previousStep],
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};
