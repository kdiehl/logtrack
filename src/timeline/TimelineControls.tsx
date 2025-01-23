import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CustomButton from "../components/CustomButton";

const TimelineControls: React.FC<{ handleSegmentChange: (segment: string) => void }> = ({ handleSegmentChange }) => {
  return (
    <div className="flex">
      <CustomButton
        preset="secondary"
        onClick={() => handleSegmentChange("Last Week")}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </CustomButton>
      <CustomButton
        preset="secondary"
        onClick={() => handleSegmentChange("Today")}
      >
        Today
      </CustomButton>
      <CustomButton
        preset="secondary"
        onClick={() => handleSegmentChange("Next Week")}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </CustomButton>
    </div>
  );
};

export default TimelineControls;
