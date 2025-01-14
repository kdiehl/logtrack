export interface Booking {
  id: number;
  ticketId: number;
  date: string; // ISO string format
  startTime: string; // ISO string format
  endTime?: string; // ISO string format
  bookedInJira: boolean; // New flag
}
