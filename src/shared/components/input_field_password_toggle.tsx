import { Eye, EyeOff } from "lucide-react";

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
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        showPassword
          ? (hidePasswordLabel ?? "Hide password")
          : (showPasswordLabel ?? "Show password")
      }
      className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer text-secondary-400 transition-colors duration-150 ease-out hover:text-secondary-600 focus:outline-none focus-visible:text-primary-600 motion-reduce:transition-none"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
      ) : (
        <Eye className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
      )}
    </button>
  );
};
