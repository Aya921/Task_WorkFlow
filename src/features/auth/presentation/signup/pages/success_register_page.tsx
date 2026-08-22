import { NavigationButtons } from "../components/navigation_btns";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../../routes/route_path";
import { useNavigate } from "react-router-dom";
import { useSignupContext } from "../hooks/use_signup_context";
import { AuthSectionHeader } from "../components/auth_header";
import { BackGroundSuccessAnimation } from "../../../../../animations/background_success_animation";



export const SuccessRegisterPage = () => {
  const { t } = useTranslation("signup");
  const { previousStep } = useSignupContext();
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-[22rem] w-full items-center justify-center overflow-hidden py-8 sm:min-h-[26rem] sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <BackGroundSuccessAnimation />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-8 text-center sm:gap-10">
        <AuthSectionHeader
          className="text-center"
          title={t("success.title")}
          description={t("success.description")}
        />

        <NavigationButtons
          showBackButton={false}
          nextLabel={t("success.buttons.continue")}
          onNext={() => {
            previousStep();
            navigate(ROUTES.CONNECT_GITHUB);
          }}
        />
      </div>
    </div>
  );
};
