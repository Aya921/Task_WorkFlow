import type { SignupStepKey } from "../../presentation/signup/types/signup_progress_bar_types";
import type { WorkspaceRole } from "./workspace_role";

export type Profile = {
  userId: string;
  userName: string;
  userEmail: string;
  onboardingStep: SignupStepKey;
  onboardingCompleted: boolean;
  currentWorkspaceId: string | null;
  currentWorkspaceRole: WorkspaceRole | null;
};
