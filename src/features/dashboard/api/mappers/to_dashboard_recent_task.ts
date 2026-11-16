import type { DashboardMember } from "../../domain/entity/dashboard_members";
import type { DashboardRecentTask } from "../../domain/entity/dashboard_recent_task";
import type {
  DashboardRecentTaskDto,
  DashboardTaskAssigneeDto,
} from "../dtos/dashboard_recent_task_dto";

const toDashboardTaskAssignee = (
  dto: DashboardTaskAssigneeDto,
): DashboardMember => ({
  id: dto.id,
  fullName: dto.fullName,
});

export const toDashboardRecentTask = (
  dto: DashboardRecentTaskDto,
): DashboardRecentTask => ({
  id: dto.id,
  title: dto.title,
  status: dto.status,
  priority: dto.priority,
  dueDate: dto.dueDate,
  updatedAt: dto.updatedAt,
  projectId: dto.projectId,
  projectName: dto.projectName,
  assignedTo: dto.assignedTo,
  assignee: dto.assignee ? toDashboardTaskAssignee(dto.assignee) : null,
});
