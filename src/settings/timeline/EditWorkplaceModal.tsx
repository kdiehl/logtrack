import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

interface EditWorkplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  workplace: string;
  onSave: (newWorkplace: string) => void;
}

const EditWorkplaceModal: React.FC<EditWorkplaceModalProps> = ({
  isOpen,
  onClose,
  workplace,
  onSave,
}) => {
  const [editedWorkplace, setEditedWorkplace] = useState(workplace);

  useEffect(() => {
    setEditedWorkplace(workplace);
  }, [workplace]);

  const handleSave = () => {
    onSave(editedWorkplace);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="p-4">
        <h2 className="text-lg mb-4">Edit Workplace</h2>
        <InputField
          name="editWorkplace"
          placeholder="Edit workplace"
          value={editedWorkplace}
          onChange={(e) => setEditedWorkplace(e.target.value)}
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

export default EditWorkplaceModal;
