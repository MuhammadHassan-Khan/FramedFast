import { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";

type BookingRecord = {
  id: string;
  name: string;
  brand: string;
  whatsapp: string;
  package: string;
  products_count: number | null;
  source: string | null;
  selected_date: string;
  selected_time: string;
  status: string;
  created_at: string;
};

type DayAvailability = {
  date: string;
  day: number;
  isOpen: boolean;
  bookingCount: number;
  isCurrentMonth: boolean;
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function fmt(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isToday(date: string) {
  return date === fmt(new Date());
}

function buildCalendar(year: number, month: number): DayAvailability[] {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  const dow = start.getDay();
  start.setDate(start.getDate() - (dow === 0 ? 6 : dow - 1));
  const days: DayAvailability[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    days.push({
      date: fmt(d),
      day: d.getDate(),
      isOpen: true,
      bookingCount: 0,
      isCurrentMonth: d.getMonth() === month,
    });
  }
  return days;
}

export function BookingsAdmin({ dark }: { dark: boolean }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<"open" | "close" | null>(null);

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsErr, setBookingsErr] = useState<string | null>(null);
  const [bookingsSearch, setBookingsSearch] = useState("");
  const [toggleErr, setToggleErr] = useState<string | null>(null);
  const [bulkErr, setBulkErr] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchDays = async (y: number, m: number) => {
    setLoading(true);
    setErrMsg(null);
    try {
      const cal = buildCalendar(y, m);
      const dates = cal.map((d) => d.date);

      const [availRes, bookRes] = await Promise.all([
        supabase.from("booking_availability").select("date").in("date", dates).eq("is_open", false),
        supabase
          .from("bookings")
          .select("selected_date")
          .in("selected_date", dates)
          .neq("status", "cancelled"),
      ]);

      const closed = new Set((availRes.data ?? []).map((r) => r.date));
      const counts: Record<string, number> = {};
      for (const r of bookRes.data ?? []) {
        const d = r.selected_date as string;
        counts[d] = (counts[d] ?? 0) + 1;
      }

      for (const day of cal) {
        if (closed.has(day.date)) day.isOpen = false;
        day.bookingCount = counts[day.date] ?? 0;
      }

      setDays(cal);
    } catch {
      setErrMsg("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setBookingsLoading(true);
    setBookingsErr(null);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      setBookings(data ?? []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setBookingsErr("Failed to load bookings");
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => {
    fetchDays(year, month);
  }, [year, month]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleToggle = async (date: string, currentOpen: boolean) => {
    setToggling(date);
    setToggleErr(null);
    try {
      let err: { message: string } | null = null;
      if (currentOpen) {
        const res = await supabase
          .from("booking_availability")
          .upsert({ date, is_open: false }, { onConflict: "date" });
        err = res.error;
      } else {
        const res = await supabase.from("booking_availability").delete().eq("date", date);
        err = res.error;
      }
      if (err) {
        setToggleErr(`Failed to ${currentOpen ? "close" : "open"} ${date}: ${err.message}`);
        return;
      }
      setDays((prev) => prev.map((d) => (d.date === date ? { ...d, isOpen: !currentOpen } : d)));
    } catch (e) {
      setToggleErr(`Unexpected error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setToggling(null);
    }
  };

  const handleBulk = async (isOpen: boolean) => {
    setBulkAction(isOpen ? "open" : "close");
    setBulkErr(null);
    try {
      const target = days.filter((d) => d.isCurrentMonth && d.isOpen !== isOpen).map((d) => d.date);
      if (target.length === 0) {
        setBulkAction(null);
        return;
      }
      let err: { message: string } | null = null;
      if (isOpen) {
        const res = await supabase.from("booking_availability").delete().in("date", target);
        err = res.error;
      } else {
        const rows = target.map((date) => ({ date, is_open: false }));
        const res = await supabase
          .from("booking_availability")
          .upsert(rows, { onConflict: "date" });
        err = res.error;
      }
      if (err) {
        setBulkErr(`Bulk action failed: ${err.message}`);
        return;
      }
      setDays((prev) => prev.map((d) => (d.isCurrentMonth ? { ...d, isOpen } : d)));
    } catch (e) {
      setBulkErr(`Unexpected error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBulkAction(null);
    }
  };

  const weekRows = useMemo(() => {
    const rows: DayAvailability[][] = [];
    for (let i = 0; i < 42; i += 7) rows.push(days.slice(i, i + 7));
    return rows;
  }, [days]);

  const openCount = days.filter((d) => d.isCurrentMonth && d.isOpen).length;
  const closedCount = days.filter((d) => d.isCurrentMonth && !d.isOpen).length;

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Bookings</h1>
        <p className="mt-1 text-sm opacity-60">
          Control which days are open for public booking. Click any day to toggle.
        </p>
      </div>

      {errMsg && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600">
          {errMsg}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin opacity-50" />
        </div>
      ) : (
        <>
          <div
            className={`rounded-2xl border p-5 ${dark ? "border-white/5 bg-[#141416]" : "border-black/5 bg-white"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => {
                  if (month === 0) {
                    setYear((y) => y - 1);
                    setMonth(11);
                  } else {
                    setMonth((m) => m - 1);
                  }
                }}
                className={`grid h-9 w-9 place-items-center rounded-lg transition ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="font-display text-xl font-bold tracking-tight">
                {MONTH_NAMES[month]} {year}
              </div>
              <button
                onClick={() => {
                  if (month === 11) {
                    setYear((y) => y + 1);
                    setMonth(0);
                  } else {
                    setMonth((m) => m + 1);
                  }
                }}
                className={`grid h-9 w-9 place-items-center rounded-lg transition ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {openCount} open
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
                {closedCount} closed
              </span>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => handleBulk(true)}
                  disabled={bulkAction !== null}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"} disabled:opacity-40`}
                >
                  {bulkAction === "open" ? (
                    <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                  ) : null}
                  Open All
                </button>
                <button
                  onClick={() => handleBulk(false)}
                  disabled={bulkAction !== null}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"} disabled:opacity-40`}
                >
                  {bulkAction === "close" ? (
                    <Loader2 className="inline h-3 w-3 animate-spin mr-1" />
                  ) : null}
                  Close All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px">
              {DAY_LABELS.map((label) => (
                <div
                  key={label}
                  className="text-center text-[11px] font-semibold uppercase tracking-wider opacity-50 pb-3"
                >
                  {label}
                </div>
              ))}
              {weekRows.flat().map((day) => {
                const today = isToday(day.date);
                return (
                  <button
                    key={day.date}
                    onClick={() => handleToggle(day.date, day.isOpen)}
                    disabled={toggling === day.date}
                    className={`relative flex flex-col items-center gap-0.5 rounded-lg p-2 text-xs transition
                      ${day.isCurrentMonth ? (day.isOpen ? (dark ? "hover:bg-white/5" : "hover:bg-black/[0.03]") : dark ? "bg-white/[0.03] hover:bg-white/5" : "bg-black/[0.02] hover:bg-black/5") : "opacity-30"}
                      ${today ? "ring-1 ring-[#FA680A]/40" : ""} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span
                      className={`font-display text-sm font-semibold ${today ? "text-[#FA680A]" : ""}`}
                    >
                      {day.day}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full ${day.isOpen ? "bg-emerald-500" : "bg-neutral-400"}`}
                    />
                    {day.bookingCount > 0 && (
                      <span
                        className={`text-[10px] font-accent font-medium ${day.isOpen ? "text-[#FA680A]" : dark ? "text-white/40" : "text-black/40"}`}
                      >
                        {day.bookingCount}
                      </span>
                    )}
                    {toggling === day.date && (
                      <span className="absolute inset-0 grid place-items-center rounded-lg bg-black/10">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`mt-4 flex flex-wrap gap-4 rounded-xl border px-4 py-3 text-xs ${dark ? "border-white/5 bg-[#141416]" : "border-black/5 bg-white"}`}
          >
            <span className="font-medium opacity-60">Legend:</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Open for booking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neutral-400" />
              Closed for booking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-display text-sm font-semibold text-[#FA680A]">12</span>Today
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-accent text-[10px] font-medium text-[#FA680A]">3</span>Booking
              count
            </span>
          </div>

          {toggleErr && (
            <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600">
              {toggleErr}
            </div>
          )}
          {bulkErr && (
            <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600">
              {bulkErr}
            </div>
          )}

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold">All Bookings</div>
              <div
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]"}`}
              >
                <Search className="h-3.5 w-3.5 opacity-50" />
                <input
                  value={bookingsSearch}
                  onChange={(e) => setBookingsSearch(e.target.value)}
                  placeholder="Search name, brand..."
                  className="w-40 bg-transparent outline-none"
                />
              </div>
            </div>
            {bookingsLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin opacity-50" />
              </div>
            ) : bookingsErr ? (
              <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600">
                {bookingsErr}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider opacity-60">
                    <tr className="text-left">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Brand</th>
                      <th className="py-2 pr-4">WhatsApp</th>
                      <th className="py-2 pr-4">Package</th>
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Time</th>
                      <th className="py-2 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings
                      .filter(
                        (b) =>
                          !bookingsSearch ||
                          [b.name, b.brand, b.whatsapp]
                            .join(" ")
                            .toLowerCase()
                            .includes(bookingsSearch.toLowerCase()),
                      )
                      .map((b) => (
                        <tr
                          key={b.id}
                          className={`border-t ${dark ? "border-white/5" : "border-black/5"}`}
                        >
                          <td className="py-3 pr-4 font-medium">{b.name}</td>
                          <td className="py-3 pr-4 opacity-80">{b.brand}</td>
                          <td className="py-3 pr-4 opacity-80">{b.whatsapp}</td>
                          <td className="py-3 pr-4">{b.package}</td>
                          <td className="py-3 pr-4 opacity-70 whitespace-nowrap">
                            {b.selected_date}
                          </td>
                          <td className="py-3 pr-4 opacity-70">{b.selected_time}</td>
                          <td className="py-3 pr-4">
                            <select
                              value={b.status}
                              disabled={updatingStatus === b.id}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                setUpdatingStatus(b.id);
                                const { error } = await supabase
                                  .from("bookings")
                                  .update({ status: newStatus })
                                  .eq("id", b.id);
                                if (error) {
                                  console.error("Status update failed:", error);
                                } else {
                                  setBookings((prev) =>
                                    prev.map((x) =>
                                      x.id === b.id ? { ...x, status: newStatus } : x,
                                    ),
                                  );
                                }
                                setUpdatingStatus(null);
                              }}
                              className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold outline-none cursor-pointer ${
                                b.status === "confirmed"
                                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                  : b.status === "cancelled"
                                    ? "bg-red-500/10 text-red-600 border-red-500/20"
                                    : b.status === "completed"
                                      ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              } ${updatingStatus === b.id ? "opacity-50" : ""}`}
                            >
                              <option value="pending">pending</option>
                              <option value="confirmed">confirmed</option>
                              <option value="completed">completed</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-10 text-center opacity-60">
                          No bookings yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
