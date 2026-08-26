import type { SignupStepKey } from "../../presentation/signup/types/signup_progress_bar_types";

export type ProfileDto = {
  id: string;
  full_name: string;
  email: string;
  onboarding_step: SignupStepKey;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};
