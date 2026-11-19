import type { NotificationRepo } from "../repo/notification_repo";

export const AcceptProjectInvitation =
  (repo: NotificationRepo) =>
  async (invitationId: string, jobTitle: string) => {
    return await repo.acceptInvitation(invitationId, jobTitle);
  };
