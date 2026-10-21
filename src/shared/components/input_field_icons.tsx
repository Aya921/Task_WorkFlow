import type { LucideIcon } from "lucide-react";

type InputFieldIconProps = {
  icon: LucideIcon;
  position: "start" | "end";
};

export const InputFieldIcon = ({ icon: Icon, position }: InputFieldIconProps) => {
  if (position === "start") {
    return (
      <span className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary-400">
        <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
      </span>
    );
  }

  return (
    <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-secondary-500">
      <Icon className="h-4 w-4" aria-hidden />
    </span>
  );
};
