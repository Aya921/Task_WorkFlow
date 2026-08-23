import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  activeClassName: string;
  disabledClassName?: string;
  isLoading?: boolean;
};

export const Button = ({
  disabled,
  activeClassName,
  disabledClassName,
  className = "",
  children,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
          cursor-pointer transition-all duration-200 rounded-full p-3 flex items-center justify-center gap-2 w-full
          
          ${disabled ? disabledClassName : activeClassName}
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
    </button>
  );
};
