import { NavigationButtons } from "../components/navigation_btns";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../../../routes/route_path";
import { useNavigate } from "react-router-dom";
import { useSignupContext } from "../hooks/use_signup_context";
import { AuthSectionHeader } from "../components/auth_header";
import { Button } from "../../../../../shared/components/button";
import { FaGithub } from "react-icons/fa";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";


export const ConnectGitHubPage = () => {
  const { t } = useTranslation("signup");
  const { previousStep, nextStep } = useSignupContext();
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-center gap-8 py-2 sm:gap-10 sm:py-4 md:gap-12">
      <AuthSectionHeader
        className="mx-auto text-center"
        title={t("github.title")}
        description={t("github.description")}
      />
      <Button
        aria-label={t("github.connect")}
        className="max-w-xl rounded-xl p-4 sm:p-5"
        activeClassName="bg-neutral-900 text-white hover:bg-neutral-800"
      >
        <FaGithub className="h-5 w-5 shrink-0" aria-hidden />
        <span className={FONT_STYLES.button}>{t("github.connect")}</span>
      </Button>

      <NavigationButtons
        backLabel={t("github.buttons.back")}
        nextLabel={t("github.buttons.continue")}
        onBack={() => {
          previousStep();
          navigate(ROUTES.CREATE_WORKSPACE);
        }}
        onNext={() => {
          nextStep();
          navigate(ROUTES.SUCCESS_REGISTER);
        }}
      />
    </div>
  );
};
