// src/pages/HomePage.tsx
import React from "react";
import ActiveTickets from "../tickets/ActiveTickets";
import JournalList from "../journal/JournalList";
import OccasionalTickets from "../tickets/OccasionalTickets";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 p-5 overflow-y-auto">
        <JournalList />
      </div>
      <div className="flex-1 p-5 overflow-y-auto">
        <ActiveTickets />
        <OccasionalTickets />
      </div>
    </div>
  );
};

export default HomePage;
