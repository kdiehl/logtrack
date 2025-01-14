import { faker } from "@faker-js/faker";
import { Booking } from "./Booking";
import { each, makeFactory } from "factory.ts/lib/sync";
import moment from "moment";

export const BookingFactory = makeFactory<Booking>({
  id: each(() => faker.number.int()),
  ticketId: each(() => faker.number.int()),
  date: each(() => faker.date.past().toISOString()),
  startTime: "",
  endTime: "",
})
  .withDerivation("startTime", (booking) => {
    return moment(booking.date)
      .hour(faker.number.int({ min: 0, max: 22 }))
      .toISOString();
  })
  .withDerivation("endTime", (booking) => {
    return moment(booking.startTime)
      .add(faker.number.int({ min: 1, max: 8, multipleOf: 15 }), "minutes")
      .toISOString();
  });
