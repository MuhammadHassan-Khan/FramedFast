import { c as createServerFn } from "./esm-B50dUWcE.mjs";
import { o as tokenOnlySchema } from "./validations-Dhx7ajlM.mjs";
import { n as supabaseAdmin, t as createServerRpc } from "./supabase-vy9kvSwN.mjs";
import { n as verifyAdminToken, t as requireRole } from "./supabase-auth-DmtgsSkq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CClgCd6t.js
var getDashboardKPIs_createServerFn_handler = createServerRpc({
	id: "1654a5d11e1d2d18294b6e7f117a4dedb488b3027c164739697bb2c9aeddd4fc",
	name: "getDashboardKPIs",
	filename: "src/lib/admin.ts"
}, (opts) => getDashboardKPIs.__executeServer(opts));
var getDashboardKPIs = createServerFn({ method: "POST" }).validator((d) => tokenOnlySchema.parse(d)).handler(getDashboardKPIs_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	const verified = await verifyAdminToken(token);
	requireRole(verified, [
		"admin",
		"manager",
		"agent"
	]);
	const { user } = verified;
	const today = /* @__PURE__ */ new Date();
	const thirtyDaysAgo = new Date(today);
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	const [totalOrders, monthlyOrders, totalRevenue, monthlyRevenue, todayRevenue, totalCustomers, newCustomers, totalLeads] = await Promise.all([
		supabaseAdmin.from("orders").select("amount", {
			count: "exact",
			head: false
		}),
		supabaseAdmin.from("orders").select("amount, status").gte("created_at", thirtyDaysAgo.toISOString()),
		supabaseAdmin.from("orders").select("amount").eq("status", "successful"),
		supabaseAdmin.from("orders").select("amount").eq("status", "successful").gte("created_at", thirtyDaysAgo.toISOString()),
		supabaseAdmin.from("orders").select("amount").eq("status", "successful").gte("created_at", today.toISOString()),
		supabaseAdmin.from("customers").select("id", {
			count: "exact",
			head: false
		}),
		supabaseAdmin.from("customers").select("id", {
			count: "exact",
			head: false
		}).gte("created_at", thirtyDaysAgo.toISOString()),
		supabaseAdmin.from("leads").select("id", {
			count: "exact",
			head: false
		})
	]);
	const calcSum = (rows) => rows?.reduce((sum, r) => sum + (r.amount ?? 0), 0) ?? 0;
	return {
		totalRevenue: calcSum(totalRevenue.data),
		totalRevenueCount: totalRevenue.count ?? 0,
		monthlyRevenue: calcSum(monthlyRevenue.data),
		monthlyOrders: monthlyOrders.count ?? 0,
		todayRevenue: calcSum(todayRevenue.data),
		totalOrders: totalOrders.count ?? 0,
		totalCustomers: totalCustomers.count ?? 0,
		newCustomers: newCustomers.count ?? 0,
		totalLeads: totalLeads.count ?? 0,
		avgOrderValue: (totalOrders.count ?? 0) > 0 ? calcSum(totalRevenue.data) / (totalOrders.count ?? 1) : 0
	};
});
var getRevenueSeries_createServerFn_handler = createServerRpc({
	id: "ee78d6e67828ddc813f51f0055a91d878d6d55b10ebaab72d3eab987465e6e97",
	name: "getRevenueSeries",
	filename: "src/lib/admin.ts"
}, (opts) => getRevenueSeries.__executeServer(opts));
var getRevenueSeries = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getRevenueSeries_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("orders").select("amount, created_at, status").eq("status", "successful").gte("created_at", (/* @__PURE__ */ new Date(Date.now() - 7 * 864e5)).toISOString()).order("created_at", { ascending: true });
	const dayMap = {};
	for (const row of data ?? []) {
		const day = new Date(row.created_at).toLocaleDateString("en-US", { weekday: "short" });
		if (!dayMap[day]) dayMap[day] = {
			revenue: 0,
			orders: 0
		};
		dayMap[day].revenue += row.amount ?? 0;
		dayMap[day].orders += 1;
	}
	return [
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
		"Sun"
	].map((d) => ({
		d,
		revenue: dayMap[d]?.revenue ?? 0,
		orders: dayMap[d]?.orders ?? 0
	}));
});
var getMonthlyRevenue_createServerFn_handler = createServerRpc({
	id: "db11d32bc759d08efabb7009dd0b44032c455ef2c9c677b0b2b8df60ea436501",
	name: "getMonthlyRevenue",
	filename: "src/lib/admin.ts"
}, (opts) => getMonthlyRevenue.__executeServer(opts));
var getMonthlyRevenue = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getMonthlyRevenue_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("orders").select("amount, created_at, status").eq("status", "successful").order("created_at", { ascending: true });
	const monthMap = {};
	for (const row of data ?? []) {
		const month = new Date(row.created_at).toLocaleDateString("en-US", { month: "short" });
		monthMap[month] = (monthMap[month] ?? 0) + (row.amount ?? 0);
	}
	return [
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
	].map((m) => ({
		m,
		revenue: monthMap[m] ?? 0
	}));
});
var getRecentTransactions_createServerFn_handler = createServerRpc({
	id: "4c85e4e740b2bbcb243a2cb3eea45565faf5567d2b241703fdbbddab7d8a733d",
	name: "getRecentTransactions",
	filename: "src/lib/admin.ts"
}, (opts) => getRecentTransactions.__executeServer(opts));
var getRecentTransactions = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getRecentTransactions_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("orders").select(`
        id, order_number, product, amount, payment_method, status, created_at,
        customers!inner(name),
        team!left(name)
      `).order("created_at", { ascending: false }).limit(50);
	return (data ?? []).map((row) => ({
		id: row.order_number,
		customer: row.customers?.name ?? "Unknown",
		product: row.product,
		amount: row.amount,
		method: row.payment_method ?? "—",
		status: row.status,
		date: new Date(row.created_at).toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric"
		}),
		agent: row.team?.name ?? "—"
	}));
});
var getSalesFunnel_createServerFn_handler = createServerRpc({
	id: "cea4870aa5753c84a0d76c350d3e75d938f6ec066e0ccb015ffdb9381468b394",
	name: "getSalesFunnel",
	filename: "src/lib/admin.ts"
}, (opts) => getSalesFunnel.__executeServer(opts));
var getSalesFunnel = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getSalesFunnel_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { count: leadsCount } = await supabaseAdmin.from("leads").select("id", {
		count: "exact",
		head: true
	});
	const { count: qualifiedCount } = await supabaseAdmin.from("leads").select("id", {
		count: "exact",
		head: true
	}).eq("qualified", true);
	const { count: customersCount } = await supabaseAdmin.from("customers").select("id", {
		count: "exact",
		head: true
	});
	const { data: orderData } = await supabaseAdmin.from("orders").select("customer_id");
	const counts = /* @__PURE__ */ new Map();
	for (const row of orderData ?? []) counts.set(row.customer_id, (counts.get(row.customer_id) ?? 0) + 1);
	const repeatCount = [...counts.values()].filter((c) => c > 1).length;
	return [
		{
			stage: "Visitors",
			users: 48200,
			revenue: 0,
			time: "0:48"
		},
		{
			stage: "Landing Page Views",
			users: 32400,
			revenue: 0,
			time: "1:24"
		},
		{
			stage: "Leads Captured",
			users: leadsCount ?? 0,
			revenue: 0,
			time: "2:12"
		},
		{
			stage: "Qualified Leads",
			users: qualifiedCount ?? 0,
			revenue: 0,
			time: "3:40"
		},
		{
			stage: "Customers",
			users: customersCount ?? 0,
			revenue: 0,
			time: "—"
		},
		{
			stage: "Repeat Customers",
			users: repeatCount,
			revenue: 0,
			time: "—"
		}
	];
});
var getLeadsData_createServerFn_handler = createServerRpc({
	id: "5c8ce7cebb4b1d1bb2f57ed947262a49b0581a5c453ea3ce4b405ea48f399e52",
	name: "getLeadsData",
	filename: "src/lib/admin.ts"
}, (opts) => getLeadsData.__executeServer(opts));
var getLeadsData = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getLeadsData_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data, count } = await supabaseAdmin.from("leads").select("id, name, source, status, qualified, created_at", { count: "exact" }).order("created_at", { ascending: false }).limit(100);
	return {
		data: data ?? [],
		total: count ?? 0
	};
});
var getBookingsList_createServerFn_handler = createServerRpc({
	id: "2d822ead8a301ba667bf152eabc011df3d94f81643f508f84c2cf32ccb7ec422",
	name: "getBookingsList",
	filename: "src/lib/admin.ts"
}, (opts) => getBookingsList.__executeServer(opts));
var getBookingsList = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getBookingsList_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data, count } = await supabaseAdmin.from("bookings").select("*", { count: "exact" }).order("created_at", { ascending: false }).limit(100);
	return {
		data: data ?? [],
		total: count ?? 0
	};
});
var getPaymentMethods_createServerFn_handler = createServerRpc({
	id: "5501624098d506cfbf9b0d567e69ae9546010b4cae36ebbdd8e47c3e11143754",
	name: "getPaymentMethods",
	filename: "src/lib/admin.ts"
}, (opts) => getPaymentMethods.__executeServer(opts));
var getPaymentMethods = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getPaymentMethods_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("orders").select("payment_method").not("payment_method", "is", null);
	const counts = {};
	for (const row of data ?? []) {
		const method = row.payment_method ?? "Other";
		counts[method] = (counts[method] ?? 0) + 1;
	}
	const total = Object.values(counts).reduce((a, b) => a + b, 0);
	return Object.entries(counts).map(([name, value]) => ({
		name,
		value: Math.round(value / total * 100)
	}));
});
var getCustomerGrowth_createServerFn_handler = createServerRpc({
	id: "828b198f073002d10d734a27234d14eaa4e45e87e658b07912a749889f097583",
	name: "getCustomerGrowth",
	filename: "src/lib/admin.ts"
}, (opts) => getCustomerGrowth.__executeServer(opts));
var getCustomerGrowth = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getCustomerGrowth_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("customers").select("created_at").order("created_at", { ascending: true });
	const monthMap = {};
	for (const row of data ?? []) {
		const month = new Date(row.created_at).toLocaleDateString("en-US", { month: "short" });
		monthMap[month] = (monthMap[month] ?? 0) + 1;
	}
	const months = [
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
	let running = 0;
	return months.map((m) => {
		running += monthMap[m] ?? 0;
		return {
			m,
			customers: running
		};
	});
});
var getTeamPerformance_createServerFn_handler = createServerRpc({
	id: "ead5cdddaf2ba01c984cd14d706f87e9146e718d8ffa7bdcf1bd89bbb8d2c796",
	name: "getTeamPerformance",
	filename: "src/lib/admin.ts"
}, (opts) => getTeamPerformance.__executeServer(opts));
var getTeamPerformance = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getTeamPerformance_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), ["admin", "manager"]);
	const { data: teamData } = await supabaseAdmin.from("team").select("id, name, commission_rate").eq("is_active", true);
	const { data: orderData } = await supabaseAdmin.from("orders").select("amount, agent_id, status").eq("status", "successful");
	const agentRevenue = {};
	for (const row of orderData ?? []) {
		if (!row.agent_id) continue;
		if (!agentRevenue[row.agent_id]) agentRevenue[row.agent_id] = {
			revenue: 0,
			deals: 0
		};
		agentRevenue[row.agent_id].revenue += row.amount ?? 0;
		agentRevenue[row.agent_id].deals += 1;
	}
	return (teamData ?? []).map((member) => {
		const stats = agentRevenue[member.id] ?? {
			revenue: 0,
			deals: 0
		};
		return {
			name: member.name,
			revenue: stats.revenue,
			deals: stats.deals,
			avg: stats.deals > 0 ? Math.round(stats.revenue / stats.deals) : 0,
			commission: Math.round(stats.revenue * (member.commission_rate / 100))
		};
	});
});
var getOrderStats_createServerFn_handler = createServerRpc({
	id: "2c94b40e25dc80fda86fe1d7d850f8e82614dbe91a4a0b7e9776506073ba03bf",
	name: "getOrderStats",
	filename: "src/lib/admin.ts"
}, (opts) => getOrderStats.__executeServer(opts));
var getOrderStats = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getOrderStats_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("orders").select("status");
	const stats = { total: 0 };
	for (const row of data ?? []) {
		const s = row.status;
		stats[s] = (stats[s] ?? 0) + 1;
		stats.total += 1;
	}
	return stats;
});
var getTopProducts_createServerFn_handler = createServerRpc({
	id: "be8399ac1dc88e1554036749969ad9335d13f592f8156a8a32c35f021abf074a",
	name: "getTopProducts",
	filename: "src/lib/admin.ts"
}, (opts) => getTopProducts.__executeServer(opts));
var getTopProducts = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getTopProducts_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const { data } = await supabaseAdmin.from("orders").select("product, amount, status");
	const pmap = {};
	for (const row of data ?? []) {
		if (!row.product) continue;
		if (!pmap[row.product]) pmap[row.product] = {
			sold: 0,
			revenue: 0,
			successful: 0,
			refunded: 0
		};
		pmap[row.product].sold += 1;
		if (row.status === "successful") pmap[row.product].revenue += row.amount ?? 0;
		if (row.status === "successful") pmap[row.product].successful += 1;
		if (row.status === "refunded") pmap[row.product].refunded += 1;
	}
	return Object.entries(pmap).map(([name, s]) => ({
		name,
		sold: s.sold,
		revenue: s.revenue,
		profit: Math.round(s.revenue * .4),
		refund: s.sold > 0 ? Math.round(s.refunded / s.sold * 1e3) / 10 : 0,
		conv: s.sold > 0 ? Math.round(s.successful / s.sold * 1e3) / 10 : 0
	})).sort((a, b) => b.revenue - a.revenue);
});
function timeAgo(dateStr) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const mins = Math.floor(diff / 6e4);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.floor(hours / 24)}d ago`;
}
var getRecentActivity_createServerFn_handler = createServerRpc({
	id: "8f9961b8f17eb26fb1602fe1d7668f8faeafc6306092d13b093b9964a0a6f0ce",
	name: "getRecentActivity",
	filename: "src/lib/admin.ts"
}, (opts) => getRecentActivity.__executeServer(opts));
var getRecentActivity = createServerFn({ method: "POST" }).validator(tokenOnlySchema.parse).handler(getRecentActivity_createServerFn_handler, async (ctx) => {
	const { token } = ctx.data;
	requireRole(await verifyAdminToken(token), [
		"admin",
		"manager",
		"agent"
	]);
	const [ordersRes, leadsRes] = await Promise.all([supabaseAdmin.from("orders").select("id, order_number, amount, status, created_at, customers!inner(name)").order("created_at", { ascending: false }).limit(10), supabaseAdmin.from("leads").select("id, name, created_at").order("created_at", { ascending: false }).limit(10)]);
	const items = [];
	for (const row of ordersRes?.data ?? []) {
		const customer = row.customers?.name ?? "Unknown";
		const what = row.status === "refunded" ? "requested a refund" : `completed payment of Rs. ${(row.amount ?? 0).toLocaleString()}`;
		items.push({
			who: customer,
			what,
			when: timeAgo(row.created_at),
			type: row.status === "refunded" ? "refund" : "payment",
			ts: row.created_at
		});
	}
	for (const row of leadsRes?.data ?? []) items.push({
		who: row.name ?? "Unknown",
		what: "captured as a new lead",
		when: timeAgo(row.created_at),
		type: "lead",
		ts: row.created_at
	});
	items.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
	return items.slice(0, 15);
});
//#endregion
export { getBookingsList_createServerFn_handler, getCustomerGrowth_createServerFn_handler, getDashboardKPIs_createServerFn_handler, getLeadsData_createServerFn_handler, getMonthlyRevenue_createServerFn_handler, getOrderStats_createServerFn_handler, getPaymentMethods_createServerFn_handler, getRecentActivity_createServerFn_handler, getRecentTransactions_createServerFn_handler, getRevenueSeries_createServerFn_handler, getSalesFunnel_createServerFn_handler, getTeamPerformance_createServerFn_handler, getTopProducts_createServerFn_handler };
