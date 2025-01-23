import React from "react";
import { Booking } from "../journal/Booking";
import { Ticket } from "../tickets/Ticket";
import { calculateBookingStyle } from "./TimelineCalculator";

interface TimelineElementProps {
    booking: Booking;
    ticket: Ticket;
    style: React.CSSProperties;
    hourHeight: number;
    startHour: number;
}

const TimelineElement: React.FC<TimelineElementProps> = ({ booking, ticket, style, hourHeight, startHour }) => {
    const updatedStyle = {
        ...calculateBookingStyle(booking.startTime, booking.endTime, startHour, hourHeight),
        ...style
    }

  return (
    <div
      className="absolute w-full right-0 bg-blue-500 bg-opacity-50 border border-blue-700 p-0.5 box-border rounded text-white overflow-hidden whitespace-nowrap text-ellipsis text-xs"
      style={updatedStyle}
      title={`${ticket.title}\n${ticket.description}`}
    >
      <div className="truncate">{ticket.title}</div>
      <div className="truncate">{ticket.description}</div>
    </div>
  );
};

export default TimelineElement;
