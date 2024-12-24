// src/journal/Booking.tsx
import React from "react";
import { BookingModel } from "./BookingModel";

interface BookingProps {
  booking: BookingModel;
}

const Booking: React.FC<BookingProps> = ({ booking }) => {
  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex">
      <p className="mr-4">
        {formatTime(booking.startTime)} -{" "}
        {booking.endTime ? formatTime(booking.endTime) : "Now"}
      </p>
    </div>
  );
};

export default Booking;
