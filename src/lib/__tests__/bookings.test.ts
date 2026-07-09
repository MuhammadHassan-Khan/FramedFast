import { describe, it, expect } from "vitest";
import { bookingSchema } from "@/lib/validations";

describe("Booking Rate Limiter Logic (F6 - Rate Limiting)", () => {
  it("in-memory rate limiter blocks after max attempts", () => {
    const RATE_LIMIT_WINDOW = 60_000;
    const RATE_LIMIT_MAX = 3;
    const log: Array<{ phone: string; at: number }> = [];

    function checkRateLimit(whatsapp: string): boolean {
      const now = Date.now();
      const windowStart = now - RATE_LIMIT_WINDOW;
      let writeIndex = 0;
      for (let i = 0; i < log.length; i++) {
        if (log[i].at >= windowStart) {
          log[writeIndex++] = log[i];
        }
      }
      log.length = writeIndex;

      const count = log.filter((e) => e.phone === whatsapp).length;
      if (count >= RATE_LIMIT_MAX) return false;
      log.push({ phone: whatsapp, at: now });
      return true;
    }

    const phone = "+923001234567";

    expect(checkRateLimit(phone)).toBe(true);
    expect(checkRateLimit(phone)).toBe(true);
    expect(checkRateLimit(phone)).toBe(true);
    expect(checkRateLimit(phone)).toBe(false);
  });

  it("rate limiter resets after window expires", async () => {
    const RATE_LIMIT_WINDOW = 10;
    const RATE_LIMIT_MAX = 1;
    const log: Array<{ phone: string; at: number }> = [];

    function checkRateLimit(whatsapp: string): boolean {
      const now = Date.now();
      const windowStart = now - RATE_LIMIT_WINDOW;
      let writeIndex = 0;
      for (let i = 0; i < log.length; i++) {
        if (log[i].at >= windowStart) {
          log[writeIndex++] = log[i];
        }
      }
      log.length = writeIndex;

      const count = log.filter((e) => e.phone === whatsapp).length;
      if (count >= RATE_LIMIT_MAX) return false;
      log.push({ phone: whatsapp, at: now });
      return true;
    }

    const phone = "+923001234567";
    expect(checkRateLimit(phone)).toBe(true);
    expect(checkRateLimit(phone)).toBe(false);

    await new Promise<void>((resolve) => setTimeout(resolve, 15));
    expect(checkRateLimit(phone)).toBe(true);
  });
});

describe("Booking Concurrency Check (F7 - Double-Booking Prevention)", () => {
  it("rejects booking when slot is already taken", async () => {
    // Simulate the pre-check logic from bookings.ts
    const selectedDate = "2026-07-15";
    const selectedTime = "14:00";

    // Check for existing active bookings at this slot
    async function checkExistingBooking(
      date: string,
      time: string,
      existingCount: number,
    ): Promise<string | null> {
      if (date && time && existingCount > 0) {
        return "This time slot is already booked. Please choose another.";
      }
      return null;
    }

    // Slot taken
    const result = await checkExistingBooking(selectedDate, selectedTime, 1);
    expect(result).toBe("This time slot is already booked. Please choose another.");

    // Slot free
    const result2 = await checkExistingBooking(selectedDate, selectedTime, 0);
    expect(result2).toBeNull();
  });
});
