import React, { useState } from "react";
import { useSettings } from "../settings/SettingsContext";

interface AttendanceProps {
  initialWorkplace: string;
  initialAttendance: string;
  onWorkplaceChange: (value: string) => void;
  onAttendanceChange: (value: string) => void;
}

const Attendance: React.FC<AttendanceProps> = ({
  initialWorkplace,
  initialAttendance,
  onWorkplaceChange,
  onAttendanceChange,
}) => {
  const { workplaces, attendances } = useSettings();

  const [workplace, setWorkplace] = useState(initialWorkplace);
  const [attendance, setAttendance] = useState(initialAttendance);

  const handleWorkplaceChange = (value: string) => {
    setWorkplace(value);
    onWorkplaceChange(value);
  };

  const handleAttendanceChange = (value: string) => {
    setAttendance(value);
    onAttendanceChange(value);
  };

  return (
    <div className="p-2">
      <select
        value={workplace}
        onChange={(e) => handleWorkplaceChange(e.target.value)}
        className="mb-2"
      >
        {workplaces.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={attendance}
        onChange={(e) => handleAttendanceChange(e.target.value)}
      >
        {attendances.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Attendance;
