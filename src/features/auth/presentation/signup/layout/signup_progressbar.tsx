import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useSignupContext } from "../hooks/use_signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";

const outerCircleBase =
  "flex items-center justify-center rounded-full border-2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14";

const innerCircleBase =
  "flex items-center justify-center rounded-full font-bold w-5 h-5 text-xs sm:w-6 sm:h-6 sm:text-sm md:w-8 md:h-8 md:text-base";

export const SignupProgressBar = () => {
  const { t } = useTranslation("signup");
  const { currentStep, totalSteps } = useSignupContext();
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepClassNameForOuterCircle = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return `${outerCircleBase} border-primary-800 bg-primary-800`;
    }
    if (stepNumber === currentStep) {
      return `${outerCircleBase} border-primary-800 bg-white`;
    }
    return `${outerCircleBase} border-neutral-200 bg-secondary-100`;
  };

  const getStepClassNameForInnerCircle = (stepNumber: number) => {
    if (stepNumber < currentStep || stepNumber === currentStep) {
      return `${innerCircleBase} bg-primary-800 text-white`;
    }
    return `${innerCircleBase} bg-secondary-100 text-black`;
  };

  return (
    <div className="relative w-full max-w-5xl px-1 sm:px-2">
      <div className="absolute start-0 top-5 h-0.5 w-full bg-neutral-300 sm:top-6 md:top-7" />

      <div
        className="absolute start-0 top-5 h-0.5 bg-primary-800 transition-all duration-300 ease-in-out sm:top-6 md:top-7"
        style={{ width: `${progressPercentage}%` }}
      />

      <div className="relative z-10 flex justify-between gap-1 sm:gap-2">
        {signupSteps.map((step) => (
          <div
            key={step.stepNumber}
            aria-current={step.stepNumber === currentStep ? "step" : undefined}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 sm:gap-2"
          >
            <div className={getStepClassNameForOuterCircle(step.stepNumber)}>
              <div className={getStepClassNameForInnerCircle(step.stepNumber)}>
                {step.stepNumber < currentStep ? (
                  <Check className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
                ) : (
                  step.stepNumber
                )}
              </div>
            </div>

            <span
              className={`${FONT_STYLES.caption} text-center leading-tight text-neutral-700 sm:max-w-none`}
            >
              {t(`progress.steps.${step.stepKey}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
