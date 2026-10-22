import { useTranslation } from "react-i18next";
import { AuthSectionHeader } from "../components/auth_header";
import { Button } from "../../../../../shared/components/button";
import { FaGithub } from "react-icons/fa";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { ArrowRight } from "lucide-react";
import { useUpdateOnboardingStepMutation } from "../../profile/hook/use_update_onboarding_step";
import { useAuth } from "../../../../../hooks/use_auth";

import { PageTransition } from "../layout/page_transition";

export const ConnectGitHubPage = () => {
  const { user } = useAuth();

  const {
    updateOnboardingStepFn,
    isLoading: isUpdatingOnboardingStep,
    error: updatingOnboardingStepError,
  } = useUpdateOnboardingStepMutation();

  const handleContinue = () => {
    if (!user?.id) return;

    updateOnboardingStepFn(
      {
        userId: user.id,
        onboardingStep: "success",
        onboardingCompleted: true,
      },
    );
  };
  const { t } = useTranslation("signup");
  return (
    <PageTransition>
      <div className="flex w-full flex-1 flex-col items-center justify-between gap-8 py-2 sm:gap-10 sm:py-4 md:gap-12">
        <AuthSectionHeader
          className="mx-auto text-center"
          title={t("github.title")}
          description={t("github.description")}
        />

        <Button
          aria-label={t("github.connect")}
          className="max-w-xl rounded-xl p-4 sm:p-5"
          activeClassName="border border-secondary-200 bg-white text-secondary-800 shadow-sm hover:border-secondary-300 hover:bg-secondary-50"
        >
          <FaGithub className="h-5 w-5 shrink-0" aria-hidden />
          <span className={FONT_STYLES.button}>{t("github.connect")}</span>
        </Button>

        <div className="flex justify-center">
          <span className="rounded-full border border-secondary-200 bg-secondary-50 px-4 py-1.5 text-xs font-semibold text-secondary-600">
            Coming Soon
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
          onClick={handleContinue}
          isLoading={isUpdatingOnboardingStep}
          error={updatingOnboardingStepError}
          activeClassName="bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md"
          disabledClassName="cursor-not-allowed bg-secondary-200 text-secondary-500"
        >
          <span className={FONT_STYLES.button}>
            {t("github.buttons.continue")}
          </span>

          <ArrowRight
            size={20}
            className="shrink-0 rtl:rotate-180"
            aria-hidden
          />
        </Button>
      </div>
    </PageTransition>
  );
};
