import { OTPInput } from "input-otp";
import { useState } from "react";

export const OtpCode = () => {
  const [otp, setOtp] = useState("");
  const otpNumbers = 6;
  return (
    <div className="w-full my-10">
      <OTPInput
        value={otp}
        onChange={setOtp}
        maxLength={otpNumbers}
        render={({ slots }) => (
          <div className="flex gap-2 w-full justify-between">
            {slots.map((slot, index) => (
              <div
                key={index}
                className={` 
            flex h-30 w-20 items-center justify-center
            rounded-xl border border-neutral-300
            bg-primary-100 text-xl font-semibold
            ${slot.isActive ? "border-primary-500" : ""}
          `}
              >
                {slot.char ?? ""}
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
};
