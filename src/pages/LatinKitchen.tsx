import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { latinRecipes, MEXICAN_STATES } from "@/data/latin-recipes";
import type { Recipe } from "@/data/soul-food-recipes";
import { Clock, Star, Leaf, ArrowLeft, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const LatinKitchen = () => {
  const [activeState, setActiveState] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    let recipes = latinRecipes;
    if (activeState !== "all") {
      const stateObj = MEXICAN_STATES.find((s) => s.id === activeState);
      if (stateObj) recipes = recipes.filter((r) => r.state === stateObj.name);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          (r.state && r.state.toLowerCase().includes(q))
      );
    }
    return recipes;
  }, [activeState, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <span className="font-serif text-lg font-semibold text-gradient-green">Latin Kitchen</span>
          <div className="w-16" />
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-brand-green/50 font-mono mb-3">
              State by State — México
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold">
              <span className="text-gradient-green">Latin</span> Kitchen
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              Authentic plant-based Mexican cuisine, organized by state. Each region has
              its own soul, its own ingredients, its own story.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes or states..."
              className="pl-9 bg-card border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* State Selector — Interactive Map-like Grid */}
      <section className="border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono mb-4">Select a State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            <button
              onClick={() => setActiveState("all")}
              className={`text-xs px-3 py-2 rounded border transition-colors ${
                activeState === "all"
                  ? "bg-brand-green/10 text-brand-green border-brand-green/30"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              All States
            </button>
            {MEXICAN_STATES.map((state) => (
              <button
                key={state.id}
                onClick={() => setActiveState(state.id)}
                className={`text-xs px-3 py-2 rounded border transition-colors text-left ${
                  activeState === state.id
                    ? "bg-brand-green/10 text-brand-green border-brand-green/30"
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <span className="block font-medium">{state.name}</span>
                <span className="block text-[10px] opacity-60">{state.signature}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active State Info */}
      {activeState !== "all" && (
        <div className="border-b border-border/50 bg-brand-green/5">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
            <MapPin className="h-4 w-4 text-brand-green" />
            {(() => {
              const state = MEXICAN_STATES.find((s) => s.id === activeState);
              if (!state) return null;
              return (
                <div>
                  <span className="font-serif text-sm font-medium">{state.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">— {state.nickname}</span>
                  <span className="text-xs text-brand-green/70 ml-2">Signature: {state.signature}</span>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Recipe Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={activeState}
          transition={{ duration: 0.3 }}
        >
          {filteredRecipes.map((recipe, i) => (
            <LatinRecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No recipes found. Try a different search or state.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

function LatinRecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to={`/latin-kitchen/${recipe.id}`}
        className="group block rounded-lg border border-border/50 bg-card overflow-hidden transition-all duration-200 hover:border-brand-green/30"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="inline-flex items-center gap-1 bg-brand-green/90 text-white text-[10px] px-2 py-0.5 rounded font-medium">
              <Leaf className="h-3 w-3" /> Plant-Based
            </span>
            {recipe.state && (
              <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                {recipe.state}
              </span>
            )}
          </div>
          {recipe.isFavorite && (
            <div className="absolute top-3 right-3">
              <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <p className="text-white font-serif text-lg font-semibold leading-tight drop-shadow-lg">
              {recipe.title}
            </p>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <span className="capitalize">{recipe.difficulty}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
              <span>{recipe.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default LatinKitchen;
