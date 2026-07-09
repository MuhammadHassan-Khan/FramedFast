import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "./supabase";
import { bookingSchema } from "./validations";

const submissionLog: Array<{ phone: string; at: number }> = [];
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(whatsapp: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  // Expire old entries in-place
  let writeIndex = 0;
  for (let i = 0; i < submissionLog.length; i++) {
    if (submissionLog[i].at >= windowStart) {
      submissionLog[writeIndex++] = submissionLog[i];
    }
  }
  submissionLog.length = writeIndex;

  const count = submissionLog.filter((e) => e.phone === whatsapp).length;
  if (count >= RATE_LIMIT_MAX) return false;
  submissionLog.push({ phone: whatsapp, at: now });
  return true;
}

export const createBooking = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as Record<string, unknown>)
  .handler(async (ctx) => {
    const parsed = bookingSchema.safeParse(ctx.data);
    if (!parsed.success) {
      return {
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      };
    }

    const input = parsed.data;

    // Check if the selected date is closed for booking
    if (input.selectedDate) {
      const { data: closed } = await supabaseAdmin
        .from("booking_availability")
        .select("id")
        .eq("date", input.selectedDate)
        .eq("is_open", false)
        .maybeSingle();

      if (closed) {
        return {
          error: "This date is closed for booking. Please select another day.",
        };
      }
    }

    if (!checkRateLimit(input.whatsapp)) {
      return { error: "Too many requests. Please wait a minute and try again." };
    }

    // Check for existing non-cancelled booking at this time slot
    if (input.selectedDate && input.selectedTime) {
      const { count: existingCount } = await supabaseAdmin
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("selected_date", input.selectedDate)
        .eq("selected_time", input.selectedTime)
        .neq("status", "cancelled");

      if (existingCount && existingCount > 0) {
        return { error: "This time slot is already booked. Please choose another." };
      }
    }

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        name: input.name,
        brand: input.brand,
        whatsapp: input.whatsapp,
        package: input.package,
        products_count: input.productsCount ?? null,
        source: input.source ?? null,
        selected_date: input.selectedDate ?? null,
        selected_time: input.selectedTime ?? null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase booking insert error:", error);
      return { error: "Something went wrong. Please try again." };
    }

    return { success: true, id: data.id };
  });
