import { createContext } from "react";
import type { ToastType } from "../../types/toast_message_type"

export interface ToastMessage{
    id:string,
    message:string,
    toastType:ToastType
}

export type ToastContextType={
    toasts:ToastMessage[],
    showToast:(
        message:string,
        type?:ToastType
    )=>void;

}

export const ToastContext=createContext<ToastContextType|null>(null)