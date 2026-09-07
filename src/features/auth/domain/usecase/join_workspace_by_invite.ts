import type { JoinWorkspaceByInviteRequest } from "../entity/join_workspace_by_invite_request";
import type { AuthRepo } from "../repo/signup_repo";

export const JoinWorkspaceByInvite =
  (repo: AuthRepo) => async (entity: JoinWorkspaceByInviteRequest) => {
    return await repo.joinWorkspaceByInvite(entity);
  };