import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AuthSectionHeader } from "../components/auth_header";
import { BackGroundSuccessAnimation } from "../../../../../animations/background_success_animation";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

export const SuccessRegisterPage = () => {
  const { t } = useTranslation("signup");
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

        <div className="w-full max-w-md">
          <Button
            onClick={() => navigate("/")}
            activeClassName="bg-gradient-to-r from-primary-600 via-primary-500 to-violet-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
            disabledClassName="bg-slate-200 text-slate-500 cursor-not-allowed"
            className="w-full"
          >
            <span className={FONT_STYLES.button}>{t("success.buttons.continue")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
