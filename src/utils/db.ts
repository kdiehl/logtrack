// src/utils/db.ts
import Dexie from "dexie";
import { Booking } from "../journal/Booking";
import { Ticket } from "../tickets/Ticket";
import { Theme } from "../settings/Theme";

export interface SettingsModel {
  id?: number;
  theme: Theme;
  url: string;
  workplaces: string[];
  attendances: string[];
}

export interface Attendance {
  id?: number;
  date: string; // ISO string format
  workplace: string;
  attendance: string;
}

class AppDatabase extends Dexie {
  bookings: Dexie.Table<Booking, number>;
  tickets: Dexie.Table<Ticket, number>;
  settings: Dexie.Table<SettingsModel, number>;
  attendances: Dexie.Table<Attendance, number>;

  constructor() {
    super("AppDatabase");
    this.version(1).stores({
      bookings: "++id, date, ticketId, startTime, endTime",
      tickets: "++id, title, status, description",
      settings: "++id, theme, url, workplaces, attendances",
      attendances: "++id, date, workplace, attendance",
    });
    this.bookings = this.table("bookings");
    this.tickets = this.table("tickets");
    this.settings = this.table("settings");
    this.attendances = this.table("attendances");
  }
}

export const db = new AppDatabase();
