import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { useSignupContext } from "../hooks/use_signup_context";
import { signupSteps } from "../types/signup_progress_bar_types";
import { motion } from "framer-motion";

const outerCircleBase =
  "flex h-9 w-9 items-center justify-center rounded-full border-2 sm:h-11 sm:w-11 md:h-12 md:w-12";

const innerCircleBase =
  "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold sm:h-6 sm:w-6 sm:text-sm md:h-7 md:w-7";

export const SignupProgressBar = () => {
  const { t } = useTranslation("signup");
  const { currentStep, totalSteps } = useSignupContext();
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepClassNameForOuterCircle = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      return `${outerCircleBase} border-primary-600 bg-primary-600`;
    }
    if (stepNumber === currentStep) {
      return `${outerCircleBase} border-primary-600 bg-white`;
    }
    return `${outerCircleBase} border-secondary-200 bg-secondary-50`;
  };

  const getStepClassNameForInnerCircle = (stepNumber: number) => {
    if (stepNumber < currentStep || stepNumber === currentStep) {
      return `${innerCircleBase} bg-primary-600 text-white`;
    }
    return `${innerCircleBase} bg-secondary-100 text-secondary-500`;
  };

  return (
    <div className="relative w-full max-w-5xl px-1 sm:px-2">
      <div className="absolute start-0 top-4 h-0.5 w-full bg-secondary-200 sm:top-5 md:top-[1.375rem]" />

      <motion.div
        className="absolute start-0 top-4 h-0.5 bg-primary-600 sm:top-5 md:top-[1.375rem]"
        initial={false}
        animate={{
          width: `${progressPercentage}%`,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex justify-between gap-1 sm:gap-2">
        {signupSteps.map((step) => (
          <div
            key={step.stepNumber}
            aria-current={step.stepNumber === currentStep ? "step" : undefined}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 sm:gap-2"
          >
            <div className={getStepClassNameForOuterCircle(step.stepNumber)}>
              <div className={getStepClassNameForInnerCircle(step.stepNumber)}>
                {step.stepNumber < currentStep ? (
                  <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                ) : (
                  step.stepNumber
                )}
              </div>
            </div>

            <span
              className={`${FONT_STYLES.caption} text-center leading-tight text-secondary-500 sm:max-w-none`}
            >
              {t(`progress.steps.${step.stepKey}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
