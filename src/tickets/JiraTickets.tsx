// src/tickets/JiraTickets.tsx
import React from "react";
import TicketItem from "./TicketItem";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import CreateTicket from "./CreateTicket";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import { bookingService } from "../journal/BookingService";

interface JiraTicketsProps {}

const JiraTickets: React.FC<JiraTicketsProps> = () => {
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
              onEdit={editTicket}
              onArchive={archiveTicket}
              onCreateBooking={onCreateBooking}
            />
          ))}
      </ul>
      <CreateTicket createTicket={createTicket} />
    </div>
  );
};

export default JiraTickets;
