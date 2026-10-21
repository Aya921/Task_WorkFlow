import type { InputHTMLAttributes } from "react";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

type LoginRememberMeProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const LoginRememberMe = ({
  id,
  label,
  className = "",
  ...props
}: LoginRememberMeProps) => {
  return (
    <div className="flex items-center justify-between pt-1">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-2 select-none"
      >
        <input
          id={id}
          type="checkbox"
          className={`h-4 w-4 rounded border-secondary-200 text-primary-600 transition focus:ring-2 focus:ring-accent-400 focus:ring-offset-1 ${className}`}
          {...props}
        />
        <span className={`${FONT_STYLES.caption} text-secondary-500`}>
          {label}
        </span>
      </label>
    </div>
  );
};
