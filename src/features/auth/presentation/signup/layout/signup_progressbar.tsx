import { Check } from "lucide-react";
import { useSignupContext } from "../hooks/use_signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";

export const SignupProgressBar = () => {
  const { currentStep, totalSteps } = useSignupContext();
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepClassNameForOuterCircle = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return "w-14 h-14 border-2 border-primary-800 rounded-full flex items-center justify-center bg-primary-800";
    } else if (stepNumber === currentStep) {
      return "w-14 h-14 border-2 border-primary-800 rounded-full flex items-center justify-center bg-white";
    }
    return "w-14 h-14 border-2 border-neutral-200 rounded-full flex items-center justify-center bg-secondary-100";
  };
  const getStepClassNameForInnerCircle = (stepNumber: number) => {
    if (stepNumber < currentStep || stepNumber === currentStep) {
      return "w-8 h-8 rounded-full flex items-center justify-center bg-primary-800 text-white font-bold";
    }
    return "w-8 h-8 rounded-full flex items-center justify-center bg-secondary-100 text-black font-bold";
  };

  return (
    <div className="relative w-full max-w-5xl">
      {/* Gray line */}
      <div className="absolute top-7 left-0 w-full h-[2px] bg-neutral-300" />

      {/* Progress line */}
      <div
        className="absolute top-7 left-0 h-[2px] bg-primary-800 transition-all duration-300 ease-in-out"
        style={{ width: `${progressPercentage}%` }}
      />

      {/* Steps */}

      <div className="relative z-10 flex justify-between">
        {signupSteps.map((step) => (
          <div
            key={step.stepNumber}
            aria-current={step.stepNumber === currentStep ? "step" : undefined}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div
              className={getStepClassNameForOuterCircle(step.stepNumber)}
            >
              <div className={getStepClassNameForInnerCircle(step.stepNumber)}>
                {step.stepNumber < currentStep ? <Check /> : step.stepNumber}
              </div>
            </div>

            <span className="text-xs tracking-wider text-neutral-700">
              {step.stepName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
