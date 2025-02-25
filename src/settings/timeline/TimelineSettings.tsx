import React from "react";
import Headline from "../../components/Headline";
import AttendencesSettings from "./AttendencesSettings";
import WorkplacesSettings from "./WorkplacesSettings";

const TimelineSettings: React.FC = () => {
  return (
    <div className="mb-4">
      <Headline preset="h2">Timeline</Headline>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
        <p className="font-bold">Notice</p>
        <p>These changes only apply to future events.</p>
      </div>
      <div className="flex justify-stretch gap-10">
        <WorkplacesSettings />
        <AttendencesSettings />
      </div>
    </div>
  );
};

export default TimelineSettings;
