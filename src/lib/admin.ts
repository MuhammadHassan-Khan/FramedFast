import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "./supabase";
import { verifyAdminToken, requireRole } from "./supabase-auth";
import { tokenOnlySchema } from "./validations";

export const getDashboardKPIs = createServerFn({ method: "POST" })
  .validator((d: unknown) => tokenOnlySchema.parse(d))
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);
    const { user } = verified;

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalOrders,
      monthlyOrders,
      totalRevenue,
      monthlyRevenue,
      todayRevenue,
      totalCustomers,
      newCustomers,
      totalLeads,
    ] = await Promise.all([
      supabaseAdmin.from("orders").select("amount", { count: "exact", head: false }),
      supabaseAdmin
        .from("orders")
        .select("amount, status")
        .gte("created_at", thirtyDaysAgo.toISOString()),
      supabaseAdmin.from("orders").select("amount").eq("status", "successful"),
      supabaseAdmin
        .from("orders")
        .select("amount")
        .eq("status", "successful")
        .gte("created_at", thirtyDaysAgo.toISOString()),
      supabaseAdmin
        .from("orders")
        .select("amount")
        .eq("status", "successful")
        .gte("created_at", today.toISOString()),
      supabaseAdmin.from("customers").select("id", { count: "exact", head: false }),
      supabaseAdmin
        .from("customers")
        .select("id", { count: "exact", head: false })
        .gte("created_at", thirtyDaysAgo.toISOString()),
      supabaseAdmin.from("leads").select("id", { count: "exact", head: false }),
    ]);

    const calcSum = (rows: { amount: number | null }[] | null) =>
      rows?.reduce((sum, r) => sum + (r.amount ?? 0), 0) ?? 0;

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
      avgOrderValue:
        (totalOrders.count ?? 0) > 0 ? calcSum(totalRevenue.data) / (totalOrders.count ?? 1) : 0,
    };
  });

export const getRevenueSeries = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin
      .from("orders")
      .select("amount, created_at, status")
      .eq("status", "successful")
      .gte("created_at", new Date(Date.now() - 7 * 86400_000).toISOString())
      .order("created_at", { ascending: true });

    const dayMap: Record<string, { revenue: number; orders: number }> = {};
    for (const row of data ?? []) {
      const day = new Date(row.created_at).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!dayMap[day]) dayMap[day] = { revenue: 0, orders: 0 };
      dayMap[day].revenue += row.amount ?? 0;
      dayMap[day].orders += 1;
    }

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((d) => ({
      d,
      revenue: dayMap[d]?.revenue ?? 0,
      orders: dayMap[d]?.orders ?? 0,
    }));
  });

export const getMonthlyRevenue = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin
      .from("orders")
      .select("amount, created_at, status")
      .eq("status", "successful")
      .order("created_at", { ascending: true });

    const monthMap: Record<string, number> = {};
    for (const row of data ?? []) {
      const month = new Date(row.created_at).toLocaleDateString("en-US", {
        month: "short",
      });
      monthMap[month] = (monthMap[month] ?? 0) + (row.amount ?? 0);
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
      "Dec",
    ];
    return months.map((m) => ({ m, revenue: monthMap[m] ?? 0 }));
  });

export const getRecentTransactions = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin
      .from("orders")
      .select(
        `
        id, order_number, product, amount, payment_method, status, created_at,
        customers!inner(name),
        team!left(name)
      `,
      )
      .order("created_at", { ascending: false })
      .limit(50);

    return (data ?? []).map((row) => ({
      id: row.order_number,
      customer: (row.customers as unknown as { name: string })?.name ?? "Unknown",
      product: row.product,
      amount: row.amount,
      method: row.payment_method ?? "—",
      status: row.status,
      date: new Date(row.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      agent: (row.team as unknown as { name: string })?.name ?? "—",
    }));
  });

export const getSalesFunnel = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { count: leadsCount } = await supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true });

    const { count: qualifiedCount } = await supabaseAdmin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("qualified", true);

    const { count: customersCount } = await supabaseAdmin
      .from("customers")
      .select("id", { count: "exact", head: true });

    const { data: orderData } = await supabaseAdmin.from("orders").select("customer_id");

    const counts = new Map<string, number>();
    for (const row of orderData ?? []) {
      counts.set(row.customer_id, (counts.get(row.customer_id) ?? 0) + 1);
    }
    const repeatCount = [...counts.values()].filter((c) => c > 1).length;

    return [
      { stage: "Visitors", users: 48200, revenue: 0, time: "0:48" },
      { stage: "Landing Page Views", users: 32400, revenue: 0, time: "1:24" },
      { stage: "Leads Captured", users: leadsCount ?? 0, revenue: 0, time: "2:12" },
      { stage: "Qualified Leads", users: qualifiedCount ?? 0, revenue: 0, time: "3:40" },
      { stage: "Customers", users: customersCount ?? 0, revenue: 0, time: "—" },
      { stage: "Repeat Customers", users: repeatCount, revenue: 0, time: "—" },
    ] as Array<{ stage: string; users: number; revenue: number; time: string }>;
  });

