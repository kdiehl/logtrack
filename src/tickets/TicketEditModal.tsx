// src/tickets/TicketEditModal.tsx
import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";

interface TicketEditModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTicket: Ticket) => void;
}

const TicketEditModal: React.FC<TicketEditModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(ticket?.title || "");
  const [description, setDescription] = useState(ticket?.description || "");

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
    }
  }, [ticket]);

  const handleSave = () => {
    if (ticket) {
      onSave({ ...ticket, title, description });
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div>
        <Headline preset="h2">Edit Ticket</Headline>
        <InputField
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <TextAreaField
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end">
          <div className="mr-2">
            <CustomButton preset="secondary" onClick={onClose}>
              Cancel
            </CustomButton>
          </div>
          <CustomButton preset="submit" onClick={handleSave}>
            Save
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default TicketEditModal;
