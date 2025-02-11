import React from "react";
import Headline from "../../components/Headline";
import DayTypesSettings from "./DayTypesSettings";
import WorkStatusesSettings from "./WorkStatusesSettings";

const TimelineSettings: React.FC = () => {
  return (
    <div className="mb-4">
      <Headline preset="h2">Timeline</Headline>
      <DayTypesSettings />
      <WorkStatusesSettings />
    </div>
  );
};

export default TimelineSettings;
