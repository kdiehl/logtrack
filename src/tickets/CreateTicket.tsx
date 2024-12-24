// src/tickets/CreateTicket.tsx
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import Card from "../components/Card";

interface CreateTicketProps {
  createTicket: (ticket: Partial<Ticket>) => void;
}

const CreateTicket: React.FC<CreateTicketProps> = ({ createTicket }) => {
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

  return (
    <Card>
      <div className="mb-4">
        <Headline>Create Ticket</Headline>
      </div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={currentTicket.title || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={currentTicket.description || ""}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border border-gray-300 dark:bg-gray-600 dark:border-gray-500 rounded"
      />
      <CustomButton preset="submit" onClick={handleSubmit}>
        Submit
      </CustomButton>
    </Card>
  );
};

export default CreateTicket;
