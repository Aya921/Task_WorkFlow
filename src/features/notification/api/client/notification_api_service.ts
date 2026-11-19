import { supabase } from "../../../../core/supabase/supabase_client";

export class NotificationApiService {
  async getNotifications() {
    return await supabase
      .from("notifications")
      .select("id, type, title, message, data, is_read, read_at, created_at")
      .order("created_at", { ascending: false });
  }

  async markAsRead(notificationId: string) {
    return await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .select("id, type, title, message, data, is_read, read_at, created_at")
      .single();
  }

  async markAllAsRead() {
    return await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false)
      .select("id, type, title, message, data, is_read, read_at, created_at");
  }

  async acceptInvitation(invitationId: string, jobTitle: string) {
    return await supabase.rpc("accept_project_invitation", {
      p_invitation_id: invitationId,
      p_job_title: jobTitle,
    });
  }

  async declineInvitation(invitationId: string) {
    return await supabase.rpc("decline_project_invitation", {
      p_invitation_id: invitationId,
    });
  }
}
