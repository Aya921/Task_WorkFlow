import { CheckCircle2 } from "lucide-react";

type LoginBrandMarkProps = {
  name: string;
  variant?: "light" | "dark";
  className?: string;
};

export const LoginBrandMark = ({
  name,
  variant = "light",
  className = "",
}: LoginBrandMarkProps) => {
  const isLight = variant === "light";

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-sm sm:h-10 sm:w-10 sm:rounded-xl ${
          isLight
            ? "border border-white/25 bg-white/15 backdrop-blur-md"
            : "bg-primary-600"
        }`}
      >
        <CheckCircle2
          className={`h-5 w-5 sm:h-6 sm:w-6 ${"text-white"
          }`}
          strokeWidth={2.5}
          aria-hidden
        />
      </div>
      <span
        className={`text-xl font-bold tracking-tight sm:text-2xl ${
          isLight ? "text-white" : "text-secondary-900"
        }`}
      >
        {name}
      </span>
    </div>
  );
};
