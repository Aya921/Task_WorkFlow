import type { ApiResponse } from "../../../../core/api/api_type";
import type { DashboardDataSource } from "../../data/dataSources/dashboard_datasource";
import type { WorkspaceDashboard } from "../../domain/entity/workspace_dashboard";
import type { DashboardApiService } from "../client/dashboard_api_service";
import type { WorkspaceDashboardDto } from "../dtos/workspace_dashboard_dto";
import { toWorkspaceDashboard } from "../mappers/to_workspace_dashboard";

export const DashboardDataSourceImp = (
  apiService: DashboardApiService,
): DashboardDataSource => ({
  async getWorkspaceDashboard(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceDashboard>> {
    const { data, error } = await apiService.getWorkspaceDashboard(workspaceId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (!data) {
      return {
        success: false,
        message: "Dashboard data not found", //TODO: Add translation
      };
    }

    return {
      success: true,
      data: toWorkspaceDashboard(data as WorkspaceDashboardDto),
    };
  },
});
