import type { AlertProps } from "../interfaces";

function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-primary text-secondary">
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-4 text-secondary hover:opacity-70 text-xl leading-none"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Alert;
