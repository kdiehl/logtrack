// src/journal/JournalList.tsx
import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { Booking } from "./Booking";
import { db } from "../utils/db";
import Headline from "../components/Headline";
import JournalEntry from "./JournalEntry";
import { bookingService } from "./BookingService";
import { durationCalculator } from "./DurationCalculator";
import BookingEditModal from "./BookingEditModal";
import JournalHistory from "./JournalHistory";

export type BookingsGroupedByDateAndTicketId = {
  [date: string]: {
    [ticketId: number]: Booking[];
  };
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

function groupEntries(
  currentBookings: Booking[],
): BookingsGroupedByDateAndTicketId {
  return currentBookings.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = {};
    }

    if (!acc[entry.date][entry.ticketId]) {
      acc[entry.date][entry.ticketId] = [];
    }
    acc[entry.date][entry.ticketId].push(entry);
    return acc;
  }, {} as BookingsGroupedByDateAndTicketId);
}

const JournalList: React.FC = () => {
  const bookings = useLiveQuery(() => db.bookings.toArray(), []);
  const tickets = useLiveQuery(() => db.tickets.toArray(), []);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  if (!bookings || !tickets) return null;

  const groupedEntries = groupEntries(bookings);

  const getTicket = (ticketId: number) => {
    return tickets.find((t) => t.id === ticketId)!;
  };

  const sortedDates = Object.keys(groupedEntries).sort((a, b) =>
    b.localeCompare(a),
  );

  const handleStartBooking = async (ticketId: number) => {
    await bookingService.createBooking(ticketId, new Date().toISOString());
  };

  const handleStopBooking = async (booking: Booking) => {
    await bookingService.setEndTime(booking, new Date().toISOString());
  };

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleDeleteBooking = async (bookingId: number) => {
    await db.bookings.delete(bookingId);
  };

  const handleSaveBooking = async (updatedBooking: Booking) => {
    await db.bookings.update(updatedBooking.id, updatedBooking);
    setEditingBooking(null);
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="mb-4">
        <Headline preset="h2">Journal</Headline>
      </div>
      <ul className="space-y-4 mb-4">
        {sortedDates
          .filter((date) => date === today)
          .map((date) => {
            const totalTime = durationCalculator.calculateTotalTime(
              Object.values(groupedEntries[date]).flat(),
            );
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
      <JournalHistory
        groupedEntries={groupedEntries}
        bookings={bookings}
        handleStartBooking={handleStartBooking}
        handleStopBooking={handleStopBooking}
        handleEditBooking={handleEditBooking}
        handleDeleteBooking={handleDeleteBooking}
      />
      {editingBooking && (
        <BookingEditModal
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
          onSave={handleSaveBooking}
        />
      )}
    </div>
  );
};

export default JournalList;
