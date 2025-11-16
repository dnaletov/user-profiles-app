"use client";

interface ModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  open,
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-xl w-80 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        {message && <p className="text-gray-700 mb-5">{message}</p>}

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
