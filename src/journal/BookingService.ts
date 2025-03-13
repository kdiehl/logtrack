import { Booking } from "./Booking";
import { db } from "../utils/db";
import { updateOvertimeWithWorkedTime } from "../services/attendanceService";

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
    await this.updateDailyOvertime(newBooking.date);
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

    await db.bookings.put(booking);
    await this.updateDailyOvertime(booking.date);
    await this.stopOngoingBooking(await db.bookings.toArray());
  }

  public async getAllBookings(): Promise<Booking[]> {
    return await db.bookings.toArray();
  }

  public async deleteBooking(bookingId: number): Promise<void> {
    const booking = await db.bookings.get(bookingId);
    if (booking) {
      await db.bookings.delete(bookingId);
      await this.updateDailyOvertime(booking.date);
    }
  }

  public async updateBooking(booking: Booking): Promise<void> {
    await db.bookings.update(booking.id, booking);
    await this.updateDailyOvertime(booking.date);
  }

  public async updateDailyOvertime(date: string) {
    const bookings = await db.bookings.where({ date }).toArray();
    const totalWorkedTime = this.calculateTotalWorkedTime(bookings);
    await updateOvertimeWithWorkedTime(totalWorkedTime, date);
  }

  private calculateTotalWorkedTime(bookings: Array<Booking>): number {
    return bookings.reduce((sum, booking) => {
      if (booking.endTime) {
        const start = new Date(booking.startTime).getTime();
        const end = new Date(booking.endTime).getTime();
        return sum + (end - start) / (1000 * 60 * 60); // convert milliseconds to hours
      }
      return sum;
    }, 0);
  }
}

export const bookingService = new BookingService();
