import type { ComponentProps } from "react";
import { FONT_STYLES } from "../../assets/fonts/font_style";
import { Button } from "./button";

type TextLinkProps = Omit<
  ComponentProps<typeof Button>,
  "activeClassName" | "children"
> & {
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
    <div className="flex items-center justify-center gap-1.5">
      <p className={`${FONT_STYLES.bodySm} text-secondary-500`}>{text}</p>

      <Button
        type="button"
        wrapperClassName="inline-flex"
        className={`p-0 ${className}`}
        activeClassName="border-transparent bg-transparent"
        {...props}
      >
        {actionText}
      </Button>
    </div>
  );
};
