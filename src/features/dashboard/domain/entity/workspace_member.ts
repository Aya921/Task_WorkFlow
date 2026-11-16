import type { WorkspaceRole } from "./workspace_role";

export type WorkspaceMember = {
  userId: string;
  fullName: string;
  email: string ;
  role: WorkspaceRole;
};
