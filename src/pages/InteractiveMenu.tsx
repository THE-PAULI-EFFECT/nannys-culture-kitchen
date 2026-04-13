import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { soulFoodRecipes } from "@/data/soul-food-recipes";
import { latinRecipes } from "@/data/latin-recipes";
import { ArrowLeft, Download, QrCode, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

type MenuType = "soul-food" | "latin" | "combined";

const InteractiveMenu = () => {
  const [menuType, setMenuType] = useState<MenuType>("combined");
  const [showQR, setShowQR] = useState(false);

  const soulFood = soulFoodRecipes;
  const latin = latinRecipes;

  const menuUrl = typeof window !== "undefined"
    ? `${window.location.origin}/${menuType === "combined" ? "" : menuType === "soul-food" ? "soul-food" : "latin-kitchen"}`
    : "";

  const groupedSoulFood = soulFood.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {} as Record<string, typeof soulFood>);

  const groupedLatin = latin.reduce((acc, r) => {
    const key = r.state || "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {} as Record<string, typeof latin>);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-5xl flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <span className="font-heading text-lg font-semibold text-gradient-gold">Interactive Menu</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowQR(!showQR)} className="text-muted-foreground">
              <QrCode className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => window.print()} className="text-muted-foreground">
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Menu Type Selector */}
        <div className="flex items-center gap-2 mb-6">
          {(["combined", "soul-food", "latin"] as MenuType[]).map((type) => (
            <button
              key={type}
              onClick={() => setMenuType(type)}
              className={`text-xs px-3 py-1.5 rounded font-mono transition-colors ${
                menuType === type
                  ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type === "combined" ? "Full Menu" : type === "soul-food" ? "Soul Food" : "Latin Kitchen"}
            </button>
          ))}
        </div>

        {/* QR Code Panel */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 rounded-lg border border-border/50 bg-card text-center"
          >
            <p className="text-xs text-muted-foreground mb-4 font-mono">Scan to view this menu on your phone</p>
            <div className="inline-block p-4 bg-white rounded-lg">
              <QRCodeSVG value={menuUrl} size={180} level="M" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground break-all">{menuUrl}</p>
            <div className="flex justify-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                <Download className="h-3 w-3" /> Save QR
              </Button>
              <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => navigator.clipboard?.writeText(menuUrl)}>
                <Share2 className="h-3 w-3" /> Copy Link
              </Button>
            </div>
          </motion.div>
        )}

        {/* Menu Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 print:mb-6"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gold/50 font-mono mb-2">Est. Washington, Louisiana</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gradient-gold">Nanny's Culture Kitchen</h1>
          <p className="text-sm text-muted-foreground mt-2">100% Plant-Based Soul Food & Latin Cuisine</p>
          <p className="text-xs text-muted-foreground mt-1 italic">One Sacred Exception: Nanny's Southern Fried Chicken</p>
        </motion.div>

        {/* Soul Food Section */}
        {(menuType === "combined" || menuType === "soul-food") && (
          <section className="mb-12">
            <h2 className="font-heading text-xl font-semibold text-brand-gold mb-6 border-b border-brand-gold/20 pb-2">
              Soul Food Kitchen
            </h2>
            {Object.entries(groupedSoulFood).map(([category, recipes]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">{category}</h3>
                <div className="space-y-2">
                  {recipes.map((r) => (
                    <Link
                      key={r.id}
                      to={`/soul-food/${r.id}`}
                      className="flex items-baseline justify-between group py-1.5 hover:bg-card/50 rounded px-2 -mx-2 transition-colors"
                    >
                      <div className="flex items-baseline gap-2 min-w-0">
                        <span className="text-sm font-medium group-hover:text-brand-gold transition-colors">{r.title}</span>
                        {!r.isPlantBased && (
                          <span className="text-[10px] text-brand-gold/60 flex-shrink-0">★ Nanny's Exception</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2 border-b border-dotted border-border/50 flex-1 mx-2 min-w-[20px] max-w-[200px]" />
                      <span className="text-xs text-muted-foreground flex-shrink-0">{r.prepTime + r.cookTime} min</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Latin Kitchen Section */}
        {(menuType === "combined" || menuType === "latin") && (
          <section className="mb-12">
            <h2 className="font-heading text-xl font-semibold text-brand-green mb-6 border-b border-brand-green/20 pb-2">
              Latin Kitchen
            </h2>
            {Object.entries(groupedLatin).map(([state, recipes]) => (
              <div key={state} className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">{state}</h3>
                <div className="space-y-2">
                  {recipes.map((r) => (
                    <Link
                      key={r.id}
                      to={`/latin-kitchen/${r.id}`}
                      className="flex items-baseline justify-between group py-1.5 hover:bg-card/50 rounded px-2 -mx-2 transition-colors"
                    >
                      <span className="text-sm font-medium group-hover:text-brand-green transition-colors">{r.title}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2 border-b border-dotted border-border/50 flex-1 mx-2 min-w-[20px] max-w-[200px]" />
                      <span className="text-xs text-muted-foreground flex-shrink-0">{r.prepTime + r.cookTime} min</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Footer */}
        <div className="text-center py-8 border-t border-border/50 print:border-t-0">
          <p className="font-heading text-sm italic text-muted-foreground">
            "Food is how we take care of people. Every plate tells a story, every recipe carries a memory."
          </p>
          <p className="text-xs text-muted-foreground mt-1">— Nanny's Culture Kitchen</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMenu;

