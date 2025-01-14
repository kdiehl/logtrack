// src/utils/db.test.ts
import { db, SettingsModel } from "./db";
import { BookingFactory } from "../journal/Bookings.factory";
import { Ticket } from "../tickets/Ticket";
import { Theme } from "../settings/Theme";

describe("AppDatabase", () => {
  beforeAll(async () => {
    await db.open();
  });

  afterAll(async () => {
    await db.delete();
  });

  beforeEach(async () => {
    await db.bookings.clear();
    await db.tickets.clear();
    await db.settings.clear();
  });

  describe("Bookings", () => {
    it("should add a booking", async () => {
      const booking = BookingFactory.build();
      await db.bookings.add(booking);
      const result = await db.bookings.get(booking.id);
      expect(result).toEqual(booking);
    });

    it("should update a booking", async () => {
      const booking = BookingFactory.build();
      await db.bookings.add(booking);
      booking.date = new Date().toISOString();
      await db.bookings.put(booking);
      const result = await db.bookings.get(booking.id);
      expect(result?.date).toEqual(booking.date);
    });

    it("should handle non-existent booking", async () => {
      const result = await db.bookings.get(999);
      expect(result).toBeUndefined();
    });
  });

  describe("Tickets", () => {
    it("should add a ticket", async () => {
      const ticket: Ticket = {
        id: 1,
        title: "Test Ticket",
        status: "active",
        description: "Test Description",
      };
      await db.tickets.add(ticket);
      const result = await db.tickets.get(1);
      expect(result).toEqual(ticket);
    });

    it("should delete a ticket", async () => {
      const ticket: Ticket = {
        id: 1,
        title: "Test Ticket",
        status: "active",
        description: "Test Description",
      };
      await db.tickets.add(ticket);
      await db.tickets.delete(1);
      const result = await db.tickets.get(1);
      expect(result).toBeUndefined();
    });

    it("should handle non-existent ticket", async () => {
      const result = await db.tickets.get(999);
      expect(result).toBeUndefined();
    });
  });

  describe("Settings", () => {
    it("should add a setting", async () => {
      const setting: SettingsModel = {
        id: 1,
        theme: Theme.Dark,
        url: "http://example.com",
        jiraAccessToken: "",
      };
      await db.settings.add(setting);
      const result = await db.settings.get(1);
      expect(result).toEqual(setting);
    });

    it("should handle non-existent setting", async () => {
      const result = await db.settings.get(999);
      expect(result).toBeUndefined();
    });
  });
});
