import type { ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonProps = React.ComponentProps<typeof motion.button> & {
  activeClassName: string;
  disabledClassName?: string;
  isLoading?: boolean;
  error?: string | ReactNode;
  /** Defaults to a full-width column wrapper. Use `contents` or `inline-flex` for compact controls. */
  wrapperClassName?: string;
};

export const Button = ({
  disabled,
  activeClassName,
  disabledClassName,
  className = "",
  children,
  isLoading,
  error,
  wrapperClassName = "flex w-full flex-col items-center justify-center",
  type = "button",
  ...props
}: ButtonProps) => {
  const hasError = !!error;
  const isDisabled = Boolean(disabled || isLoading);
  

  return (
    <div className={wrapperClassName}>
      <motion.button
      whileHover={{ scale: 1.05, transition: { duration: 0.3} }}
      
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={`
          flex cursor-pointer items-center justify-center gap-2 rounded-lg border p-3 transition-[background-color,box-shadow,border-color,color] duration-150 ease-out
          ${isDisabled ? disabledClassName : activeClassName}
          ${hasError ? "border-rose-300 shadow-[0_0_0_4px_rgba(244,63,94,0.08)]" : "border-transparent"}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-current animate-bounce" />
            <span
              className="h-2 w-2 rounded-full bg-current animate-bounce"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="h-2 w-2 rounded-full bg-current animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        ) : (
          children
        )}
      </motion.button>

      {hasError ? (
        <div className="mt-2 flex w-full items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 shadow-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
            !
          </span>
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
};
