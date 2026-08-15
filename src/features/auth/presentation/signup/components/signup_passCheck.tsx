import { Check } from "lucide-react";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type SignupPasswordCheckListProps = {
  label: string;
  isValid: boolean;
};

export const SignupPasswordCheckList = ({
  label,
  isValid,
}: SignupPasswordCheckListProps) => {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          isValid ? "border-primary-800 bg-primary-800" : "border-secondary-300 bg-white"
        }`}
      >
        {isValid && (
          <span className="text-white">
            <Check size={10} aria-hidden />
          </span>
        )}
      </div>
      <p className={`${FONT_STYLES.caption} truncate sm:whitespace-normal`}>{label}</p>
    </div>
  );
};
