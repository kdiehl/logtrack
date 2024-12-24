// src/utils/db.ts
import Dexie from "dexie";
import { BookingModel } from "../journal/BookingModel";
import { Ticket } from "../tickets/Ticket";

export interface SettingsModel {
  id?: number;
  theme: string;
  url: string;
}

class AppDatabase extends Dexie {
  bookings: Dexie.Table<BookingModel, number>;
  tickets: Dexie.Table<Ticket, number>;
  settings: Dexie.Table<SettingsModel, number>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      bookings: "++id, date, ticketId, startTime, endTime",
      tickets: "++id, title, status, description",
      settings: "++id, theme, url",
    });
    this.bookings = this.table("bookings");
    this.tickets = this.table("tickets");
    this.settings = this.table("settings");
  }
}

export const db = new AppDatabase();
