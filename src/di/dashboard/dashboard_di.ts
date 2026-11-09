import { DashboardApiService } from "../../features/dashboard/api/client/dashboard_api_service";
import { DashboardDataSourceImp } from "../../features/dashboard/api/data_source/dashboard_datasource_imp";
import { DashboardRepoImp } from "../../features/dashboard/data/repo/dashboard_repo_imp";
import { GetWorkspaceDashboard } from "../../features/dashboard/domain/usecase/get_workspace_dashboard";

const dashboardApiService = new DashboardApiService();

const dashboardDataSource = DashboardDataSourceImp(dashboardApiService);

const dashboardRepo = DashboardRepoImp(dashboardDataSource);

export const getWorkspaceDashboardUseCase =
  GetWorkspaceDashboard(dashboardRepo);
