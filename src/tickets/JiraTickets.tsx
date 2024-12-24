// src/tickets/JiraTickets.tsx
import React from "react";
import TicketItem from "./TicketItem";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import CreateTicket from "./CreateTicket";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import { bookingService } from "../journal/BookingService";

interface JiraTicketsProps {
  editable?: boolean;
}

const JiraTickets: React.FC<JiraTicketsProps> = ({ editable = true }) => {
  const tickets = useLiveQuery(() => db.tickets.toArray());

  if (!tickets) return null;

  const createTicket = async (ticket: Partial<Ticket>) => {
    const newTicket: Ticket = {
      id: Date.now(),
      title: ticket.title || "",
      description: ticket.description || "",
      status: "active",
    };
    await db.tickets.add(newTicket);
  };

  const editTicket = async (updatedTicket: Ticket) => {
    await db.tickets.update(updatedTicket.id, updatedTicket);
  };

  const archiveTicket = async (id: number) => {
    const updatedTickets: Ticket[] = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: "archived" } : ticket,
    );
    const archivedTicket = updatedTickets.find((ticket) => ticket.id === id)!;
    if (archivedTicket) {
      await db.tickets.update(id, archivedTicket);
    }
  };

  const unarchiveTicket = async (id: number) => {
    const updatedTickets: Ticket[] = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, status: "active" } : ticket,
    );
    const unarchivedTicket = updatedTickets.find((ticket) => ticket.id === id)!;
    if (unarchivedTicket) {
      await db.tickets.update(id, unarchivedTicket);
    }
  };

  async function onCreateBooking(ticketId: number, startTime: string) {
    await bookingService.createBooking(ticketId, startTime);
  }

  return (
    <div>
      <div className="mb-4">
        <Headline>Jira Tickets</Headline>
      </div>
      <ul className="mt-5 mb-5 space-y-4">
        {tickets
          .filter((ticket) => ticket.status !== "archived")
          .map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              onEdit={editable ? editTicket : undefined}
              onArchive={archiveTicket}
              onUnarchive={editable ? unarchiveTicket : undefined}
              onCreateBooking={onCreateBooking}
            />
          ))}
      </ul>
      <CreateTicket createTicket={createTicket} />
    </div>
  );
};

export default JiraTickets;
