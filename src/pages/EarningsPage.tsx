import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningsPage = () => {
  const earningsData = [
    { month: "June 2026", total: "$18,420", orders: 12, avgPerOrder: "$1,535" },
    { month: "May 2026", total: "$15,680", orders: 10, avgPerOrder: "$1,568" },
    { month: "April 2026", total: "$22,150", orders: 15, avgPerOrder: "$1,477" },
    { month: "March 2026", total: "$12,890", orders: 8, avgPerOrder: "$1,611" },
  ];

  const ytdStats = [
    { label: "YTD Revenue", value: "$89,430", icon: DollarSign, color: "text-brand-gold" },
    { label: "Average Order Value", value: "$1,545", icon: TrendingUp, color: "text-brand-green" },
    { label: "Total Orders", value: "58", icon: Calendar, color: "text-brand-copper" },
    { label: "Repeat Clients", value: "45 (78%)", icon: TrendingUp, color: "text-brand-purple" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <span className="font-heading text-lg font-semibold text-gradient-gold">Earnings & Analytics</span>
          <div className="w-32" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold/50 font-mono">Business Analytics</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Earnings Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Track revenue, orders, and business metrics for Nanny's Culture Kitchen.</p>
        </motion.div>

        {/* YTD Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ytdStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-4 rounded-lg border border-border/50 bg-card"
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

        {/* Monthly Breakdown */}
        <div>
          <h2 className="font-heading text-lg font-semibold mb-4 text-brand-gold">Monthly Breakdown</h2>
          <div className="space-y-3">
            {earningsData.map((month, i) => (
              <motion.div
                key={month.month}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-4 rounded-lg border border-border/50 bg-card flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium">{month.month}</p>
                  <p className="text-xs text-muted-foreground">{month.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-brand-gold">{month.total}</p>
                  <p className="text-xs text-muted-foreground">Avg: {month.avgPerOrder}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Export */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="p-6 rounded-lg border border-border/50 bg-card"
        >
          <h3 className="font-heading text-lg font-semibold mb-4">Financial Reports</h3>
          <div className="flex gap-3">
            <Button className="gap-2 bg-brand-gold/20 text-brand-gold hover:bg-brand-gold/30 border border-brand-gold/30">
              <Download className="h-4 w-4" />
              Download P&L Statement
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export to Spreadsheet
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EarningsPage;
