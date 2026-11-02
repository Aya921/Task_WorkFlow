import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";

type InputFieldPasswordToggleProps = {
  showPassword: boolean;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  onToggle: () => void;
};

export const InputFieldPasswordToggle = ({
  showPassword,
  showPasswordLabel,
  hidePasswordLabel,
  onToggle,
}: InputFieldPasswordToggleProps) => {
  return (
    <Button
      type="button"
      onClick={onToggle}
      aria-label={
        showPassword
          ? (hidePasswordLabel ?? "Hide password")
          : (showPasswordLabel ?? "Show password")
      }
      wrapperClassName="contents"
      className="absolute end-3 top-1/2 -translate-y-1/2 p-0 focus:outline-none motion-reduce:transition-none"
      activeClassName="border-transparent bg-transparent text-secondary-400 hover:text-secondary-600 focus-visible:text-primary-600"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
      ) : (
        <Eye className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
      )}
    </Button>
  );
};
