import { AtSign } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { useAuth } from "../../../../../../hooks/use_auth";
import { ROUTES } from "../../../../../../routes/route_path";
import { InputField } from "../../../../../../shared/components/input_field";
import { AuthDivider } from "../../../common/auth_divider";
import { AuthGoogleButton } from "../../../common/auth_google_button";
import { useLoginMutation } from "../../hooks/use_login_mutation";
import {
  createLoginSchema,
  type LoginFormData,
} from "../../types/login_schema";
import { LoginEntranceItem } from "./login_entrance";
import {
  LOGIN_ENTRANCE_TRANSITION,
  LOGIN_STAGGER_S,
} from "./login_motion";
import { LoginRememberMe } from "./login_remember_me";
import { LoginSubmitButton } from "./login_submit_button";

export const LoginForm = () => {
  const { t } = useTranslation("login");
  const rememberId = useId();
  const reduceMotion = useReducedMotion();
  const reduced = Boolean(reduceMotion);
  const navigate = useNavigate();
  const { user, profile, profileLoading, sessionLoading } = useAuth();
  const { loginFn, isLoading } = useLoginMutation();
  const [isRedirecting, setIsRedirecting] = useState(false);

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

  useEffect(() => {
    if (!isRedirecting) return;
    if (sessionLoading || !user || profileLoading) return;

    if (profile?.onboardingCompleted) {
      void navigate(ROUTES.DASHBOARD, { replace: true });
      return;
    }

    void navigate(`/signup/${profile?.onboardingStep ?? "account"}`, {
      replace: true,
    });
  }, [
    isRedirecting,
    user,
    profile,
    profileLoading,
    sessionLoading,
    navigate,
  ]);

  const onSubmit = (data: LoginFormData) => {
    loginFn(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
      {
        onSuccess: () => {
          setIsRedirecting(true);
        },
      },
    );
  };

  const formVariants: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ...(reduced ? { duration: 0 } : LOGIN_ENTRANCE_TRANSITION),
        staggerChildren: reduced ? 0 : LOGIN_STAGGER_S,
        delayChildren: reduced ? 0 : 0.02,
      },
    },
  };

  return (
    <motion.form
      className="space-y-6"
      variants={formVariants}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <LoginEntranceItem>
        <AuthGoogleButton label={t("social.google")} />
      </LoginEntranceItem>

      <LoginEntranceItem>
        <AuthDivider label={t("divider")} />
      </LoginEntranceItem>

      <LoginEntranceItem>
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
      </LoginEntranceItem>

      <LoginEntranceItem>
        <InputField
          label={t("inputs.password.label")}
          labelClassName={`block ${FONT_STYLES.overline} text-secondary-900`}
          labelAccessory={
            <button
              type="button"
              className={`cursor-pointer ${FONT_STYLES.caption} font-medium text-primary-600 underline-offset-2 transition-colors duration-150 ease-out hover:text-accent-500 hover:underline motion-reduce:transition-none`}
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
      </LoginEntranceItem>

      <LoginEntranceItem>
        <LoginRememberMe
          id={rememberId}
          label={t("rememberMe")}
          {...register("rememberMe")}
        />
      </LoginEntranceItem>

      <LoginEntranceItem>
        <LoginSubmitButton
          label={t("buttons.login")}
          isLoading={isLoading || isRedirecting}
        />
      </LoginEntranceItem>
    </motion.form>
  );
};
