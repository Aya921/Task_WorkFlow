import type { ApiResponse } from "../../../../core/api/api_type";
import i18n from "../../../../i18n";
import type { DashboardDataSource } from "../../data/dataSources/dashboard_datasource";
import type { AddProjectRequest } from "../../domain/entity/add_project_request";
import type { AddProjectResult } from "../../domain/entity/add_project_result";
import type { WorkspaceDashboard } from "../../domain/entity/workspace_dashboard";
import type { WorkspaceInvite } from "../../domain/entity/workspace_invite";
import type { DashboardApiService } from "../client/dashboard_api_service";
import type { AddProjectResponseDto } from "../dtos/add_project_response_dto";
import type { WorkspaceDashboardDto } from "../dtos/workspace_dashboard_dto";
import type { WorkspaceInviteDto } from "../dtos/workspace_invite_dto";
import { toAddProjectRequestDto } from "../mappers/to_add_project_request_dto";
import { toAddProjectResult } from "../mappers/to_add_project_result";
import { toWorkspaceDashboard } from "../mappers/to_workspace_dashboard";
import { toWorkspaceInvite } from "../mappers/to_workspace_invite";

const readWorkspaceInviteResponse = (
  data: unknown,
): WorkspaceInvite | undefined => {
  const rows = data as WorkspaceInviteDto[] | WorkspaceInviteDto | null;
  const row = Array.isArray(rows) ? rows[0] : rows;
  return row ? toWorkspaceInvite(row) : undefined;
};

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

  async deleteProject(projectId: string): Promise<ApiResponse<void>> {
    const { error } = await apiService.deleteProject(projectId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return { success: true };
  },

  async getWorkspaceInvite(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceInvite>> {
    const { data, error } = await apiService.getWorkspaceInvite(workspaceId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const invite = readWorkspaceInviteResponse(data);
    if (!invite) {
      return {
        success: false,
        message: i18n.t("common:dashboard.workspaceInviteFailed"),
      };
    }

    return {
      success: true,
      data: invite,
    };
  },

  async regenerateWorkspaceInvite(
    workspaceId: string,
  ): Promise<ApiResponse<WorkspaceInvite>> {
    const { data, error } =
      await apiService.regenerateWorkspaceInvite(workspaceId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const invite = readWorkspaceInviteResponse(data);
    if (!invite) {
      return {
        success: false,
        message: i18n.t("common:dashboard.workspaceInviteFailed"),
      };
    }

    return {
      success: true,
      data: invite,
    };
  },
});
