import { useTranslation } from "react-i18next";
import { AuthSectionHeader } from "../components/auth_header";
import { Button } from "../../../../../shared/components/button";
import { FaGithub } from "react-icons/fa";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { ArrowRight } from "lucide-react";

export const ConnectGitHubPage = () => {
  const { t } = useTranslation("signup");
  return (
    <div className="flex w-full flex-col items-center justify-between gap-8 py-2 sm:gap-10 sm:py-4 md:gap-12 ">
      <AuthSectionHeader
        className="mx-auto text-center"
        title={t("github.title")}
        description={t("github.description")}
      />
      <Button
        aria-label={t("github.connect")}
        className="max-w-xl rounded-xl p-4 sm:p-5"
        activeClassName="bg-neutral-200 text-white "
      >
        <FaGithub className="h-5 w-5 shrink-0" aria-hidden />
        <span className={FONT_STYLES.button}>{t("github.connect")}</span>
      </Button>


    <div className="flex justify-center">
  <span
    className="
      rounded-full
      border border-emerald-400/30
      bg-emerald-500/10
      px-4 py-2
      text-sm font-semibold
      text-emerald-400
      shadow-[0_0_20px_rgba(16,185,129,0.35)]
      animate-pulse
    "
  >
    ✨ Coming Soon
  </span>
</div>

      {/* <NavigationButtons
        backLabel={t("github.buttons.back")}
        nextLabel={t("github.buttons.continue")}
        onBack={() => {
         
          navigate(ROUTES.CREATE_WORKSPACE);
        }}
        onNext={() => {
          nextStep();
          navigate(ROUTES.SUCCESS_REGISTER);
        }}
      /> */}

      <Button
        onClick={() => {}}
     
        isLoading={false}
        activeClassName=" bg-gradient-to-r
from-primary-600/90
via-primary-500/80
to-rose-100/80
shadow-lg shadow-primary-500/10
hover:shadow-xl hover:shadow-primary-500/20
transition-all  text-white cursor-pointer"
        disabledClassName="bg-primary-200 text-white cursor-not-allowed"
      >
        <span className={FONT_STYLES.button}>
          {t("github.buttons.continue")}
        </span>

        <ArrowRight size={20} className="shrink-0 rtl:rotate-180" aria-hidden />
      </Button>

      
    </div>
  );
};
