import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

export const VerificationHeader = () => {
  return (
    <div className="flex flex-col justify-center items-center   text-center">
      <h1 className={`${FONT_STYLES.h1}`}>Check your inbox</h1>
      <p className={`${FONT_STYLES.bodySm}`}>
        <p>We sent a 6-digit code to dev@workspace.com.</p>
        <p>Please enter it below to verify your email.</p>
      </p>
    </div>
  );
};
