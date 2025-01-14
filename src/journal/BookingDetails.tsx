// src/journal/BookingDetails.tsx
import React, { useState } from "react";
import { Booking } from "./Booking";
import CustomButton from "../components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import BookingDeleteConfirmationModal from "./BookingDeleteConfirmationModal";

interface BookingProps {
  booking: Booking;
  onEdit: (booking: Booking) => void;
  onDelete: (bookingId: number) => void;
}

const BookingDetails: React.FC<BookingProps> = ({
  booking,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(booking.id);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      <p className="mr-4">
        {formatTime(booking.startTime)} -{" "}
        {booking.endTime ? formatTime(booking.endTime) : "Now"}
      </p>
      <div className="flex space-x-2 items-center">
        {booking.bookedInJira && (
          <FontAwesomeIcon icon={faCheck} className="text-green-500" />
        )}
        <CustomButton preset="secondary" onClick={() => onEdit(booking)}>
          <FontAwesomeIcon icon={faPen} />
        </CustomButton>
        <CustomButton preset="alert" onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </CustomButton>
      </div>
      <BookingDeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BookingDetails;
