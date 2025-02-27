import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import Card from "../components/Card";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";

interface CreateTicketModalProps {
  createTicket: (ticket: Partial<Ticket>) => void;
  isOpen: boolean;
  closeModal: () => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  createTicket,
  isOpen,
  closeModal,
}) => {
  const [currentTicket, setCurrentTicket] = useState<Partial<Ticket>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCurrentTicket({ ...currentTicket, [name]: value });
  };

  const handleSubmit = () => {
    createTicket(currentTicket);
    setCurrentTicket({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed p-4 rounded shadow-md inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card>
        <div className="mb-4">
          <Headline>Create Ticket</Headline>
        </div>
        <InputField
          name="title"
          placeholder="Title"
          value={currentTicket.title || ""}
          onChange={handleInputChange}
          className="mb-4"
        />
        <TextAreaField
          name="description"
          placeholder="Description"
          value={currentTicket.description || ""}
          onChange={handleInputChange}
        />
        <div className="flex justify-end space-x-2">
          <CustomButton preset="secondary" onClick={closeModal}>
            Cancel
          </CustomButton>
          <CustomButton preset="submit" onClick={handleSubmit}>
            Submit
          </CustomButton>
        </div>
      </Card>
    </div>
  );
};

export default CreateTicketModal;
