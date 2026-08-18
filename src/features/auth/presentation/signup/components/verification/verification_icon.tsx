import { Mail } from "lucide-react";

export const VerificationIcon = () => {
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-200 sm:h-20 sm:w-20">
      <Mail
        className="h-7 w-7 text-primary-800 sm:h-8 sm:w-8"
        aria-hidden
      />
    </div>
  );
};
