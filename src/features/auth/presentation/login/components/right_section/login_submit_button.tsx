import { ArrowRight } from "lucide-react";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";
import { Button } from "../../../../../../shared/components/button";

type LoginSubmitButtonProps = {
  label: string;
  isLoading?: boolean;
};

export const LoginSubmitButton = ({
  label,
  isLoading = false,
}: LoginSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      className={`mt-2 w-full px-4 py-2.5 ${FONT_STYLES.button} hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100`}
      activeClassName="bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md active:bg-primary-800"
      disabledClassName="cursor-not-allowed bg-primary-600 text-white opacity-70"
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
    </Button>
  );
};
