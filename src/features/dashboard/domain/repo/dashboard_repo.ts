import type { ApiResponse } from "../../../../core/api/api_type";
import type { WorkspaceDashboard } from "../entity/workspace_dashboard";

export interface DashboardRepo {
  getWorkspaceDashboard(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceDashboard>>;
}
