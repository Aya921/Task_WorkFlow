import { OTPInput } from "input-otp";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const OTP_LENGTH = 6;

type OtpCodeProps = {
  otp: string;
  setOtp: (otpNumber: string) => void;
  otpLength?: number;
};

export const OtpCode = ({
  otp,
  setOtp,
  otpLength = OTP_LENGTH,
}: OtpCodeProps) => {
  return (
    <div className="my-6 w-full min-w-0 sm:my-8 md:my-10">
      <OTPInput
        value={otp}
        onChange={setOtp}
        maxLength={otpLength}
        containerClassName="w-full"
        render={({ slots }) => (
          <div className="flex w-full gap-1.5 sm:gap-2 md:gap-4">
            {slots.map((slot, index) => (
              <div
                key={index}
                className={`flex aspect-square min-w-0 flex-1 items-center justify-center rounded-xl border border-neutral-300 bg-primary-100 font-semibold ${FONT_STYLES.h3} ${
                  slot.isActive
                    ? "border-primary-500 ring-2 ring-primary-500/20"
                    : ""
                }`}
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
