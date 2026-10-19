import type { SignupStepKey } from "../../presentation/signup/types/signup_progress_bar_types";

export type UpdateOnboardingStepRequestDto = {
  id: string;
  onboarding_step: SignupStepKey;
  onboarding_completed?: boolean;
};
