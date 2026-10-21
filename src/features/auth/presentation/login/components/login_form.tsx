import { AtSign } from "lucide-react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { InputField } from "../../../../../shared/components/input_field";
import { AuthDivider } from "../../common/auth_divider";
import { AuthGoogleButton } from "../../common/auth_google_button";
import {
  createLoginSchema,
  type LoginFormData,
} from "../types/login_schema";
import { LoginRememberMe } from "./right_section/login_remember_me";
import { LoginSubmitButton } from "./right_section/login_submit_button";

export const LoginForm = () => {
  const { t } = useTranslation("login");
  const rememberId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(createLoginSchema(t)),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = () => {
    // UI-only for now — auth will be wired in a later task.
  };

  return (
    <div className="space-y-6">
      <AuthGoogleButton label={t("social.google")} />
      <AuthDivider label={t("divider")} />

      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputField
          label={t("inputs.email.label")}
          labelClassName={`block ${FONT_STYLES.overline} text-secondary-900`}
          icon={AtSign}
          iconPosition="end"
          type="email"
          autoComplete="email"
          placeholder={t("inputs.email.placeholder")}
          fieldSize="sm"
          status={errors.email ? "error" : "default"}
          message={errors.email?.message}
          {...register("email")}
        />

        <InputField
          label={t("inputs.password.label")}
          labelClassName={`block ${FONT_STYLES.overline} text-secondary-900`}
          labelAccessory={
            <button
              type="button"
              className={`cursor-pointer ${FONT_STYLES.caption} font-medium text-primary-600 transition-colors hover:text-accent-500 hover:underline`}
            >
              {t("links.forgotPassword")}
            </button>
          }
          type="password"
          autoComplete="current-password"
          placeholder={t("inputs.password.placeholder")}
          fieldSize="sm"
          errorAppearance="box"
          status={errors.password ? "error" : "default"}
          message={errors.password?.message}
          showPasswordLabel={t("buttons.showPassword")}
          hidePasswordLabel={t("buttons.hidePassword")}
          {...register("password")}
        />

        <LoginRememberMe
          id={rememberId}
          label={t("rememberMe")}
          {...register("rememberMe")}
        />

        <LoginSubmitButton label={t("buttons.login")} />
      </form>
    </div>
  );
};
