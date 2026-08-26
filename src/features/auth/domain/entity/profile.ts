import type { SignupStepKey } from "../../presentation/signup/types/signup_progress_bar_types";

export type Profile = {
  userId: string;
  userName: string;
  userEmail: string;
  onboardingStep: SignupStepKey;
  onboardingCompleted: boolean;
};
