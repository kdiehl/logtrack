import { BookingFactory } from "./Bookings.factory";
import { durationCalculator } from "./DurationCalculator";
import { Booking } from "./Booking";

describe("DurationCalculator", () => {
  it("calculates total time for multiple entries", () => {
    const entries = [
      BookingFactory.build({
        startTime: "2023-10-01T08:00:00Z",
        endTime: "2023-10-01T10:00:00Z",
      }),
      BookingFactory.build({
        startTime: "2023-10-01T11:00:00Z",
        endTime: "2023-10-01T13:00:00Z",
      }),
    ];
    expect(durationCalculator.calculateTotalTime(entries)).toBe(4.0);
  });

  it("returns 0.00 when there are no entries", () => {
    const entries: Booking[] = [];
    expect(durationCalculator.calculateTotalTime(entries)).toBe(0.0);
  });

  it("ignores entries without endTime", () => {
    const entries = [
      BookingFactory.build({
        startTime: "2023-10-01T08:00:00Z",
        endTime: "2023-10-01T10:00:00Z",
      }),
      BookingFactory.build({
        startTime: "2023-10-01T11:00:00Z",
        endTime: undefined,
      }),
    ];
    expect(durationCalculator.calculateTotalTime(entries)).toBe(2.0);
  });

  it("handles entries with the same startTime and endTime", () => {
    const entries = [
      BookingFactory.build({
        startTime: "2023-10-01T08:00:00Z",
        endTime: "2023-10-01T08:00:00Z",
      }),
    ];
    expect(durationCalculator.calculateTotalTime(entries)).toBe(0.0);
  });

  it("handles entries with endTime before startTime", () => {
    const entries = [
      BookingFactory.build({
        startTime: "2023-10-01T10:00:00Z",
        endTime: "2023-10-01T08:00:00Z",
      }),
    ];
    expect(durationCalculator.calculateTotalTime(entries)).toBe(-2.0);
  });
});
