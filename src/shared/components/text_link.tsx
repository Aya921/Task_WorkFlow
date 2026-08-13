import type { ButtonHTMLAttributes } from "react";
import { FONT_STYLES } from "../../assets/fonts/font_style";

type TextLinkProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  actionText: string;
};

export const TextLink = ({
  text,
  actionText,
  className = "",
  ...props
}: TextLinkProps) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <p className={`${FONT_STYLES.body} font-medium`}>
        {text}
      </p>

      <button
        type="button"
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {actionText}
      </button>
    </div>
  );
};