import React, { useState } from "react";
import { useSettings } from "../SettingsContext";
import Headline from "../../components/Headline";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import EditWorkplaceModal from "./EditWorkplaceModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const WorkplacesSettings: React.FC = () => {
  const { workplaces, setWorkplaces } = useSettings();
  const [newWorkplace, setNewWorkplace] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedWorkplace, setSelectedWorkplace] = useState("");

  const handleAddWorkplace = () => {
    if (newWorkplace && !workplaces.includes(newWorkplace)) {
      setWorkplaces([...workplaces, newWorkplace]);
      setNewWorkplace("");
    }
  };

  const handleEditWorkplace = (workplace: string) => {
    setSelectedWorkplace(workplace);
    setEditModalOpen(true);
  };

  const handleSaveWorkplace = (newWorkplace: string) => {
    const updatedWorkplaces = workplaces.map((wp) =>
      wp === selectedWorkplace ? newWorkplace : wp
    );
    setWorkplaces(updatedWorkplaces);
    // Persist to the database here
  };

  const handleDeleteWorkplace = (workplace: string) => {
    const updatedWorkplaces = workplaces.filter((wp) => wp !== workplace);
    setWorkplaces(updatedWorkplaces);
  };

  const handleEnterPress = () => {
      handleAddWorkplace();
  };

  return (
    <div className="w-full">
      <Headline preset="h3">Workplaces</Headline>
      <ul className="mb-2">
        {workplaces.map((type) => (
          <li key={type} className="flex items-center">
            <span className="mr-2">{type}</span>
            <CustomButton onClick={() => handleEditWorkplace(type)} preset="secondary">
              <FontAwesomeIcon icon={faEdit} />
            </CustomButton>
            <span className="mx-1"></span>
            <CustomButton onClick={() => handleDeleteWorkplace(type)} preset="alert">
              <FontAwesomeIcon icon={faTrash} />
            </CustomButton>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <InputField
          value={newWorkplace}
          onChange={(e) => setNewWorkplace(e.target.value)}
          placeholder="Add new workplace"
          name="New Workplace"
          onEnterPress={handleEnterPress}
        />
        <span className="mr-1"></span>
        <CustomButton onClick={handleAddWorkplace} preset="submit">
          <FontAwesomeIcon icon={faPlus} />
        </CustomButton>
      </div>
      <EditWorkplaceModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        workplace={selectedWorkplace}
        onSave={handleSaveWorkplace}
      />
    </div>
  );
};

export default WorkplacesSettings;
