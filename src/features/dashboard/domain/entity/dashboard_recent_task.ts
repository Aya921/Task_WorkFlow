import type { DashboardMember } from "./dashboard_members"; 

export type DashboardRecentTask = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
  updatedAt: string;
  projectId: string;
  projectName: string;
  assignedTo: string | null;
  assignee: DashboardMember | null;
};
