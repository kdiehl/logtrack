// src/tickets/TicketItem.tsx
import React, { useState } from "react";
import { Ticket } from "./Ticket";
import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import Headline from "../components/Headline";
import Link from "../components/Link";
import { useSettings } from "../contexts/SettingsContext";
import TicketEditModal from "./TicketEditModal";

interface TicketItemProps {
  ticket: Ticket;
  onEdit?: (ticket: Ticket) => void;
  onArchive?: (id: number) => void;
  onUnarchive?: (id: number) => void;
  onCreateBooking?: (ticketId: number, startTime: string) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  onEdit,
  onArchive,
  onUnarchive,
  onCreateBooking,
}) => {
  const { url } = useSettings();
  const ticketUrl = `${url}/${ticket.title}`;
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  function handleCreateBooking() {
    if (onCreateBooking) {
      onCreateBooking(ticket.id, new Date().toISOString());
    }
  }

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleSave = (updatedTicket: Ticket) => {
    if (onEdit) {
      onEdit(updatedTicket);
    }
    setEditModalOpen(false);
  };

  return (
    <Card>
      <div className="flex">
        <div>
          <Headline preset="h3">
            {url ? (
              <Link ticketUrl={ticketUrl} title={ticket.title} />
            ) : (
              ticket.title
            )}
          </Headline>
          {ticket.description && <p className="mt-4">{ticket.description}</p>}
        </div>
        {(onEdit || onArchive || onUnarchive) && (
          <div className="flex ml-auto">
            {onEdit && (
              <div>
                <CustomButton preset="secondary" onClick={handleEditClick}>
                  Edit
                </CustomButton>
              </div>
            )}
            {ticket.status === "active" && onArchive && (
              <div className="ml-2">
                <CustomButton
                  preset="secondary"
                  onClick={() => onArchive(ticket.id)}
                >
                  Archive
                </CustomButton>
              </div>
            )}
            {ticket.status === "archived" && onUnarchive && (
              <CustomButton
                preset="secondary"
                onClick={() => onUnarchive(ticket.id)}
              >
                Unarchive
              </CustomButton>
            )}
            {onCreateBooking && (
              <div className="ml-2">
                <CustomButton preset="submit" onClick={handleCreateBooking}>
                  Create Booking
                </CustomButton>
              </div>
            )}
          </div>
        )}
      </div>
      <TicketEditModal
        ticket={ticket}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
    </Card>
  );
};

export default TicketItem;
