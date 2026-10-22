import { ArrowRight } from "lucide-react";
import { FONT_STYLES } from "../../../../../../assets/fonts/font_style";

type LoginSubmitButtonProps = {
  label: string;
  isLoading?: boolean;
};

export const LoginSubmitButton = ({
  label,
  isLoading = false,
}: LoginSubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      aria-busy={isLoading}
      className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 ${FONT_STYLES.button} text-white shadow-sm transition-[transform,background-color,box-shadow] duration-150 ease-out hover:scale-[1.01] hover:bg-primary-700 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 active:scale-[0.98] active:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-primary-600 disabled:hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100`}
    >
      {isLoading ? (
        <div className="flex items-center gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-current animate-bounce" />
          <span
            className="h-2 w-2 rounded-full bg-current animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-current animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </>
      )}
    </button>
  );
};
