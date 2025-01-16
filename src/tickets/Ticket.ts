// src/tickets/Ticket.ts
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "active" | "archived" | "occasional";
}
