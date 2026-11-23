import { DashboardApiService } from "../../features/dashboard/api/client/dashboard_api_service";
import { DashboardDataSourceImp } from "../../features/dashboard/api/data_source/dashboard_datasource_imp";
import { DashboardRepoImp } from "../../features/dashboard/data/repo/dashboard_repo_imp";
import { AddProject } from "../../features/dashboard/domain/usecase/add_project";
import { GetWorkspaceDashboard } from "../../features/dashboard/domain/usecase/get_workspace_dashboard";
import { GetWorkspaceInvite } from "../../features/dashboard/domain/usecase/get_workspace_invite";
import { RegenerateWorkspaceInvite } from "../../features/dashboard/domain/usecase/regenerate_workspace_invite";

const dashboardApiService = new DashboardApiService();

const dashboardDataSource = DashboardDataSourceImp(dashboardApiService);

const dashboardRepo = DashboardRepoImp(dashboardDataSource);

export const getWorkspaceDashboardUseCase =
  GetWorkspaceDashboard(dashboardRepo);

export const addProjectUseCase = AddProject(dashboardRepo);

export const getWorkspaceInviteUseCase = GetWorkspaceInvite(dashboardRepo);

export const regenerateWorkspaceInviteUseCase =
  RegenerateWorkspaceInvite(dashboardRepo);
