import { Booking } from "./Booking";

class DurationCalculator {
  public calculateTotalTime(entries: Booking[]): number {
    const totalTimeInMs = entries
      .filter((entry) => entry.endTime)
      .reduce((acc, entry) => {
        const start = new Date(entry.startTime).getTime();
        const end = new Date(entry.endTime!).getTime();
        return acc + (end - start);
      }, 0);
    const totalTimeInHours = totalTimeInMs / (1000 * 60 * 60);
    return Number(totalTimeInHours.toFixed(2));
  }
}

export const durationCalculator = new DurationCalculator();
