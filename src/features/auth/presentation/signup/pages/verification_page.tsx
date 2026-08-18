import { useState } from "react";
import { OtpCode, OTP_LENGTH } from "../components/verification/otp_code";
import { ResendOtpBtn } from "../components/verification/resend_otp_btn";
import { VerificationBtn } from "../components/verification/verification_btn";
import { VerificationHeader } from "../components/verification/verification_header";
import { IconContainer } from "../../../../../shared/components/icon_container";
import { Mail } from "lucide-react";

export const VerificationPage = () => {
  const [otp, setOtp] = useState<string>("");

  return (
    <div className="w-full flex flex-col items-center justify-between overflow-x-hidden">
      <IconContainer icon={Mail} />

      <VerificationHeader />

      <OtpCode otp={otp} setOtp={setOtp} otpLength={OTP_LENGTH} />

      <ResendOtpBtn />

      <VerificationBtn otp={otp} otpNumbers={OTP_LENGTH} />
    </div>
  );
};


