import React from "react";
import Headline from "../components/Headline";
import ThemeSettings from "./ThemeSettings";
import TicketSettings from "./TicketSettings";
import TimelineSettings from "./timeline/TimelineSettings";
import OvertimeSettings from "./OvertimeSettings";

const SettingsPage: React.FC = () => {
  return (
    <div className="p-4 pb-10 w-full overflow-scroll">
      <Headline preset="h2">Settings</Headline>
      <ThemeSettings />
      <TicketSettings />
      <TimelineSettings />
      <OvertimeSettings />
    </div>
  );
};

export default SettingsPage;
