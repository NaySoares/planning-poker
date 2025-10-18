import { ReactNode } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  onConfirm: () => void;
}

export const Modal = ({ isOpen, onClose, children, className, onConfirm }: GenericModalProps) => {
  if (!isOpen) return null;

  const FooterModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
    return (
      <div className="flex justify-end gap-2">
        <button
          className="px-2 py-2 text-xs cursor-pointer bg-gray-600 rounded hover:bg-gray-800"
          onClick={() => onClose()}
        >
          Reestimar
        </button>
        <button
          className="px-2 py-2 text-xs cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => onConfirm()}
        >
          Confirmar
        </button>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className={`flex flex-col bg-white rounded-lg shadow-2xl p-4 w-96 max-w-full relative ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {children}
        </div>
        <FooterModal onClose={onClose} onConfirm={onConfirm} />
      </div>
    </div>
  );
};