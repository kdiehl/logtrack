import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Headline from "../../components/Headline";

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
        <Headline preset="h3">Edit Workplace</Headline>
        <InputField
          name="editWorkplace"
          placeholder="Edit workplace"
          value={editedWorkplace}
          onChange={(e) => setEditedWorkplace(e.target.value)}
          className="mb-4"
        />
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

export default EditWorkplaceModal;
