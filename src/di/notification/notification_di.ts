import { NotificationApiService } from "../../features/notification/api/client/notification_api_service";
import { NotificationDataSourceImp } from "../../features/notification/api/data_source/notification_datasource_imp";
import { NotificationRepoImp } from "../../features/notification/data/repo/notification_repo_imp";
import { AcceptProjectInvitation } from "../../features/notification/domain/usecase/accept_project_invitation";
import { DeclineProjectInvitation } from "../../features/notification/domain/usecase/decline_project_invitation";
import { DeleteNotification } from "../../features/notification/domain/usecase/delete_notification";
import { GetNotifications } from "../../features/notification/domain/usecase/get_notifications";
import { MarkAllNotificationsAsRead } from "../../features/notification/domain/usecase/mark_all_notifications_as_read";
import { MarkNotificationAsRead } from "../../features/notification/domain/usecase/mark_notification_as_read";

const notificationApiService = new NotificationApiService();
const notificationDataSource = NotificationDataSourceImp(notificationApiService);
const notificationRepo = NotificationRepoImp(notificationDataSource);

export const getNotificationsUseCase = GetNotifications(notificationRepo);
export const markNotificationAsReadUseCase =
  MarkNotificationAsRead(notificationRepo);
export const markAllNotificationsAsReadUseCase =
  MarkAllNotificationsAsRead(notificationRepo);
export const acceptProjectInvitationUseCase =
  AcceptProjectInvitation(notificationRepo);
export const declineProjectInvitationUseCase =
  DeclineProjectInvitation(notificationRepo);
export const deleteNotificationUseCase = DeleteNotification(notificationRepo);
