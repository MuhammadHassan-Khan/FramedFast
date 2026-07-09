import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "./supabase";
import { verifyAdminToken, requireRole } from "./supabase-auth";

function adminValidator(d: unknown) {
  return d as { token?: string };
}

function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export type DayAvailability = {
  date: string;
  day: number;
  isOpen: boolean;
  bookingCount: number;
  isCurrentMonth: boolean;
};

export const getMonthAvailability = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { token?: string; year: number; month: number })
  .handler(async (ctx) => {
    const { token, year, month } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const firstDay = startOfMonth(year, month);
    const calendarStart = startOfWeek(firstDay);

    const days: DayAvailability[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(calendarStart);
      d.setDate(d.getDate() + i);
      days.push({
        date: formatDate(d),
        day: d.getDate(),
        isOpen: true,
        bookingCount: 0,
        isCurrentMonth: d.getMonth() === month,
      });
    }

    const dateStrings = days.map((d) => d.date);

    const [availResult, bookingResult] = await Promise.all([
      supabaseAdmin
        .from("booking_availability")
        .select("date, is_open")
        .in("date", dateStrings)
        .eq("is_open", false),
      supabaseAdmin
        .from("bookings")
        .select("selected_date")
        .in("selected_date", dateStrings)
        .neq("status", "cancelled"),
    ]);

    const closedDates = new Set((availResult.data ?? []).map((r) => r.date));

    const bookingCounts: Record<string, number> = {};
    for (const row of bookingResult.data ?? []) {
      const d = row.selected_date as string;
      bookingCounts[d] = (bookingCounts[d] ?? 0) + 1;
    }

    for (const day of days) {
      if (closedDates.has(day.date)) {
        day.isOpen = false;
      }
      day.bookingCount = bookingCounts[day.date] ?? 0;
    }

    return days;
  });

export const closeDay = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { token?: string; date: string })
  .handler(async (ctx) => {
    const { token, date } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager"]);

    const { error } = await supabaseAdmin
      .from("booking_availability")
      .upsert({ date, is_open: false }, { onConflict: "date" });

    if (error) {
      console.error("closeDay error:", error);
      return { error: "Failed to close day" };
    }
    return { success: true };
  });

export const openDay = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { token?: string; date: string })
  .handler(async (ctx) => {
    const { token, date } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager"]);

    const { error } = await supabaseAdmin.from("booking_availability").delete().eq("date", date);

    if (error) {
      console.error("openDay error:", error);
      return { error: "Failed to open day" };
    }
    return { success: true };
  });

export const setBulkStatus = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { token?: string; dates: string[]; isOpen: boolean })
  .handler(async (ctx) => {
    const { token, dates, isOpen } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager"]);

    if (isOpen) {
      const { error } = await supabaseAdmin.from("booking_availability").delete().in("date", dates);

      if (error) {
        console.error("setBulkStatus open error:", error);
        return { error: "Failed to open days" };
      }
    } else {
      const rows = dates.map((date) => ({ date, is_open: false }));
      const { error } = await supabaseAdmin
        .from("booking_availability")
        .upsert(rows, { onConflict: "date" });

      if (error) {
        console.error("setBulkStatus close error:", error);
        return { error: "Failed to close days" };
      }
    }

    return { success: true };
  });

export const checkDatesOpen = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { dates: string[] })
  .handler(async (ctx) => {
    const { dates } = ctx.data;

    const { data } = await supabaseAdmin
      .from("booking_availability")
      .select("date")
      .in("date", dates)
      .eq("is_open", false);

    const closed = new Set((data ?? []).map((r) => r.date));
    const result: Record<string, boolean> = {};
    for (const d of dates) {
      result[d] = !closed.has(d);
    }
    return result;
  });

export const getBookedSlots = createServerFn({ method: "POST" })
  .validator((d: unknown) => d as { dates: string[] })
  .handler(async (ctx) => {
    const { dates } = ctx.data;

    const { data } = await supabaseAdmin
      .from("bookings")
      .select("selected_date, selected_time")
      .in("selected_date", dates)
      .neq("status", "cancelled");

    const result: Record<string, string[]> = {};
    for (const d of dates) {
      result[d] = [];
    }
    for (const row of data ?? []) {
      const date = row.selected_date as string;
      const time = row.selected_time as string;
      if (date && time && result[date]) {
        result[date].push(time);
      }
    }
    return result;
  });
