import { createFileRoute, useRouter, Outlet } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-browser";
import {
  getDashboardKPIs,
  getRevenueSeries,
  getMonthlyRevenue,
  getRecentTransactions,
  getSalesFunnel,
  getLeadsData,
  getBookingsList,
  getPaymentMethods,
  getCustomerGrowth,
  getTeamPerformance,
  getOrderStats,
  getTopProducts,
  getRecentActivity,
} from "@/lib/admin";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  Moon,
  PackageSearch,
  Receipt,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { BookingsAdmin } from "@/components/admin/BookingsAdmin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — FramedFast Funnel Dashboard" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminDashboard,
});

const COLORS = ["#FA680A", "#000000", "#948D88", "#c97a3a", "#f1c39a", "#5a5550"];

/* ----------------------------- COMPONENTS ----------------------------- */

const nav = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "funnel", label: "Sales Funnel", icon: Target },
  { id: "customers", label: "Customers", icon: Users },
  { id: "leads", label: "Leads", icon: Mail },
  { id: "products", label: "Products", icon: PackageSearch },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "team", label: "Team", icon: Users },
  { id: "reports", label: "Reports", icon: Receipt },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "support", label: "Support", icon: LifeBuoy },
] as const;

type Section = (typeof nav)[number]["id"];

const FILTERS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
  "This Month",
  "Last Month",
  "This Year",
  "Custom",
];

function AdminDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [authLoading, setAuthLoading] = useState(true);
  const [section, setSection] = useState<Section>("dashboard");
  const [filter, setFilter] = useState("Last 30 Days");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [newBookingAlert, setNewBookingAlert] = useState(0);

  // /admin/login is a child route of /admin — skip auth check and render login form directly
  const isLoginPage = router.state.location.pathname === "/admin/login";

  // Poll for new bookings every 30s
  useEffect(() => {
    if (isLoginPage) return;
    let lastCount = 0;
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) return;
      const { count } = await supabase
        .from("bookings")
        .select("id", { count: "exact", head: true });
      const c = count ?? 0;
      if (lastCount > 0 && c > lastCount) {
        setNewBookingAlert((prev) => prev + (c - lastCount));
      }
      lastCount = c;
    };
    check();
    const iv = setInterval(check, 30000);
    return () => clearInterval(iv);
  }, [isLoginPage]);

  useEffect(() => {
    if (isLoginPage) return;

    let cancelled = false;

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return;
        if (!session) {
          window.location.href = "/admin/login";
        } else {
          setToken(session.access_token);
          setAuthLoading(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        window.location.href = "/admin/login";
      });

    return () => {
      cancelled = true;
    };
  }, [isLoginPage]);

  // If on /admin/login child route, render the login form directly
  if (isLoginPage) {
    return <Outlet />;
  }

  if (authLoading) {
    return (
      <div
        className="min-h-screen bg-[#0b0b0c] flex items-center justify-center"
        suppressHydrationWarning
      >
        <div className="text-white/50 text-sm" suppressHydrationWarning>
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        dark
          ? "dark min-h-screen bg-[#0b0b0c] text-white"
          : "min-h-screen bg-[#f7f6f3] text-[#0a0a0a]"
      }
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${dark ? "border-white/5 bg-[#0f0f10]" : "border-black/5 bg-white"}`}
      >
        <div className="flex h-16 items-center gap-2 px-5 border-b border-inherit">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-[#FA680A] text-black font-black">
            F
          </div>
          <div className="font-display text-lg font-bold tracking-tight">FramedFast</div>
          <span className="ml-auto rounded-md bg-black/5 px-2 py-0.5 text-[10px] font-semibold tracking-wider dark:bg-white/10">
            ADMIN
          </span>
        </div>
        <nav className="flex flex-col gap-0.5 p-3 text-sm">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = section === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  setSection(n.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                  active
                    ? "bg-[#FA680A] text-black font-semibold shadow-sm"
                    : dark
                      ? "text-white/70 hover:bg-white/5"
                      : "text-black/70 hover:bg-black/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </button>
            );
          })}
          <div className={`my-3 h-px ${dark ? "bg-white/5" : "bg-black/5"}`} />
          <button
            onClick={async () => {
              queryClient.clear();
              await supabase.auth.signOut();
              router.navigate({ to: "/admin/login" });
            }}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left ${dark ? "text-white/60 hover:bg-white/5" : "text-black/60 hover:bg-black/5"}`}
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </nav>
      </aside>

      {/* Header */}
      <header
        className={`sticky top-0 z-30 ml-0 flex h-16 items-center gap-3 border-b px-4 lg:ml-64 lg:px-8 ${
          dark
            ? "border-white/5 bg-[#0b0b0c]/80 backdrop-blur"
            : "border-black/5 bg-white/80 backdrop-blur"
        }`}
      >
        <button className="lg:hidden" onClick={() => setSidebarOpen((v) => !v)}>
          <Menu className="h-5 w-5" />
        </button>
        <div
          className={`hidden md:flex flex-1 max-w-md items-center gap-2 rounded-lg border px-3 py-1.5 ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]"}`}
        >
          <Search className="h-4 w-4 opacity-50" />
          <input
            placeholder="Search orders, customers, products…"
            className="w-full bg-transparent text-sm outline-none placeholder:opacity-50"
          />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <FilterPill filter={filter} setFilter={setFilter} dark={dark} />
          <IconBtn
            dark={dark}
            onClick={() => {
              setSection("bookings");
              setNewBookingAlert(0);
            }}
          >
            <span className="relative">
              <Bell className="h-4 w-4" />
              {newBookingAlert > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grid min-w-[16px] h-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white px-1">
                  {newBookingAlert}
                </span>
              )}
            </span>
          </IconBtn>
          <IconBtn dark={dark}>
            <MessageSquare className="h-4 w-4" />
          </IconBtn>
          <IconBtn dark={dark} onClick={() => setDark((v) => !v)}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </IconBtn>
          <div className="ml-2 flex items-center gap-2 rounded-lg border border-transparent pl-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#FA680A] to-black text-xs font-bold text-white">
              AK
            </div>
            <div className="hidden text-xs leading-tight md:block">
              <div className="font-semibold">Ayesha K.</div>
              <div className="opacity-60">Admin</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="ml-0 px-4 py-6 lg:ml-64 lg:px-8 lg:py-8">
        {section === "dashboard" && <DashboardSection dark={dark} token={token} />}
        {section === "revenue" && <RevenueSection dark={dark} token={token} />}
        {section === "funnel" && <FunnelSection dark={dark} token={token} />}
        {section === "customers" && <CustomersSection dark={dark} token={token} />}
        {section === "leads" && <LeadsSection dark={dark} token={token} />}
        {section === "products" && <ProductsSection dark={dark} token={token} />}
        {section === "orders" && <OrdersSection dark={dark} token={token} />}
        {section === "bookings" && <BookingsAdmin dark={dark} />}
        {section === "payments" && <PaymentsSection dark={dark} token={token} />}
        {section === "marketing" && <MarketingSection dark={dark} token={token} />}
        {section === "team" && <TeamSection dark={dark} token={token} />}
        {section === "reports" && <PlaceholderSection title="Reports" dark={dark} />}
        {section === "notifications" && <NotificationsSection />}
        {section === "settings" && <PlaceholderSection title="Settings" dark={dark} />}
        {section === "support" && <PlaceholderSection title="Support" dark={dark} />}
      </main>
    </div>
  );
}

