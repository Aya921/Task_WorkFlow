import type { JoinWorkspaceByInviteRequest } from "../../domain/entity/join_workspace_by_invite_request";
import type { JoinWorkspaceByInviteRequestDto } from "../dtos/join_workspace_by_invite_request_dto";

export const toJoinWorkspaceByInviteRequestDto = (
  entity: JoinWorkspaceByInviteRequest,
): JoinWorkspaceByInviteRequestDto => ({
  code: entity.code,
});