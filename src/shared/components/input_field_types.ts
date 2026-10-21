import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type InputStatus = "default" | "error" | "success";
export type InputFieldSize = "md" | "sm";
export type InputErrorAppearance = "text" | "box";
export type InputIconPosition = "start" | "end";

export type InputFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  icon?: LucideIcon;
  iconPosition?: InputIconPosition;
  label: string;
  labelAccessory?: ReactNode;
  labelClassName?: string;
  status?: InputStatus;
  message?: string;
  errorAppearance?: InputErrorAppearance;
  fieldSize?: InputFieldSize;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
};
