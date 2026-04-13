
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CinematicIntro from "@/components/intro/CinematicIntro";
import ChefSelector from "@/components/intro/ChefSelector";
import VideoHero from "@/components/VideoHero";
import { MeshGradientHero, KineticMarquee, CurtainReveal } from "@/components/cinematic";
import { MessageSquare, Heart, MapPin, Leaf, ChefHat, ShoppingBag, FileText } from "lucide-react";
import { initMotion, revealOnScroll } from "@/lib/motion";

const FEATURES = [
  {
    icon: Leaf,
    title: "100% Plant-Based",
    description: "Every recipe crafted for flavor and health — with one sacred exception.",
  },
  {
    icon: MapPin,
    title: "State by State",
    description: "Explore authentic Mexican cuisine organized by each state's culinary tradition.",
  },
  {
    icon: MessageSquare,
    title: "AI Catering Agent",
    description: "AI-powered concierge. Plan events, get quotes, and coordinate menus.",
  },
  {
    icon: Heart,
    title: "Nanny's Dashboard",
    description: "Senior-friendly health monitoring, meal tracking, and family connection.",
  },
];

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    if (introComplete) {
      initMotion();
      revealOnScroll("[data-reveal]");
    }
  }, [introComplete]);

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      <div className="min-h-screen bg-background">
        {/* Nav Bar */}
        <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-heading text-lg font-semibold text-gradient-gold">Nanny's</span>
              <span className="text-xs text-muted-foreground tracking-wider uppercase hidden sm:inline">Culture Kitchen</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/soul-food" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Soul Food</Link>
              <Link to="/latin-kitchen" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Latin Kitchen</Link>
              <Link to="/catering" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Catering</Link>
              <Link to="/store" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <ShoppingBag className="h-3 w-3" />Store
              </Link>
              <Link to="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <FileText className="h-3 w-3" />Grants
              </Link>
              <Link to="/chef-dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <ChefHat className="h-3 w-3" />Chef
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <VideoHero
          headline="Nanny's Culture Kitchen"
          subtitle="Soul food and Latin flavors, reimagined plant-based. Honoring tradition with every dish — and one sacred exception."
        />

        {/* Chef Selector */}
        <section className="border-t border-border/50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ChefSelector />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border/50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="space-y-2">
                    <Icon className="h-5 w-5 text-brand-gold/70" />
                    <h3 className="font-heading text-base font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Marquee */}
        <section className="border-t border-border/50 py-4 overflow-hidden">
          <KineticMarquee
            items={[
              "Gumbo", "Birria Tacos", "Mac & Cheese", "Mole Negro", "Cornbread",
              "Tamales", "Collard Greens", "Tres Leches", "Sweet Potato Pie", "Pozole",
              "Jambalaya", "Elote", "Red Beans & Rice", "Churros", "Peach Cobbler",
            ]}
            speed={30}
            separator="✦"
          />
        </section>

        {/* Nanny's Story */}
        <section className="border-t border-border/50">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <CurtainReveal>
              <p className="text-xs tracking-[0.25em] uppercase text-brand-copper/50 font-mono mb-4">
                The Story
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold leading-snug">
                This kitchen is named for my mother — <span className="text-gradient-gold">Nanny</span>.
              </h2>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                She's from Washington, Louisiana — a small town where everyone cooks, where gumbo
                simmers all day, and where fried chicken is a love language. Everything here is
                plant-based because we care about health. But Nanny's Southern Fried Chicken stays on
                the menu. Because Nanny wouldn't have it any other way.
              </p>
              <Link
                to="/soul-food"
                className="inline-block mt-8 text-sm font-mono text-brand-gold/60 hover:text-brand-gold transition-colors tracking-wider"
              >
                Enter the Kitchen →
              </Link>
            </CurtainReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Nanny's Culture Kitchen. Made with love from Washington, Louisiana.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link to="/catering" className="hover:text-foreground transition-colors">Catering</Link>
              <Link to="/store" className="hover:text-foreground transition-colors">Store</Link>
              <Link to="/resources" className="hover:text-foreground transition-colors">Grants</Link>
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;


