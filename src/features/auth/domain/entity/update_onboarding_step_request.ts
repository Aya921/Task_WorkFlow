import type { SignupStepKey } from "../../presentation/signup/types/signup_progress_bar_types";

export type UpdateOnboardingStepRequest = {
  userId: string;
  onboardingStep: SignupStepKey;
  onboardingCompleted?: boolean;
};
