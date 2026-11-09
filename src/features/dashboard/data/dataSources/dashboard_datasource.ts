import type { ApiResponse } from "../../../../core/api/api_type";
import type { WorkspaceDashboard } from "../../domain/entity/workspace_dashboard";

export interface DashboardDataSource {
  getWorkspaceDashboard(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceDashboard>>;
}
