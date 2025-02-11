import React, { useState } from "react";
import { useSettings } from "../settings/SettingsContext";

interface DayPresenceProps {
  initialDayType: string;
  initialWorkStatus: string;
  onDayTypeChange: (value: string) => void;
  onWorkStatusChange: (value: string) => void;
}

const DayPresence: React.FC<DayPresenceProps> = ({
  initialDayType,
  initialWorkStatus,
  onDayTypeChange,
  onWorkStatusChange,
}) => {
  const { timelineDayTypes, timelineWorkStatuses } = useSettings();

  const [dayType, setDayType] = useState(initialDayType);
  const [workStatus, setWorkStatus] = useState(initialWorkStatus);

  const handleDayTypeChange = (value: string) => {
    setDayType(value);
    onDayTypeChange(value);
  };

  const handleWorkStatusChange = (value: string) => {
    setWorkStatus(value);
    onWorkStatusChange(value);
  };

  return (
    <div className="p-2">
      <select
        value={dayType}
        onChange={(e) => handleDayTypeChange(e.target.value)}
        className="mb-2"
      >
        {timelineDayTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={workStatus}
        onChange={(e) => handleWorkStatusChange(e.target.value)}
      >
        {timelineWorkStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DayPresence;
