import type { ApiResponse } from "../../../../core/api/api_type";
import type { AddProjectRequest } from "../entity/add_project_request";
import type { AddProjectResult } from "../entity/add_project_result";
import type { WorkspaceDashboard } from "../entity/workspace_dashboard";
import type { WorkspaceInvite } from "../entity/workspace_invite";

export interface DashboardRepo {
  getWorkspaceDashboard(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceDashboard>>;
  addProject(
    request: AddProjectRequest,
  ): Promise<ApiResponse<AddProjectResult>>;
  deleteProject(projectId: string): Promise<ApiResponse<void>>;
  getWorkspaceInvite(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceInvite>>;
  regenerateWorkspaceInvite(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceInvite>>;
}
