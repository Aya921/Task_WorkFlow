import type { ToastType } from "../types/toast_message_type";

export const getToastStyles = (
  toastType: ToastType
) => {
  switch (toastType) {
    case "success":
      return {
        container:
          "border border-green-500/20 bg-green-500/10 text-green-700",
        icon: "✓",
      };

    case "error":
      return {
        container:
          "border border-red-500/20 bg-red-500/10 text-red-700",
        icon: "✕",
      };

    default:
      return {
        container:
          "border border-primary-500/20 bg-primary-500/10 text-primary-700",
        icon: "ℹ",
      };
  }
};