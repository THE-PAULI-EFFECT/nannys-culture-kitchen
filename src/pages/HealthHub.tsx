import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Activity, TrendingUp, Calendar, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HealthHub = () => {
  const healthData = [
    { label: "Blood Pressure", value: "120/78 mmHg", status: "normal", target: "< 120/80", icon: Heart },
    { label: "Blood Sugar (Fasting)", value: "95 mg/dL", status: "normal", target: "70-100", icon: Activity },
    { label: "Weight", value: "165 lbs", status: "stable", change: "-2 lbs (4 weeks)", icon: TrendingUp },
    { label: "BMI", value: "24.8", status: "normal", target: "18.5-24.9", icon: Activity },
    { label: "Cholesterol", value: "180 mg/dL", status: "normal", target: "< 200", icon: Heart },
    { label: "Last Checkup", value: "June 1, 2026", status: "ok", next: "Sept 1, 2026", icon: Calendar },
  ];

  const trends = [
    { metric: "Daily Steps", current: "6,240", goal: "8,000", progress: 78 },
    { metric: "Water Intake", current: "56 oz", goal: "64 oz", progress: 87 },
    { metric: "Sleep Quality", current: "7.2 hrs", goal: "7.5 hrs", progress: 96 },
    { metric: "Meals Logged", current: "2 of 3", goal: "3 of 3", progress: 67 },
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
          <span className="font-heading text-lg font-semibold text-gradient-gold">Health Hub</span>
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
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold/50 font-mono">Senior Health Tracking</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">Your Health Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Track key metrics and wellness goals. All data is private and stored locally.</p>
        </motion.div>

        {/* Key Metrics */}
        <div>
          <h2 className="font-heading text-lg font-semibold mb-4 text-brand-gold">Key Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthData.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="p-4 rounded-lg border border-border/50 bg-card"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="h-5 w-5 text-brand-gold" />
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        metric.status === "normal"
                          ? "bg-brand-green/10 text-brand-green"
                          : "bg-brand-gold/10 text-brand-gold"
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-2xl font-semibold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {metric.target || metric.change || metric.next}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Daily Trends */}
        <div>
          <h2 className="font-heading text-lg font-semibold mb-4 text-brand-gold">Daily Wellness</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {trends.map((trend, i) => (
              <motion.div
                key={trend.metric}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="p-4 rounded-lg border border-border/50 bg-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">{trend.metric}</p>
                  <span className="text-xs text-muted-foreground">{trend.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-brand-gold to-brand-green rounded-full"
                    style={{ width: `${trend.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{trend.current}</span>
                  <span>Goal: {trend.goal}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="p-6 rounded-lg border border-border/50 bg-card"
        >
          <h3 className="font-heading text-lg font-semibold mb-4">Export & Share</h3>
          <div className="flex gap-3">
            <Button className="gap-2 bg-brand-gold/20 text-brand-gold hover:bg-brand-gold/30 border border-brand-gold/30">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share with Doctor
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Share your health data securely with healthcare providers. Data never leaves your device unless you explicitly share.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthHub;
