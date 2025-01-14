// src/journal/JournalHistory.tsx
import React, { useState } from "react";
import { Booking } from "./Booking";
import JournalEntry from "./JournalEntry";
import Headline from "../components/Headline";
import { durationCalculator } from "./DurationCalculator";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../components/CustomButton";

interface JournalHistoryProps {
  groupedEntries: {
    [date: string]: {
      [ticketId: number]: Booking[];
    };
  };
  bookings: Booking[];
  handleStartBooking: (ticketId: number) => void;
  handleStopBooking: (booking: Booking) => void;
  handleEditBooking: (booking: Booking) => void;
  handleDeleteBooking: (bookingId: number) => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

const JournalHistory: React.FC<JournalHistoryProps> = ({
  groupedEntries,
  bookings,
  handleStartBooking,
  handleStopBooking,
  handleEditBooking,
  handleDeleteBooking,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const tickets = useLiveQuery(() => db.tickets.toArray(), []);
  if (!bookings || !tickets) return null;

  const getTicket = (ticketId: number) => {
    return tickets.find((t) => t.id === ticketId)!;
  };

  const sortedDates = Object.keys(groupedEntries)
    .filter((date) => date !== new Date().toISOString().slice(0, 10))
    .sort((a, b) => b.localeCompare(a));

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Headline preset="h2">Journal History</Headline>
        <CustomButton preset="secondary" onClick={toggleCollapse}>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`transition-transform duration-500 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </CustomButton>
      </div>
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isCollapsed ? "max-h-0" : "max-h-screen"
        }`}
      >
        <ul className="space-y-4">
          {sortedDates.map((date) => {
            const totalTime = `${durationCalculator.calculateTotalTime(
              Object.values(groupedEntries[date]).flat(),
            )}h`;
            return (
              <li key={date}>
                <Headline preset="h2">
                  {`${formatDate(date)} - ${totalTime}`}
                </Headline>
                <ul className="mt-2 space-y-2">
                  {Object.entries(groupedEntries[date]).map(
                    ([ticketId, entriesByTicket]) => {
                      return (
                        getTicket(Number(ticketId)) && (
                          <JournalEntry
                            key={`${date}-${ticketId}`}
                            date={date}
                            entriesByTicket={entriesByTicket}
                            handleStartBooking={handleStartBooking}
                            handleStopBooking={handleStopBooking}
                            handleEditBooking={handleEditBooking}
                            handleDeleteBooking={handleDeleteBooking}
                            ticket={getTicket(Number(ticketId))}
                          />
                        )
                      );
                    },
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default JournalHistory;
