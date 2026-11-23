import type { WorkspaceInvite } from "../../domain/entity/workspace_invite";
import type { WorkspaceInviteDto } from "../dtos/workspace_invite_dto";

export const toWorkspaceInvite = (dto: WorkspaceInviteDto): WorkspaceInvite => ({
  inviteCode: dto.invite_code,
  expiresAt: dto.expires_at,
  isExpired: Boolean(dto.is_expired),
});
