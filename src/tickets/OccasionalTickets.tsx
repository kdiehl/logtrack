import React, { useState } from "react";
import TicketItem from "./TicketItem";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import CreateTicketModal from "./CreateTicketModal";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";
import { bookingService } from "../journal/BookingService";
import CustomButton from "../components/CustomButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OccasionalTickets: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tickets = useLiveQuery(() => db.tickets.toArray());

  if (!tickets) return null;

  const createTicket = async (ticket: Partial<Ticket>) => {
    const newTicket: Ticket = {
      id: Date.now(),
      title: ticket.title || "",
      description: ticket.description || "",
      status: "occasional",
    };
    await db.tickets.add(newTicket);
    setIsModalOpen(false);
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
      <div className="flex items-center mb-4">
        <div className="mr-2">
          <Headline>Occasional Tickets</Headline>
        </div>
        <CustomButton preset="submit" onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </CustomButton>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5 mb-4">
        {tickets
          .filter((ticket) => ticket.status === "occasional")
          .map((ticket) => (
            <TicketItem
              key={ticket.id}
              ticket={ticket}
              onEdit={editTicket}
              onArchive={archiveTicket}
              onCreateBooking={onCreateBooking}
            />
          ))}
      </div>
      <CreateTicketModal
        createTicket={createTicket}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OccasionalTickets;
