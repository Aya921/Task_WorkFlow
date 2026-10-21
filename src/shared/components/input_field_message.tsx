import { FONT_STYLES } from "../../assets/fonts/font_style";
import { inputMessageClasses } from "./input_field_styles";
import type {
  InputErrorAppearance,
  InputStatus,
} from "./input_field_types";

type InputFieldMessageProps = {
  id?: string;
  message?: string;
  status: InputStatus;
  errorAppearance: InputErrorAppearance;
};

export const InputFieldMessage = ({
  id,
  message,
  status,
  errorAppearance,
}: InputFieldMessageProps) => {
  if (!message) {
    return null;
  }

  if (errorAppearance === "box" && status === "error") {
    return (
      <div
        id={id}
        role="alert"
        className={`mt-0.5 flex items-start gap-2 rounded-lg border border-rose-200/80 bg-rose-50/80 p-2 ${FONT_STYLES.caption} font-medium text-rose-600`}
      >
        <span>{message}</span>
      </div>
    );
  }

  return (
    <span id={id} className={`${FONT_STYLES.caption} ${inputMessageClasses[status]}`}>
      {message}
    </span>
  );
};
