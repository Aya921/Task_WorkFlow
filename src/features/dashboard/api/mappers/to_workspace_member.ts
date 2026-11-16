import type { WorkspaceMember } from "../../domain/entity/workspace_member";
import type { WorkspaceMemberDto } from "../dtos/workspace_member_dto";

export const toWorkspaceMember = (dto: WorkspaceMemberDto): WorkspaceMember => ({
  userId: dto.userId,
  fullName: dto.fullName,
  email: dto.email,
  role: dto.role,
});
