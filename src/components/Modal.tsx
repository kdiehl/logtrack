// src/components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Modal;