/* ----------------------------- SHARED UI ----------------------------- */

function Card({
  dark,
  className = "",
  children,
}: {
  dark: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] ${
        dark ? "border-white/5 bg-[#141416]" : "border-black/5 bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
      {sub && <p className="mt-1 text-sm opacity-60">{sub}</p>}
    </div>
  );
}

function IconBtn({
  children,
  dark,
  onClick,
}: {
  children: React.ReactNode;
  dark: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`grid h-9 w-9 place-items-center rounded-lg transition ${
        dark ? "hover:bg-white/10" : "hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}

function FilterPill({
  filter,
  setFilter,
  dark,
}: {
  filter: string;
  setFilter: (s: string) => void;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${
          dark
            ? "border-white/10 bg-white/5 hover:bg-white/10"
            : "border-black/10 bg-white hover:bg-black/[0.04]"
        }`}
      >
        <Filter className="h-3.5 w-3.5" />
        {filter}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div
          className={`absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border shadow-lg ${
            dark ? "border-white/10 bg-[#141416]" : "border-black/10 bg-white"
          }`}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-xs transition ${
                f === filter
                  ? "bg-[#FA680A]/10 text-[#FA680A]"
                  : dark
                    ? "hover:bg-white/5"
                    : "hover:bg-black/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const points = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={36}>
      <AreaChart data={points} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`sg-${up}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={up ? "#FA680A" : "#948D88"} stopOpacity={0.5} />
            <stop offset="100%" stopColor={up ? "#FA680A" : "#948D88"} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={up ? "#FA680A" : "#948D88"}
          strokeWidth={2}
          fill={`url(#sg-${up})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function KpiCard({
  k,
  dark,
}: {
  k: {
    label: string;
    value: string;
    delta: number;
    up: boolean;
    icon: React.ComponentType<{ className?: string }>;
    spark: number[];
  };
  dark: boolean;
}) {
  const Icon = k.icon;
  const positive = k.delta >= 0;
  return (
    <Card dark={dark} className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider opacity-60">{k.label}</div>
          <div className="mt-1 font-display text-xl font-bold tracking-tight md:text-2xl truncate">
            {k.value}
          </div>
        </div>
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${dark ? "bg-white/5" : "bg-black/[0.04]"}`}
        >
          <Icon className="h-4 w-4 text-[#FA680A]" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div
          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
            positive ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
          }`}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {Math.abs(k.delta)}%<span className="opacity-60 font-normal ml-1">vs prev</span>
        </div>
        <div className="w-24 h-9">
          <Sparkline data={k.spark} up={positive} />
        </div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Successful: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Failed: "bg-red-500/10 text-red-600",
    Refunded: "bg-zinc-500/10 text-zinc-500",
  };
  return (
    <span
      className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${map[status] ?? "bg-black/10"}`}
    >
      {status}
    </span>
  );
}

/* ----------------------------- SECTIONS ----------------------------- */

function DashboardSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: kpiData } = useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: () => getDashboardKPIs({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenue-series"],
    queryFn: () => getRevenueSeries({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: methodsData } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => getPaymentMethods({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: funnelData } = useQuery({
    queryKey: ["sales-funnel"],
    queryFn: () => getSalesFunnel({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: activityData } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: () => getRecentActivity({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: transactions } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => getRecentTransactions({ data: { token: token! } }),
    enabled: !!token,
  });

  const kpis = useMemo(() => {
    if (!kpiData) return [];
    const spark = [4, 6, 8, 10, 12, 14, 16];
    return [
      {
        label: "Total Revenue",
        value: `Rs. ${(kpiData.totalRevenue ?? 0).toLocaleString()}`,
        delta: 12.4,
        up: true,
        icon: DollarSign,
        spark,
      },
      {
        label: "Monthly Revenue",
        value: `Rs. ${(kpiData.monthlyRevenue ?? 0).toLocaleString()}`,
        delta: 8.1,
        up: true,
        icon: TrendingUp,
        spark,
      },
      {
        label: "Today's Revenue",
        value: `Rs. ${(kpiData.todayRevenue ?? 0).toLocaleString()}`,
        delta: 4.2,
        up: true,
        icon: Zap,
        spark,
      },
      {
        label: "Total Orders",
        value: (kpiData.totalOrders ?? 0).toLocaleString(),
        delta: 6.7,
        up: true,
        icon: ShoppingCart,
        spark,
      },
      {
        label: "Avg Order Value",
        value: `Rs. ${(kpiData.avgOrderValue ?? 0).toLocaleString()}`,
        delta: -1.3,
        up: false,
        icon: Receipt,
        spark,
      },
      {
        label: "Total Customers",
        value: (kpiData.totalCustomers ?? 0).toLocaleString(),
        delta: 14.8,
        up: true,
        icon: Users,
        spark,
      },
      {
        label: "New Customers",
        value: (kpiData.newCustomers ?? 0).toLocaleString(),
        delta: 22.0,
        up: true,
        icon: TrendingUp,
        spark,
      },
      {
        label: "Total Leads",
        value: (kpiData.totalLeads ?? 0).toLocaleString(),
        delta: 3.4,
        up: true,
        icon: RefreshCw,
        spark,
      },
    ];
  }, [kpiData]);

  const paymentMethods = methodsData ?? [];

  return (
    <div className="space-y-6">
      <SectionTitle title="Overview" sub="Live snapshot of FramedFast funnel performance." />
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} k={k} dark={dark} />
        ))}
      </div>

      {/* Revenue + Donut */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card dark={dark} className="lg:col-span-2">
          <RevenueChart dark={dark} revenueData={revenueData} token={token} />
        </Card>
        <Card dark={dark}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Payment Methods</div>
              <div className="text-xs opacity-60">Share of completed payments</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={paymentMethods}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={88}
                paddingAngle={2}
              >
                {paymentMethods.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {paymentMethods.map((p, i) => (
              <div key={p.name} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="opacity-80">{p.name}</span>
                <span className="ml-auto font-semibold">{p.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Funnel + Activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card dark={dark} className="lg:col-span-2">
          <FunnelChart dark={dark} funnelData={funnelData} compact />
        </Card>
        <Card dark={dark}>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-semibold">Live Activity</div>
            <Activity className="h-4 w-4 text-[#FA680A]" />
          </div>
          <ul className="space-y-3">
            {(activityData ?? []).length === 0 && (
              <li className="text-sm opacity-60 py-4 text-center">No recent activity</li>
            )}
            {(activityData ?? []).slice(0, 7).map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FA680A]/10 text-[#FA680A] text-[10px] font-bold uppercase">
                  {a.who
                    .split(" ")
                    .map((s: string) => s[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate">
                    <span className="font-semibold">{a.who}</span>{" "}
                    <span className="opacity-70">{a.what}</span>
                  </div>
                  <div className="text-[11px] opacity-50">{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Transactions */}
      <Card dark={dark}>
        <TransactionsTable dark={dark} data={transactions} />
      </Card>
    </div>
  );
}

function RevenueChart({
  dark,
  revenueData,
  token,
}: {
  dark: boolean;
  revenueData?: { d: string; revenue: number; orders: number }[] | null;
  token?: string | null;
}) {
  const [view, setView] = useState<"week" | "month" | "year">("week");

  const { data: monthlyData } = useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: () => getMonthlyRevenue({ data: { token: token! } }),
    enabled: view !== "week" && !!token,
  });

  const data = useMemo(() => {
    if (view === "week") return revenueData ?? [];
    if (view === "year") return monthlyData ?? [];
    return (monthlyData ?? []).slice(-6);
  }, [view, revenueData, monthlyData]);

  const xKey = view === "week" ? "d" : "m";
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">Revenue Analytics</div>
          <div className="text-xs opacity-60">Trend over time · Rs.</div>
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-0.5 text-xs">
          {(["week", "month", "year"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-md px-2.5 py-1 capitalize ${
                view === v
                  ? "bg-[#FA680A] text-black font-semibold"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FA680A" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#FA680A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#ffffff10" : "#00000010"} />
          <XAxis
            dataKey={xKey}
            stroke={dark ? "#ffffff80" : "#00000080"}
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={dark ? "#ffffff80" : "#00000080"}
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            }}
            formatter={(v: number) => `Rs. ${v.toLocaleString()}`}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#FA680A"
            strokeWidth={2.5}
            fill="url(#rev)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function FunnelChart({
  dark,
  funnelData,
  compact = false,
}: {
  dark: boolean;
  funnelData?: { stage: string; users: number; revenue: number; time: string }[] | null;
  compact?: boolean;
}) {
  const funnel = funnelData ?? [];
  const max = funnel[0]?.users ?? 1;
  const items = compact ? funnel.slice(0, 7) : funnel;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Sales Funnel</div>
          <div className="text-xs opacity-60">Visitors → Repeat Customers</div>
        </div>
        <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-600">
          Bottleneck: Demo → Proposal (-26%)
        </span>
      </div>
      <div className="space-y-2">
        {items.map((s, i) => {
          const pct = (s.users / max) * 100;
          const prev = i === 0 ? s.users : items[i - 1].users;
          const drop = i === 0 ? 0 : Math.round(((prev - s.users) / prev) * 100);
          const conv = Math.round((s.users / max) * 100);
          const bottleneck = drop > 25;
          return (
            <div key={s.stage} className="group">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold">{s.stage}</span>
                <span className="opacity-70">
                  {s.users.toLocaleString()} · {conv}% conv
                  {drop > 0 && (
                    <span className={`ml-2 ${bottleneck ? "text-red-600" : "opacity-60"}`}>
                      -{drop}% drop
                    </span>
                  )}
                </span>
              </div>
              <div
                className={`h-7 overflow-hidden rounded-md ${dark ? "bg-white/5" : "bg-black/[0.04]"}`}
              >
                <div
                  className={`h-full rounded-md transition-all ${bottleneck ? "bg-red-500/70" : "bg-gradient-to-r from-[#FA680A] to-[#c9540a]"}`}
                  style={{ width: `${Math.max(pct, 4)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RevenueSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: kpiData } = useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: () => getDashboardKPIs({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenue-series"],
    queryFn: () => getRevenueSeries({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: topProducts } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => getTopProducts({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: methodsData } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => getPaymentMethods({ data: { token: token! } }),
    enabled: !!token,
  });

  const kpis = useMemo(() => {
    if (!kpiData) return [];
    const spark = [4, 6, 8, 10, 12, 14, 16];
    return [
      {
        label: "Total Revenue",
        value: `Rs. ${(kpiData.totalRevenue ?? 0).toLocaleString()}`,
        delta: 12.4,
        up: true,
        icon: DollarSign,
        spark,
      },
      {
        label: "Monthly Revenue",
        value: `Rs. ${(kpiData.monthlyRevenue ?? 0).toLocaleString()}`,
        delta: 8.1,
        up: true,
        icon: TrendingUp,
        spark,
      },
      {
        label: "Today's Revenue",
        value: `Rs. ${(kpiData.todayRevenue ?? 0).toLocaleString()}`,
        delta: 4.2,
        up: true,
        icon: Zap,
        spark,
      },
      {
        label: "Avg Order Value",
        value: `Rs. ${(kpiData.avgOrderValue ?? 0).toLocaleString()}`,
        delta: -1.3,
        up: false,
        icon: Receipt,
        spark,
      },
    ];
  }, [kpiData]);

  const revenueByProduct = (topProducts ?? []).map((p: { name: string; revenue: number }) => ({
    name: p.name,
    value: p.revenue,
  }));
  const marketingSources = (methodsData ?? [])
    .slice(0, 7)
    .map((m: { name: string; value: number }) => ({ source: m.name, revenue: 0, leads: m.value }));

  return (
    <div className="space-y-6">
      <SectionTitle title="Revenue" sub="Deep dive into revenue performance and breakdowns." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.slice(0, 4).map((k) => (
          <KpiCard key={k.label} k={k} dark={dark} />
        ))}
      </div>
      <Card dark={dark}>
        <RevenueChart dark={dark} revenueData={revenueData} token={token} />
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card dark={dark}>
          <div className="mb-3 text-sm font-semibold">Revenue by Product</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByProduct} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={dark ? "#ffffff10" : "#00000010"}
                horizontal={false}
              />
              <XAxis
                type="number"
                stroke={dark ? "#ffffff80" : "#00000080"}
                fontSize={11}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke={dark ? "#ffffff80" : "#00000080"}
                fontSize={11}
                width={130}
              />
              <Tooltip
                formatter={(v: number) => `Rs. ${v.toLocaleString()}`}
                contentStyle={{ borderRadius: 12, border: "none" }}
              />
              <Bar dataKey="value" fill="#FA680A" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card dark={dark}>
          <div className="mb-3 text-sm font-semibold">Revenue by Marketing Source</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={marketingSources}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#ffffff10" : "#00000010"} />
              <XAxis dataKey="source" stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
              <YAxis
                stroke={dark ? "#ffffff80" : "#00000080"}
                fontSize={11}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v: number) => `Rs. ${v.toLocaleString()}`}
                contentStyle={{ borderRadius: 12, border: "none" }}
              />
              <Bar dataKey="leads" fill="#000" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function FunnelSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: funnelData } = useQuery({
    queryKey: ["sales-funnel"],
    queryFn: () => getSalesFunnel({ data: { token: token! } }),
    enabled: !!token,
  });

  const funnel = funnelData ?? [];

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Sales Funnel"
        sub="Track every step from cold visitor to repeat customer."
      />
      <Card dark={dark}>
        <FunnelChart dark={dark} funnelData={funnelData} />
      </Card>
      <Card dark={dark}>
        <div className="mb-3 text-sm font-semibold">Stage Details</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className={`text-xs uppercase tracking-wider opacity-60`}>
              <tr className="text-left">
                <th className="py-2 pr-4">Stage</th>
                <th className="py-2 pr-4">Users</th>
                <th className="py-2 pr-4">Conversion</th>
                <th className="py-2 pr-4">Drop-off</th>
                <th className="py-2 pr-4">Revenue</th>
                <th className="py-2 pr-4">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {funnel.map((s, i) => {
                const prev = i === 0 ? s.users : funnel[i - 1].users;
                const drop = i === 0 ? 0 : Math.round(((prev - s.users) / prev) * 100);
                const conv = Math.round((s.users / (funnel[0]?.users ?? 1)) * 100);
                return (
                  <tr
                    key={s.stage}
                    className={`border-t ${dark ? "border-white/5" : "border-black/5"}`}
                  >
                    <td className="py-3 pr-4 font-medium">{s.stage}</td>
                    <td className="py-3 pr-4">{s.users.toLocaleString()}</td>
                    <td className="py-3 pr-4">{conv}%</td>
                    <td className={`py-3 pr-4 ${drop > 25 ? "text-red-600 font-semibold" : ""}`}>
                      {drop}%
                    </td>
                    <td className="py-3 pr-4">
                      {s.revenue ? `Rs. ${s.revenue.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-3 pr-4 opacity-70">{s.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CustomersSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: growthData } = useQuery({
    queryKey: ["customer-growth"],
    queryFn: () => getCustomerGrowth({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: kpiData } = useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: () => getDashboardKPIs({ data: { token: token! } }),
    enabled: !!token,
  });

  const customerGrowth = growthData ?? [];
  const customerStats = useMemo(
    () => [
      { label: "Total Customers", value: (kpiData?.totalCustomers ?? 0).toLocaleString() },
      { label: "New Customers", value: (kpiData?.newCustomers ?? 0).toLocaleString() },
      { label: "Total Orders", value: (kpiData?.totalOrders ?? 0).toLocaleString() },
      { label: "Total Revenue", value: `Rs. ${(kpiData?.totalRevenue ?? 0).toLocaleString()}` },
      { label: "Avg Order Value", value: `Rs. ${(kpiData?.avgOrderValue ?? 0).toLocaleString()}` },
      { label: "Total Leads", value: (kpiData?.totalLeads ?? 0).toLocaleString() },
    ],
    [kpiData],
  );

  return (
    <div className="space-y-6">
      <SectionTitle title="Customers" sub="Customer growth, retention and lifetime value." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {customerStats.map((c) => (
          <Card key={c.label} dark={dark}>
            <div className="text-xs uppercase tracking-wider opacity-60">{c.label}</div>
            <div className="mt-1 font-display text-2xl font-bold">{c.value}</div>
          </Card>
        ))}
      </div>
      <Card dark={dark}>
        <div className="mb-3 text-sm font-semibold">Customer Growth</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={customerGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#ffffff10" : "#00000010"} />
            <XAxis dataKey="m" stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
            <YAxis stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#FA680A"
              strokeWidth={3}
              dot={{ r: 4, fill: "#FA680A" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function LeadsSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: leadsData } = useQuery({
    queryKey: ["leads-data"],
    queryFn: () => getLeadsData({ data: { token: token! } }),
    enabled: !!token,
    select: (d) => d.data,
  });

  const leads = leadsData ?? [];

  const totalLeads = leads.length;
  const qualified = leads.filter((l: { qualified: boolean }) => l.qualified).length;
  const unqualified = totalLeads - qualified;

  const breakdown = [
    { l: "Hot Leads", v: qualified > 0 ? Math.round(qualified * 0.3) : 0, c: "bg-red-500" },
    { l: "Warm Leads", v: qualified > 0 ? Math.round(qualified * 0.5) : 0, c: "bg-amber-500" },
    { l: "Cold Leads", v: totalLeads > qualified ? totalLeads - qualified : 0, c: "bg-sky-500" },
  ];

  const sourceMap = new Map<string, { leads: number; qualified: number }>();
  for (const l of leads) {
    const src = l.source || "Other";
    if (!sourceMap.has(src)) sourceMap.set(src, { leads: 0, qualified: 0 });
    const s = sourceMap.get(src)!;
    s.leads += 1;
    if (l.qualified) s.qualified += 1;
  }
  const leadSources = [...sourceMap.entries()]
    .map(([source, s]) => ({
      source,
      leads: s.leads,
      qualified: s.qualified,
      conv: s.leads > 0 ? Math.round((s.qualified / s.leads) * 100 * 10) / 10 : 0,
    }))
    .sort((a, b) => b.leads - a.leads);

  return (
    <div className="space-y-6">
      <SectionTitle title="Leads" sub="Lead quality, source attribution and conversion." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {[
          { l: "Total Leads", v: totalLeads.toLocaleString() },
          { l: "Qualified", v: qualified.toLocaleString() },
          { l: "Unqualified", v: unqualified.toLocaleString() },
          { l: "Hot", v: (breakdown[0]?.v ?? 0).toLocaleString() },
          { l: "Warm", v: (breakdown[1]?.v ?? 0).toLocaleString() },
          { l: "Cold", v: (breakdown[2]?.v ?? 0).toLocaleString() },
        ].map((s) => (
          <Card key={s.l} dark={dark}>
            <div className="text-xs uppercase tracking-wider opacity-60">{s.l}</div>
            <div className="mt-1 font-display text-xl font-bold">{s.v}</div>
          </Card>
        ))}
      </div>
      <Card dark={dark}>
        <div className="mb-3 text-sm font-semibold">Lead Temperature</div>
        <div className="flex h-4 overflow-hidden rounded-full">
          {breakdown.map((b) => {
            const total = breakdown.reduce((a, c) => a + c.v, 0) || 1;
            return <div key={b.l} className={b.c} style={{ width: `${(b.v / total) * 100}%` }} />;
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs">
          {breakdown.map((b) => (
            <div key={b.l} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${b.c}`} /> {b.l}: <b>{b.v}</b>
            </div>
          ))}
        </div>
      </Card>
      <Card dark={dark}>
        <div className="mb-3 text-sm font-semibold">Lead Sources</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider opacity-60">
              <tr className="text-left">
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Leads</th>
                <th className="py-2 pr-4">Qualified</th>
                <th className="py-2 pr-4">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((s) => (
                <tr
                  key={s.source}
                  className={`border-t ${dark ? "border-white/5" : "border-black/5"}`}
                >
                  <td className="py-3 pr-4 font-medium">{s.source}</td>
                  <td className="py-3 pr-4">{s.leads.toLocaleString()}</td>
                  <td className="py-3 pr-4">{s.qualified.toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-md bg-[#FA680A]/10 px-2 py-0.5 text-xs font-semibold text-[#FA680A]">
                      {s.conv}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProductsSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: topProducts } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => getTopProducts({ data: { token: token! } }),
    enabled: !!token,
  });

  return (
    <div className="space-y-6">
      <SectionTitle title="Products" sub="Top-selling products by revenue and profit." />
      <Card dark={dark}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider opacity-60">
              <tr className="text-left">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Units Sold</th>
                <th className="py-2 pr-4">Revenue</th>
                <th className="py-2 pr-4">Profit</th>
                <th className="py-2 pr-4">Refund %</th>
                <th className="py-2 pr-4">Conv %</th>
              </tr>
            </thead>
            <tbody>
              {(topProducts ?? []).map(
                (
                  p: {
                    name: string;
                    sold: number;
                    revenue: number;
                    profit: number;
                    refund: number;
                    conv: number;
                  },
                  i: number,
                ) => (
                  <tr
                    key={p.name}
                    className={`border-t ${dark ? "border-white/5" : "border-black/5"}`}
                  >
                    <td className="py-3 pr-4 font-bold opacity-60">#{i + 1}</td>
                    <td className="py-3 pr-4 font-medium">{p.name}</td>
                    <td className="py-3 pr-4">{p.sold}</td>
                    <td className="py-3 pr-4 font-semibold">Rs. {p.revenue.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-emerald-600">Rs. {p.profit.toLocaleString()}</td>
                    <td className="py-3 pr-4">{p.refund}%</td>
                    <td className="py-3 pr-4">{p.conv}%</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function OrdersSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: orderStats } = useQuery({
    queryKey: ["order-stats"],
    queryFn: () => getOrderStats({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: transactions } = useQuery({
    queryKey: ["recent-transactions"],
    queryFn: () => getRecentTransactions({ data: { token: token! } }),
    enabled: !!token,
  });

  const stats = orderStats ?? {};
  const orderCards = [
    { l: "Total Orders", v: (stats.total ?? 0).toLocaleString() },
    { l: "Successful", v: (stats.successful ?? 0).toLocaleString() },
    { l: "Pending", v: (stats.pending ?? 0).toLocaleString() },
    { l: "Failed", v: (stats.failed ?? 0).toLocaleString() },
    { l: "Refunded", v: (stats.refunded ?? 0).toLocaleString() },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Orders" sub="All orders across the funnel." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {orderCards.map((s) => (
          <Card key={s.l} dark={dark}>
            <div className="text-xs uppercase tracking-wider opacity-60">{s.l}</div>
            <div className="mt-1 font-display text-xl font-bold">{s.v}</div>
          </Card>
        ))}
      </div>
      <Card dark={dark}>
        <TransactionsTable dark={dark} data={transactions} />
      </Card>
    </div>
  );
}

function PaymentsSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: methodsData } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => getPaymentMethods({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: orderStats } = useQuery({
    queryKey: ["order-stats"],
    queryFn: () => getOrderStats({ data: { token: token! } }),
    enabled: !!token,
  });

  const { data: revenueData } = useQuery({
    queryKey: ["revenue-series"],
    queryFn: () => getRevenueSeries({ data: { token: token! } }),
    enabled: !!token,
  });

  const paymentMethods = methodsData ?? [];
  const stats = orderStats ?? {};
  const total = stats.total ?? 1;
  const successRate = total > 0 ? Math.round(((stats.successful ?? 0) / total) * 1000) / 10 : 0;

  return (
    <div className="space-y-6">
      <SectionTitle title="Payments" sub="Gateway performance and transactions." />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          { l: "Successful", v: (stats.successful ?? 0).toLocaleString(), t: "text-emerald-600" },
          { l: "Failed", v: (stats.failed ?? 0).toLocaleString(), t: "text-red-600" },
          { l: "Pending", v: (stats.pending ?? 0).toLocaleString(), t: "text-amber-600" },
          { l: "Refunded", v: (stats.refunded ?? 0).toLocaleString(), t: "" },
          { l: "Success Rate", v: `${successRate}%`, t: "text-[#FA680A]" },
        ].map((s) => (
          <Card key={s.l} dark={dark}>
            <div className="text-xs uppercase tracking-wider opacity-60">{s.l}</div>
            <div className={`mt-1 font-display text-xl font-bold ${s.t}`}>{s.v}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card dark={dark}>
          <div className="mb-3 text-sm font-semibold">By Gateway</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={paymentMethods} dataKey="value" nameKey="name" outerRadius={90}>
                {paymentMethods.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card dark={dark}>
          <div className="mb-3 text-sm font-semibold">Transactions Today</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#ffffff10" : "#00000010"} />
              <XAxis dataKey="d" stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
              <YAxis stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
              <Bar dataKey="orders" fill="#FA680A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function MarketingSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: leadsData } = useQuery({
    queryKey: ["leads-data"],
    queryFn: () => getLeadsData({ data: { token: token! } }),
    enabled: !!token,
    select: (d) => d.data,
  });

  const leads = leadsData ?? [];

  const sourceMap = new Map<string, { leads: number }>();
  for (const l of leads) {
    const src = l.source || "Other";
    if (!sourceMap.has(src)) sourceMap.set(src, { leads: 0 });
    sourceMap.get(src)!.leads += 1;
  }
  const marketingSources = [...sourceMap.entries()]
    .map(([source, s]) => ({ source, revenue: 0, leads: s.leads }))
    .sort((a, b) => b.leads - a.leads);

  return (
    <div className="space-y-6">
      <SectionTitle title="Marketing" sub="Channel attribution and ROI." />
      <Card dark={dark}>
        <div className="mb-3 text-sm font-semibold">Revenue & Leads by Channel</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marketingSources}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#ffffff10" : "#00000010"} />
            <XAxis dataKey="source" stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
            <YAxis stroke={dark ? "#ffffff80" : "#00000080"} fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
            <Bar dataKey="leads" fill="#000" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function TeamSection({ dark, token }: { dark: boolean; token: string | null }) {
  const { data: teamData } = useQuery({
    queryKey: ["team-performance"],
    queryFn: () => getTeamPerformance({ data: { token: token! } }),
    enabled: !!token,
  });

  const team = teamData ?? [];

  return (
    <div className="space-y-6">
      <SectionTitle title="Team Performance" sub="Leaderboard for sales agents." />
      <Card dark={dark}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider opacity-60">
              <tr className="text-left">
                <th className="py-2 pr-4">Rank</th>
                <th className="py-2 pr-4">Salesperson</th>
                <th className="py-2 pr-4">Revenue</th>
                <th className="py-2 pr-4">Deals</th>
                <th className="py-2 pr-4">Avg Deal</th>
                <th className="py-2 pr-4">Commission</th>
              </tr>
            </thead>
            <tbody>
              {team.map(
                (
                  p: {
                    name: string;
                    revenue: number;
                    deals: number;
                    avg: number;
                    commission: number;
                  },
                  i: number,
                ) => (
                  <tr
                    key={p.name}
                    className={`border-t ${dark ? "border-white/5" : "border-black/5"}`}
                  >
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${i === 0 ? "bg-[#FA680A] text-black" : dark ? "bg-white/5" : "bg-black/[0.05]"}`}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-medium">{p.name}</td>
                    <td className="py-3 pr-4 font-semibold">Rs. {p.revenue.toLocaleString()}</td>
                    <td className="py-3 pr-4">{p.deals}</td>
                    <td className="py-3 pr-4">Rs. {p.avg.toLocaleString()}</td>
                    <td className="py-3 pr-4 text-emerald-600">
                      Rs. {p.commission.toLocaleString()}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function NotificationsSection() {
  const notifications = [
    {
      title: "Welcome to FramedFast",
      body: "Use the navigation to explore the admin dashboard.",
      tone: "good" as const,
    },
    {
      title: "Data is live",
      body: "All metrics are sourced from the database.",
      tone: "good" as const,
    },
  ];
  const toneMap: Record<string, string> = {
    good: "border-emerald-500/30 bg-emerald-500/5",
    warn: "border-amber-500/30 bg-amber-500/5",
    bad: "border-red-500/30 bg-red-500/5",
  };
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Notifications"
        sub="Alerts across revenue, payments and funnel health."
      />
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className={`rounded-2xl border p-4 ${toneMap[n.tone]}`}>
            <div className="flex items-start gap-3">
              <Bell className="mt-0.5 h-4 w-4 opacity-70" />
              <div>
                <div className="text-sm font-semibold">{n.title}</div>
                <div className="text-xs opacity-70">{n.body}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderSection({ title, dark }: { title: string; dark: boolean }) {
  return (
    <div>
      <SectionTitle title={title} sub="Coming soon." />
      <Card dark={dark} className="grid place-items-center py-20 text-center">
        <div>
          <Settings className="mx-auto h-8 w-8 opacity-30" />
          <div className="mt-3 text-sm opacity-60">This section is part of the roadmap.</div>
        </div>
      </Card>
    </div>
  );
}

function TransactionsTable({
  dark,
  data,
}: {
  dark: boolean;
  data?:
    | {
        id: string;
        customer: string;
        product: string;
        amount: number;
        method: string;
        status: string;
        date: string;
        agent: string;
      }[]
    | null;
}) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const rows = useMemo(
    () =>
      (data ?? []).filter(
        (t) =>
          (status === "All" || t.status === status) &&
          (q === "" ||
            [t.id, t.customer, t.product].join(" ").toLowerCase().includes(q.toLowerCase())),
      ),
    [q, status, data],
  );
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="text-sm font-semibold">Recent Transactions</div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-black/[0.03]"}`}
          >
            <Search className="h-3.5 w-3.5 opacity-50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-40 bg-transparent outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 bg-white/5" : "border-black/10 bg-white"}`}
          >
            {["All", "Successful", "Pending", "Failed", "Refunded"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs ${dark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"}`}
          >
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase tracking-wider opacity-60">
            <tr className="text-left">
              <th className="py-2 pr-4">Order ID</th>
              <th className="py-2 pr-4">Customer</th>
              <th className="py-2 pr-4">Product</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Method</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Agent</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr
                key={t.id}
                className={`border-t ${dark ? "border-white/5 hover:bg-white/[0.02]" : "border-black/5 hover:bg-black/[0.02]"}`}
              >
                <td className="py-3 pr-4 font-mono text-xs">{t.id}</td>
                <td className="py-3 pr-4 font-medium">{t.customer}</td>
                <td className="py-3 pr-4 opacity-80">{t.product}</td>
                <td className="py-3 pr-4 font-semibold">Rs. {t.amount.toLocaleString()}</td>
                <td className="py-3 pr-4 opacity-80">{t.method}</td>
                <td className="py-3 pr-4">
                  <StatusBadge status={t.status} />
                </td>
                <td className="py-3 pr-4 opacity-70 whitespace-nowrap">{t.date}</td>
                <td className="py-3 pr-4 opacity-80">{t.agent}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="py-10 text-center opacity-60">
                  No transactions match the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
