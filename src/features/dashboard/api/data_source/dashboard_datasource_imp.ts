import type { ApiResponse } from "../../../../core/api/api_type";
import i18n from "../../../../i18n";
import type { DashboardDataSource } from "../../data/dataSources/dashboard_datasource";
import type { AddProjectRequest } from "../../domain/entity/add_project_request";
import type { AddProjectResult } from "../../domain/entity/add_project_result";
import type { WorkspaceDashboard } from "../../domain/entity/workspace_dashboard";
import type { DashboardApiService } from "../client/dashboard_api_service";
import type { AddProjectResponseDto } from "../dtos/add_project_response_dto";
import type { WorkspaceDashboardDto } from "../dtos/workspace_dashboard_dto";
import { toAddProjectRequestDto } from "../mappers/to_add_project_request_dto";
import { toAddProjectResult } from "../mappers/to_add_project_result";
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

  async addProject(
    request: AddProjectRequest,
  ): Promise<ApiResponse<AddProjectResult>> {
    const { data, error } = await apiService.addProject(
      toAddProjectRequestDto(request),
    );

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const rows = data as AddProjectResponseDto[] | null;
    const row = rows?.[0];

    if (!row) {
      return {
        success: false,
        message: i18n.t("common:dashboard.createProjectFailed"),
      };
    }

    return {
      success: true,
      data: toAddProjectResult(row),
    };
  },
});

