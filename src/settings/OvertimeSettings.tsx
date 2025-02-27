import React from "react";
import Headline from "../components/Headline";
import InputField from "../components/InputField";
import { useSettings } from "./SettingsContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const OvertimeSettings: React.FC = () => {
  const { mandatoryHours, setMandatoryHours } = useSettings();
  
  const handleHoursChange = (day: string, value: number) => {
    setMandatoryHours({
        ...mandatoryHours,
      [day]: value,
    });
  };

  return (
    <div className="flex flex-col">
      <Headline preset="h2">Overtime Settings</Headline>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2">Day</th>
            <th className="py-2">Mandatory Hours</th>
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr key={day}>
              <td className="border px-4 py-2 dark:border-gray-700">{day}</td>
              <td className="border px-4 py-2 dark:border-gray-700">
                <InputField
                  name="mandatoryHours"
                  placeholder="Mandatory Hours"
                  value={mandatoryHours[day]?.toString() || ""}
                  onChange={(e) => handleHoursChange(day, Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OvertimeSettings;
