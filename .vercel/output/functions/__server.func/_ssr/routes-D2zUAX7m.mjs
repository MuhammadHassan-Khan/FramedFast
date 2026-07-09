import { i as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./esm-B50dUWcE.mjs";
import { a as monthAvailabilitySchema, i as datesSchema, n as bulkStatusSchema, r as closeDaySchema } from "./validations-Dhx7ajlM.mjs";
import { t as createSsrRpc } from "./createSsrRpc-COyCmbom.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { r as X, t as ZoomIn } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D2zUAX7m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Navbar() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const links = [
		{
			href: "#packages",
			label: "Packages"
		},
		{
			href: "#how",
			label: "How It Works"
		},
		{
			href: "#faq",
			label: "FAQ"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand-black/90 backdrop-blur border-b border-white/5" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x flex items-center justify-between h-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-xl font-bold text-brand-white tracking-tight",
						children: ["Frame", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand-orange",
							children: "Fast"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex items-center gap-8",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "font-accent text-sm text-brand-white/80 hover:text-brand-white transition-colors",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#book",
					className: "hidden md:inline-flex btn-primary !py-2.5 !px-4 text-sm",
					children: "→ Book Now"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Open menu",
					className: "md:hidden text-brand-white p-2",
					onClick: () => setOpen((v) => !v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block w-6 h-0.5 bg-brand-white" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block w-6 h-0.5 bg-brand-white" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block w-6 h-0.5 bg-brand-white" })
						]
					})
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:hidden bg-brand-black border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-x py-4 flex flex-col gap-3",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l.href,
					onClick: () => setOpen(false),
					className: "font-accent text-brand-white py-2",
					children: l.label
				}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#book",
					onClick: () => setOpen(false),
					className: "btn-primary justify-center",
					children: "→ Book Now"
				})]
			})
		})]
	});
}
function Counter({ to, duration = 1600, prefix = "", suffix = "" }) {
	const [val, setVal] = (0, import_react.useState)(0);
	const ref = (0, import_react.useRef)(null);
	const started = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting && !started.current) {
					started.current = true;
					const start = performance.now();
					const tick = (t) => {
						const p = Math.min(1, (t - start) / duration);
						const eased = 1 - Math.pow(1 - p, 3);
						setVal(Math.round(to * eased));
						if (p < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
				}
			});
		}, { threshold: .4 });
		io.observe(node);
		return () => io.disconnect();
	}, [to, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: "font-accent",
		children: [
			prefix,
			val.toLocaleString(),
			suffix
		]
	});
}
var items = [
	{
		q: "Do I need professional photography equipment?",
		a: "No. Your phone camera is enough. We handle everything else."
	},
	{
		q: "What if I don't like the images?",
		a: "Our Luxury Guarantee means we keep revising until you're satisfied. No extra charge."
	},
	{
		q: "How do I send my products to you?",
		a: "You don't. Just WhatsApp us your phone photos or upload them in the booking form."
	},
	{
		q: "Will the images look consistent with my brand?",
		a: "Yes. After your first shoot, we save your brand style. Every future shoot matches it automatically."
	},
	{
		q: "Can I get images for Daraz and Shopify listings?",
		a: "Every package includes marketplace-ready versions."
	},
	{
		q: "How fast is delivery?",
		a: "Standard: 48 hours. Rush delivery: 24 hours (+40%)."
	},
	{
		q: "What's the difference between one-time packages and retainers?",
		a: "One-time packages are per collection. Retainers give you a fixed monthly image output with priority service — best for brands launching new products regularly."
	},
	{
		q: "Is this halal to use? Are there real models in the images?",
		a: "No real models are used unless requested. All visuals are produced and fully customizable."
	}
];
function FAQ() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y divide-black/10 border-y border-black/10",
		children: items.map((it, i) => {
			const isOpen = open === i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setOpen(isOpen ? null : i),
				className: "w-full flex items-center justify-between gap-4 py-5 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-lg md:text-xl text-brand-black",
					children: it.q
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `shrink-0 w-9 h-9 rounded-full border border-brand-black/20 grid place-items-center text-brand-orange transition-transform ${isOpen ? "rotate-45" : ""}`,
					children: "+"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-brand-neutral max-w-3xl",
						children: it.a.split(/(WhatsApp us)/g).map((part, j) => part === "WhatsApp us" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/923120117197",
							target: "_blank",
							rel: "noreferrer",
							className: "underline underline-offset-2 decoration-brand-neutral/30 hover:decoration-brand-orange",
							children: "WhatsApp us"
						}, j) : part)
					})
				})
			})] }, i);
		})
	});
}
var createBooking = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("98d718cc96486a19218ab540e4ff180a1c069dda9e6a933998823510dce56374"));
createServerFn({ method: "POST" }).validator((d) => monthAvailabilitySchema.parse(d)).handler(createSsrRpc("d7b8ba51b3773a61e0cd47f5adfe808de9bcf483fc17d021e7534e91b120b3db"));
createServerFn({ method: "POST" }).validator((d) => closeDaySchema.parse(d)).handler(createSsrRpc("bd28f88072d07bdb5da39428c1abd268fe83545278744fd265a70e8b32ce2e33"));
createServerFn({ method: "POST" }).validator((d) => closeDaySchema.parse(d)).handler(createSsrRpc("be1ec7f7ab9f3415ac9af9bf9f90070452a36b8b096267a4ed79d37b362f6edd"));
createServerFn({ method: "POST" }).validator((d) => bulkStatusSchema.parse(d)).handler(createSsrRpc("453c9735da5d4d12fe76d448fb0e592be130f1a9d46a769e5f5003f648a03240"));
var checkDatesOpen = createServerFn({ method: "POST" }).validator((d) => datesSchema.parse(d)).handler(createSsrRpc("c5108bfa4fe92e56281038daf731a54b71af4d1f4cb6287e211363fe6ec522f1"));
var getBookedSlots = createServerFn({ method: "POST" }).validator((d) => datesSchema.parse(d)).handler(createSsrRpc("1c066c0ff21df259a0e9c503dccdd48e635b283f0d186918822ffad4e35f0074"));
function startOfWeek(d) {
	const date = new Date(d);
	const day = date.getDay();
	const diff = (day === 0 ? -6 : 1) - day;
	date.setDate(date.getDate() + diff);
	date.setHours(0, 0, 0, 0);
	return date;
}
var HOURS = [
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00",
	"17:00"
];
var DAY_NAMES = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function fmtDate(d) {
	const day = String(d.getDate()).padStart(2, "0");
	return `${DAY_NAMES[d.getDay() === 0 ? 6 : d.getDay() - 1]}, ${day} ${MONTHS[d.getMonth()]}`;
}
function fmtDateFull(d) {
	const day = String(d.getDate()).padStart(2, "0");
	const m = String(d.getMonth() + 1).padStart(2, "0");
	return `${d.getFullYear()}-${m}-${day}`;
}
function BookingForm() {
	const [weekOffset, setWeekOffset] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		brand: "",
		whatsapp: "",
		pkg: "Starter",
		products: "",
		source: "Instagram"
	});
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submitError, setSubmitError] = (0, import_react.useState)("");
	const [now, setNow] = (0, import_react.useState)(null);
	const [closedDays, setClosedDays] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [bookedSlots, setBookedSlots] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
	}, []);
	const weekStart = (0, import_react.useMemo)(() => {
		const base = startOfWeek(/* @__PURE__ */ new Date());
		base.setDate(base.getDate() + weekOffset * 7);
		return base;
	}, [weekOffset]);
	const days = (0, import_react.useMemo)(() => Array.from({ length: 6 }, (_, i) => {
		const d = new Date(weekStart);
		d.setDate(d.getDate() + i);
		return d;
	}), [weekStart]);
	const dateStrs = (0, import_react.useMemo)(() => days.map((d) => fmtDateFull(d)), [days]);
	(0, import_react.useEffect)(() => {
		checkDatesOpen({ data: { dates: dateStrs } }).then((result) => {
			if (result && typeof result === "object" && !("error" in result)) {
				const closed = /* @__PURE__ */ new Set();
				for (const [date, isOpen] of Object.entries(result)) if (!isOpen) closed.add(date);
				setClosedDays(closed);
			}
		}).catch(() => {});
		getBookedSlots({ data: { dates: dateStrs } }).then((result) => {
			if (result && typeof result === "object" && !("error" in result)) setBookedSlots(result);
		}).catch(() => {});
	}, [dateStrs]);
	(0, import_react.useEffect)(() => {
		if (selected && closedDays.has(fmtDateFull(selected.date))) setSelected(null);
	}, [closedDays, selected]);
	const isPast = (d, h) => {
		if (!now) return false;
		const slot = new Date(d);
		const [hh] = h.split(":");
		slot.setHours(parseInt(hh), 0, 0, 0);
		return slot < now;
	};
	const canConfirm = selected && form.name.trim() && form.brand.trim() && form.whatsapp.trim();
	if (confirmed && selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-brand-dark border border-brand-orange/30 rounded-lg p-8 md:p-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-5xl mb-4",
				children: "✅"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-3xl md:text-4xl text-brand-white",
				children: "Booking Confirmed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-brand-neutral max-w-xl mx-auto",
				children: "We'll WhatsApp you within 1 hour to confirm your slot and share the next steps."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 font-accent text-brand-white/90 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"📅 ",
						fmtDate(selected.date),
						" · ",
						selected.time,
						" PKT"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["📦 Package: ", form.pkg] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"👤 ",
						form.name,
						" · ",
						form.brand
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn-ghost",
					href: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=FramedFast+Discovery+Call&details=Package:+${encodeURIComponent(form.pkg)}%0AName:+${encodeURIComponent(form.name)}%0ABrand:+${encodeURIComponent(form.brand)}%0AWhatsApp:+${encodeURIComponent(form.whatsapp)}`,
					target: "_blank",
					rel: "noreferrer",
					children: "→ Save to Calendar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "btn-primary",
					href: `https://wa.me/923120117197?text=${encodeURIComponent(`Hi FramedFast — I booked ${fmtDate(selected.date)} ${selected.time} for ${form.pkg}.`)}`,
					target: "_blank",
					rel: "noreferrer",
					children: "→ Add to WhatsApp Reminders"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-brand-dark border border-white/10 rounded-lg p-6 md:p-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full Name",
						value: form.name,
						onChange: (v) => setForm({
							...form,
							name: v
						}),
						placeholder: "Your full name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Brand Name",
						value: form.brand,
						onChange: (v) => setForm({
							...form,
							brand: v
						}),
						placeholder: "@yourbrand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "WhatsApp Number",
						value: form.whatsapp,
						onChange: (v) => setForm({
							...form,
							whatsapp: v
						}),
						placeholder: "+92 3XX XXXXXXX",
						type: "tel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "Package Interest",
						value: form.pkg,
						onChange: (v) => setForm({
							...form,
							pkg: v
						}),
						options: [
							"Starter",
							"Growth",
							"Premium",
							"Growth Retainer",
							"Not Sure"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "No. of Products",
						value: form.products,
						onChange: (v) => setForm({
							...form,
							products: v
						}),
						placeholder: "e.g. 25",
						type: "number"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						label: "How did you hear about us?",
						value: form.source,
						onChange: (v) => setForm({
							...form,
							source: v
						}),
						options: [
							"Instagram",
							"LinkedIn",
							"Referral",
							"Google",
							"Other"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-2xl text-brand-white",
						children: "Pick a time"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "font-accent text-sm text-brand-white/70 hover:text-brand-white px-3 py-1.5 border border-white/10 rounded disabled:opacity-30",
								onClick: () => setWeekOffset((w) => Math.max(0, w - 1)),
								disabled: weekOffset === 0,
								children: "←"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-accent text-sm text-brand-white/70 w-44 text-center",
								children: [
									fmtDate(days[0]),
									" – ",
									fmtDate(days[5])
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "font-accent text-sm text-brand-white/70 hover:text-brand-white px-3 py-1.5 border border-white/10 rounded disabled:opacity-30",
								onClick: () => setWeekOffset((w) => Math.min(2, w + 1)),
								disabled: weekOffset === 2,
								children: "→"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[80px_repeat(6,minmax(100px,1fr))] gap-px bg-white/10 border border-white/10 min-w-[680px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-brand-dark p-2" }),
							days.map((d, i) => {
								const ds = fmtDateFull(d);
								const closed = closedDays.has(ds);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-brand-dark p-2 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-accent text-xs text-brand-orange uppercase",
											children: DAY_NAMES[i]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-white text-lg",
											children: d.getDate()
										}),
										closed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-accent text-[10px] text-red-400/70 uppercase mt-0.5",
											children: "Closed"
										})
									]
								}, i);
							}),
							HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-brand-dark p-2 font-accent text-xs text-brand-neutral flex items-center justify-end",
								children: h
							}), days.map((d, i) => {
								const ds = fmtDateFull(d);
								const closed = closedDays.has(ds);
								const taken = (bookedSlots[ds] ?? []).includes(h);
								const booked = closed || taken || isPast(d, h);
								const isSel = selected && selected.date.toDateString() === d.toDateString() && selected.time === h;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: booked,
									onClick: () => setSelected({
										date: d,
										time: h
									}),
									className: `p-2 text-xs font-accent transition-colors ${closed ? "bg-white/5 text-white/20 cursor-not-allowed" : taken ? "bg-red-900/20 text-red-400/60 cursor-not-allowed line-through" : booked ? "bg-white/5 text-white/20 cursor-not-allowed" : isSel ? "bg-brand-orange text-brand-black font-semibold" : "bg-brand-black text-brand-orange hover:bg-brand-orange/20"}`,
									children: closed ? "Closed" : taken ? "Booked" : booked ? "—" : isSel ? "✓" : h
								}, `${i}-${h}`);
							})] }, h))
						]
					})
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 border-t border-white/10 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-accent text-brand-white/90 space-y-1 text-sm md:text-base",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"📅 Your selected time:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-brand-orange",
									children: [
										fmtDate(selected.date),
										" · ",
										selected.time,
										" PKT"
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["📦 Package: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand-orange",
								children: form.pkg
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["👤 Name: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand-orange",
								children: form.name || "—"
							})] })
						]
					}),
					submitError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400",
						children: submitError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: async () => {
							if (!canConfirm || submitting) return;
							setSubmitting(true);
							setSubmitError("");
							const result = await createBooking({ data: {
								name: form.name,
								brand: form.brand,
								whatsapp: form.whatsapp,
								package: form.pkg,
								productsCount: form.products,
								source: form.source,
								selectedDate: selected.date.toISOString().split("T")[0],
								selectedTime: selected.time
							} });
							if (result.error) {
								setSubmitError(typeof result.issues === "object" ? Object.values(result.issues).flat().join(". ") : result.error);
								setSubmitting(false);
								return;
							}
							setConfirmed(true);
							setSubmitting(false);
						},
						disabled: !canConfirm || submitting,
						className: "mt-6 btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed",
						children: submitting ? "Submitting…" : "→ Confirm Booking"
					}),
					!canConfirm && !submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-brand-neutral text-center",
						children: "Fill in your name, brand, and WhatsApp to confirm."
					})
				]
			})
		]
	});
}
function Field({ label, value, onChange, placeholder, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-accent text-xs uppercase tracking-wider text-brand-neutral",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "mt-2 w-full bg-brand-black border border-white/15 focus:border-brand-orange outline-none text-brand-white px-4 py-3 rounded font-body"
		})]
	});
}
function Select({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-accent text-xs uppercase tracking-wider text-brand-neutral",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 w-full bg-brand-black border border-white/15 focus:border-brand-orange outline-none text-brand-white px-4 py-3 rounded font-body",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o,
				children: o
			}, o))
		})]
	});
}
function PainWord({ children }) {
	const ref = (0, import_react.useRef)(null);
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const node = ref.current;
		if (!node) return;
		const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)), { threshold: .6 });
		io.observe(node);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		className: `pain-underline ${visible ? "is-visible" : ""}`,
		children
	});
}
var MindMap_default = "/assets/MindMap-CFSV-UGB.png";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var branches = [
	{
		title: "Model / People",
		description: "Incorporate human presence to create connection, scale, and lifestyle context. Model shots transform a product from an object into an aspirational experience.",
		tags: [
			"Model holding near face",
			"Perfume spray mist",
			"Lifestyle application",
			"Wrist/neck close-up",
			"Silhouette with product"
		]
	},
	{
		title: "Product Shoot Styles",
		description: "Each product category demands a distinct visual language. Studio minimalism highlights detail, while editorial storytelling and UGC authenticity each communicate a different brand personality.",
		tags: [
			"Studio professional",
			"Lumière aesthetic",
			"Eau de Parfum mood",
			"UGC authentic style"
		]
	},
	{
		title: "Location / Environment",
		description: "The setting defines the story. A bathroom counter suggests daily ritual, golden hour window light evokes warmth, and travel destinations position your product within a broader lifestyle narrative.",
		tags: [
			"Bathroom counter",
			"Outdoor natural light",
			"Window golden hour",
			"Night ambiance",
			"Travel destination",
			"Seasonal setting"
		]
	},
	{
		title: "Angles & Perspective",
		description: "Camera angle dramatically changes how a product is perceived. Top-down flat lays organize information, low angles create heroism, and Dutch tilts add edgy dynamism to the frame.",
		tags: [
			"Top-down flat lay",
			"Eye level",
			"Low angle hero",
			"High angle",
			"Macro close-up",
			"Dutch tilted angle"
		]
	},
	{
		title: "UGC Style",
		description: "User-generated content builds trust through authenticity. Hand-held POV shots and unboxing moments feel real and relatable — perfect for social proof on Instagram and TikTok.",
		tags: ["Hand holding POV", "Unboxing moment"]
	},
	{
		title: "Backgrounds",
		description: "The background sets the mood and directs focus. From clean white seamless for e-commerce to textured marble or branded color for lifestyle, the right background elevates the product without competing with it.",
		tags: [
			"White seamless",
			"Gradient",
			"Colored gel lighting",
			"Moody dark studio",
			"Marble/wood texture",
			"Abstract artistic",
			"Branded color",
			"Glass transparent"
		]
	},
	{
		title: "Post-Production",
		description: "The final polish defines the feel. Clean editorial looks professional and trustworthy, film grain adds nostalgia, and high contrast feels bold and modern — each finish communicates a different brand message.",
		tags: [
			"Clean editorial",
			"Film grain vintage",
			"High contrast modern",
			"Soft dreamy",
			"Sharp commercial",
			"Vanity flat lay",
			"Shelfie"
		]
	}
];
function MindMapSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-x",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-10 md:gap-14 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Product Photography Guide"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight",
						children: [
							"A mind map of every way",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"to shoot your product."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-brand-neutral",
						children: "One product. Infinite possibilities. From studio precision to raw UGC authenticity \\u2014 the right style depends on your brand, platform, and story. This mind map breaks down every creative direction at your disposal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-5",
						children: branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-l-2 border-brand-orange pl-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display font-semibold text-brand-black",
									children: branch.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-brand-neutral leading-relaxed",
									children: branch.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-1.5",
									children: branch.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-accent text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded-sm",
										children: tag
									}, tag))
								})
							]
						}, branch.title))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative md:sticky md:top-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "relative w-full rounded-lg overflow-hidden border border-black/10 shadow-lg group cursor-pointer text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: MindMap_default,
									alt: "Product photography styles mind map showing 7 categories: Model/People, Product Shoot Styles, Location/Environment, Angles & Perspective, UGC Style, Backgrounds, and Post-Production",
									className: "w-full h-auto block",
									width: 1920,
									height: 1920,
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-3 right-3 flex items-center gap-1.5 bg-brand-black/70 text-brand-white text-xs font-accent px-2.5 py-1.5 rounded opacity-70 group-hover:opacity-100 transition-opacity",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "w-3.5 h-3.5" }), "Click to zoom"]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
						className: "max-w-[95vw] max-h-[95vh] w-auto h-auto p-2 bg-black/95 border-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: MindMap_default,
							alt: "Product photography styles mind map",
							className: "w-full h-full object-contain max-h-[90vh]"
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-accent text-xs text-brand-neutral text-center",
						children: "Click the mind map to inspect every branch in detail."
					})]
				})]
			})
		})
	});
}
var r16_default = "/assets/r16-C12KusTn.jpeg";
var r15_default = "/assets/r15-Dtdjr-Xt.png";
var r14_default = "/assets/r14-DYAHWaib.png";
var r13_default = "/assets/r13-BiCBVJEp.png";
var r12_default = "/assets/r12-D7Oqpl3q.jpeg";
var r11_default = "/assets/r11-DqEJw1o_.jpeg";
var r10_default = "/assets/r10-IDrxebmT.png";
var r9_default = "/assets/r9-D9-lX0Dd.jpeg";
var r8_default = "/assets/r8-CDxeIaTJ.jpeg";
var r7_default = "/assets/r7-DxJ8km8I.png";
var Result1_default = "/assets/Result1-ChkU3EYH.png";
var before_after_default = "/assets/before_after-BJKEvzcQ.png";
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "bg-brand-white text-brand-black",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContrastSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GallerySection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuaranteeSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorksSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MindMapSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative bg-brand-black text-brand-white pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grain opacity-40 pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x relative grid md:grid-cols-2 gap-10 md:gap-14 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Premium Virtual Fashion Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-5 font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05]",
					children: [
						"Replace Your Next ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand-orange",
							children: "Rs.100,000 Photoshoot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"With One Phone Photo."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-brand-neutral text-lg max-w-xl",
					children: [
						"Luxury fashion campaign visuals. 48-hour delivery.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"No studio. No photographer. No models. No logistics."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-col sm:flex-row gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#book",
						className: "btn-primary text-base",
						children: "→ Book Your Shoot"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-lg overflow-hidden border border-white/10 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: before_after_default,
							alt: "Phone photo vs luxury campaign image",
							className: "w-full h-auto block",
							width: 1280,
							height: 960
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-1/2 w-px bg-brand-orange" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-3 left-3 font-accent text-[10px] uppercase tracking-widest bg-brand-black/70 px-2 py-1 rounded",
							children: "Phone Photo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-3 right-3 font-accent text-[10px] uppercase tracking-widest bg-brand-orange text-brand-black px-2 py-1 rounded",
							children: "FramedFast"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-accent text-sm text-brand-neutral text-center",
					children: "Same product. Same phone. Different world."
				})]
			})]
		})]
	});
}
function PainSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-4xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "The Problem"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight",
					children: [
						"Every collection you have is stuck behind a ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainWord, { children: "Rs.50,000 photoshoot" }),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 text-brand-neutral text-base md:text-lg space-y-4 max-w-2xl mx-auto text-left md:text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You're running a clothing brand. You have new products ready. But before one image goes live — you wait." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"You courier the clothes to a studio. You wait for availability. You hire a",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainWord, { children: "photographer" }),
							". You book models. You manage editing. You follow up for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainWord, { children: "2 weeks" }),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "And after all of that — the images still don't match your brand." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Meanwhile your competitor just posted 30 stunning campaign images. And your products are still sitting in a box." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-brand-black font-medium",
							children: "That is the traditional photoshoot. And it is killing your growth."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 max-w-xl mx-auto text-left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "relative border-l-2 border-brand-black/10 pl-6 space-y-5",
						children: [
							[
								["Courier clothes to studio", "2–3 days"],
								["Wait for photographer slot", "3–5 days"],
								["Shoot day", "1 day"],
								["Editing & delivery", "5–7 days"],
								["Revisions", "3–5 more days"]
							].map(([label, time]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[34px] top-1.5 w-4 h-4 rounded-full bg-brand-orange ring-4 ring-brand-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-body text-brand-black",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-accent text-sm text-brand-orange",
										children: time
									})]
								})]
							}, label)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative pt-3 border-t border-brand-black/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[34px] top-5 w-4 h-4 rounded-full bg-brand-black ring-4 ring-brand-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display font-bold text-brand-black",
										children: "Total Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-accent font-semibold text-brand-black",
										children: "2–3 Weeks"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[34px] top-1.5 w-4 h-4 rounded-full bg-brand-black ring-4 ring-brand-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display font-bold text-brand-black",
										children: "Total Cost"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-accent font-semibold text-brand-black",
										children: "Rs.50,000–300,000"
									})]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-12 font-display text-2xl md:text-3xl text-brand-orange max-w-2xl mx-auto",
					children: "\"And you still have to do this EVERY collection.\""
				})
			]
		})
	});
}
function ContrastSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-brand-black text-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-5xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "The FramedFast Way"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight",
						children: [
							"One phone photo.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"48 hours.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand-orange",
								children: "Luxury brand campaign — done."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-white/10 rounded-lg p-7 bg-brand-dark",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-accent uppercase text-xs tracking-widest text-brand-neutral",
							children: "Old Way"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-brand-neutral",
							children: [
								"Courier your clothes",
								"Studio booking",
								"Models & photographers",
								"2–3 week wait",
								"Rs.50,000–300,000",
								"Images that don't match your brand"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 line-through decoration-brand-neutral/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand-neutral",
									children: "✗"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
							}, s))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-brand-orange/40 rounded-lg p-7 bg-brand-dark",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-accent uppercase text-xs tracking-widest text-brand-orange",
							children: "FramedFast Way"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3 text-brand-white",
							children: [
								["WhatsApp us your phone photos", true],
								["We handle everything", false],
								["48-hour delivery", false],
								["Rs.4,999–64,999", false],
								["Images matched to your brand identity", false],
								["Luxury output, every time", false]
							].map(([s, isWA]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand-orange",
									children: "✓"
								}), isWA ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://wa.me/923120117197",
									target: "_blank",
									rel: "noreferrer",
									className: "underline underline-offset-2 decoration-white/20 hover:decoration-white/60",
									children: "WhatsApp us your phone photos"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
							}, s))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl md:text-4xl",
						children: [
							"Brands saved an average of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-brand-orange",
								children: ["Rs.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, { to: 87e3 })]
							}),
							" ",
							"per collection."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-accent text-xs text-brand-neutral",
						children: "Based on comparing our Growth Package vs. an average Karachi studio shoot."
					})]
				})
			]
		})
	});
}
function GallerySection() {
	const row1 = [
		{
			src: r16_default,
			label: "Campaign Result",
			w: 1792,
			h: 2400
		},
		{
			src: r12_default,
			label: "Campaign Result",
			w: 1792,
			h: 2400
		},
		{
			src: r11_default,
			label: "Campaign Result",
			w: 1792,
			h: 2400
		},
		{
			src: r9_default,
			label: "Campaign Result",
			w: 1792,
			h: 2400
		},
		{
			src: r8_default,
			label: "Campaign Result",
			w: 1792,
			h: 2400
		},
		{
			src: Result1_default,
			label: "Campaign Result",
			w: 1190,
			h: 1322
		},
		{
			src: r14_default,
			label: "Campaign Result",
			w: 1047,
			h: 1501
		}
	];
	const row2 = [
		{
			src: r15_default,
			label: "Campaign Result",
			w: 1536,
			h: 1024
		},
		{
			src: r10_default,
			label: "Campaign Result",
			w: 1402,
			h: 1122
		},
		{
			src: r13_default,
			label: "Campaign Result",
			w: 1402,
			h: 1122
		},
		{
			src: r7_default,
			label: "Campaign Result",
			w: 1536,
			h: 1024
		},
		{
			src: r15_default,
			label: "Campaign Result",
			w: 1536,
			h: 1024
		},
		{
			src: r10_default,
			label: "Campaign Result",
			w: 1402,
			h: 1122
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Portfolio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl",
							children: "Real results from real brands."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-brand-neutral",
							children: "Every image was produced from a single phone photo \\u2014 no studio, no photographer, no model."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-auto pb-2 -mx-5 px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scroll-track scroll-track-ltr gap-4 md:gap-5",
							children: [...row1, ...row1].map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "relative shrink-0 rounded-lg overflow-hidden border border-black/10 shadow-md group cursor-pointer text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img.src,
											alt: img.label,
											className: "h-[300px] md:h-[460px] w-auto object-cover",
											loading: "lazy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-black/70 text-brand-white text-[10px] font-accent px-2 py-1 rounded flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "w-3 h-3" }), "View"]
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
								className: "max-w-[95vw] max-h-[95vh] w-auto h-auto p-2 bg-black/95 border-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img.src,
									alt: img.label,
									className: "w-full h-full object-contain max-h-[90vh]"
								})
							})] }, `r1-${i}`))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-auto pb-2 -mx-5 px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scroll-track scroll-track-rtl gap-4 md:gap-5",
							children: [...row2, ...row2].map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "relative shrink-0 rounded-lg overflow-hidden border border-black/10 shadow-md group cursor-pointer text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: img.src,
											alt: img.label,
											className: "h-[220px] md:h-[340px] w-auto object-cover",
											loading: "lazy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-black/70 text-brand-white text-[10px] font-accent px-2 py-1 rounded flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "w-3 h-3" }), "View"]
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
								className: "max-w-[95vw] max-h-[95vh] w-auto h-auto p-2 bg-black/95 border-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img.src,
									alt: img.label,
									className: "w-full h-full object-contain max-h-[90vh]"
								})
							})] }, `r2-${i}`))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 bg-brand-orange text-brand-black p-6 md:p-8 rounded-lg max-w-2xl mx-auto text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl md:text-2xl font-semibold",
						children: "Every image you see was produced from a single phone photo."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-body",
						children: "No studio. No photographer. No model."
					})]
				})
			]
		})
	});
}
function PricingSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "packages",
		className: "bg-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Transparent Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl",
							children: [
								"Choose the package that matches your",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"content volume and turnaround needs."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-brand-neutral",
							children: "All packages are optimized for brand consistency, fast delivery, and repeatable quality."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid md:grid-cols-3 gap-5 items-stretch",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
							title: "Starter",
							price: "PKR 18,000",
							features: [
								"10 edited product photos",
								"1 UGC video (15–30s)",
								"3 business day delivery",
								"Rush upgrade available"
							],
							benefit: "Professional quality, zero risk.",
							cta: "Book Now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
							featured: true,
							badge: "Most Popular",
							title: "Growth",
							price: "PKR 45,000",
							features: [
								"30 edited product photos",
								"3 UGC videos",
								"5 business day delivery",
								"Rush upgrade available"
							],
							benefit: "Our most popular \\u2014 balanced output & speed.",
							cta: "Book Now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
							title: "Premium",
							price: "PKR 95,000",
							features: [
								"80 edited product photos",
								"8 UGC videos",
								"14 business day delivery",
								"Rush upgrade available"
							],
							benefit: "Full-scale production for serious brands.",
							cta: "Book Now"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Monthly Retainers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display font-bold text-2xl md:text-4xl",
							children: "Predictable output. Priority treatment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid md:grid-cols-2 gap-5 max-w-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetainerCard, {
								title: "Growth Retainer",
								price: "PKR 160,000/mo",
								items: [
									"60 edited photos per month",
									"8 UGC videos per month",
									"Priority delivery"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RetainerCard, {
								title: "Premium Subscription",
								price: "PKR 220,000/mo",
								featured: true,
								items: [
									"120 edited photos per month",
									"15 videos per month",
									"Priority revisions",
									"Monthly planning call"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display font-bold text-xl md:text-2xl",
						children: "Add-Ons"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-hidden rounded-lg border border-black/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-accent text-xs uppercase tracking-wider text-brand-neutral",
									children: "Add-On"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-accent text-xs uppercase tracking-wider text-brand-neutral",
									children: "Price"
								})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-black/5",
								children: [
									["Rush Delivery (Starter — 48h)", "+PKR 7,000"],
									["Rush Delivery (Growth — 24–48h)", "+PKR 10,000"],
									["Extra Product Photo (any tier)", "PKR 1,500 each"],
									["Extra UGC Video (any tier)", "PKR 18,000 each"],
									["Re-Version (any tier)", "PKR 1,000 each"],
									["White-Label Delivery (monthly)", "+PKR 25,000/mo"]
								].map(([a, p]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-brand-black",
									children: a
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-accent text-brand-orange",
									children: p
								})] }, a))
							})]
						})
					})]
				})
			]
		})
	});
}
function PricingCard({ title, price, features, benefit, badge, featured, cta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative rounded-lg p-7 flex flex-col ${featured ? "bg-brand-orange text-brand-black md:scale-[1.03] shadow-xl" : "bg-white border border-black/10"}`,
		children: [
			badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `absolute -top-3 left-5 font-accent text-[10px] uppercase tracking-widest px-2.5 py-1 rounded ${featured ? "bg-brand-black text-brand-orange" : "bg-brand-black text-brand-white"}`,
				children: badge
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-accent text-3xl font-bold",
				children: price
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 text-sm ${featured ? "text-brand-black/80" : "text-brand-neutral"}`,
				children: benefit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: `mt-5 space-y-2 text-sm ${featured ? "text-brand-black" : "text-brand-black/80"}`,
				children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: featured ? "text-brand-black" : "text-brand-orange",
						children: "✓"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f })]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#book",
				className: `mt-6 inline-flex justify-center font-accent font-semibold rounded px-4 py-3 ${featured ? "bg-brand-black text-brand-orange" : "btn-primary"}`,
				children: cta
			})
		]
	});
}
function RetainerCard({ title, price, items, featured }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative rounded-lg p-7 ${featured ? "bg-brand-black text-brand-white border border-brand-orange" : "bg-brand-black text-brand-white border border-white/10"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "font-display text-lg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-accent text-2xl font-bold text-brand-orange",
				children: price
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2 text-sm text-brand-neutral",
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brand-orange",
						children: "✓"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i })]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#book",
				className: "mt-6 inline-flex w-full justify-center btn-ghost",
				children: ["→", " Choose Plan"]
			})
		]
	});
}
function GuaranteeSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-brand-black text-brand-white py-24 md:py-32 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Our Promise"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 mx-auto w-28 h-28 rounded-full bg-brand-orange/10 border border-brand-orange/40 grid place-items-center shadow-[0_0_60px_-10px_rgba(250,104,10,0.7)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 24 24",
						className: "w-14 h-14 text-brand-orange",
						fill: "currentColor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 font-display font-bold text-3xl sm:text-4xl md:text-5xl",
					children: "The Luxury Guarantee."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-brand-white/90 text-lg leading-relaxed",
					children: "If the images don't look premium enough for your brand — we keep refining them until they do."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-brand-neutral",
					children: "No argument. No extra charge. No time limit."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-xl md:text-2xl text-brand-orange",
					children: "We don't stop until you're proud to post them."
				})
			]
		})
	});
}
function HowItWorksSection() {
	const steps = [
		["Book Your Slot", "Send us a WhatsApp or fill the booking form below."],
		["Send Your Phone Photos", "Flat lay or hanger shots. No special setup needed."],
		["We Produce", "Our team creates luxury campaign visuals matched to your brand."],
		["Receive & Post", "Delivery in 48 hours. Instagram, Shopify, Daraz — all ready."]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "bg-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "How It Works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl",
					children: "Four steps. 48 hours. Done."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid md:grid-cols-4 gap-6",
				children: steps.map(([t, d], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-6xl font-bold text-brand-orange/30",
							children: ["0", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 font-display text-xl text-brand-black",
							children: t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-brand-neutral text-sm",
							children: d
						}),
						i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block absolute top-6 text-brand-orange/60 text-2xl",
							style: { right: -12 },
							children: "→"
						})
					]
				}, t))
			})]
		})
	});
}
function FAQSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "bg-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Questions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl",
					children: "Everything you might be wondering."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {})
				})
			]
		})
	});
}
function BookingSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "book",
		className: "bg-brand-black text-brand-white py-20 md:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x max-w-4xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Book Your Shoot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-5 font-display font-bold text-3xl sm:text-4xl md:text-5xl",
						children: [
							"Book Your Campaign Shoot.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-brand-orange",
								children: "Zero commitment."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-brand-neutral",
						children: "Pick a time. Fill 3 fields. We handle the rest."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingForm, {})
			})]
		})
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-brand-orange text-brand-black py-16 md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display font-bold text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto leading-tight",
				children: "Stop losing customers to brands with better images."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#book",
				className: "mt-8 inline-flex btn-dark text-base",
				children: "→ Book Your Shoot Now"
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-brand-black text-brand-white py-14 border-t border-white/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x grid md:grid-cols-3 gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-xl font-bold",
					children: ["Frame", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-brand-orange",
						children: "Fast"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-brand-neutral text-sm",
					children: [
						"Premium Virtual Fashion Studio",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Karachi, Pakistan"
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex md:justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 font-accent text-sm text-brand-neutral",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#packages",
								className: "hover:text-brand-white",
								children: "Packages"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#how",
								className: "hover:text-brand-white",
								children: "How It Works"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#faq",
								className: "hover:text-brand-white",
								children: "FAQ"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#book",
								className: "hover:text-brand-white",
								children: "Book Now"
							}) })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex md:justify-end gap-3 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.instagram.com/framedfast/",
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-accent text-brand-neutral hover:text-brand-white hover:border-white/30 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: "2",
											y: "2",
											width: "20",
											height: "20",
											rx: "5",
											ry: "5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "17.5",
											y1: "6.5",
											x2: "17.51",
											y2: "6.5"
										})
									]
								}), "@FramedFast"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.facebook.com/profile.php?id=61591036976492",
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-accent text-brand-neutral hover:text-brand-white hover:border-white/30 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" })
								}), "FramedFast"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.linkedin.com/in/framed-fast-a35045418/",
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-accent text-brand-neutral hover:text-brand-white hover:border-white/30 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
											x: "2",
											y: "9",
											width: "4",
											height: "12"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											cx: "4",
											cy: "4",
											r: "2"
										})
									]
								}), "FramedFast"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 font-accent text-sm text-brand-neutral",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"WhatsApp:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://wa.me/923120117197",
								target: "_blank",
								rel: "noreferrer",
								className: "text-brand-white underline underline-offset-2 decoration-white/20 hover:decoration-white/60",
								children: "0312 0117197"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Email: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand-white",
							children: "fast24support@gmail.com"
						})] })]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-x mt-10 pt-6 border-t border-white/5 font-accent text-xs text-brand-neutral text-center",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" FramedFast. All rights reserved."
			]
		})]
	});
}
//#endregion
export { Page as component };
