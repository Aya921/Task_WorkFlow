import { useId } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { InputFieldLabel } from "../../../../../shared/components/input_field_label";
import { InputFieldMessage } from "../../../../../shared/components/input_field_message";
import { INVITATION_EXPIRY_OPTIONS } from "./invitation_expiry_options";

type CreateProjectInvitationExpiryFieldProps = {
  registration: UseFormRegisterReturn;
  errorMessage?: string;
};

export const CreateProjectInvitationExpiryField = ({
  registration,
  errorMessage,
}: CreateProjectInvitationExpiryFieldProps) => {
  const { t } = useTranslation("dashboard");
  const generatedId = useId();
  const inputId = `${registration.name}-${generatedId}`;
  const messageId = `${inputId}-message`;

  return (
    <div className="flex w-full flex-col gap-1">
      <InputFieldLabel
        htmlFor={inputId}
        label={t("createProject.invitationExpiry.label")}
        labelClassName={`block ${FONT_STYLES.overline} text-secondary-900`}
      />

      <select
        {...registration}
        id={inputId}
        aria-invalid={Boolean(errorMessage) || undefined}
        aria-describedby={messageId}
        className={[
          "w-full rounded-md border border-secondary-200 bg-white px-3 py-2 shadow-sm outline-none",
          "transition-[border-color,box-shadow] duration-200 ease-out",
          "focus:border-primary-600 focus:ring-2 focus:ring-accent-400/40",
          FONT_STYLES.caption,
          errorMessage
            ? "border-rose-500 focus:border-rose-500 focus:ring-rose-400"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {INVITATION_EXPIRY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.labelKey)}
          </option>
        ))}
      </select>

      <InputFieldMessage
        id={messageId}
        message={errorMessage ?? t("createProject.invitationExpiry.hint")}
        status={errorMessage ? "error" : "default"}
        errorAppearance="text"
      />
    </div>
  );
};
