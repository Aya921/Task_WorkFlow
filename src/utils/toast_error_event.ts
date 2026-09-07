export const TOAST_ERROR_EVENT = "taskflow:toast-error";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error) {
    return error;
  }

  return "Something went wrong. Please try again.";
};

export const notifyErrorToast = (error: unknown) => {
  window.dispatchEvent(
    new CustomEvent(TOAST_ERROR_EVENT, {
      detail: getErrorMessage(error),
    }),
  );
};