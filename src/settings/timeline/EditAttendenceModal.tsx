import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

interface EditAttendenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendence: string;
  onSave: (newAttendence: string) => void;
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
      <div className="p-4">
        <h2 className="text-lg mb-4">Edit Attendance</h2>
        <InputField
          name="editAttendence"
          placeholder="Edit attendance"
          value={editedAttendence}
          onChange={(e) => setEditedAttendence(e.target.value)}
        />
        <div className="flex justify-end">
          <CustomButton onClick={onClose} preset="secondary">
            Cancel
          </CustomButton>
          <CustomButton onClick={handleSave} preset="submit">
            Save
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default EditAttendenceModal;
