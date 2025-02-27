import React, { useState } from "react";
import { useSettings } from "../SettingsContext";
import Headline from "../../components/Headline";
import CustomButton from "../../components/CustomButton"; // Import CustomButton
import InputField from "../../components/InputField"; // Import InputField
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import EditAttendenceModal from "./EditAttendenceModal";
import { AttendanceOption } from "../../utils/db";

const AttendencesSettings: React.FC = () => {
  const { attendances, setAttendances } = useSettings();
  const [newAttendance, setNewAttenance] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAttendence, setSelectedAttendence] = useState<AttendanceOption>();

  const handleCreateAttendance = () => {
    if (newAttendance && !attendances.map(att => att.label).includes(newAttendance)) {
      setAttendances([...attendances, {label: newAttendance, workRequired: false}]);
      setNewAttenance("");
    }
  };

  const handleEditAttendance = (attendence: AttendanceOption) => {
    setSelectedAttendence(attendence);
    setEditModalOpen(true);
  };

  const handleUpdateAttendance = (newAttendance: AttendanceOption) => {
    const updatedAttendances = attendances.map((att) =>
      att === selectedAttendence ? newAttendance : att
    );
    setAttendances(updatedAttendances);
  };

  const handleDeleteAttendance = (attendence: AttendanceOption) => {
    const updatedAttendances = attendances.filter((att) => att.label !== attendence.label);
    setAttendances(updatedAttendances);
  };

  const handleEnterPress = () => {
      handleCreateAttendance();
  };

  return (
    <div className="w-full">
      <Headline preset="h3">Attendances</Headline>
      <ul className="mb-2">
        {attendances.map((attendance) => (
          <li key={attendance.label} className="flex items-center">
            <span className="mr-2">{attendance.label}</span>
            <CustomButton onClick={() => handleEditAttendance(attendance)} preset="secondary">
              <FontAwesomeIcon icon={faEdit} />
            </CustomButton>
            <span className="mx-1"></span>
            <CustomButton onClick={() => handleDeleteAttendance(attendance)} preset="alert">
              <FontAwesomeIcon icon={faTrash} />
            </CustomButton>
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <InputField
          value={newAttendance}
          onChange={(e) => setNewAttenance(e.target.value)}
          placeholder="Add new attendance"
          name="New Attendance"
          onEnterPress={handleEnterPress}
        />
        <span className="mr-1"></span>
        <CustomButton onClick={handleCreateAttendance} preset="submit">
          <FontAwesomeIcon icon={faPlus} />
        </CustomButton>
      </div>
      {selectedAttendence && <EditAttendenceModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        attendence={selectedAttendence!}
        onSave={handleUpdateAttendance}
      />}
    </div>
  );
};

export default AttendencesSettings;
