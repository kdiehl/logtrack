import React from "react";
import Headline from "../components/Headline";
import ThemeSettings from "./ThemeSettings";
import TicketSettings from "./TicketSettings";
import TimelineSettings from "./timeline/TimelineSettings";

const SettingsPage: React.FC = () => {
  return (
    <div className="p-4 w-full">
      <Headline preset="h2">Settings</Headline>
      <ThemeSettings />
      <TicketSettings />
      <TimelineSettings />
    </div>
  );
};

export default SettingsPage;
