import type { ApiResponse } from "../../../../core/api/api_type";
import type { AddProjectRequest } from "../../domain/entity/add_project_request";
import type { AddProjectResult } from "../../domain/entity/add_project_result";
import type { WorkspaceDashboard } from "../../domain/entity/workspace_dashboard";
import type { WorkspaceInvite } from "../../domain/entity/workspace_invite";

export interface DashboardDataSource {
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
