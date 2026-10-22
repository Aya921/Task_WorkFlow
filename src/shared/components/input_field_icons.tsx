import type { LucideIcon } from "lucide-react";

type InputFieldIconProps = {
  icon: LucideIcon;
  position: "start" | "end";
};

export const InputFieldIcon = ({
  icon: Icon,
  position,
}: InputFieldIconProps) => {
  const focusTone =
    "transition-colors duration-150 ease-out group-focus-within/input:text-primary-600 motion-reduce:transition-none";

  if (position === "start") {
    return (
      <span
        className={`absolute start-3 top-1/2 -translate-y-1/2 text-secondary-400 ${focusTone}`}
      >
        <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
      </span>
    );
  }

  return (
    <span
      className={`pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-secondary-500 ${focusTone}`}
    >
      <Icon className="h-4 w-4" aria-hidden />
    </span>
  );
};
