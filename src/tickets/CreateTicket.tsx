// src/tickets/CreateTicket.tsx
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Ticket } from "./Ticket";
import Headline from "../components/Headline";
import Card from "../components/Card";
import InputField from "../components/InputField";
import TextAreaField from "../components/TextAreaField";

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
      <InputField
        name="title"
        placeholder="Title"
        value={currentTicket.title || ""}
        onChange={handleInputChange}
      />
      <TextAreaField
        name="description"
        placeholder="Description"
        value={currentTicket.description || ""}
        onChange={handleInputChange}
      />
      <CustomButton preset="submit" onClick={handleSubmit}>
        Submit
      </CustomButton>
    </Card>
  );
};

export default CreateTicket;
