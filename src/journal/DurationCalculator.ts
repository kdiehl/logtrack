import { Booking } from "./Booking";

class DurationCalculator {
  public calculateTotalTime(entries: Booking[]) {
    const totalTimeInMs = entries
      .filter((entry) => entry.endTime)
      .reduce((acc, entry) => {
        const start = new Date(entry.startTime).getTime();
        const end = new Date(entry.endTime!).getTime();
        return acc + (end - start);
      }, 0);
    const totalTimeInHours = totalTimeInMs / (1000 * 60 * 60);
    return totalTimeInHours.toFixed(2) + "h";
  }
}

export const durationCalculator = new DurationCalculator();
