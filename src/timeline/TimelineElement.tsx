import React from "react";
import { Booking } from "../journal/Booking";
import { Ticket } from "../tickets/Ticket";

interface TimelineElementProps {
    booking: Booking;
    ticket: Ticket;
  style: React.CSSProperties;
}

const TimelineElement: React.FC<TimelineElementProps> = ({ booking, ticket, style }) => {
  
    const getBookingStyle = (startTime: string, endTime?: string): React.CSSProperties => {
        const start = new Date(startTime);
        const end = endTime ? new Date(endTime) : new Date(startTime);
        const startHour = start.getHours();
        const startMinutes = start.getMinutes();
        const endHour = end.getHours();
        const endMinutes = end.getMinutes();
        const duration = (endHour - startHour) * 60 + (endMinutes - startMinutes);
    
        return {
          top: `${(startHour - 5) * 50 + (startMinutes / 60) * 50}px`,
          height: `${(duration / 60) * 50}px`,
        };
      };
  
    const updatedStyle = {
        ...getBookingStyle(booking.startTime, booking.endTime),
        ...style
    }

  return (
    <div className="absolute w-full right-0 bg-blue-500 bg-opacity-50 border border-blue-700 p-1.5 box-border rounded text-white" style={updatedStyle}>
      <div>{ticket.title}</div>
      <div>{ticket.description}</div>
    </div>
  );
};

export default TimelineElement;
