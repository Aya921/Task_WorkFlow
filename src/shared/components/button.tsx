import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  activeClassName: string;
  disabledClassName?: string;
};

export const Button = ({
  disabled,
  activeClassName,
  disabledClassName,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
    type="button"
      disabled={disabled}
      className={`
        transition-all duration-200 rounded-full p-3 flex items-center justify-center gap-2 w-full
        
        ${disabled ? disabledClassName : activeClassName}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};