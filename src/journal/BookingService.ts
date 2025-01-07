import { Booking } from "./Booking";
import { db } from "../utils/db";

class BookingService {
  private roundToNearestQuarterHour(date: Date) {
    const minutes = 15 * Math.round(date.getMinutes() / 15);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  public async createBooking(ticketId: number, startTime: string) {
    const bookings = await db.bookings.toArray();
    await this.stopOngoingBooking(bookings);

    const roundedStartTime = this.roundToNearestQuarterHour(
      new Date(startTime),
    ).toISOString();
    const newBooking: Booking = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      ticketId,
      startTime: roundedStartTime,
    };
    await db.bookings.add(newBooking);
  }

  private async stopOngoingBooking(bookings: Array<Booking>) {
    const ongoingBooking = bookings.find((booking) => !booking.endTime);
    if (ongoingBooking) {
      await this.setEndTime(ongoingBooking, new Date().toISOString());
    }
  }

  public async setEndTime(booking: Booking, endTime: string) {
    booking.endTime = this.roundToNearestQuarterHour(
      new Date(endTime),
    ).toISOString();

    // if (booking.startTime === booking.endTime) {
    //   return;
    // }

    await db.bookings.put(booking);
    await this.stopOngoingBooking(await db.bookings.toArray());
  }
}

export const bookingService = new BookingService();
