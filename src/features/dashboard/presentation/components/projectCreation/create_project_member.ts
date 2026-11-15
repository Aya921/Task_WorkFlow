export type ProjectMemberRole =
  | "projectLead"
  | "admin"
  | "editor"
  | "contributor"
  | "viewer";

export type CreateProjectMember = {
  id: string;
  name: string;
  email?: string;
  role: ProjectMemberRole;
  avatarUrl?: string;
};

export const PROJECT_MEMBER_ROLES: ProjectMemberRole[] = [
  "projectLead",
  "admin",
  "editor",
  "contributor",
  "viewer",
];
