import { useState } from "react";
import { OtpCode, OTP_LENGTH } from "../components/verification/otp_code";
import { ResendOtpBtn } from "../components/verification/resend_otp_btn";
import { VerificationBtn } from "../components/verification/verification_btn";
import { VerificationHeader } from "../components/verification/verification_header";
import { VerificationIcon } from "../components/verification/verification_icon";

export const VerificationPage = () => {
  const [otp, setOtp] = useState<string>("");

  return (
    <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-between gap-6 overflow-x-hidden px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 md:px-8 lg:px-10">
      <VerificationIcon />

      <VerificationHeader />

      <OtpCode otp={otp} setOtp={setOtp} otpLength={OTP_LENGTH} />

      <ResendOtpBtn />

      <VerificationBtn otp={otp} otpNumbers={OTP_LENGTH} />
    </div>
  );
};
