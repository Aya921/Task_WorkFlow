import type { ApiResponse } from "../../../../core/api/api_type";
import i18n from "../../../../i18n";
import type { NotificationDataSource } from "../../data/dataSources/notification_datasource";
import type { Notification } from "../../domain/entity/notification";
import type { NotificationApiService } from "../client/notification_api_service";
import type { NotificationDto } from "../dtos/notification_dto";
import { toNotification } from "../mappers/to_notification";

export const NotificationDataSourceImp = (
  apiService: NotificationApiService,
): NotificationDataSource => ({
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    const { data, error } = await apiService.getNotifications();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const rows = (data as NotificationDto[] | null) ?? [];

    return {
      success: true,
      data: rows.map(toNotification),
    };
  },

  async markAsRead(
    notificationId: string,
  ): Promise<ApiResponse<Notification>> {
    const { data, error } = await apiService.markAsRead(notificationId);

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    if (!data) {
      return {
        success: false,
        message: i18n.t("common:notification.updateFailed"),
      };
    }

    return {
      success: true,
      data: toNotification(data as NotificationDto),
    };
  },

  async markAllAsRead(): Promise<ApiResponse<Notification[]>> {
    const { data, error } = await apiService.markAllAsRead();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    const rows = (data as NotificationDto[] | null) ?? [];

    return {
      success: true,
      data: rows.map(toNotification),
    };
  },
});
