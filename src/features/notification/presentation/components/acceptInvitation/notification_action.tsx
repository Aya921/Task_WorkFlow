import { useNotificationContext } from "../../hooks/use_notification_context";
import { NotificationInvitationActions } from "../notification_invitation_actions";
import type { NotificationEntity } from "../../../domain/entity/notification";
import { useDeclineInvitationMutation } from "../../hooks/use_decline_invitation_mutation";

type NotificationActionProps = {
    notification: NotificationEntity;
}
export const NotificationAction = ({ notification }: NotificationActionProps) => {
    const { openAcceptModal } = useNotificationContext();
    const { declineInvitation, isDeclining, declineError } =
    useDeclineInvitationMutation();
    return <div className="ms-10 sm:ms-11">
    <NotificationInvitationActions
      onAccept={() => openAcceptModal(notification)}
      onDecline={() => {
        const invitationId = notification.data.invitationId;
        if (invitationId) {
          declineInvitation(invitationId);
        }
      }}
      isDeclining={isDeclining}
      errorMessage={declineError}
    />
  </div>
}