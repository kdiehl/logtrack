// src/journal/JournalEntry.tsx
import React from "react";
import { BookingModel } from "./BookingModel";
import CustomButton from "../components/CustomButton";
import Booking from "./Booking";
import { Ticket } from "../tickets/Ticket";
import { durationCalculator } from "./DurationCalculator";
import Link from "../components/Link";
import { useSettings } from "../contexts/SettingsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faPen,
  faTrash,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div key={`${date}-${ticket.id}`}>
      <div className="flex items-start mb-2 justify-between">
        <div className="flex items-start">
          <div className="mr-2 content-start items-start">
            {!pastDate && canStartNewBooking && (
              <CustomButton
                preset="success"
                onClick={() => handleStartBooking(ticket.id)}
              >
                <FontAwesomeIcon icon={faPlay} />
              </CustomButton>
            )}
            {!pastDate && canStopBooking && (
              <CustomButton
                preset="alert"
                onClick={() => handleStopBooking(lastBooking)}
              >
                <FontAwesomeIcon icon={faStop} />
              </CustomButton>
            )}
          </div>
          <div className="font-semibold items-start mt-1">
            {url ? (
              <Link ticketUrl={ticketUrl} title={ticket.title} />
            ) : (
              ticket.title
            )}
            {ticket.description ? " - " + ticket.description : ""}
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <CustomButton preset="secondary" onClick={toggleCollapse}>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-500 ${
                  isCollapsed ? "rotate-180" : ""
                }`}
              />
            </CustomButton>
          </div>
          <div>{durationCalculator.calculateTotalTime(entriesByTicket)}</div>
        </div>
      </div>
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0" : "max-h-screen"
        }`}
      >
        <div className="bg-gray-200 dark:bg-gray-600 rounded p-2">
          {entriesByTicket.map((booking, index) => (
            <div
              key={`${date}-${ticket.id}-${booking.startTime}`}
              className={`flex items-center justify-between ${
                index !== entriesByTicket.length - 1 ? "mb-1" : ""
              }`}
            >
              <Booking booking={booking} />
              <div className="flex space-x-2">
                <CustomButton
                  preset="secondary"
                  onClick={() => handleEditBooking(booking)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </CustomButton>
                <CustomButton
                  preset="alert"
                  onClick={() => handleDeleteBooking(booking.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </CustomButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;
