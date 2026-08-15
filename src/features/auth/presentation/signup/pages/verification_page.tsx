import {  Mail } from "lucide-react";
import { useState } from "react";
import { ResendOtpBtn } from "../components/verification/resend_otp_btn";
import { OtpCode } from "../components/verification/otp_code";
import { VerificationBtn } from "../components/verification/verification_btn";
import { VerificationHeader } from "../components/verification/verification_header";

export const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const otpNumbers = 6;
 const isValidOtp: boolean = otp.length == otpNumbers;

  return (
    <div className="flex flex-col flex-1 items-center justify-between ">
      <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center">
        <Mail size={30} className="text-primary-800" />
      </div>

      <VerificationHeader />

      <OtpCode />

      <ResendOtpBtn />

      <VerificationBtn />
    </div>
  );
};
