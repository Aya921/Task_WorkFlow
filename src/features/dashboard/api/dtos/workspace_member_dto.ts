import type { WorkspaceRole } from "../../domain/entity/workspace_role";
export type WorkspaceMemberDto = {
  userId: string;
  fullName: string;
  email: string ;
  role: WorkspaceRole;
};
