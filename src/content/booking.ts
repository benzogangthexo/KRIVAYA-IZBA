import { site } from "@/content/site";
import type { BookingConfig } from "@/lib/booking";

/* Бронь стола: каждый день 12:00-24:00, Ульяновск (UTC+4), слоты по 30 минут, последний за час до закрытия */
const day = { open: "12:00", close: "00:00" };

export const bookingConfig: BookingConfig = {
  codePrefix: "KI",
  timeZone: "Europe/Ulyanovsk",
  slotMinutes: 30,
  leadMinutes: 60,
  lastSlotBeforeClose: 60,
  daysAhead: 14,
  busyShare: 0.3,
  week: [day, day, day, day, day, day, day],
  steps: [
    {
      id: "guests",
      title: "Сколько вас будет",
      hint: "Большой компании подберём стол заранее",
      columns: 2,
      options: [
        { id: "2", label: "1-2 гостя" },
        { id: "4", label: "3-4 гостя" },
        { id: "6", label: "5-6 гостей" },
        { id: "10", label: "7-10 гостей", note: "Можно отдельную кабинку" },
      ],
    },
  ],
  phone: site.phone,
};
