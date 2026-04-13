import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Activity,
  Utensils,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Clock,
  Users,
  Star,
  ChefHat,
} from "lucide-react";

const stats = [
  { label: "Total Orders", value: "1,247", icon: Utensils, color: "text-brand-gold" },
  { label: "Revenue", value: "$89,430", icon: DollarSign, color: "text-brand-green" },
  { label: "Repeat Customers", value: "78%", icon: Users, color: "text-brand-copper" },
  { label: "Avg Rating", value: "4.9", icon: Star, color: "text-brand-gold" },
];

const healthMetrics = [
  { label: "Blood Pressure", value: "120/78", status: "normal", icon: Heart },
  { label: "Blood Sugar", value: "95 mg/dL", status: "normal", icon: Activity },
  { label: "Weight", value: "165 lbs", status: "stable", icon: TrendingUp },
  { label: "Last Checkup", value: "2 weeks ago", status: "ok", icon: Clock },
];

const recentOrders = [
  { id: 1, customer: "Johnson Family Reunion", items: "Soul Food Package (80)", total: "$3,200", date: "Today" },
  { id: 2, customer: "TechCorp Q2 Event", items: "Latin Kitchen Buffet (50)", total: "$2,750", date: "Yesterday" },
  { id: 3, customer: "Williams Wedding", items: "Dual Kitchen (150)", total: "$9,750", date: "Jun 8" },
  { id: 4, customer: "Church Potluck", items: "Southern Comfort (60)", total: "$1,800", date: "Jun 5" },
];

const complianceStates = [
  { state: "Louisiana", status: "Active", expires: "Dec 2026" },
  { state: "Texas", status: "Active", expires: "Mar 2027" },
  { state: "Georgia", status: "Pending", expires: "—" },
  { state: "California", status: "Active", expires: "Jan 2027" },
];

const NannyDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Home</span>
          </Link>
          <span className="font-heading text-lg font-semibold text-gradient-gold">Dashboard</span>
          <div className="w-16" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold/50 font-mono">Senior Dashboard</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">
            Good Morning, Nanny
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Here's your kitchen at a glance.</p>
        </motion.div>

        {/* Stats Grid — large tap targets for senior-friendliness */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="senior-tap p-4 rounded-lg border border-border/50 bg-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Two-column: Health + Recent Orders */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Health Hub */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="rounded-lg border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base font-semibold flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                Health Monitor
              </h2>
              <Link to="/health" className="text-xs text-brand-gold hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {healthMetrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{m.value}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          m.status === "normal"
                            ? "bg-brand-green/10 text-brand-green"
                            : "bg-brand-gold/10 text-brand-gold"
                        }`}
                      >
                        {m.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="rounded-lg border border-border/50 bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-base font-semibold flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-brand-gold" />
                Recent Catering Orders
              </h2>
              <Link to="/earnings" className="text-xs text-brand-gold hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-brand-green">{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Compliance + Quick Actions row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Ghost Kitchen Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="rounded-lg border border-border/50 bg-card p-5"
          >
            <h2 className="font-heading text-base font-semibold flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-brand-green" />
              Ghost Kitchen Compliance
            </h2>
            <div className="space-y-2">
              {complianceStates.map((c) => (
                <div key={c.state} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <span className="text-sm">{c.state}</span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        c.status === "Active"
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {c.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{c.expires}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/operations" className="block mt-3 text-xs text-brand-gold hover:underline">
              Manage all 50 states →
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="rounded-lg border border-border/50 bg-card p-5"
          >
            <h2 className="font-heading text-base font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Soul Food Kitchen", to: "/soul-food", icon: Utensils, color: "text-brand-gold" },
                { label: "Latin Kitchen", to: "/latin-kitchen", icon: ChefHat, color: "text-brand-green" },
                { label: "Catering Agent", to: "/catering", icon: Users, color: "text-brand-copper" },
                { label: "Earnings", to: "/earnings", icon: DollarSign, color: "text-brand-green" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="senior-tap flex items-center gap-2 p-3 rounded-lg border border-border/50 hover:border-brand-gold/30 transition-colors"
                  >
                    <Icon className={`h-4 w-4 ${action.color}`} />
                    <span className="text-sm">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NannyDashboard;

