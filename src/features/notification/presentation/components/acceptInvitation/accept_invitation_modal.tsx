import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IdCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { InputField } from "../../../../../shared/components/input_field";
import { useAcceptInvitationMutation } from "../../hooks/use_accept_invitation_mutation";
import { useNotificationContext } from "../../hooks/use_notification_context";
import {
  createAcceptInvitationSchema,
  type AcceptInvitationFormData,
} from "../../types/accept_invitation_schema";
import { AcceptInvitationFooter } from "./accept_invitation_footer";
import { AcceptInvitationHeader } from "./accept_invitation_header";
import { AcceptInvitationProjectCard } from "./accept_invitation_project_card";

export const AcceptInvitationModal = () => {
  const { t } = useTranslation("notification");
  const { selectedNotification: notification, closeAcceptModal: onClose } =
    useNotificationContext();
  const { acceptInvitation, isAccepting, acceptError } =
    useAcceptInvitationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationFormData>({
    resolver: zodResolver(createAcceptInvitationSchema(t)),
    mode: "onSubmit",
    defaultValues: { jobTitle: "" },
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isAccepting) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, isAccepting]);

  const handleClose = () => {
    if (!isAccepting) {
      onClose();
    }
  };

  const onSubmit = (data: AcceptInvitationFormData) => {
    const invitationId = notification?.data.invitationId;
    if (!invitationId) {
      return;
    }

    acceptInvitation(
      { invitationId, jobTitle: data.jobTitle.trim() },
      { onSuccess: onClose },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label={t("acceptInvitation.close")}
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={handleClose}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-modal="true"
        aria-label={t("acceptInvitation.title")}
        className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-secondary-100 bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          <AcceptInvitationHeader
            inviterName={notification?.data.inviterName ?? ""}
            onClose={handleClose}
          />

          <AcceptInvitationProjectCard
            projectName={notification?.data.projectName ?? ""}
            workspaceName={notification?.data.workspaceName ?? ""}
            invitedRole={
              typeof notification?.data.invitedRole === "string"
                ? notification.data.invitedRole
                : undefined
            }
          />

          <InputField
            label={t("acceptInvitation.fields.jobTitle.label")}
            labelClassName={`block ${FONT_STYLES.overline} text-secondary-900`}
            type="text"
            autoComplete="organization-title"
            placeholder={t("acceptInvitation.fields.jobTitle.placeholder")}
            fieldSize="sm"
            icon={IdCard}
            iconPosition="end"
            status={errors.jobTitle ? "error" : "default"}
            message={
              errors.jobTitle?.message ??
              t("acceptInvitation.fields.jobTitle.hint")
            }
            {...register("jobTitle")}
          />
        </div>

        <div className="border-t border-secondary-100 bg-white p-4 sm:px-5 sm:py-3">
          <AcceptInvitationFooter
            onCancel={handleClose}
            isSubmitting={isAccepting}
            errorMessage={acceptError}
          />
        </div>
      </form>
    </div>
  );
};
