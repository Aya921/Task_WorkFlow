import { FONT_STYLES } from "../../assets/fonts/font_style";
import type { InputFieldSize, InputStatus } from "./input_field_types";

const fieldSizeClasses: Record<InputFieldSize, string> = {
  md: "h-11 md:h-12 rounded-xl border-2",
  sm: "rounded-lg border py-2.5",
};

const statusClasses: Record<InputFieldSize, Record<InputStatus, string>> = {
  md: {
    default: "border-secondary-300 focus:ring-primary-500",
    error: "border-red-500 focus:ring-red-500/20",
    success: "border-green-500 focus:ring-green-500/20",
  },
  sm: {
    default:
      "border-secondary-200 focus:border-primary-600 focus:ring-accent-400/40",
    error: "border-rose-500 focus:border-rose-500 focus:ring-rose-400",
    success: "border-green-500 focus:ring-green-500/20",
  },
};

export const inputMessageClasses: Record<InputStatus, string> = {
  default: "text-secondary-500",
  error: "text-red-500",
  success: "text-success",
};

type BuildInputClassNameArgs = {
  fieldSize: InputFieldSize;
  status: InputStatus;
  showStartIcon: boolean;
  showEndAffordance: boolean;
  className: string;
};

export const buildInputClassName = ({
  fieldSize,
  status,
  showStartIcon,
  showEndAffordance,
  className,
}: BuildInputClassNameArgs) => {
  return [
    "w-full outline-none shadow-sm focus:ring-2",
    "transition-[border-color,box-shadow,color] duration-200 ease-out",
    "motion-reduce:transition-none",
    fieldSizeClasses[fieldSize],
    showStartIcon ? "ps-10" : "ps-3.5 sm:ps-4",
    showEndAffordance ? "pe-10" : "pe-3.5 sm:pe-4",
    FONT_STYLES.input,
    statusClasses[fieldSize][status],
    fieldSize === "md"
      ? "focus:border-transparent hover:border-secondary-500"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
};
