import { c as createServerFn } from "./esm-B50dUWcE.mjs";
import { a as monthAvailabilitySchema, i as datesSchema, n as bulkStatusSchema, r as closeDaySchema } from "./validations-Dhx7ajlM.mjs";
import { n as supabaseAdmin, t as createServerRpc } from "./supabase-vy9kvSwN.mjs";
import { n as verifyAdminToken, t as requireRole } from "./supabase-auth-DmtgsSkq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking-admin-BIQ-gQob.js
function startOfMonth(year, month) {
	return new Date(year, month, 1);
}
function startOfWeek(date) {
	const d = new Date(date);
	const day = d.getDay();
	const diff = (day === 0 ? -6 : 1) - day;
	d.setDate(d.getDate() + diff);
	d.setHours(0, 0, 0, 0);
	return d;
}
function formatDate(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
var getMonthAvailability_createServerFn_handler = createServerRpc({
	id: "d7b8ba51b3773a61e0cd47f5adfe808de9bcf483fc17d021e7534e91b120b3db",
	name: "getMonthAvailability",
	filename: "src/lib/booking-admin.ts"
}, (opts) => getMonthAvailability.__executeServer(opts));
var getMonthAvailability = createServerFn({ method: "POST" }).validator((d) => monthAvailabilitySchema.parse(d)).handler(getMonthAvailability_createServerFn_handler, async (ctx) => {
	const { token, year, month } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const calendarStart = startOfWeek(startOfMonth(year, month));
	const days = [];
	for (let i = 0; i < 42; i++) {
		const d = new Date(calendarStart);
		d.setDate(d.getDate() + i);
		days.push({
			date: formatDate(d),
			day: d.getDate(),
			isOpen: true,
			bookingCount: 0,
			isCurrentMonth: d.getMonth() === month
		});
	}
	const dateStrings = days.map((d) => d.date);
	const [availResult, bookingResult] = await Promise.all([supabaseAdmin.from("booking_availability").select("date, is_open").in("date", dateStrings).eq("is_open", false), supabaseAdmin.from("bookings").select("selected_date").in("selected_date", dateStrings).neq("status", "cancelled")]);
	const closedDates = new Set((availResult.data ?? []).map((r) => r.date));
	const bookingCounts = {};
	for (const row of bookingResult.data ?? []) {
		const d = row.selected_date;
		bookingCounts[d] = (bookingCounts[d] ?? 0) + 1;
	}
	for (const day of days) {
		if (closedDates.has(day.date)) day.isOpen = false;
		day.bookingCount = bookingCounts[day.date] ?? 0;
	}
	return days;
});
var closeDay_createServerFn_handler = createServerRpc({
	id: "bd28f88072d07bdb5da39428c1abd268fe83545278744fd265a70e8b32ce2e33",
	name: "closeDay",
	filename: "src/lib/booking-admin.ts"
}, (opts) => closeDay.__executeServer(opts));
var closeDay = createServerFn({ method: "POST" }).validator((d) => closeDaySchema.parse(d)).handler(closeDay_createServerFn_handler, async (ctx) => {
	const { token, date } = ctx.data;
	requireRole(await verifyAdminToken(token), ["admin", "manager"]);
	const { error } = await supabaseAdmin.from("booking_availability").upsert({
		date,
		is_open: false
	}, { onConflict: "date" });
	if (error) {
		console.error("closeDay error:", error);
		return { error: "Failed to close day" };
	}
	return { success: true };
});
var openDay_createServerFn_handler = createServerRpc({
	id: "be1ec7f7ab9f3415ac9af9bf9f90070452a36b8b096267a4ed79d37b362f6edd",
	name: "openDay",
	filename: "src/lib/booking-admin.ts"
}, (opts) => openDay.__executeServer(opts));
var openDay = createServerFn({ method: "POST" }).validator((d) => closeDaySchema.parse(d)).handler(openDay_createServerFn_handler, async (ctx) => {
	const { token, date } = ctx.data;
	requireRole(await verifyAdminToken(token), ["admin", "manager"]);
	const { error } = await supabaseAdmin.from("booking_availability").delete().eq("date", date);
	if (error) {
		console.error("openDay error:", error);
		return { error: "Failed to open day" };
	}
	return { success: true };
});
var setBulkStatus_createServerFn_handler = createServerRpc({
	id: "453c9735da5d4d12fe76d448fb0e592be130f1a9d46a769e5f5003f648a03240",
	name: "setBulkStatus",
	filename: "src/lib/booking-admin.ts"
}, (opts) => setBulkStatus.__executeServer(opts));
var setBulkStatus = createServerFn({ method: "POST" }).validator((d) => bulkStatusSchema.parse(d)).handler(setBulkStatus_createServerFn_handler, async (ctx) => {
	const { token, dates, isOpen } = ctx.data;
	requireRole(await verifyAdminToken(token), ["admin", "manager"]);
	if (isOpen) {
		const { error } = await supabaseAdmin.from("booking_availability").delete().in("date", dates);
		if (error) {
			console.error("setBulkStatus open error:", error);
			return { error: "Failed to open days" };
		}
	} else {
		const rows = dates.map((date) => ({
			date,
			is_open: false
		}));
		const { error } = await supabaseAdmin.from("booking_availability").upsert(rows, { onConflict: "date" });
		if (error) {
			console.error("setBulkStatus close error:", error);
			return { error: "Failed to close days" };
		}
	}
	return { success: true };
});
var checkDatesOpen_createServerFn_handler = createServerRpc({
	id: "c5108bfa4fe92e56281038daf731a54b71af4d1f4cb6287e211363fe6ec522f1",
	name: "checkDatesOpen",
	filename: "src/lib/booking-admin.ts"
}, (opts) => checkDatesOpen.__executeServer(opts));
var checkDatesOpen = createServerFn({ method: "POST" }).validator((d) => datesSchema.parse(d)).handler(checkDatesOpen_createServerFn_handler, async (ctx) => {
	const { dates } = ctx.data;
	const { data } = await supabaseAdmin.from("booking_availability").select("date").in("date", dates).eq("is_open", false);
	const closed = new Set((data ?? []).map((r) => r.date));
	const result = {};
	for (const d of dates) result[d] = !closed.has(d);
	return result;
});
var getBookedSlots_createServerFn_handler = createServerRpc({
	id: "1c066c0ff21df259a0e9c503dccdd48e635b283f0d186918822ffad4e35f0074",
	name: "getBookedSlots",
	filename: "src/lib/booking-admin.ts"
}, (opts) => getBookedSlots.__executeServer(opts));
var getBookedSlots = createServerFn({ method: "POST" }).validator((d) => datesSchema.parse(d)).handler(getBookedSlots_createServerFn_handler, async (ctx) => {
	const { dates } = ctx.data;
	const { data } = await supabaseAdmin.from("bookings").select("selected_date, selected_time").in("selected_date", dates).neq("status", "cancelled");
	const result = {};
	for (const d of dates) result[d] = [];
	for (const row of data ?? []) {
		const date = row.selected_date;
		const time = row.selected_time;
		if (date && time && result[date]) result[date].push(time);
	}
	return result;
});
//#endregion
export { checkDatesOpen_createServerFn_handler, closeDay_createServerFn_handler, getBookedSlots_createServerFn_handler, getMonthAvailability_createServerFn_handler, openDay_createServerFn_handler, setBulkStatus_createServerFn_handler };
