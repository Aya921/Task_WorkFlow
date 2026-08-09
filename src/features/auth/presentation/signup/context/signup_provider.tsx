import { useCallback, useMemo, useState } from "react";
import { SignupContext } from "./signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const totalSteps = signupSteps.length;

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps);
      setMaxStepReached((max) => Math.max(max, next));
      return next;
    });
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.min(step, maxStepReached));
  }, [maxStepReached]);

  const value = useMemo(
    () => ({
      totalSteps,
      currentStep,
      maxStepReached,
      nextStep,
      previousStep,
      goToStep,
    }),
    [totalSteps, currentStep, maxStepReached, nextStep, previousStep, goToStep],
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
};
