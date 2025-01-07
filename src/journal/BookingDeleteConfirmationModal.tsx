// src/components/DeleteBookingConfirmationModal.tsx
import React from "react";
import CustomButton from "../components/CustomButton";
import Modal from "../components/Modal";

interface DeleteBookingConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const BookingDeleteConfirmationModal: React.FC<
  DeleteBookingConfirmationModalProps
> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col items-center">
        <p>Are you sure you want to delete this booking?</p>
        <div className="flex space-x-4 mt-4">
          <CustomButton preset="secondary" onClick={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton preset="alert" onClick={onConfirm}>
            Confirm
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default BookingDeleteConfirmationModal;
