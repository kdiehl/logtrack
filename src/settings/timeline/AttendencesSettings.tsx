import React, { useState } from "react";
import { useSettings } from "../SettingsContext";
import Headline from "../../components/Headline";
import CustomButton from "../../components/CustomButton"; // Import CustomButton
import InputField from "../../components/InputField"; // Import InputField
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditAttendenceModal from "./EditAttendenceModal";

const AttendencesSettings: React.FC = () => {
  const { attendances, setAttendances } = useSettings();
  const [newWorkStatus, setNewWorkStatus] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAttendence, setSelectedAttendence] = useState("");

  const handleAddWorkStatus = () => {
    if (newWorkStatus && !attendances.includes(newWorkStatus)) {
      setAttendances([...attendances, newWorkStatus]);
      setNewWorkStatus("");
    }
  };

  const handleEditAttendence = (attendence: string) => {
    setSelectedAttendence(attendence);
    setEditModalOpen(true);
  };

  const handleSaveAttendence = (newAttendence: string) => {
    const updatedAttendances = attendances.map((att) =>
      att === selectedAttendence ? newAttendence : att
    );
    setAttendances(updatedAttendances);
    // Persist to the database here
  };

  const handleDeleteAttendence = (attendence: string) => {
    const updatedAttendances = attendances.filter((att) => att !== attendence);
    setAttendances(updatedAttendances);
    // Persist to the database here
  };

  const handleEnterPress = () => {
      handleAddWorkStatus();
  };

  return (
    <div className="w-full">
      <Headline preset="h3">Attendances</Headline>
      <ul className="mb-2">
        {attendances.map((status) => (
          <li key={status} className="flex items-center">
            <span className="mr-2">{status}</span>
            <CustomButton onClick={() => handleEditAttendence(status)} preset="secondary">
              <FontAwesomeIcon icon={faEdit} />
            </CustomButton>
            <span className="mx-1"></span>
            <CustomButton onClick={() => handleDeleteAttendence(status)} preset="alert">
              <FontAwesomeIcon icon={faTrash} />
            </CustomButton>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <InputField
          value={newWorkStatus}
          onChange={(e) => setNewWorkStatus(e.target.value)}
          placeholder="Add new attendance"
          name="New Attendance"
          onEnterPress={handleEnterPress}
        />
        <span className="mr-1"></span>
        <CustomButton onClick={handleAddWorkStatus} preset="submit">
          <FontAwesomeIcon icon={faPlus} />
        </CustomButton>
      </div>
      <EditAttendenceModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        attendence={selectedAttendence}
        onSave={handleSaveAttendence}
      />
    </div>
  );
};

export default AttendencesSettings;
