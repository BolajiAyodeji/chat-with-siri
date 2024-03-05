import { toast } from "react-toastify";
import type { ToastContent, ToastOptions } from "react-toastify";

export default function notifyUser(
  message: ToastContent,
  options: ToastOptions
) {
  toast(message, {
    position: "top-right",
    theme: "light",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    pauseOnFocusLoss: false,
    ...options,
  });
}
