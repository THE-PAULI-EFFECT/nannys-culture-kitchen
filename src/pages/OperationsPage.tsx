import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const OperationsPage = () => {
  const states = [
    { state: "Louisiana", status: "Active", licenseType: "Ghost Kitchen", expires: "Dec 1, 2026", certified: true },
    { state: "Texas", status: "Active", licenseType: "Cottage Food", expires: "Mar 15, 2027", certified: true },
    { state: "Mississippi", status: "Active", licenseType: "Ghost Kitchen", expires: "Feb 28, 2027", certified: true },
    { state: "Georgia", status: "Pending", licenseType: "Ghost Kitchen", expires: "—", certified: false },
    { state: "California", status: "Active", licenseType: "Home Kitchen Op.", expires: "Jan 10, 2027", certified: true },
    { state: "Florida", status: "Pending", licenseType: "Catering License", expires: "—", certified: false },
    { state: "Alabama", status: "Active", licenseType: "Ghost Kitchen", expires: "Nov 20, 2026", certified: true },
    { state: "Tennessee", status: "Active", licenseType: "Catering License", expires: "Apr 30, 2027", certified: true },
  ];

  const activeCount = states.filter((s) => s.status === "Active").length;
  const pendingCount = states.filter((s) => s.status === "Pending").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <span className="font-heading text-lg font-semibold text-gradient-gold">Operations & Licenses</span>
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
          <p className="text-xs tracking-[0.2em] uppercase text-brand-gold/50 font-mono">Compliance & Licensing</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mt-1">State Operations</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage ghost kitchen licenses and catering certifications across all operating states.</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 rounded-lg border border-border/50 bg-card"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-brand-green" />
              <span className="text-xs text-muted-foreground">Active Licenses</span>
            </div>
            <p className="text-3xl font-semibold text-brand-green">{activeCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            className="p-4 rounded-lg border border-border/50 bg-card"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-brand-gold" />
              <span className="text-xs text-muted-foreground">Pending Applications</span>
            </div>
            <p className="text-3xl font-semibold text-brand-gold">{pendingCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.4 }}
            className="p-4 rounded-lg border border-border/50 bg-card"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-brand-copper" />
              <span className="text-xs text-muted-foreground">Total States</span>
            </div>
            <p className="text-3xl font-semibold text-brand-copper">{states.length}</p>
          </motion.div>
        </div>

        {/* State Licenses */}
        <div>
          <h2 className="font-heading text-lg font-semibold mb-4 text-brand-gold">License Status by State</h2>
          <div className="space-y-2">
            {states.map((s, i) => (
              <motion.div
                key={s.state}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="p-4 rounded-lg border border-border/50 bg-card flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{s.state}</p>
                    <p className="text-xs text-muted-foreground">{s.licenseType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      s.status === "Active"
                        ? "bg-brand-green/10 text-brand-green"
                        : "bg-brand-gold/10 text-brand-gold"
                    }`}
                  >
                    {s.status}
                  </span>

                  {s.status === "Active" ? (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">Expires: {s.expires}</span>
                  ) : (
                    <Button size="sm" variant="outline" className="text-xs">
                      Apply Now
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Renewal Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="p-6 rounded-lg border border-brand-gold/30 bg-brand-gold/5"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-semibold mb-2">Upcoming Renewals</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Alabama license expires Nov 20, 2026 (226 days)</li>
                <li>• Louisiana license expires Dec 1, 2026 (237 days)</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3">Set reminders 60 days before expiration for smooth renewals.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OperationsPage;
