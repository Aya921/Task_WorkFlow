import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../../../../shared/components/button";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";

type NavigationButtonsProps = {
  onBack: () => void;
  onNext: () => void;

  backLabel: string;
  nextLabel: string;

  isNextDisabled?: boolean;

  backButtonClassName?: string;
  nextButtonClassName?: string;
};

export const NavigationButtons = ({
  onBack,
  onNext,
  backLabel,
  nextLabel,
  isNextDisabled = false,
  backButtonClassName,
  nextButtonClassName,
}: NavigationButtonsProps) => {
  return (
    <div className="mt-4 flex w-full flex-col-reverse gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
      <Button
        onClick={onBack}
        className={`w-full sm:max-w-xs ${backButtonClassName ?? ""}`}
        activeClassName={`hover:bg-primary-100 text-secondary-600 cursor-pointer ${FONT_STYLES.body}`}
      >
        <ArrowLeft size={20} className="shrink-0 rtl:rotate-180" aria-hidden />
        <span className={FONT_STYLES.button}>{backLabel}</span>
      </Button>

      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`w-full sm:max-w-sm ${nextButtonClassName ?? ""}`}
        activeClassName=" bg-gradient-to-r
from-primary-600/90
via-primary-500/80
to-rose-100/80
shadow-lg shadow-primary-500/10
hover:shadow-xl hover:shadow-primary-500/20
transition-all  text-white cursor-pointer"
        disabledClassName="bg-primary-200 text-white cursor-not-allowed"
      >
        <span className={FONT_STYLES.button}>{nextLabel}</span>

        <ArrowRight size={20} className="shrink-0 rtl:rotate-180" aria-hidden />
      </Button>
    </div>
  );
};
