import type { NotificationRepo } from "../repo/notification_repo";

export const DeclineProjectInvitation =
  (repo: NotificationRepo) => async (invitationId: string) => {
    return await repo.declineInvitation(invitationId);
  };
