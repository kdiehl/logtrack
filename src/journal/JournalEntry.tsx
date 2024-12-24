// src/journal/JournalEntry.tsx
import React from "react";
import { BookingModel } from "./BookingModel";
import CustomButton from "../components/CustomButton";
import Booking from "./Booking";
import { Ticket } from "../tickets/Ticket";
import { durationCalculator } from "./DurationCalculator";
import Link from "../components/Link";
import { useSettings } from "../contexts/SettingsContext";

interface JournalEntryProps {
  date: string;
  entriesByTicket: BookingModel[];
  handleStartBooking: (ticketId: number) => void;
  handleStopBooking: (booking: BookingModel) => void;
  handleEditBooking: (booking: BookingModel) => void;
  handleDeleteBooking: (bookingId: number) => void;
  ticket: Ticket;
}

const isPastDate = (date: string) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const bookingDate = new Date(date).setHours(0, 0, 0, 0);
  return bookingDate < today;
};

const JournalEntry: React.FC<JournalEntryProps> = ({
  date,
  entriesByTicket,
  handleStartBooking,
  handleStopBooking,
  handleEditBooking,
  handleDeleteBooking,
  ticket,
}) => {
  const { url } = useSettings();
  const ticketUrl = `${url}/${ticket.title}`;
  const lastBooking = entriesByTicket[entriesByTicket.length - 1];
  const canStartNewBooking = !!(lastBooking && lastBooking.endTime);
  const canStopBooking = lastBooking && !lastBooking.endTime;
  const pastDate = isPastDate(date);

  return (
    <div key={`${date}-${ticket.id}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {!pastDate && canStartNewBooking && (
            <div className="mr-2">
              <CustomButton
                preset="success"
                onClick={() => handleStartBooking(ticket.id)}
              >
                Start
              </CustomButton>
            </div>
          )}
          {!pastDate && canStopBooking && (
            <div className="mr-2">
              <CustomButton
                preset="alert"
                onClick={() => handleStopBooking(lastBooking)}
              >
                Stop
              </CustomButton>
            </div>
          )}
          <div className="font-semibold">
            {url ? (
              <Link ticketUrl={ticketUrl} title={ticket.title} />
            ) : (
              ticket.title
            )}
          </div>
        </div>
        <div>{durationCalculator.calculateTotalTime(entriesByTicket)}</div>
      </div>
      {entriesByTicket.map((booking) => (
        <div
          key={`${date}-${ticket.id}-${booking.startTime}`}
          className="flex items-center justify-between"
        >
          <Booking booking={booking} />
          <div className="flex space-x-2">
            <CustomButton
              preset="secondary"
              onClick={() => handleEditBooking(booking)}
            >
              Edit
            </CustomButton>
            <CustomButton
              preset="alert"
              onClick={() => handleDeleteBooking(booking.id)}
            >
              Delete
            </CustomButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JournalEntry;
