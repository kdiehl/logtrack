import React, { useState } from "react";
import { useSettings } from "../SettingsContext";

const DayTypesSettings: React.FC = () => {
  const { timelineDayTypes, setTimelineDayTypes } = useSettings();
  const [newDayType, setNewDayType] = useState("");
  const [editingDayType, setEditingDayType] = useState<string | null>(null);

  const handleAddDayType = () => {
    if (newDayType && !timelineDayTypes.includes(newDayType)) {
      setTimelineDayTypes([...timelineDayTypes, newDayType]);
      setNewDayType("");
    }
  };

  const handleEditDayType = (index: number, value: string) => {
    const updatedDayTypes = [...timelineDayTypes];
    updatedDayTypes[index] = value;
    setTimelineDayTypes(updatedDayTypes);
    setEditingDayType(null);
  };

  const handleDeleteDayType = (index: number) => {
    const updatedDayTypes = timelineDayTypes.filter((_, i) => i !== index);
    setTimelineDayTypes(updatedDayTypes);
  };

  return (
    <div>
      <h3>Day Types</h3>
      <ul>
        {timelineDayTypes.map((type, index) => (
          <li key={type} className="flex items-center">
            {editingDayType === type ? (
              <input
                type="text"
                value={type}
                onChange={(e) => handleEditDayType(index, e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
              />
            ) : (
              <span>{type}</span>
            )}
            <button onClick={() => setEditingDayType(type)} className="ml-2 p-2 bg-yellow-500 text-white rounded">
              Edit
            </button>
            <button onClick={() => handleDeleteDayType(index)} className="ml-2 p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newDayType}
        onChange={(e) => setNewDayType(e.target.value)}
        placeholder="Add new day type"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
      />
      <button onClick={handleAddDayType} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Add Day Type
      </button>
    </div>
  );
};

export default DayTypesSettings;
