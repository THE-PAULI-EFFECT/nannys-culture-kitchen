import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Search,
  ChefHat,
  Flame,
  Timer,
  Plus,
  X,
  Play,
  Pause,
  RotateCcw,
  Bell,
  Package,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types
interface KitchenTimer {
  id: string;
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

interface OrderItem {
  id: string;
  items: string[];
  status: "pending" | "cooking" | "ready" | "served";
  time: string;
  table: string;
}

// Mock data
const MOCK_ORDERS: OrderItem[] = [
  { id: "ORD-001", items: ["Gumbo", "Cornbread"], status: "cooking", time: "2m ago", table: "T-3" },
  { id: "ORD-002", items: ["Birria Tacos x2", "Hibiscus Lemonade"], status: "pending", time: "30s ago", table: "T-7" },
  { id: "ORD-003", items: ["Mac & Cheese", "Collard Greens", "Sweet Tea"], status: "ready", time: "5m ago", table: "T-1" },
  { id: "ORD-004", items: ["Mole Negro", "Tres Leches"], status: "pending", time: "just now", table: "Delivery" },
];

const STAT_CARDS = [
  { label: "Orders Today", value: "47", icon: Package, change: "+12%", color: "text-brand-gold" },
  { label: "Active Timers", value: "3", icon: Timer, change: "", color: "text-brand-purple" },
  { label: "Guests Served", value: "182", icon: Users, change: "+8%", color: "text-brand-green" },
  { label: "Kitchen Score", value: "98%", icon: TrendingUp, change: "+2%", color: "text-brand-magenta" },
];

const STATUS_COLORS = {
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  cooking: "border-brand-copper/30 bg-brand-copper/10 text-brand-copper",
  ready: "border-brand-green/30 bg-brand-green/10 text-brand-green",
  served: "border-muted/30 bg-muted/10 text-muted-foreground",
};

const ChefDashboard = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [orders, setOrders] = useState<OrderItem[]>(MOCK_ORDERS);
  const [timers, setTimers] = useState<KitchenTimer[]>([
    { id: "t1", label: "Gumbo Simmer", totalSeconds: 1800, remainingSeconds: 1247, isRunning: true },
    { id: "t2", label: "Cornbread Bake", totalSeconds: 1200, remainingSeconds: 480, isRunning: true },
  ]);
  const [newTimerLabel, setNewTimerLabel] = useState("");
  const [newTimerMinutes, setNewTimerMinutes] = useState("");

