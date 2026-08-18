import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { Button } from "../../../../../../shared/components/button";
import { useSignupContext } from "../../hooks/use_signup_context";

type VerificationBtnProps = {
  otp: string;
  otpNumbers: number;
};

export const VerificationBtn = ({ otp, otpNumbers }: VerificationBtnProps) => {
  const { t } = useTranslation("signup");
  const isValidOtp = otp.length === otpNumbers;
  const { nextStep, previousStep } = useSignupContext();
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex w-full flex-col-reverse gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
      <Button
        onClick={() => {
          previousStep();
          navigate("/");
        }}
        className="w-full sm:max-w-[200px]"
        activeClassName={`hover:bg-primary-100 text-secondary-600 cursor-pointer ${FONT_STYLES.body}`}
      >
        <ArrowLeft
          size={20}
          className="shrink-0 rtl:rotate-180"
          aria-hidden
        />
        <span className={FONT_STYLES.button}>{t("verification.buttons.back")}</span>
      </Button>

      <Button
        onClick={() => {
          nextStep();
        }}
        disabled={!isValidOtp}
        className="w-full sm:max-w-sm"
        activeClassName="bg-primary-800 hover:bg-primary-900 text-white cursor-pointer"
        disabledClassName="bg-primary-200 text-white cursor-not-allowed"
      >
        <span className={FONT_STYLES.button}>
          {t("verification.buttons.verifyContinue")}
        </span>
        <ArrowRight
          size={20}
          className="shrink-0 rtl:rotate-180"
          aria-hidden
        />
      </Button>
    </div>
  );
};
