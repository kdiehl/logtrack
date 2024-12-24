export interface BookingModel {
  id: number;
  ticketId: number;
  date: string; // ISO string format
  startTime: string; // ISO string format
  endTime?: string; // ISO string format
}
