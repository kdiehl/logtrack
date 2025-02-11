import React, { useState } from "react";
import { useSettings } from "../SettingsContext";

const WorkStatusesSettings: React.FC = () => {
  const { timelineWorkStatuses, setTimelineWorkStatuses } = useSettings();
  const [newWorkStatus, setNewWorkStatus] = useState("");
  const [editingWorkStatus, setEditingWorkStatus] = useState<string | null>(null);

  const handleAddWorkStatus = () => {
    if (newWorkStatus && !timelineWorkStatuses.includes(newWorkStatus)) {
      setTimelineWorkStatuses([...timelineWorkStatuses, newWorkStatus]);
      setNewWorkStatus("");
    }
  };

  const handleEditWorkStatus = (index: number, value: string) => {
    const updatedWorkStatuses = [...timelineWorkStatuses];
    updatedWorkStatuses[index] = value;
    setTimelineWorkStatuses(updatedWorkStatuses);
    setEditingWorkStatus(null);
  };

  const handleDeleteWorkStatus = (index: number) => {
    const updatedWorkStatuses = timelineWorkStatuses.filter((_, i) => i !== index);
    setTimelineWorkStatuses(updatedWorkStatuses);
  };

  return (
    <div>
      <h3>Work Statuses</h3>
      <ul>
        {timelineWorkStatuses.map((status, index) => (
          <li key={status} className="flex items-center">
            {editingWorkStatus === status ? (
              <input
                type="text"
                value={status}
                onChange={(e) => handleEditWorkStatus(index, e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
              />
            ) : (
              <span>{status}</span>
            )}
            <button onClick={() => setEditingWorkStatus(status)} className="ml-2 p-2 bg-yellow-500 text-white rounded">
              Edit
            </button>
            <button onClick={() => handleDeleteWorkStatus(index)} className="ml-2 p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newWorkStatus}
        onChange={(e) => setNewWorkStatus(e.target.value)}
        placeholder="Add new work status"
        className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-500 rounded"
      />
      <button onClick={handleAddWorkStatus} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Add Work Status
      </button>
    </div>
  );
};

export default WorkStatusesSettings;
