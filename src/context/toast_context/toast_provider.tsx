import { useCallback, useMemo, useState } from "react";
import type { ToastType } from "../../types/toast_message_type";
import { ToastContext, type ToastMessage } from "./toast_context";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, toastType: ToastType = "info") => {
      const toast: ToastMessage = {
        id: crypto.randomUUID(),
        message,
        toastType,
      };
      setToasts((prev) => [...prev, toast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    },
    [],
  );

  const values = useMemo(
    () => ({
      toasts,
      showToast,
    }),
    [toasts, showToast],
  );

  return (
    <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
  );
};
