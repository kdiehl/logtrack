// src/tickets/ArchivedTickets.tsx
import React from "react";
import TicketItem from "./TicketItem";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import Headline from "../components/Headline";

const ArchivedTickets: React.FC = () => {
  const archivedTickets = useLiveQuery(() =>
    db.tickets.where("status").equals("archived").toArray(),
  );

  if (!archivedTickets) return null;

  const handleUnarchive = async (id: number) => {
    const ticket = await db.tickets.get(id);
    if (ticket) {
      await db.tickets.update(id, { ...ticket, status: "active" });
    }
  };

  return (
    <div>
      <Headline preset="h2">Archived Tickets</Headline>
      <ul className="mt-5 space-y-4">
        {archivedTickets.map((ticket) => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onUnarchive={handleUnarchive}
          />
        ))}
      </ul>
    </div>
  );
};

export default ArchivedTickets;
