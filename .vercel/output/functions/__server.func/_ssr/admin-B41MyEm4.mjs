import { i as __toESM } from "../_runtime.mjs";
import { d as Outlet, g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./esm-B50dUWcE.mjs";
import { o as tokenOnlySchema } from "./validations-Dhx7ajlM.mjs";
import { t as supabase } from "./supabase-browser-B-KBy0K4.mjs";
import { t as createSsrRpc } from "./createSsrRpc-COyCmbom.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as CalendarDays, C as Funnel, D as ChevronRight, E as CreditCard, M as ArrowUpRight, N as ArrowDownRight, O as ChevronLeft, P as Activity, S as LayoutDashboard, T as DollarSign, _ as Megaphone, a as TrendingUp, b as LoaderCircle, c as ShoppingCart, d as RefreshCw, f as Receipt, g as Menu, h as MessageSquare, i as Users, j as Bell, k as ChevronDown, l as Settings, m as Moon, n as Zap, o as Target, p as PackageSearch, s as Sun, u as Search, v as Mail, w as Download, x as LifeBuoy, y as LogOut } from "../_libs/lucide-react.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B41MyEm4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getDashboardKPIs = createServerFn({ method: "POST" }).validator((d) => tokenOnlySchema.parse(d)).handler(createSsrRpc("1654a5d11e1d2d18294b6e7f117a4dedb488b3027c164739697bb2c9aeddd4fc"));
var getRevenueSeries = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("ee78d6e67828ddc813f51f0055a91d878d6d55b10ebaab72d3eab987465e6e97"));
var getMonthlyRevenue = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("db11d32bc759d08efabb7009dd0b44032c455ef2c9c677b0b2b8df60ea436501"));
var getRecentTransactions = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("4c85e4e740b2bbcb243a2cb3eea45565faf5567d2b241703fdbbddab7d8a733d"));
var getSalesFunnel = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("cea4870aa5753c84a0d76c350d3e75d938f6ec066e0ccb015ffdb9381468b394"));
var getLeadsData = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("5c8ce7cebb4b1d1bb2f57ed947262a49b0581a5c453ea3ce4b405ea48f399e52"));
createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("2d822ead8a301ba667bf152eabc011df3d94f81643f508f84c2cf32ccb7ec422"));
var getPaymentMethods = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("5501624098d506cfbf9b0d567e69ae9546010b4cae36ebbdd8e47c3e11143754"));
var getCustomerGrowth = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("828b198f073002d10d734a27234d14eaa4e45e87e658b07912a749889f097583"));
var getTeamPerformance = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("ead5cdddaf2ba01c984cd14d706f87e9146e718d8ffa7bdcf1bd89bbb8d2c796"));
var getOrderStats = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("2c94b40e25dc80fda86fe1d7d850f8e82614dbe91a4a0b7e9776506073ba03bf"));
var getTopProducts = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("be8399ac1dc88e1554036749969ad9335d13f592f8156a8a32c35f021abf074a"));
var getRecentActivity = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(createSsrRpc("8f9961b8f17eb26fb1602fe1d7668f8faeafc6306092d13b093b9964a0a6f0ce"));
var DAY_LABELS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat",
	"Sun"
];
var MONTH_NAMES = [
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
	"December"
];
function fmt(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function isToday(date) {
	return date === fmt(/* @__PURE__ */ new Date());
}
function buildCalendar(year, month) {
	const first = new Date(year, month, 1);
	const start = new Date(first);
	const dow = start.getDay();
	start.setDate(start.getDate() - (dow === 0 ? 6 : dow - 1));
	const days = [];
	for (let i = 0; i < 42; i++) {
		const d = new Date(start);
		d.setDate(d.getDate() + i);
		days.push({
			date: fmt(d),
			day: d.getDate(),
			isOpen: true,
			bookingCount: 0,
			isCurrentMonth: d.getMonth() === month
		});
	}
	return days;
}
function BookingsAdmin({ dark }) {
	const [year, setYear] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getFullYear());
	const [month, setMonth] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getMonth());
	const [days, setDays] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [errMsg, setErrMsg] = (0, import_react.useState)(null);
	const [toggling, setToggling] = (0, import_react.useState)(null);
	const [bulkAction, setBulkAction] = (0, import_react.useState)(null);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [bookingsLoading, setBookingsLoading] = (0, import_react.useState)(true);
	const [bookingsErr, setBookingsErr] = (0, import_react.useState)(null);
	const [bookingsSearch, setBookingsSearch] = (0, import_react.useState)("");
	const [toggleErr, setToggleErr] = (0, import_react.useState)(null);
	const [bulkErr, setBulkErr] = (0, import_react.useState)(null);
	const [updatingStatus, setUpdatingStatus] = (0, import_react.useState)(null);
	const fetchDays = async (y, m) => {
		setLoading(true);
		setErrMsg(null);
		try {
			const cal = buildCalendar(y, m);
			const dates = cal.map((d) => d.date);
			const [availRes, bookRes] = await Promise.all([supabase.from("booking_availability").select("date").in("date", dates).eq("is_open", false), supabase.from("bookings").select("selected_date").in("selected_date", dates).neq("status", "cancelled")]);
			const closed = new Set((availRes.data ?? []).map((r) => r.date));
			const counts = {};
			for (const r of bookRes.data ?? []) {
				const d = r.selected_date;
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
			const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100);
			if (error) throw error;
			setBookings(data ?? []);
		} catch (err) {
			console.error("Failed to load bookings:", err);
			setBookingsErr("Failed to load bookings");
		} finally {
			setBookingsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchDays(year, month);
	}, [year, month]);
	(0, import_react.useEffect)(() => {
		fetchBookings();
	}, []);
	const handleToggle = async (date, currentOpen) => {
		setToggling(date);
		setToggleErr(null);
		try {
			let err = null;
			if (currentOpen) err = (await supabase.from("booking_availability").upsert({
				date,
				is_open: false
			}, { onConflict: "date" })).error;
			else err = (await supabase.from("booking_availability").delete().eq("date", date)).error;
			if (err) {
				setToggleErr(`Failed to ${currentOpen ? "close" : "open"} ${date}: ${err.message}`);
				return;
			}
			setDays((prev) => prev.map((d) => d.date === date ? {
				...d,
				isOpen: !currentOpen
			} : d));
		} catch (e) {
			setToggleErr(`Unexpected error: ${e instanceof Error ? e.message : String(e)}`);
		} finally {
			setToggling(null);
		}
	};
	const handleBulk = async (isOpen) => {
		setBulkAction(isOpen ? "open" : "close");
		setBulkErr(null);
		try {
			const target = days.filter((d) => d.isCurrentMonth && d.isOpen !== isOpen).map((d) => d.date);
			if (target.length === 0) {
				setBulkAction(null);
				return;
			}
			let err = null;
			if (isOpen) err = (await supabase.from("booking_availability").delete().in("date", target)).error;
			else {
				const rows = target.map((date) => ({
					date,
					is_open: false
				}));
				err = (await supabase.from("booking_availability").upsert(rows, { onConflict: "date" })).error;
			}
			if (err) {
				setBulkErr(`Bulk action failed: ${err.message}`);
				return;
			}
			setDays((prev) => prev.map((d) => d.isCurrentMonth ? {
				...d,
				isOpen
			} : d));
		} catch (e) {
			setBulkErr(`Unexpected error: ${e instanceof Error ? e.message : String(e)}`);
		} finally {
			setBulkAction(null);
		}
	};
	const weekRows = (0, import_react.useMemo)(() => {
		const rows = [];
		for (let i = 0; i < 42; i += 7) rows.push(days.slice(i, i + 7));
		return rows;
	}, [days]);
	const openCount = days.filter((d) => d.isCurrentMonth && d.isOpen).length;
	const closedCount = days.filter((d) => d.isCurrentMonth && !d.isOpen).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-bold tracking-tight md:text-3xl",
				children: "Bookings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm opacity-60",
				children: "Control which days are open for public booking. Click any day to toggle."
			})]
		}),
		errMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600",
			children: errMsg
		}),
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin opacity-50" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `rounded-2xl border p-5 ${dark ? "border-white/5 bg-[#141416]" : "border-black/5 bg-white"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (month === 0) {
										setYear((y) => y - 1);
										setMonth(11);
									} else setMonth((m) => m - 1);
								},
								className: `grid h-9 w-9 place-items-center rounded-lg transition ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-xl font-bold tracking-tight",
								children: [
									MONTH_NAMES[month],
									" ",
									year
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (month === 11) {
										setYear((y) => y + 1);
										setMonth(0);
									} else setMonth((m) => m + 1);
								},
								className: `grid h-9 w-9 place-items-center rounded-lg transition ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex flex-wrap items-center gap-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500" }),
									openCount,
									" open"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-neutral-400" }),
									closedCount,
									" closed"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleBulk(true),
									disabled: bulkAction !== null,
									className: `rounded-lg border px-3 py-1.5 text-xs font-medium transition ${dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"} disabled:opacity-40`,
									children: [bulkAction === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "inline h-3 w-3 animate-spin mr-1" }) : null, "Open All"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleBulk(false),
									disabled: bulkAction !== null,
									className: `rounded-lg border px-3 py-1.5 text-xs font-medium transition ${dark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"} disabled:opacity-40`,
									children: [bulkAction === "close" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "inline h-3 w-3 animate-spin mr-1" }) : null, "Close All"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-7 gap-px",
						children: [DAY_LABELS.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-[11px] font-semibold uppercase tracking-wider opacity-50 pb-3",
							children: label
						}, label)), weekRows.flat().map((day) => {
							const today = isToday(day.date);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleToggle(day.date, day.isOpen),
								disabled: toggling === day.date,
								className: `relative flex flex-col items-center gap-0.5 rounded-lg p-2 text-xs transition
                      ${day.isCurrentMonth ? day.isOpen ? dark ? "hover:bg-white/5" : "hover:bg-black/[0.03]" : dark ? "bg-white/[0.03] hover:bg-white/5" : "bg-black/[0.02] hover:bg-black/5" : "opacity-30"}
                      ${today ? "ring-1 ring-[#FA680A]/40" : ""} disabled:opacity-50 disabled:cursor-not-allowed`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-display text-sm font-semibold ${today ? "text-[#FA680A]" : ""}`,
										children: day.day
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${day.isOpen ? "bg-emerald-500" : "bg-neutral-400"}` }),
									day.bookingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] font-accent font-medium ${day.isOpen ? "text-[#FA680A]" : dark ? "text-white/40" : "text-black/40"}`,
										children: day.bookingCount
									}),
									toggling === day.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-0 grid place-items-center rounded-lg bg-black/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" })
									})
								]
							}, day.date);
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mt-4 flex flex-wrap gap-4 rounded-xl border px-4 py-3 text-xs ${dark ? "border-white/5 bg-[#141416]" : "border-black/5 bg-white"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium opacity-60",
						children: "Legend:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }), "Open for booking"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-neutral-400" }), "Closed for booking"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm font-semibold text-[#FA680A]",
							children: "12"
						}), "Today"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-accent text-[10px] font-medium text-[#FA680A]",
							children: "3"
						}), "Booking count"]
					})
				]
			}),
			toggleErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600",
				children: toggleErr
			}),
			bulkErr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-600",
				children: bulkErr
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: "All Bookings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: bookingsSearch,
							onChange: (e) => setBookingsSearch(e.target.value),
							placeholder: "Search name, brand...",
							className: "w-40 bg-transparent outline-none"
						})]
					})]
				}), bookingsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin opacity-50" })
				}) : bookingsErr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600",
					children: bookingsErr
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-wider opacity-60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "WhatsApp"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Package"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Status"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [bookings.filter((b) => !bookingsSearch || [
							b.name,
							b.brand,
							b.whatsapp
						].join(" ").toLowerCase().includes(bookingsSearch.toLowerCase())).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: `border-t ${dark ? "border-white/5" : "border-black/5"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 font-medium",
									children: b.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 opacity-80",
									children: b.brand
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 opacity-80",
									children: b.whatsapp
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4",
									children: b.package
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 opacity-70 whitespace-nowrap",
									children: b.selected_date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 opacity-70",
									children: b.selected_time
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: b.status,
										disabled: updatingStatus === b.id,
										onChange: async (e) => {
											const newStatus = e.target.value;
											setUpdatingStatus(b.id);
											const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", b.id);
											if (error) console.error("Status update failed:", error);
											else setBookings((prev) => prev.map((x) => x.id === b.id ? {
												...x,
												status: newStatus
											} : x));
											setUpdatingStatus(null);
										},
										className: `rounded-md border px-2 py-0.5 text-[11px] font-semibold outline-none cursor-pointer ${b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : b.status === "cancelled" ? "bg-red-500/10 text-red-600 border-red-500/20" : b.status === "completed" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"} ${updatingStatus === b.id ? "opacity-50" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "pending",
												children: "pending"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "confirmed",
												children: "confirmed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "completed",
												children: "completed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "cancelled",
												children: "cancelled"
											})
										]
									})
								})
							]
						}, b.id)), bookings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "py-10 text-center opacity-60",
							children: "No bookings yet."
						}) })] })]
					})
				})]
			})
		] })
	] });
}
var COLORS = [
	"#FA680A",
	"#000000",
	"#948D88",
	"#c97a3a",
	"#f1c39a",
	"#5a5550"
];
var nav = [
	{
		id: "dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		id: "revenue",
		label: "Revenue",
		icon: DollarSign
	},
	{
		id: "funnel",
		label: "Sales Funnel",
		icon: Target
	},
	{
		id: "customers",
		label: "Customers",
		icon: Users
	},
	{
		id: "leads",
		label: "Leads",
		icon: Mail
	},
	{
		id: "products",
		label: "Products",
		icon: PackageSearch
	},
	{
		id: "orders",
		label: "Orders",
		icon: ShoppingCart
	},
	{
		id: "bookings",
		label: "Bookings",
		icon: CalendarDays
	},
	{
		id: "payments",
		label: "Payments",
		icon: CreditCard
	},
	{
		id: "marketing",
		label: "Marketing",
		icon: Megaphone
	},
	{
		id: "team",
		label: "Team",
		icon: Users
	},
	{
		id: "reports",
		label: "Reports",
		icon: Receipt
	},
	{
		id: "notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings
	},
	{
		id: "support",
		label: "Support",
		icon: LifeBuoy
	}
];
var FILTERS = [
	"Today",
	"Yesterday",
	"Last 7 Days",
	"Last 30 Days",
	"Last 90 Days",
	"This Month",
	"Last Month",
	"This Year",
	"Custom"
];
function AdminDashboard() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [authLoading, setAuthLoading] = (0, import_react.useState)(true);
	const [section, setSection] = (0, import_react.useState)("dashboard");
	const [filter, setFilter] = (0, import_react.useState)("Last 30 Days");
	const [dark, setDark] = (0, import_react.useState)(false);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [token, setToken] = (0, import_react.useState)(null);
	const [newBookingAlert, setNewBookingAlert] = (0, import_react.useState)(0);
	const isLoginPage = router.state.location.pathname === "/admin/login";
	(0, import_react.useEffect)(() => {
		if (isLoginPage) return;
		let lastCount = 0;
		const check = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			if (!session?.access_token) return;
			const { count } = await supabase.from("bookings").select("id", {
				count: "exact",
				head: true
			});
			const c = count ?? 0;
			if (lastCount > 0 && c > lastCount) setNewBookingAlert((prev) => prev + (c - lastCount));
			lastCount = c;
		};
		check();
		const iv = setInterval(check, 3e4);
		return () => clearInterval(iv);
	}, [isLoginPage]);
	(0, import_react.useEffect)(() => {
		if (isLoginPage) return;
		let cancelled = false;
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (cancelled) return;
			if (!session) window.location.href = "/admin/login";
			else {
				setToken(session.access_token);
				setAuthLoading(false);
			}
		}).catch(() => {
			if (cancelled) return;
			window.location.href = "/admin/login";
		});
		return () => {
			cancelled = true;
		};
	}, [isLoginPage]);
	if (isLoginPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#0b0b0c] flex items-center justify-center",
		suppressHydrationWarning: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-white/50 text-sm",
			suppressHydrationWarning: true,
			children: "Loading…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: dark ? "dark min-h-screen bg-[#0b0b0c] text-white" : "min-h-screen bg-[#f7f6f3] text-[#0a0a0a]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 w-64 transform border-r transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${dark ? "border-white/5 bg-[#0f0f10]" : "border-black/5 bg-white"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-16 items-center gap-2 px-5 border-b border-inherit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 place-items-center rounded-md bg-[#FA680A] text-black font-black",
							children: "F"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-bold tracking-tight",
							children: "FramedFast"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto rounded-md bg-black/5 px-2 py-0.5 text-[10px] font-semibold tracking-wider dark:bg-white/10",
							children: "ADMIN"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col gap-0.5 p-3 text-sm",
					children: [
						nav.map((n) => {
							const Icon = n.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setSection(n.id);
									setSidebarOpen(false);
								},
								className: `flex items-center gap-3 rounded-lg px-3 py-2 text-left transition ${section === n.id ? "bg-[#FA680A] text-black font-semibold shadow-sm" : dark ? "text-white/70 hover:bg-white/5" : "text-black/70 hover:bg-black/5"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), n.label]
							}, n.id);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `my-3 h-px ${dark ? "bg-white/5" : "bg-black/5"}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: async () => {
								queryClient.clear();
								await supabase.auth.signOut();
								router.navigate({ to: "/admin/login" });
							},
							className: `flex items-center gap-3 rounded-lg px-3 py-2 text-left ${dark ? "text-white/60 hover:bg-white/5" : "text-black/60 hover:bg-black/5"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: `sticky top-0 z-30 ml-0 flex h-16 items-center gap-3 border-b px-4 lg:ml-64 lg:px-8 ${dark ? "border-white/5 bg-[#0b0b0c]/80 backdrop-blur" : "border-black/5 bg-white/80 backdrop-blur"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "lg:hidden",
						onClick: () => setSidebarOpen((v) => !v),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `hidden md:flex flex-1 max-w-md items-center gap-2 rounded-lg border px-3 py-1.5 ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Search orders, customers, products…",
							className: "w-full bg-transparent text-sm outline-none placeholder:opacity-50"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPill, {
								filter,
								setFilter,
								dark
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								dark,
								onClick: () => {
									setSection("bookings");
									setNewBookingAlert(0);
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), newBookingAlert > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1.5 -right-1.5 grid min-w-[16px] h-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white px-1",
										children: newBookingAlert
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								dark,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								dark,
								onClick: () => setDark((v) => !v),
								children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-2 flex items-center gap-2 rounded-lg border border-transparent pl-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#FA680A] to-black text-xs font-bold text-white",
									children: "AK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden text-xs leading-tight md:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: "Ayesha K."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "opacity-60",
										children: "Admin"
									})]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "ml-0 px-4 py-6 lg:ml-64 lg:px-8 lg:py-8",
				children: [
					section === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSection, {
						dark,
						token
					}),
					section === "revenue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueSection, {
						dark,
						token
					}),
					section === "funnel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelSection, {
						dark,
						token
					}),
					section === "customers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomersSection, {
						dark,
						token
					}),
					section === "leads" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadsSection, {
						dark,
						token
					}),
					section === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsSection, {
						dark,
						token
					}),
					section === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersSection, {
						dark,
						token
					}),
					section === "bookings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingsAdmin, { dark }),
					section === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentsSection, {
						dark,
						token
					}),
					section === "marketing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingSection, {
						dark,
						token
					}),
					section === "team" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamSection, {
						dark,
						token
					}),
					section === "reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderSection, {
						title: "Reports",
						dark
					}),
					section === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsSection, {}),
					section === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderSection, {
						title: "Settings",
						dark
					}),
					section === "support" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderSection, {
						title: "Support",
						dark
					})
				]
			})
		]
	});
}
function Card({ dark, className = "", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-2xl border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] ${dark ? "border-white/5 bg-[#141416]" : "border-black/5 bg-white"} ${className}`,
		children
	});
}
function SectionTitle({ title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-bold tracking-tight md:text-3xl",
			children: title
		}), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm opacity-60",
			children: sub
		})]
	});
}
function IconBtn({ children, dark, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		className: `grid h-9 w-9 place-items-center rounded-lg transition ${dark ? "hover:bg-white/10" : "hover:bg-black/5"}`,
		children
	});
}
function FilterPill({ filter, setFilter, dark }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: `flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white hover:bg-black/[0.04]"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-3.5 w-3.5" }),
				filter,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border shadow-lg ${dark ? "border-white/10 bg-[#141416]" : "border-black/10 bg-white"}`,
			children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					setFilter(f);
					setOpen(false);
				},
				className: `block w-full px-3 py-2 text-left text-xs transition ${f === filter ? "bg-[#FA680A]/10 text-[#FA680A]" : dark ? "hover:bg-white/5" : "hover:bg-black/5"}`,
				children: f
			}, f))
		})]
	});
}
function Sparkline({ data, up }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 36,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data: data.map((v, i) => ({
				i,
				v
			})),
			margin: {
				top: 2,
				right: 0,
				left: 0,
				bottom: 0
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `sg-${up}`,
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: up ? "#FA680A" : "#948D88",
					stopOpacity: .5
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: up ? "#FA680A" : "#948D88",
					stopOpacity: 0
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
				type: "monotone",
				dataKey: "v",
				stroke: up ? "#FA680A" : "#948D88",
				strokeWidth: 2,
				fill: `url(#sg-${up})`
			})]
		})
	});
}
function KpiCard({ k, dark }) {
	const Icon = k.icon;
	const positive = k.delta >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		dark,
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium uppercase tracking-wider opacity-60",
					children: k.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-display text-xl font-bold tracking-tight md:text-2xl truncate",
					children: k.value
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid h-9 w-9 shrink-0 place-items-center rounded-lg ${dark ? "bg-white/5" : "bg-black/[0.04]"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-[#FA680A]" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${positive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"}`,
				children: [
					positive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-3 w-3" }),
					Math.abs(k.delta),
					"%",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-60 font-normal ml-1",
						children: "vs prev"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-24 h-9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
					data: k.spark,
					up: positive
				})
			})]
		})]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-md px-2 py-0.5 text-[11px] font-semibold ${{
			Successful: "bg-emerald-500/10 text-emerald-600",
			Pending: "bg-amber-500/10 text-amber-600",
			Failed: "bg-red-500/10 text-red-600",
			Refunded: "bg-zinc-500/10 text-zinc-500"
		}[status] ?? "bg-black/10"}`,
		children: status
	});
}
function DashboardSection({ dark, token }) {
	const { data: kpiData } = useQuery({
		queryKey: ["dashboard-kpis"],
		queryFn: () => getDashboardKPIs({ data: { token } }),
		enabled: !!token
	});
	const { data: revenueData } = useQuery({
		queryKey: ["revenue-series"],
		queryFn: () => getRevenueSeries({ data: { token } }),
		enabled: !!token
	});
	const { data: methodsData } = useQuery({
		queryKey: ["payment-methods"],
		queryFn: () => getPaymentMethods({ data: { token } }),
		enabled: !!token
	});
	const { data: funnelData } = useQuery({
		queryKey: ["sales-funnel"],
		queryFn: () => getSalesFunnel({ data: { token } }),
		enabled: !!token
	});
	const { data: activityData } = useQuery({
		queryKey: ["recent-activity"],
		queryFn: () => getRecentActivity({ data: { token } }),
		enabled: !!token
	});
	const { data: transactions } = useQuery({
		queryKey: ["recent-transactions"],
		queryFn: () => getRecentTransactions({ data: { token } }),
		enabled: !!token
	});
	const kpis = (0, import_react.useMemo)(() => {
		if (!kpiData) return [];
		const spark = [
			4,
			6,
			8,
			10,
			12,
			14,
			16
		];
		return [
			{
				label: "Total Revenue",
				value: `Rs. ${(kpiData.totalRevenue ?? 0).toLocaleString()}`,
				delta: 12.4,
				up: true,
				icon: DollarSign,
				spark
			},
			{
				label: "Monthly Revenue",
				value: `Rs. ${(kpiData.monthlyRevenue ?? 0).toLocaleString()}`,
				delta: 8.1,
				up: true,
				icon: TrendingUp,
				spark
			},
			{
				label: "Today's Revenue",
				value: `Rs. ${(kpiData.todayRevenue ?? 0).toLocaleString()}`,
				delta: 4.2,
				up: true,
				icon: Zap,
				spark
			},
			{
				label: "Total Orders",
				value: (kpiData.totalOrders ?? 0).toLocaleString(),
				delta: 6.7,
				up: true,
				icon: ShoppingCart,
				spark
			},
			{
				label: "Avg Order Value",
				value: `Rs. ${(kpiData.avgOrderValue ?? 0).toLocaleString()}`,
				delta: -1.3,
				up: false,
				icon: Receipt,
				spark
			},
			{
				label: "Total Customers",
				value: (kpiData.totalCustomers ?? 0).toLocaleString(),
				delta: 14.8,
				up: true,
				icon: Users,
				spark
			},
			{
				label: "New Customers",
				value: (kpiData.newCustomers ?? 0).toLocaleString(),
				delta: 22,
				up: true,
				icon: TrendingUp,
				spark
			},
			{
				label: "Total Leads",
				value: (kpiData.totalLeads ?? 0).toLocaleString(),
				delta: 3.4,
				up: true,
				icon: RefreshCw,
				spark
			}
		];
	}, [kpiData]);
	const paymentMethods = methodsData ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Overview",
				sub: "Live snapshot of FramedFast funnel performance."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
				children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					k,
					dark
				}, k.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					dark,
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueChart, {
						dark,
						revenueData,
						token
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: "Payment Methods"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs opacity-60",
								children: "Share of completed payments"
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 220,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: paymentMethods,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 55,
								outerRadius: 88,
								paddingAngle: 2,
								children: paymentMethods.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid grid-cols-2 gap-2 text-xs",
							children: paymentMethods.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full",
										style: { background: COLORS[i % COLORS.length] }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-80",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-auto font-semibold",
										children: [p.value, "%"]
									})
								]
							}, p.name))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					dark,
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelChart, {
						dark,
						funnelData,
						compact: true
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Live Activity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-[#FA680A]" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3",
						children: [(activityData ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm opacity-60 py-4 text-center",
							children: "No recent activity"
						}), (activityData ?? []).slice(0, 7).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FA680A]/10 text-[#FA680A] text-[10px] font-bold uppercase",
								children: a.who.split(" ").map((s) => s[0]).slice(0, 2).join("")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: a.who
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "opacity-70",
											children: a.what
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] opacity-50",
									children: a.when
								})]
							})]
						}, i))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				dark,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionsTable, {
					dark,
					data: transactions
				})
			})
		]
	});
}
function RevenueChart({ dark, revenueData, token }) {
	const [view, setView] = (0, import_react.useState)("week");
	const { data: monthlyData } = useQuery({
		queryKey: ["monthly-revenue"],
		queryFn: () => getMonthlyRevenue({ data: { token } }),
		enabled: view !== "week" && !!token
	});
	const data = (0, import_react.useMemo)(() => {
		if (view === "week") return revenueData ?? [];
		if (view === "year") return monthlyData ?? [];
		return (monthlyData ?? []).slice(-6);
	}, [
		view,
		revenueData,
		monthlyData
	]);
	const xKey = view === "week" ? "d" : "m";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-semibold",
			children: "Revenue Analytics"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs opacity-60",
			children: "Trend over time · Rs."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-1 rounded-lg border p-0.5 text-xs",
			children: [
				"week",
				"month",
				"year"
			].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setView(v),
				className: `rounded-md px-2.5 py-1 capitalize ${view === v ? "bg-[#FA680A] text-black font-semibold" : "opacity-70 hover:opacity-100"}`,
				children: v
			}, v))
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
		width: "100%",
		height: 260,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			margin: {
				left: -10,
				right: 8,
				top: 8
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "rev",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#FA680A",
						stopOpacity: .35
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#FA680A",
						stopOpacity: 0
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					strokeDasharray: "3 3",
					stroke: dark ? "#ffffff10" : "#00000010"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: xKey,
					stroke: dark ? "#ffffff80" : "#00000080",
					fontSize: 11,
					tickLine: false,
					axisLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					stroke: dark ? "#ffffff80" : "#00000080",
					fontSize: 11,
					tickLine: false,
					axisLine: false,
					tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					contentStyle: {
						borderRadius: 12,
						border: "none",
						boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
					},
					formatter: (v) => `Rs. ${v.toLocaleString()}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey: "revenue",
					stroke: "#FA680A",
					strokeWidth: 2.5,
					fill: "url(#rev)"
				})
			]
		})
	})] });
}
function FunnelChart({ dark, funnelData, compact = false }) {
	const funnel = funnelData ?? [];
	const max = funnel[0]?.users ?? 1;
	const items = compact ? funnel.slice(0, 7) : funnel;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-semibold",
			children: "Sales Funnel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs opacity-60",
			children: "Visitors → Repeat Customers"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-600",
			children: "Bottleneck: Demo → Proposal (-26%)"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: items.map((s, i) => {
			const pct = s.users / max * 100;
			const prev = i === 0 ? s.users : items[i - 1].users;
			const drop = i === 0 ? 0 : Math.round((prev - s.users) / prev * 100);
			const conv = Math.round(s.users / max * 100);
			const bottleneck = drop > 25;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: s.stage
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "opacity-70",
						children: [
							s.users.toLocaleString(),
							" · ",
							conv,
							"% conv",
							drop > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `ml-2 ${bottleneck ? "text-red-600" : "opacity-60"}`,
								children: [
									"-",
									drop,
									"% drop"
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `h-7 overflow-hidden rounded-md ${dark ? "bg-white/5" : "bg-black/[0.04]"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full rounded-md transition-all ${bottleneck ? "bg-red-500/70" : "bg-gradient-to-r from-[#FA680A] to-[#c9540a]"}`,
						style: { width: `${Math.max(pct, 4)}%` }
					})
				})]
			}, s.stage);
		})
	})] });
}
function RevenueSection({ dark, token }) {
	const { data: kpiData } = useQuery({
		queryKey: ["dashboard-kpis"],
		queryFn: () => getDashboardKPIs({ data: { token } }),
		enabled: !!token
	});
	const { data: revenueData } = useQuery({
		queryKey: ["revenue-series"],
		queryFn: () => getRevenueSeries({ data: { token } }),
		enabled: !!token
	});
	const { data: topProducts } = useQuery({
		queryKey: ["top-products"],
		queryFn: () => getTopProducts({ data: { token } }),
		enabled: !!token
	});
	const { data: methodsData } = useQuery({
		queryKey: ["payment-methods"],
		queryFn: () => getPaymentMethods({ data: { token } }),
		enabled: !!token
	});
	const kpis = (0, import_react.useMemo)(() => {
		if (!kpiData) return [];
		const spark = [
			4,
			6,
			8,
			10,
			12,
			14,
			16
		];
		return [
			{
				label: "Total Revenue",
				value: `Rs. ${(kpiData.totalRevenue ?? 0).toLocaleString()}`,
				delta: 12.4,
				up: true,
				icon: DollarSign,
				spark
			},
			{
				label: "Monthly Revenue",
				value: `Rs. ${(kpiData.monthlyRevenue ?? 0).toLocaleString()}`,
				delta: 8.1,
				up: true,
				icon: TrendingUp,
				spark
			},
			{
				label: "Today's Revenue",
				value: `Rs. ${(kpiData.todayRevenue ?? 0).toLocaleString()}`,
				delta: 4.2,
				up: true,
				icon: Zap,
				spark
			},
			{
				label: "Avg Order Value",
				value: `Rs. ${(kpiData.avgOrderValue ?? 0).toLocaleString()}`,
				delta: -1.3,
				up: false,
				icon: Receipt,
				spark
			}
		];
	}, [kpiData]);
	const revenueByProduct = (topProducts ?? []).map((p) => ({
		name: p.name,
		value: p.revenue
	}));
	const marketingSources = (methodsData ?? []).slice(0, 7).map((m) => ({
		source: m.name,
		revenue: 0,
		leads: m.value
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Revenue",
				sub: "Deep dive into revenue performance and breakdowns."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: kpis.slice(0, 4).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					k,
					dark
				}, k.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				dark,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevenueChart, {
					dark,
					revenueData,
					token
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-sm font-semibold",
						children: "Revenue by Product"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 260,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: revenueByProduct,
							layout: "vertical",
							margin: { left: 8 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: dark ? "#ffffff10" : "#00000010",
									horizontal: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									stroke: dark ? "#ffffff80" : "#00000080",
									fontSize: 11,
									tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "name",
									stroke: dark ? "#ffffff80" : "#00000080",
									fontSize: 11,
									width: 130
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									formatter: (v) => `Rs. ${v.toLocaleString()}`,
									contentStyle: {
										borderRadius: 12,
										border: "none"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "value",
									fill: "#FA680A",
									radius: [
										0,
										6,
										6,
										0
									]
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-sm font-semibold",
						children: "Revenue by Marketing Source"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 280,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: marketingSources,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: dark ? "#ffffff10" : "#00000010"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "source",
									stroke: dark ? "#ffffff80" : "#00000080",
									fontSize: 11
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: dark ? "#ffffff80" : "#00000080",
									fontSize: 11,
									tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									formatter: (v) => `Rs. ${v.toLocaleString()}`,
									contentStyle: {
										borderRadius: 12,
										border: "none"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "leads",
									fill: "#000",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						})
					})]
				})]
			})
		]
	});
}
function FunnelSection({ dark, token }) {
	const { data: funnelData } = useQuery({
		queryKey: ["sales-funnel"],
		queryFn: () => getSalesFunnel({ data: { token } }),
		enabled: !!token
	});
	const funnel = funnelData ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Sales Funnel",
				sub: "Track every step from cold visitor to repeat customer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				dark,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelChart, {
					dark,
					funnelData
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				dark,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-sm font-semibold",
					children: "Stage Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: `text-xs uppercase tracking-wider opacity-60`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Stage"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Users"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Conversion"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Drop-off"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Revenue"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Avg Time"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: funnel.map((s, i) => {
							const prev = i === 0 ? s.users : funnel[i - 1].users;
							const drop = i === 0 ? 0 : Math.round((prev - s.users) / prev * 100);
							const conv = Math.round(s.users / (funnel[0]?.users ?? 1) * 100);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: `border-t ${dark ? "border-white/5" : "border-black/5"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 font-medium",
										children: s.stage
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: s.users.toLocaleString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3 pr-4",
										children: [conv, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: `py-3 pr-4 ${drop > 25 ? "text-red-600 font-semibold" : ""}`,
										children: [drop, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4",
										children: s.revenue ? `Rs. ${s.revenue.toLocaleString()}` : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 pr-4 opacity-70",
										children: s.time
									})
								]
							}, s.stage);
						}) })]
					})
				})]
			})
		]
	});
}
function CustomersSection({ dark, token }) {
	const { data: growthData } = useQuery({
		queryKey: ["customer-growth"],
		queryFn: () => getCustomerGrowth({ data: { token } }),
		enabled: !!token
	});
	const { data: kpiData } = useQuery({
		queryKey: ["dashboard-kpis"],
		queryFn: () => getDashboardKPIs({ data: { token } }),
		enabled: !!token
	});
	const customerGrowth = growthData ?? [];
	const customerStats = (0, import_react.useMemo)(() => [
		{
			label: "Total Customers",
			value: (kpiData?.totalCustomers ?? 0).toLocaleString()
		},
		{
			label: "New Customers",
			value: (kpiData?.newCustomers ?? 0).toLocaleString()
		},
		{
			label: "Total Orders",
			value: (kpiData?.totalOrders ?? 0).toLocaleString()
		},
		{
			label: "Total Revenue",
			value: `Rs. ${(kpiData?.totalRevenue ?? 0).toLocaleString()}`
		},
		{
			label: "Avg Order Value",
			value: `Rs. ${(kpiData?.avgOrderValue ?? 0).toLocaleString()}`
		},
		{
			label: "Total Leads",
			value: (kpiData?.totalLeads ?? 0).toLocaleString()
		}
	], [kpiData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Customers",
				sub: "Customer growth, retention and lifetime value."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6",
				children: customerStats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider opacity-60",
						children: c.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-2xl font-bold",
						children: c.value
					})]
				}, c.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				dark,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-sm font-semibold",
					children: "Customer Growth"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 280,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: customerGrowth,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: dark ? "#ffffff10" : "#00000010"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "m",
								stroke: dark ? "#ffffff80" : "#00000080",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: dark ? "#ffffff80" : "#00000080",
								fontSize: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 12,
								border: "none"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "customers",
								stroke: "#FA680A",
								strokeWidth: 3,
								dot: {
									r: 4,
									fill: "#FA680A"
								}
							})
						]
					})
				})]
			})
		]
	});
}
function LeadsSection({ dark, token }) {
	const { data: leadsData } = useQuery({
		queryKey: ["leads-data"],
		queryFn: () => getLeadsData({ data: { token } }),
		enabled: !!token,
		select: (d) => d.data
	});
	const leads = leadsData ?? [];
	const totalLeads = leads.length;
	const qualified = leads.filter((l) => l.qualified).length;
	const unqualified = totalLeads - qualified;
	const breakdown = [
		{
			l: "Hot Leads",
			v: qualified > 0 ? Math.round(qualified * .3) : 0,
			c: "bg-red-500"
		},
		{
			l: "Warm Leads",
			v: qualified > 0 ? Math.round(qualified * .5) : 0,
			c: "bg-amber-500"
		},
		{
			l: "Cold Leads",
			v: totalLeads > qualified ? totalLeads - qualified : 0,
			c: "bg-sky-500"
		}
	];
	const sourceMap = /* @__PURE__ */ new Map();
	for (const l of leads) {
		const src = l.source || "Other";
		if (!sourceMap.has(src)) sourceMap.set(src, {
			leads: 0,
			qualified: 0
		});
		const s = sourceMap.get(src);
		s.leads += 1;
		if (l.qualified) s.qualified += 1;
	}
	const leadSources = [...sourceMap.entries()].map(([source, s]) => ({
		source,
		leads: s.leads,
		qualified: s.qualified,
		conv: s.leads > 0 ? Math.round(s.qualified / s.leads * 100 * 10) / 10 : 0
	})).sort((a, b) => b.leads - a.leads);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Leads",
				sub: "Lead quality, source attribution and conversion."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6",
				children: [
					{
						l: "Total Leads",
						v: totalLeads.toLocaleString()
					},
					{
						l: "Qualified",
						v: qualified.toLocaleString()
					},
					{
						l: "Unqualified",
						v: unqualified.toLocaleString()
					},
					{
						l: "Hot",
						v: (breakdown[0]?.v ?? 0).toLocaleString()
					},
					{
						l: "Warm",
						v: (breakdown[1]?.v ?? 0).toLocaleString()
					},
					{
						l: "Cold",
						v: (breakdown[2]?.v ?? 0).toLocaleString()
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider opacity-60",
						children: s.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-xl font-bold",
						children: s.v
					})]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				dark,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-sm font-semibold",
						children: "Lead Temperature"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-4 overflow-hidden rounded-full",
						children: breakdown.map((b) => {
							const total = breakdown.reduce((a, c) => a + c.v, 0) || 1;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: b.c,
								style: { width: `${b.v / total * 100}%` }
							}, b.l);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-4 text-xs",
						children: breakdown.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${b.c}` }),
								" ",
								b.l,
								": ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: b.v })
							]
						}, b.l))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				dark,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 text-sm font-semibold",
					children: "Lead Sources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-wider opacity-60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Source"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Leads"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Qualified"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4",
										children: "Conversion"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: leadSources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: `border-t ${dark ? "border-white/5" : "border-black/5"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4 font-medium",
									children: s.source
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4",
									children: s.leads.toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4",
									children: s.qualified.toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 pr-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-md bg-[#FA680A]/10 px-2 py-0.5 text-xs font-semibold text-[#FA680A]",
										children: [s.conv, "%"]
									})
								})
							]
						}, s.source)) })]
					})
				})]
			})
		]
	});
}
function ProductsSection({ dark, token }) {
	const { data: topProducts } = useQuery({
		queryKey: ["top-products"],
		queryFn: () => getTopProducts({ data: { token } }),
		enabled: !!token
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Products",
			sub: "Top-selling products by revenue and profit."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			dark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase tracking-wider opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "#"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Units Sold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Revenue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Profit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Refund %"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Conv %"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (topProducts ?? []).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: `border-t ${dark ? "border-white/5" : "border-black/5"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4 font-bold opacity-60",
								children: ["#", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 font-medium",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4",
								children: p.sold
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4 font-semibold",
								children: ["Rs. ", p.revenue.toLocaleString()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4 text-emerald-600",
								children: ["Rs. ", p.profit.toLocaleString()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4",
								children: [p.refund, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4",
								children: [p.conv, "%"]
							})
						]
					}, p.name)) })]
				})
			})
		})]
	});
}
function OrdersSection({ dark, token }) {
	const { data: orderStats } = useQuery({
		queryKey: ["order-stats"],
		queryFn: () => getOrderStats({ data: { token } }),
		enabled: !!token
	});
	const { data: transactions } = useQuery({
		queryKey: ["recent-transactions"],
		queryFn: () => getRecentTransactions({ data: { token } }),
		enabled: !!token
	});
	const stats = orderStats ?? {};
	const orderCards = [
		{
			l: "Total Orders",
			v: (stats.total ?? 0).toLocaleString()
		},
		{
			l: "Successful",
			v: (stats.successful ?? 0).toLocaleString()
		},
		{
			l: "Pending",
			v: (stats.pending ?? 0).toLocaleString()
		},
		{
			l: "Failed",
			v: (stats.failed ?? 0).toLocaleString()
		},
		{
			l: "Refunded",
			v: (stats.refunded ?? 0).toLocaleString()
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Orders",
				sub: "All orders across the funnel."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-5",
				children: orderCards.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider opacity-60",
						children: s.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-xl font-bold",
						children: s.v
					})]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				dark,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionsTable, {
					dark,
					data: transactions
				})
			})
		]
	});
}
function PaymentsSection({ dark, token }) {
	const { data: methodsData } = useQuery({
		queryKey: ["payment-methods"],
		queryFn: () => getPaymentMethods({ data: { token } }),
		enabled: !!token
	});
	const { data: orderStats } = useQuery({
		queryKey: ["order-stats"],
		queryFn: () => getOrderStats({ data: { token } }),
		enabled: !!token
	});
	const { data: revenueData } = useQuery({
		queryKey: ["revenue-series"],
		queryFn: () => getRevenueSeries({ data: { token } }),
		enabled: !!token
	});
	const paymentMethods = methodsData ?? [];
	const stats = orderStats ?? {};
	const total = stats.total ?? 1;
	const successRate = total > 0 ? Math.round((stats.successful ?? 0) / total * 1e3) / 10 : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				title: "Payments",
				sub: "Gateway performance and transactions."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-5",
				children: [
					{
						l: "Successful",
						v: (stats.successful ?? 0).toLocaleString(),
						t: "text-emerald-600"
					},
					{
						l: "Failed",
						v: (stats.failed ?? 0).toLocaleString(),
						t: "text-red-600"
					},
					{
						l: "Pending",
						v: (stats.pending ?? 0).toLocaleString(),
						t: "text-amber-600"
					},
					{
						l: "Refunded",
						v: (stats.refunded ?? 0).toLocaleString(),
						t: ""
					},
					{
						l: "Success Rate",
						v: `${successRate}%`,
						t: "text-[#FA680A]"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-wider opacity-60",
						children: s.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-1 font-display text-xl font-bold ${s.t}`,
						children: s.v
					})]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-sm font-semibold",
						children: "By Gateway"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 240,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
							data: paymentMethods,
							dataKey: "value",
							nameKey: "name",
							outerRadius: 90,
							children: paymentMethods.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					dark,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 text-sm font-semibold",
						children: "Transactions Today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 240,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: revenueData ?? [],
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: dark ? "#ffffff10" : "#00000010"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "d",
									stroke: dark ? "#ffffff80" : "#00000080",
									fontSize: 11
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: dark ? "#ffffff80" : "#00000080",
									fontSize: 11
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "none"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "orders",
									fill: "#FA680A",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						})
					})]
				})]
			})
		]
	});
}
function MarketingSection({ dark, token }) {
	const { data: leadsData } = useQuery({
		queryKey: ["leads-data"],
		queryFn: () => getLeadsData({ data: { token } }),
		enabled: !!token,
		select: (d) => d.data
	});
	const leads = leadsData ?? [];
	const sourceMap = /* @__PURE__ */ new Map();
	for (const l of leads) {
		const src = l.source || "Other";
		if (!sourceMap.has(src)) sourceMap.set(src, { leads: 0 });
		sourceMap.get(src).leads += 1;
	}
	const marketingSources = [...sourceMap.entries()].map(([source, s]) => ({
		source,
		revenue: 0,
		leads: s.leads
	})).sort((a, b) => b.leads - a.leads);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Marketing",
			sub: "Channel attribution and ROI."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			dark,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-sm font-semibold",
				children: "Revenue & Leads by Channel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 300,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: marketingSources,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: dark ? "#ffffff10" : "#00000010"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "source",
							stroke: dark ? "#ffffff80" : "#00000080",
							fontSize: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							stroke: dark ? "#ffffff80" : "#00000080",
							fontSize: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							borderRadius: 12,
							border: "none"
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "leads",
							fill: "#000",
							radius: [
								6,
								6,
								0,
								0
							]
						})
					]
				})
			})]
		})]
	});
}
function TeamSection({ dark, token }) {
	const { data: teamData } = useQuery({
		queryKey: ["team-performance"],
		queryFn: () => getTeamPerformance({ data: { token } }),
		enabled: !!token
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Team Performance",
			sub: "Leaderboard for sales agents."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			dark,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase tracking-wider opacity-60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Rank"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Salesperson"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Revenue"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Deals"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Avg Deal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 pr-4",
									children: "Commission"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (teamData ?? []).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: `border-t ${dark ? "border-white/5" : "border-black/5"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${i === 0 ? "bg-[#FA680A] text-black" : dark ? "bg-white/5" : "bg-black/[0.05]"}`,
									children: i + 1
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4 font-medium",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4 font-semibold",
								children: ["Rs. ", p.revenue.toLocaleString()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-4",
								children: p.deals
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4",
								children: ["Rs. ", p.avg.toLocaleString()]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-3 pr-4 text-emerald-600",
								children: ["Rs. ", p.commission.toLocaleString()]
							})
						]
					}, p.name)) })]
				})
			})
		})]
	});
}
function NotificationsSection() {
	const notifications = [{
		title: "Welcome to FramedFast",
		body: "Use the navigation to explore the admin dashboard.",
		tone: "good"
	}, {
		title: "Data is live",
		body: "All metrics are sourced from the database.",
		tone: "good"
	}];
	const toneMap = {
		good: "border-emerald-500/30 bg-emerald-500/5",
		warn: "border-amber-500/30 bg-amber-500/5",
		bad: "border-red-500/30 bg-red-500/5"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			title: "Notifications",
			sub: "Alerts across revenue, payments and funnel health."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: notifications.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-2xl border p-4 ${toneMap[n.tone]}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mt-0.5 h-4 w-4 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: n.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs opacity-70",
						children: n.body
					})] })]
				})
			}, i))
		})]
	});
}
function PlaceholderSection({ title, dark }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
		title,
		sub: "Coming soon."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		dark,
		className: "grid place-items-center py-20 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mx-auto h-8 w-8 opacity-30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-sm opacity-60",
			children: "This section is part of the roadmap."
		})] })
	})] });
}
function TransactionsTable({ dark, data }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("All");
	const rows = (0, import_react.useMemo)(() => (data ?? []).filter((t) => (status === "All" || t.status === status) && (q === "" || [
		t.id,
		t.customer,
		t.product
	].join(" ").toLowerCase().includes(q.toLowerCase()))), [
		q,
		status,
		data
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm font-semibold",
			children: "Recent Transactions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ml-auto flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search…",
						className: "w-40 bg-transparent outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: status,
					onChange: (e) => setStatus(e.target.value),
					className: `rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"}`,
					children: [
						"All",
						"Successful",
						"Pending",
						"Failed",
						"Refunded"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: `flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Export"]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-xs uppercase tracking-wider opacity-60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Order ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Customer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Method"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4",
							children: "Agent"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: `border-t ${dark ? "border-white/5 hover:bg-white/[0.02]" : "border-black/5 hover:bg-black/[0.02]"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 font-mono text-xs",
						children: t.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 font-medium",
						children: t.customer
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 opacity-80",
						children: t.product
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-3 pr-4 font-semibold",
						children: ["Rs. ", t.amount.toLocaleString()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 opacity-80",
						children: t.method
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: t.status })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 opacity-70 whitespace-nowrap",
						children: t.date
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 opacity-80",
						children: t.agent
					})
				]
			}, t.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 8,
				className: "py-10 text-center opacity-60",
				children: "No transactions match the filters."
			}) })] })]
		})
	})] });
}
//#endregion
export { AdminDashboard as component };
