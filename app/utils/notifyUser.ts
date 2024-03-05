import { toast } from "react-toastify";
import type { ToastContent, ToastOptions } from "react-toastify";

export default function notifyUser(
  message: ToastContent,
  options: ToastOptions
) {
  toast(message, {
    position: "top-right",
    theme: "light",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: false,
    ...options,
  });
}
