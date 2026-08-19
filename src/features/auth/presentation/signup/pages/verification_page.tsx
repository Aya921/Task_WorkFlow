import { useState } from "react";
import { OtpCode, OTP_LENGTH } from "../components/verification/otp_code";
import { ResendOtpBtn } from "../components/verification/resend_otp_btn";
import { VerificationHeader } from "../components/verification/verification_header";
import { IconContainer } from "../../../../../shared/components/icon_container";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavigationButtons } from "../components/navigation_btns";
import { useNavigate } from "react-router-dom";
import { useSignupContext } from "../hooks/use_signup_context";
import { ROUTES } from "../../../../../routes/route_path";

export const VerificationPage = () => {
  const [otp, setOtp] = useState<string>("");
  const { t } = useTranslation("signup");
  const { nextStep, previousStep } = useSignupContext();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-between overflow-x-hidden">
      <IconContainer icon={Mail} />

      <VerificationHeader />

      <OtpCode otp={otp} setOtp={setOtp} otpLength={OTP_LENGTH} />

      <ResendOtpBtn />

      <NavigationButtons
        backLabel={t("verification.buttons.back")}
        nextLabel={t("verification.buttons.verifyContinue")}
        isNextDisabled={otp.length !== OTP_LENGTH}
        onBack={() => {
          previousStep();
          navigate("/");
        }}
        onNext={() => {
          nextStep();
          navigate(ROUTES.CREATE_WORKSPACE);
        }}
      />
    </div>
  );
};
