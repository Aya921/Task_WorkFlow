import type { DashboardMetrics } from "../../domain/entity/dashboard_metrics";
import type { DashboardMetricsDto } from "../dtos/dashboard_metrics_dto";

export const toDashboardMetrics = (
  dto: DashboardMetricsDto,
): DashboardMetrics => ({
  totalTasks: dto.totalTasks,
  inProgress: dto.inProgress,
  completed: dto.completed,
  overdue: dto.overdue,
});