export const getLeadsData = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data, count } = await supabaseAdmin
      .from("leads")
      .select("id, name, source, status, qualified, created_at", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .limit(100);

    return { data: data ?? [], total: count ?? 0 };
  });

export const getBookingsList = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data, count } = await supabaseAdmin
      .from("bookings")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(100);

    return { data: data ?? [], total: count ?? 0 };
  });

export const getPaymentMethods = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin
      .from("orders")
      .select("payment_method")
      .not("payment_method", "is", null);

    const counts: Record<string, number> = {};
    for (const row of data ?? []) {
      const method = row.payment_method ?? "Other";
      counts[method] = (counts[method] ?? 0) + 1;
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value: Math.round((value / total) * 100),
    }));
  });

export const getCustomerGrowth = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin
      .from("customers")
      .select("created_at")
      .order("created_at", { ascending: true });

    const monthMap: Record<string, number> = {};
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
      "Dec",
    ];
    let running = 0;
    return months.map((m) => {
      running += monthMap[m] ?? 0;
      return { m, customers: running };
    });
  });

export const getTeamPerformance = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager"]);

    const { data: teamData } = await supabaseAdmin
      .from("team")
      .select("id, name, commission_rate")
      .eq("is_active", true);

    const { data: orderData } = await supabaseAdmin
      .from("orders")
      .select("amount, agent_id, status")
      .eq("status", "successful");

    const agentRevenue: Record<string, { revenue: number; deals: number }> = {};
    for (const row of orderData ?? []) {
      if (!row.agent_id) continue;
      if (!agentRevenue[row.agent_id]) agentRevenue[row.agent_id] = { revenue: 0, deals: 0 };
      agentRevenue[row.agent_id].revenue += row.amount ?? 0;
      agentRevenue[row.agent_id].deals += 1;
    }

    return (teamData ?? []).map((member) => {
      const stats = agentRevenue[member.id] ?? { revenue: 0, deals: 0 };
      return {
        name: member.name,
        revenue: stats.revenue,
        deals: stats.deals,
        avg: stats.deals > 0 ? Math.round(stats.revenue / stats.deals) : 0,
        commission: Math.round(stats.revenue * (member.commission_rate / 100)),
      };
    });
  });

export const getOrderStats = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin.from("orders").select("status");

    const stats: Record<string, number> = { total: 0 };
    for (const row of data ?? []) {
      const s = row.status;
      stats[s] = (stats[s] ?? 0) + 1;
      stats.total += 1;
    }

    return stats;
  });

export const getTopProducts = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const { data } = await supabaseAdmin.from("orders").select("product, amount, status");

    const pmap: Record<
      string,
      { sold: number; revenue: number; successful: number; refunded: number }
    > = {};
    for (const row of data ?? []) {
      if (!row.product) continue;
      if (!pmap[row.product])
        pmap[row.product] = { sold: 0, revenue: 0, successful: 0, refunded: 0 };
      pmap[row.product].sold += 1;
      if (row.status === "successful") pmap[row.product].revenue += row.amount ?? 0;
      if (row.status === "successful") pmap[row.product].successful += 1;
      if (row.status === "refunded") pmap[row.product].refunded += 1;
    }

    return Object.entries(pmap)
      .map(([name, s]) => ({
        name,
        sold: s.sold,
        revenue: s.revenue,
        profit: Math.round(s.revenue * 0.4),
        refund: s.sold > 0 ? Math.round((s.refunded / s.sold) * 1000) / 10 : 0,
        conv: s.sold > 0 ? Math.round((s.successful / s.sold) * 1000) / 10 : 0,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  });

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const getRecentActivity = createServerFn({ method: "POST" })
  .validator(tokenOnlySchema.parse)
  .handler(async (ctx) => {
    const { token } = ctx.data;
    const verified = await verifyAdminToken(token);
    requireRole(verified, ["admin", "manager", "agent"]);

    const [ordersRes, leadsRes] = await Promise.all([
      supabaseAdmin
        .from("orders")
        .select("id, order_number, amount, status, created_at, customers!inner(name)")
        .order("created_at", { ascending: false })
        .limit(10),
      supabaseAdmin
        .from("leads")
        .select("id, name, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    const items: Array<{ who: string; what: string; when: string; type: string; ts: string }> = [];

    for (const row of ordersRes?.data ?? []) {
      const customer = (row.customers as unknown as { name: string })?.name ?? "Unknown";
      const what =
        row.status === "refunded"
          ? "requested a refund"
          : `completed payment of Rs. ${(row.amount ?? 0).toLocaleString()}`;
      items.push({
        who: customer,
        what,
        when: timeAgo(row.created_at),
        type: row.status === "refunded" ? "refund" : "payment",
        ts: row.created_at,
      });
    }

    for (const row of leadsRes?.data ?? []) {
      items.push({
        who: row.name ?? "Unknown",
        what: "captured as a new lead",
        when: timeAgo(row.created_at),
        type: "lead",
        ts: row.created_at,
      });
    }

    items.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    return items.slice(0, 15);
  });