  // Command palette shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Timer tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) =>
          t.isRunning && t.remainingSeconds > 0
            ? { ...t, remainingSeconds: t.remainingSeconds - 1 }
            : t
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTimer = useCallback(() => {
    if (!newTimerLabel || !newTimerMinutes) return;
    const seconds = parseInt(newTimerMinutes) * 60;
    if (isNaN(seconds) || seconds <= 0) return;
    setTimers((prev) => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        label: newTimerLabel,
        totalSeconds: seconds,
        remainingSeconds: seconds,
        isRunning: true,
      },
    ]);
    setNewTimerLabel("");
    setNewTimerMinutes("");
  }, [newTimerLabel, newTimerMinutes]);

  const toggleTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const resetTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false } : t
      )
    );
  };

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  };

  const updateOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const next: Record<string, string> = { pending: "cooking", cooking: "ready", ready: "served" };
        return { ...o, status: (next[o.status] || o.status) as OrderItem["status"] };
      })
    );
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center gap-2 rounded-md border border-border/50 bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-brand-purple/30 transition-colors"
            >
              <Search className="h-3 w-3" />
              <span>Commands</span>
              <kbd className="text-[10px] bg-muted/50 px-1 rounded">⌘K</kbd>
            </button>
            <div className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-brand-gold" />
              <span className="font-heading text-sm font-semibold text-gradient-gold">Chef Elite</span>
            </div>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="rounded-lg border border-border/50 bg-card p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  {stat.change && (
                    <span className="text-[10px] text-brand-green font-mono">{stat.change}</span>
                  )}
                </div>
                <p className="text-2xl font-heading font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Queue */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold flex items-center gap-2">
                <Flame className="h-4 w-4 text-brand-copper" />
                Order Queue
              </h2>
              <span className="text-xs text-muted-foreground font-mono">
                {orders.filter((o) => o.status !== "served").length} active
              </span>
            </div>

            <div className="space-y-2">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  layout
                  className={`rounded-lg border p-4 ${STATUS_COLORS[order.status]} transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium">{order.id}</span>
                      <span className="text-[10px] opacity-60">{order.table}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">{order.time}</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider">{order.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{order.items.join(", ")}</p>
                    {order.status !== "served" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateOrderStatus(order.id)}
                        className="h-7 text-xs"
                      >
                        {order.status === "pending" ? "Start" : order.status === "cooking" ? "Ready" : "Served"}
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Kitchen Timers */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-purple" />
              Kitchen Timers
            </h2>

            <div className="space-y-3">
              {timers.map((timer) => {
                const progress = 1 - timer.remainingSeconds / timer.totalSeconds;
                const isUrgent = timer.remainingSeconds < 60 && timer.isRunning;

                return (
                  <motion.div
                    key={timer.id}
                    layout
                    className={`rounded-lg border border-border/50 bg-card p-4 ${
                      isUrgent ? "animate-allergen-pulse border-red-500/50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{timer.label}</span>
                      <button onClick={() => removeTimer(timer.id)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <p className={`text-2xl font-mono font-bold ${isUrgent ? "text-red-400" : "text-foreground"}`}>
                      {formatTime(timer.remainingSeconds)}
                    </p>
                    {/* Progress bar */}
                    <div className="mt-2 h-1 rounded-full bg-muted/30 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: isUrgent
                            ? "hsl(0, 72%, 51%)"
                            : `linear-gradient(90deg, hsl(270, 65%, 45%), hsl(45, 90%, 55%))`,
                        }}
                        initial={false}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleTimer(timer.id)}
                        className="h-7 text-xs gap-1"
                      >
                        {timer.isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        {timer.isRunning ? "Pause" : "Resume"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => resetTimer(timer.id)}
                        className="h-7 text-xs gap-1"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset
                      </Button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Add timer */}
              <div className="rounded-lg border border-dashed border-border/50 p-4 space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Timer name"
                    value={newTimerLabel}
                    onChange={(e) => setNewTimerLabel(e.target.value)}
                    className="text-xs h-8 bg-card"
                  />
                  <Input
                    placeholder="Min"
                    type="number"
                    value={newTimerMinutes}
                    onChange={(e) => setNewTimerMinutes(e.target.value)}
                    className="text-xs h-8 w-16 bg-card"
                  />
                </div>
                <Button size="sm" onClick={addTimer} className="w-full h-8 text-xs gap-1 bg-brand-purple/20 text-brand-purple-light hover:bg-brand-purple/30 border border-brand-purple/30">
                  <Plus className="h-3 w-3" />
                  Add Timer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {commandOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandOpen(false)}
          >
            <motion.div
              className="bg-card border border-border/50 rounded-lg w-full max-w-lg mx-4 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">ESC</kbd>
              </div>
              <div className="p-2 max-h-72 overflow-y-auto">
                {[
                  { label: "New Order", icon: Plus, shortcut: "N" },
                  { label: "Start Timer", icon: Timer, shortcut: "T" },
                  { label: "View All Recipes", icon: ChefHat, shortcut: "R" },
                  { label: "Notifications", icon: Bell, shortcut: "⇧N" },
                ]
                  .filter((cmd) =>
                    !commandQuery || cmd.label.toLowerCase().includes(commandQuery.toLowerCase())
                  )
                  .map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.label}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => setCommandOpen(false)}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 text-left">{cmd.label}</span>
                        <kbd className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">{cmd.shortcut}</kbd>
                      </button>
                    );
                  })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChefDashboard;
