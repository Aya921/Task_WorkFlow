import { AcceptInvitationModal } from "../components/acceptInvitation/accept_invitation_modal";
import { NotificationsEmpty } from "../components/notifications_empty";
import { NotificationsError } from "../components/notifications_error";
import { NotificationsFilters } from "../components/notifications_filters";
import { NotificationsHeader } from "../components/notifications_header";
import { NotificationsList } from "../components/notifications_list";
import { NotificationsLoading } from "../components/notifications_loading";
import { useNotificationContext } from "../hooks/use_notification_context";
import { useNotificationsView } from "../hooks/use_notifications_view";

export const NotificationsPage = () => {
  const {
    filter,
    setFilter,
    unreadCount,
    groups,
    hasNotifications,
    isLoading,
    isError,
    errorMessage,
    refetch,
    markAllAsRead,
  } = useNotificationsView();
  const { isAcceptModalOpen } = useNotificationContext();

  const renderContent = () => {
    if (isLoading) {
      return <NotificationsLoading />;
    }
    if (isError) {
      return (
        <NotificationsError
          message={errorMessage}
          onRetry={() => void refetch()}
        />
      );
    }
    if (!hasNotifications) {
      return <NotificationsEmpty />;
    }
    return <NotificationsList groups={groups} />;
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 sm:gap-6">
        <NotificationsHeader
          unreadCount={unreadCount}
          onMarkAllAsRead={markAllAsRead}
        />

        <NotificationsFilters value={filter} onChange={setFilter} />

        {renderContent()}
      </div>

      {isAcceptModalOpen ? <AcceptInvitationModal /> : null}
    </main>
  );
};
