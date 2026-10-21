import { ArrowRight } from "lucide-react";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

type LoginSubmitButtonProps = {
  label: string;
};

export const LoginSubmitButton = ({ label }: LoginSubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 ${FONT_STYLES.button} text-white shadow-sm transition-[transform,background-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 active:scale-[0.98] active:bg-primary-800 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100`}
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
    </button>
  );
};
