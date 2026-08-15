import { Mail } from "lucide-react";

export const VerificationIcon = () => {
  return (
    <div className="w-20 h-20 rounded-full bg-primary-200 flex items-center justify-center">
      <Mail size={30} className="text-primary-800" />
    </div>
  );
};
