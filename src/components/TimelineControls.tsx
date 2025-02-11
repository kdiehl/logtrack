import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import CustomButton from "./CustomButton";

export enum Segment {
  Next = "Next",
  Back = "Back",
  Now = "Now"
}

interface TimelineControlsProps {
  handleSegmentChange: (segment: Segment) => void;
  todayLabel?: string;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({ handleSegmentChange, todayLabel = "Today" }) => {
  return (
    <div className="flex">
      <CustomButton
        preset="secondary"
        onClick={() => handleSegmentChange(Segment.Back)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </CustomButton>
      <CustomButton
        preset="secondary"
        onClick={() => handleSegmentChange(Segment.Now)}
      >
        {todayLabel}
      </CustomButton>
      <CustomButton
        preset="secondary"
        onClick={() => handleSegmentChange(Segment.Next)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </CustomButton>
    </div>
  );
};

export default TimelineControls;
