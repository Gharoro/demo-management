import { useState, useEffect } from "react";
import type { ToastProps } from "../interfaces";

function Toast({
  message,
  type = "success",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-lg shadow-lg text-white ${typeStyles[type]}`}
      >
        <p className="text-sm font-medium">{message}</p>
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="text-white hover:opacity-70 text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;
