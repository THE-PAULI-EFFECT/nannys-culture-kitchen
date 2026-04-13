import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  ExternalLink,
  Star,
  Package,
  Gift,
} from "lucide-react";
import { PRODUCTS, AFFILIATES, type Product } from "@/lib/stripe-client";

const CATEGORY_ICONS: Record<Product["category"], typeof ShoppingBag> = {
  merch: ShoppingBag,
  pantry: Package,
  gift: Gift,
};

const StorePage = () => {
  const [cart, setCart] = useState<Map<string, number>>(new Map());
  const [filter, setFilter] = useState<Product["category"] | "all">("all");

  const filteredProducts = PRODUCTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const next = new Map(prev);
      next.set(productId, (next.get(productId) || 0) + 1);
      return next;
    });
  };

  const cartTotal = Array.from(cart.entries()).reduce((sum, [id, qty]) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + (product?.price || 0) * qty;
    }, 0);

  const cartCount = Array.from(cart.values()).reduce((a, b) => a + b, 0);

  const handleCheckout = async () => {
    // In production, this would call your backend to create a Stripe Checkout Session.
    // For now, show what would be purchased.
    const items = Array.from(cart.entries())
      .map(([id, qty]) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return p ? `${qty}x ${p.name}` : null;
      })
      .filter(Boolean);
    alert(
      `Checkout coming soon!\n\nYour cart:\n${items.join("\n")}\n\nTotal: $${(cartTotal / 100).toFixed(2)}\n\nStripe checkout will be enabled once VITE_STRIPE_PUBLIC_KEY is configured.`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="text-center">
            <span className="font-heading text-lg font-semibold text-gradient-gold">Store</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cartCount === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-medium transition-colors hover:bg-brand-gold/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CreditCard className="h-3.5 w-3.5" />
            Cart ({cartCount}) — ${(cartTotal / 100).toFixed(2)}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8">
          {(["all", "merch", "pantry", "gift"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                filter === cat
                  ? "bg-brand-gold/10 text-brand-gold border-brand-gold/30"
                  : "bg-card border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProducts.map((product, i) => {
            const Icon = CATEGORY_ICONS[product.category];
            const qty = cart.get(product.id) || 0;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border/50 rounded-lg overflow-hidden group"
              >
                {/* Product image placeholder */}
                <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center border-b border-border/30">
                  <Icon className="h-10 w-10 text-muted-foreground/30" />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold/70 font-mono border border-brand-gold/10">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-sm font-semibold mt-1">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-base font-heading font-bold text-brand-gold">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="px-3 py-1.5 rounded-md border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-medium hover:bg-brand-gold/20 transition-colors"
                    >
                      {qty > 0 ? `In Cart (${qty})` : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Affiliate Partners */}
        <section>
          <h2 className="font-heading text-lg font-semibold mb-2">
            Partner Recommendations
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Kitchen tools and equipment we trust and use. Affiliate links support Nanny's mission.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AFFILIATES.map((aff) => (
              <a
                key={aff.name}
                href={aff.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-lg hover:border-brand-gold/30 transition-colors group"
              >
                <div>
                  <h3 className="text-sm font-medium group-hover:text-foreground transition-colors">
                    {aff.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{aff.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-gold font-mono">{aff.commission}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StorePage;
