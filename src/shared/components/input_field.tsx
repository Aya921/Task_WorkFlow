import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";
import { FONT_STYLES } from "../../assets/fonts/font_style";

type Status = "default" | "error" | "success";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon;
  label: string;
  status?: Status;
  message?: string;
};

const statusClasses = {
  default: "border-secondary-300",
  error: "border-red-500 focus:ring-red-500/20",
  success: "border-green-500 focus:ring-green-500/20",
};

const messageClasses = {
  default: "text-secondary-500",
  error: "text-red-500",
  success: "text-success",
};

export const InputField = ({
  label,
  icon: Icon,
  className = "",
  status = "default",
  message,
  ...props
}: InputFieldProps) => {
  const [showPass, setShowPass] = useState(false);

  const inputType =
    props.type === "password" && showPass ? "text" : props.type;

  return (
    <div className="flex flex-col gap-2">
      <label className={FONT_STYLES.label}>{label}</label>

      <div className="relative">
        <input
          {...props}
          type={inputType}
          className={`
            w-full
            h-11 md:h-12
            rounded-xl
            border-2
            outline-none
            shadow-sm
            transition-all
            ${Icon ? "ps-10" : "ps-4"}
            ${props.type === "password" ? "pe-10" : "pe-4"}
            ${FONT_STYLES.input}
            ${statusClasses[status]}
            focus:ring-2
            focus:ring-primary-500
            focus:border-transparent
            hover:border-secondary-500
            ${className}
          `}
        />

        {Icon && (
          <span className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary-400">
            <Icon className="h-4 w-4 md:h-5 md:w-5" />
          </span>
        )}

        {props.type === "password" && (
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-secondary-400 transition-colors hover:text-secondary-600"
          >
            {showPass ? (
              <EyeOff className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <Eye className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </button>
        )}
      </div>

      {message && (
        <span
          className={`${FONT_STYLES.caption} ${
            messageClasses[status]
          }`}
        >
          {message}
        </span>
      )}
    </div>
  );
};
