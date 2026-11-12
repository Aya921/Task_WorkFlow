import type { SignupStepKey } from "../../presentation/signup/types/signup_progress_bar_types";
import type { WorkspaceRole } from "../../domain/entity/workspace_role";

export type ProfileDto = {
  id: string;
  full_name: string;
  email: string;
  onboarding_step: SignupStepKey;
  onboarding_completed: boolean;
  current_workspace_id: string | null;
  current_workspace_role?: WorkspaceRole | null;
  created_at: string;
  updated_at: string;
};
