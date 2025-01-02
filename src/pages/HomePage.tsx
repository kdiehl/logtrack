// src/pages/HomePage.tsx
import React from "react";
import JiraTickets from "../tickets/JiraTickets";
import JournalList from "../journal/JournalList";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 p-5 overflow-y-auto">
        <JournalList />
      </div>
      <div className="flex-1 p-5 overflow-y-auto">
        <JiraTickets />
      </div>
    </div>
  );
};

export default HomePage;
