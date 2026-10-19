import { useCallback, useEffect, useMemo, useState } from "react";
import type { ToastType } from "../../types/toast_message_type";
import { ToastContext, type ToastMessage } from "./toast_context";
import {
  getErrorMessage,
  TOAST_ERROR_EVENT,
} from "../../utils/toast_error_event";

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

  useEffect(() => {
    const handleErrorToast = (event: Event) => {
      const message = (event as CustomEvent<string>).detail;

      if (message) {
        showToast(message, "error");
      }
    };

    window.addEventListener(TOAST_ERROR_EVENT, handleErrorToast);

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      showToast(getErrorMessage(event.reason), "error");
    };

    const handleWindowError = (event: ErrorEvent) => {
      showToast(getErrorMessage(event.error ?? event.message), "error");
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleWindowError);

    return () => {
      window.removeEventListener(TOAST_ERROR_EVENT, handleErrorToast);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleWindowError);
    };
  }, [showToast]);

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
