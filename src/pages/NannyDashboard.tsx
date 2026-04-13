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
  Leaf,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const stats = [
  { label: "Catering Orders (YTD)", value: "1,247", icon: Utensils, color: "text-brand-gold", detail: "↑ 23% vs last year" },
  { label: "Revenue (YTD)", value: "$189,430", icon: DollarSign, color: "text-brand-green", detail: "Avg $152/order" },
  { label: "Repeat Clients", value: "78%", icon: Users, color: "text-brand-copper", detail: "312 returning families" },
  { label: "Customer Rating", value: "4.9", icon: Star, color: "text-brand-gold", detail: "Based on 847 reviews" },
];

const healthMetrics = [
  { label: "Blood Pressure", value: "120/78 mmHg", status: "normal", icon: Heart },
  { label: "Blood Sugar (Fasting)", value: "95 mg/dL", status: "normal", icon: Activity },
  { label: "Weight", value: "165 lbs", status: "stable", icon: TrendingUp },
  { label: "Last Checkup", value: "June 1, 2026", status: "ok", icon: Clock },
  { label: "Daily Steps", value: "6,240 avg", status: "normal", icon: Activity },
  { label: "Meals Logged Today", value: "2 of 3", status: "ok", icon: Leaf },
];

const recentOrders = [
  { id: 1, customer: "Johnson Family Reunion", items: "Soul Food Package — Gumbo, Fried Chicken, Mac & Cheese, Cornbread, Sweet Potato Pie (80 guests)", total: "$3,200", date: "Today" },
  { id: 2, customer: "TechCorp Q2 All-Hands", items: "Latin Kitchen Buffet — Birria Tacos, Mole Negro, Elote, Tres Leches (50 guests)", total: "$2,750", date: "Yesterday" },
  { id: 3, customer: "Williams Wedding Reception", items: "Dual Kitchen — Soul Food + Latin, Full Service w/ Staff (150 guests)", total: "$9,750", date: "Jun 8" },
  { id: 4, customer: "Greater Faith Baptist Potluck", items: "Southern Comfort — Collard Greens, Red Beans & Rice, Jambalaya, Peach Cobbler (60 guests)", total: "$1,800", date: "Jun 5" },
  { id: 5, customer: "Baton Rouge Juneteenth Festival", items: "Soul Food Station — Gumbo, Cornbread, Fried Okra, Sweet Tea (200 guests)", total: "$6,400", date: "Jun 19" },
  { id: 6, customer: "Hernandez Quinceañera", items: "Latin Kitchen Deluxe — Tamales, Pozole, Churros, Hibiscus Agua Fresca (120 guests)", total: "$5,280", date: "Jun 22" },
];

const complianceStates = [
  { state: "Louisiana (Home Base)", status: "Active", expires: "Dec 2026" },
  { state: "Texas", status: "Active", expires: "Mar 2027" },
  { state: "Mississippi", status: "Active", expires: "Feb 2027" },
  { state: "Georgia", status: "Pending", expires: "—" },
  { state: "California", status: "Active", expires: "Jan 2027" },
  { state: "Florida", status: "Pending", expires: "—" },
  { state: "Alabama", status: "Active", expires: "Nov 2026" },
  { state: "Tennessee", status: "Active", expires: "Apr 2027" },
];

const upcomingEvents = [
  { date: "Jun 19", event: "Juneteenth Festival", location: "Baton Rouge, LA", guests: 200 },
  { date: "Jun 22", event: "Hernandez Quinceañera", location: "Houston, TX", guests: 120 },
  { date: "Jul 4", event: "Independence Day BBQ", location: "Washington, LA", guests: 300 },
  { date: "Jul 12", event: "Corporate Retreat Lunch", location: "Austin, TX", guests: 45 },
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
                <p className="text-[10px] text-muted-foreground mt-1">{stat.detail}</p>
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
              <Link to="/dashboard" className="text-xs text-brand-gold hover:underline">Health Hub</Link>
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
              <Link to="/catering" className="text-xs text-brand-gold hover:underline">View all orders →</Link>
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
            <Link to="/catering" className="block mt-3 text-xs text-brand-gold hover:underline">
              Get a new state license →
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
                { label: "Interactive Menu", to: "/menu", icon: Leaf, color: "text-brand-green" },
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

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="rounded-lg border border-border/50 bg-card p-5"
        >
          <h2 className="font-heading text-base font-semibold flex items-center gap-2 mb-4">
            <CalendarDays className="h-4 w-4 text-brand-copper" />
            Upcoming Events
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingEvents.map((evt) => (
              <div key={evt.event} className="p-3 rounded-lg border border-border/30 bg-background/50">
                <p className="text-xs font-mono text-brand-gold mb-1">{evt.date}</p>
                <p className="text-sm font-medium">{evt.event}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{evt.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{evt.guests}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Business Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="rounded-lg border border-border/50 bg-card p-5"
        >
          <h2 className="font-heading text-base font-semibold mb-3">Business Info</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Home Base</p>
              <p className="flex items-center gap-1"><MapPin className="h-3 w-3 text-brand-gold" /> Washington, Louisiana</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Contact</p>
              <p className="flex items-center gap-1"><Phone className="h-3 w-3 text-brand-gold" /> (337) 555-COOK</p>
              <p className="flex items-center gap-1 mt-1"><Mail className="h-3 w-3 text-brand-gold" /> nanny@culturekitchen.com</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Kitchen Philosophy</p>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "100% plant-based, with one sacred exception — Nanny's Southern Fried Chicken."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NannyDashboard;

