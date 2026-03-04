"use client";

import { createPortal } from "react-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "./ui";

interface ModalProps {
  open: boolean;
  title?: string;
  message?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  open,
  title = "Confirm",
  message,
  content,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}: ModalProps) {
  const { t } = useTranslation();
  const finalConfirmText = confirmText || t("yes");
  const finalCancelText = cancelText || t("no");
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[9999]"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-xl w-80 relative animate-fade-in max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onCancel}
          variant="transparent"
          className="absolute top-2 right-2"
        >
          ✕
        </Button>

        {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
        {message && <p className="text-gray-700 mb-5">{message}</p>}
        {content && <div className="mb-5">{content}</div>}

        {onConfirm && (
          <div className="flex justify-between gap-2 ">
            <Button
              variant="secondary"
              onClick={onCancel}
              className="min-w-[80px]"
            >
              {finalCancelText}
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              className="min-w-[80px]"
            >
              {finalConfirmText}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
