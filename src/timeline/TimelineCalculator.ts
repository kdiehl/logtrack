
export const calculateCurrentTimePosition = (startHour: number, hourHeight: number): number => {
  const now = new Date();
  return calculatePosition(now.toISOString(), hourHeight, startHour);
};

const calculatePosition = (startTime: string, hourHeight: number, startHour: number): number => {
  const start = new Date(startTime);
  const hours = start.getHours();
  const minutes = start.getMinutes();
  const normalizedHour = hours - startHour;
  const positionForHour = normalizedHour * hourHeight;
  const minutesFractionOfHour = minutes / 60;
  const positionOfMinutesInHour = (minutesFractionOfHour) * hourHeight;
  console.log(positionForHour, positionOfMinutesInHour);
  return positionForHour + positionOfMinutesInHour;
}

export const calculateHeight = (startTime: string, endTime: string | undefined, hourHeight: number): number => {
    const start = new Date(startTime);
    if(!endTime) {
        return hourHeight;
    }
    const end = new Date(endTime);
    const duration = end.getTime() - start.getTime();
    const durationInMinutes = duration / 1000 / 60 / 60;
    const durationAsFractionOfAnHour = durationInMinutes;

    return durationAsFractionOfAnHour * hourHeight;
}

export const calculateBookingStyle = (
  startTime: string,
  endTime: string | undefined,
  startHour: number,
  hourHeight: number
): React.CSSProperties => {
  return {
    top: `${calculatePosition(startTime, hourHeight, startHour)}px`,
    height: `${calculateHeight(startTime, endTime, hourHeight)}px`,
  };
};
