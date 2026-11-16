export type DashboardTaskAssigneeDto = {
  id: string;
  fullName: string;
};

export type DashboardRecentTaskDto = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
  updatedAt: string;
  projectId: string;
  projectName: string;
  assignedTo: string | null;
  assignee: DashboardTaskAssigneeDto | null;
};
