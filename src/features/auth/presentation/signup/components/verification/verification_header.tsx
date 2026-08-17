import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { useSignupContext } from "../../hooks/use_signup_context";

export const VerificationHeader = () => {
  const {signupData}=useSignupContext()
  const email=signupData.email
  return (
    <div className="flex flex-col justify-center items-center   text-center">
      <h1 className={`${FONT_STYLES.h1}`}>Check your inbox</h1>
      <div className={`${FONT_STYLES.bodySm}`}>
        <p>{`We sent a 6-digit code to ${email}.`}</p>
        <p>Please enter it below to verify your email.</p>
      </div>
    </div>
  );
};
