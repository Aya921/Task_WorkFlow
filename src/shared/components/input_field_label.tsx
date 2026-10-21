import type { ReactNode } from "react";
import { FONT_STYLES } from "../../assets/fonts/font_style";

type InputFieldLabelProps = {
  htmlFor: string;
  label: string;
  labelClassName?: string;
  labelAccessory?: ReactNode;
};

export const InputFieldLabel = ({
  htmlFor,
  label,
  labelClassName,
  labelAccessory,
}: InputFieldLabelProps) => {
  return (
    <div
      className={
        labelAccessory ? "flex items-center justify-between gap-3" : undefined
      }
    >
      <label htmlFor={htmlFor} className={labelClassName ?? FONT_STYLES.label}>
        {label}
      </label>
      {labelAccessory}
    </div>
  );
};
