import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  activeClassName: string;
  disabledClassName?: string;
  isLoading?: boolean;
  error?: string | ReactNode;
};

export const Button = ({
  disabled,
  activeClassName,
  disabledClassName,
  className = "",
  children,
  isLoading,
  error,
  ...props
}: ButtonProps) => {
  const hasError = !!error;

  return (
    <div className="w-full  flex items-center justify-center">
      <button
        type="button"
        disabled={disabled}
        className={`
          cursor-pointer transition-all duration-200 rounded-full p-3 flex items-center justify-center gap-2 w-full border
          ${disabled ? disabledClassName : activeClassName}
          ${hasError ? "border-red-300 shadow-[0_0_0_4px_rgba(239,68,68,0.08)]" : "border-transparent"}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center  gap-1">
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
      </button>

      {hasError && (
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 shadow-sm">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
            !
          </span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
