// src/utils/db.ts
import Dexie from "dexie";
import { Booking } from "../journal/Booking";
import { Ticket } from "../tickets/Ticket";
import { Theme } from "../settings/Theme";

export interface SettingsModel {
  id?: number;
  theme: Theme;
  url: string;
  timelineDayTypes: string[];
  timelineWorkStatuses: string[];
}

class AppDatabase extends Dexie {
  bookings: Dexie.Table<Booking, number>;
  tickets: Dexie.Table<Ticket, number>;
  settings: Dexie.Table<SettingsModel, number>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      bookings: "++id, date, ticketId, startTime, endTime",
      tickets: "++id, title, status, description",
      settings: "++id, theme, url, timelineDayTypes, timelineWorkStatuses",
    });
    this.bookings = this.table("bookings");
    this.tickets = this.table("tickets");
    this.settings = this.table("settings");
  }
}

export const db = new AppDatabase();
