import { useToast } from "../../hooks/use_toast";
import { getToastStyles } from "../../utils/get_toast_style";

export const ToastContainer = () => {
  const { toasts } = useToast();

  const isRTL =
    document.documentElement.dir === "rtl";

  return (
    <div
      className={`
        fixed top-4 z-[9999]
        flex flex-col gap-3
        ${isRTL ? "left-4" : "right-4"}
      `}
    >
      {toasts.map((toast) => {
        const styles = getToastStyles(
          toast.toastType
        );

        return (
          <div
            key={toast.id}
            className={`
              min-w-[320px]
              max-w-[420px]
              rounded-2xl
              px-4 py-3
              shadow-xl
              backdrop-blur-lg
              flex items-center gap-3
              animate-[slideIn_.25s_ease-out]
              ${styles.container}
            `}
          >
            <div
              className="
                flex h-8 w-8 items-center
                justify-center rounded-full
                bg-white/60 text-sm font-semibold
              "
            >
              {styles.icon}
            </div>

            <p className="flex-1 text-sm font-medium">
              {toast.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};