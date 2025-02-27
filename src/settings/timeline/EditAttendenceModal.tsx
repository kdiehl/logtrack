import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { AttendanceOption } from "../../utils/db";
import Headline from "../../components/Headline";

interface EditAttendenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendence: AttendanceOption;
  onSave: (newAttendence: AttendanceOption) => void;
}

const EditAttendenceModal: React.FC<EditAttendenceModalProps> = ({
  isOpen,
  onClose,
  attendence,
  onSave,
}) => {

  const [editedAttendence, setEditedAttendence] = useState(attendence);

  useEffect(() => {
    setEditedAttendence(attendence);
  }, [attendence]);

  const handleSave = () => {
    onSave(editedAttendence);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
        <Headline preset="h3">Edit Attendance</Headline>
        <InputField
          name="editAttendence"
          placeholder="Edit attendance"
          value={editedAttendence.label}
          onChange={(e) => setEditedAttendence({ ...editedAttendence, label: e.target.value })}
          className="mb-4"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={editedAttendence.workRequired}
            onChange={(e) => setEditedAttendence({ ...editedAttendence, workRequired: e.target.checked })}
          />
          <label className="ml-2">Work Required</label>
        </div>
        <div className="flex justify-end">
          <CustomButton onClick={onClose} preset="secondary">
            Cancel
          </CustomButton>
          <CustomButton onClick={handleSave} preset="submit">
            Save
          </CustomButton>
        </div>
    </Modal>
  );
};

export default EditAttendenceModal;
