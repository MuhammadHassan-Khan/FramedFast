import { Fragment, useEffect, useMemo, useState } from "react";
import { createBooking } from "@/lib/bookings";
import { checkDatesOpen, getBookedSlots } from "@/lib/booking-admin";

function startOfWeek(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

const HOURS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  return `${DAY_NAMES[d.getDay() === 0 ? 6 : d.getDay() - 1]}, ${day} ${MONTHS[d.getMonth()]}`;
}

function fmtDateFull(d: Date) {
  const day = String(d.getDate()).padStart(2, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const y = d.getFullYear();
  return `${y}-${m}-${day}`;
}

export function BookingForm() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selected, setSelected] = useState<{ date: Date; time: string } | null>(null);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    whatsapp: "",
    pkg: "Starter",
    products: "",
    source: "Instagram",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [closedDays, setClosedDays] = useState<Set<string>>(new Set());
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setNow(new Date());
  }, []);

  const weekStart = useMemo(() => {
    const base = startOfWeek(new Date());
    base.setDate(base.getDate() + weekOffset * 7);
    return base;
  }, [weekOffset]);

  const days = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        return d;
      }),
    [weekStart],
  );

  const dateStrs = useMemo(() => days.map((d) => fmtDateFull(d)), [days]);

  useEffect(() => {
    checkDatesOpen({ data: { dates: dateStrs } })
      .then((result) => {
        if (result && typeof result === "object" && !("error" in result)) {
          const closed = new Set<string>();
          for (const [date, isOpen] of Object.entries(result as Record<string, boolean>)) {
            if (!isOpen) closed.add(date);
          }
          setClosedDays(closed);
        } else {
          console.warn("checkDatesOpen returned", result);
        }
      })
      .catch((err) => console.error("checkDatesOpen failed", err));
    getBookedSlots({ data: { dates: dateStrs } })
      .then((result) => {
        if (result && typeof result === "object" && !("error" in result)) {
          setBookedSlots(result as Record<string, string[]>);
        } else {
          console.warn("getBookedSlots returned", result);
        }
      })
      .catch((err) => console.error("getBookedSlots failed", err));
  }, [dateStrs]);

  useEffect(() => {
    if (selected && closedDays.has(fmtDateFull(selected.date))) {
      setSelected(null);
    }
  }, [closedDays, selected]);

  const isPast = (d: Date, h: string) => {
    if (!now) return false;
    const slot = new Date(d);
    const [hh] = h.split(":");
    slot.setHours(parseInt(hh), 0, 0, 0);
    return slot < now;
  };

  const canConfirm = selected && form.name.trim() && form.brand.trim() && form.whatsapp.trim();

  if (confirmed && selected) {
    return (
      <div className="bg-brand-dark border border-brand-orange/30 rounded-lg p-8 md:p-12 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display text-3xl md:text-4xl text-brand-white">Booking Confirmed.</h3>
        <p className="mt-4 text-brand-neutral max-w-xl mx-auto">
          We'll WhatsApp you within 1 hour to confirm your slot and share the next steps.
        </p>
        <div className="mt-6 font-accent text-brand-white/90 space-y-1">
          <div>
            📅 {fmtDate(selected.date)} · {selected.time} PKT
          </div>
          <div>📦 Package: {form.pkg}</div>
          <div>
            👤 {form.name} · {form.brand}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            className="btn-ghost"
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=FramedFast+Discovery+Call&details=Package:+${encodeURIComponent(form.pkg)}%0AName:+${encodeURIComponent(form.name)}%0ABrand:+${encodeURIComponent(form.brand)}%0AWhatsApp:+${encodeURIComponent(form.whatsapp)}`}
            target="_blank"
            rel="noreferrer"
          >
            → Save to Calendar
          </a>
          <a
            className="btn-primary"
            href={`https://wa.me/923120117197?text=${encodeURIComponent(`Hi FramedFast — I booked ${fmtDate(selected.date)} ${selected.time} for ${form.pkg}.`)}`}
            target="_blank"
            rel="noreferrer"
          >
            → Add to WhatsApp Reminders
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark border border-white/10 rounded-lg p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Full Name"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          placeholder="Your full name"
        />
        <Field
          label="Brand Name"
          value={form.brand}
          onChange={(v) => setForm({ ...form, brand: v })}
          placeholder="@yourbrand"
        />
        <Field
          label="WhatsApp Number"
          value={form.whatsapp}
          onChange={(v) => setForm({ ...form, whatsapp: v })}
          placeholder="+92 3XX XXXXXXX"
          type="tel"
        />
        <Select
          label="Package Interest"
          value={form.pkg}
          onChange={(v) => setForm({ ...form, pkg: v })}
          options={["Starter", "Growth", "Premium", "Growth Retainer", "Not Sure"]}
        />
        <Field
          label="No. of Products"
          value={form.products}
          onChange={(v) => setForm({ ...form, products: v })}
          placeholder="e.g. 25"
          type="number"
        />
        <Select
          label="How did you hear about us?"
          value={form.source}
          onChange={(v) => setForm({ ...form, source: v })}
          options={["Instagram", "LinkedIn", "Referral", "Google", "Other"]}
        />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display text-2xl text-brand-white">Pick a time</h4>
          <div className="flex items-center gap-2">
            <button
              className="font-accent text-sm text-brand-white/70 hover:text-brand-white px-3 py-1.5 border border-white/10 rounded disabled:opacity-30"
              onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
              disabled={weekOffset === 0}
            >
              ←
            </button>
            <span className="font-accent text-sm text-brand-white/70 w-44 text-center">
              {fmtDate(days[0])} – {fmtDate(days[5])}
            </span>
            <button
              className="font-accent text-sm text-brand-white/70 hover:text-brand-white px-3 py-1.5 border border-white/10 rounded disabled:opacity-30"
              onClick={() => setWeekOffset((w) => Math.min(2, w + 1))}
              disabled={weekOffset === 2}
            >
              →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-[80px_repeat(6,minmax(100px,1fr))] gap-px bg-white/10 border border-white/10 min-w-[680px]">
            <div className="bg-brand-dark p-2" />
            {days.map((d, i) => {
              const ds = fmtDateFull(d);
              const closed = closedDays.has(ds);
              return (
                <div key={i} className="bg-brand-dark p-2 text-center">
                  <div className="font-accent text-xs text-brand-orange uppercase">
                    {DAY_NAMES[i]}
                  </div>
                  <div className="font-display text-white text-lg">{d.getDate()}</div>
                  {closed && (
                    <div className="font-accent text-[10px] text-red-400/70 uppercase mt-0.5">
                      Closed
                    </div>
                  )}
                </div>
              );
            })}
            {HOURS.map((h) => (
              <Fragment key={h}>
                <div className="bg-brand-dark p-2 font-accent text-xs text-brand-neutral flex items-center justify-end">
                  {h}
                </div>
                {days.map((d, i) => {
                  const ds = fmtDateFull(d);
                  const closed = closedDays.has(ds);
                  const taken = (bookedSlots[ds] ?? []).includes(h);
                  const booked = closed || taken || isPast(d, h);
                  const isSel =
                    selected &&
                    selected.date.toDateString() === d.toDateString() &&
                    selected.time === h;
                  return (
                    <button
                      key={`${i}-${h}`}
                      disabled={booked}
                      onClick={() => setSelected({ date: d, time: h })}
                      className={`p-2 text-xs font-accent transition-colors ${
                        closed
                          ? "bg-white/5 text-white/20 cursor-not-allowed"
                          : taken
                            ? "bg-red-900/20 text-red-400/60 cursor-not-allowed line-through"
                            : booked
                              ? "bg-white/5 text-white/20 cursor-not-allowed"
                              : isSel
                                ? "bg-brand-orange text-brand-black font-semibold"
                                : "bg-brand-black text-brand-orange hover:bg-brand-orange/20"
                      }`}
                    >
                      {closed ? "Closed" : taken ? "Booked" : booked ? "—" : isSel ? "✓" : h}
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="font-accent text-brand-white/90 space-y-1 text-sm md:text-base">
            <div>
              📅 Your selected time:{" "}
              <span className="text-brand-orange">
                {fmtDate(selected.date)} · {selected.time} PKT
              </span>
            </div>
            <div>
              📦 Package: <span className="text-brand-orange">{form.pkg}</span>
            </div>
            <div>
              👤 Name: <span className="text-brand-orange">{form.name || "—"}</span>
            </div>
          </div>
          {submitError && (
            <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400">
              {submitError}
            </div>
          )}
          <button
            onClick={async () => {
              if (!canConfirm || submitting) return;
              setSubmitting(true);
              setSubmitError("");

              const result = await createBooking({
                data: {
                  name: form.name,
                  brand: form.brand,
                  whatsapp: form.whatsapp,
                  package: form.pkg,
                  productsCount: form.products,
                  source: form.source,
                  selectedDate: selected!.date.toISOString().split("T")[0],
                  selectedTime: selected!.time,
                },
              });

              if (result.error) {
                setSubmitError(
                  typeof result.issues === "object"
                    ? Object.values(result.issues).flat().join(". ")
                    : result.error,
                );
                setSubmitting(false);
                return;
              }

              setConfirmed(true);
              setSubmitting(false);
            }}
            disabled={!canConfirm || submitting}
            className="mt-6 btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : "→ Confirm Booking"}
          </button>
          {!canConfirm && !submitting && (
            <p className="mt-2 text-xs text-brand-neutral text-center">
              Fill in your name, brand, and WhatsApp to confirm.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="font-accent text-xs uppercase tracking-wider text-brand-neutral">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full bg-brand-black border border-white/15 focus:border-brand-orange outline-none text-brand-white px-4 py-3 rounded font-body"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="font-accent text-xs uppercase tracking-wider text-brand-neutral">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-brand-black border border-white/15 focus:border-brand-orange outline-none text-brand-white px-4 py-3 rounded font-body"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
