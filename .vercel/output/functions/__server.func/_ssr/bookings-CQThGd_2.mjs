import { c as createServerFn } from "./esm-B50dUWcE.mjs";
import { t as bookingSchema } from "./validations-Dhx7ajlM.mjs";
import { n as supabaseAdmin, t as createServerRpc } from "./supabase-vy9kvSwN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-CQThGd_2.js
var submissionLog = [];
var RATE_LIMIT_WINDOW = 6e4;
var RATE_LIMIT_MAX = 3;
function checkRateLimit(whatsapp) {
	const now = Date.now();
	const windowStart = now - RATE_LIMIT_WINDOW;
	let writeIndex = 0;
	for (let i = 0; i < submissionLog.length; i++) if (submissionLog[i].at >= windowStart) submissionLog[writeIndex++] = submissionLog[i];
	submissionLog.length = writeIndex;
	if (submissionLog.filter((e) => e.phone === whatsapp).length >= RATE_LIMIT_MAX) return false;
	submissionLog.push({
		phone: whatsapp,
		at: now
	});
	return true;
}
var createBooking_createServerFn_handler = createServerRpc({
	id: "98d718cc96486a19218ab540e4ff180a1c069dda9e6a933998823510dce56374",
	name: "createBooking",
	filename: "src/lib/bookings.ts"
}, (opts) => createBooking.__executeServer(opts));
var createBooking = createServerFn({ method: "POST" }).validator((d) => d).handler(createBooking_createServerFn_handler, async (ctx) => {
	const parsed = bookingSchema.safeParse(ctx.data);
	if (!parsed.success) return {
		error: "Validation failed",
		issues: parsed.error.flatten().fieldErrors
	};
	const input = parsed.data;
	if (input.selectedDate) {
		const { data: closed } = await supabaseAdmin.from("booking_availability").select("id").eq("date", input.selectedDate).eq("is_open", false).maybeSingle();
		if (closed) return { error: "This date is closed for booking. Please select another day." };
	}
	if (!checkRateLimit(input.whatsapp)) return { error: "Too many requests. Please wait a minute and try again." };
	if (input.selectedDate && input.selectedTime) {
		const { count: existingCount } = await supabaseAdmin.from("bookings").select("id", {
			count: "exact",
			head: true
		}).eq("selected_date", input.selectedDate).eq("selected_time", input.selectedTime).neq("status", "cancelled");
		if (existingCount && existingCount > 0) return { error: "This time slot is already booked. Please choose another." };
	}
	const { data, error } = await supabaseAdmin.from("bookings").insert({
		name: input.name,
		brand: input.brand,
		whatsapp: input.whatsapp,
		package: input.package,
		products_count: input.productsCount ?? null,
		source: input.source ?? null,
		selected_date: input.selectedDate ?? null,
		selected_time: input.selectedTime ?? null,
		status: "pending"
	}).select("id").single();
	if (error) {
		console.error("Booking insert failed:", error.message);
		return { error: "Something went wrong. Please try again." };
	}
	return {
		success: true,
		id: data.id
	};
});
//#endregion
export { createBooking_createServerFn_handler };
