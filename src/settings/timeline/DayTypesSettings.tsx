import React, { useState } from "react";
import { useSettings } from "../SettingsContext";

const DayTypesSettings: React.FC = () => {
  const { workplaces, setWorkplaces } = useSettings();
  const [newWorkplace, setNewWorkplace] = useState("");
  const [editingWorkplace, setEditingWorkplace] = useState<string | null>(null);

  const handleAddWorkplace = () => {
    if (newWorkplace && !workplaces.includes(newWorkplace)) {
      setWorkplaces([...workplaces, newWorkplace]);
      setNewWorkplace("");
    }
  };

  const handleEditWorkplace = (index: number, value: string) => {
    const updatedWorkplaces = [...workplaces];
    updatedWorkplaces[index] = value;
    setWorkplaces(updatedWorkplaces);
    setEditingWorkplace(null);
  };

  const handleDeleteWorkplace = (index: number) => {
    const updatedWorkplaces = workplaces.filter((_, i) => i !== index);
    setWorkplaces(updatedWorkplaces);
  };

  return (
    <div>
      <h3>Workplaces</h3>
      <ul>
        {workplaces.map((type, index) => (
          <li key={type} className="flex items-center">
            {editingWorkplace === type ? (
              <input
                type="text"
                value={type}
                onChange={(e) => handleEditWorkplace(index, e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
              />
            ) : (
              <span>{type}</span>
            )}
            <button onClick={() => setEditingWorkplace(type)} className="ml-2 p-2 bg-yellow-500 text-white rounded">
              Edit
            </button>
            <button onClick={() => handleDeleteWorkplace(index)} className="ml-2 p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newWorkplace}
        onChange={(e) => setNewWorkplace(e.target.value)}
        placeholder="Add new workplace"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
      />
      <button onClick={handleAddWorkplace} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Add Workplace
      </button>
    </div>
  );
};

export default DayTypesSettings;
