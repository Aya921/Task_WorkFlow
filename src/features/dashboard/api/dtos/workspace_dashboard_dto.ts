import type { DashboardMetricsDto } from "./dashboard_metrics_dto";
import type { DashboardProjectDto } from "./dashboard_project_dto";
import type { DashboardRecentTaskDto } from "./dashboard_recent_task_dto";

export type WorkspaceDashboardDto = {
  metrics: DashboardMetricsDto;
  projects: DashboardProjectDto[];
  recentTasks: DashboardRecentTaskDto[];
};
