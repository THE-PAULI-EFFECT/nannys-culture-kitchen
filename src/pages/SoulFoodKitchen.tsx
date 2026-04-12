import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { soulFoodRecipes, SOUL_FOOD_CATEGORIES, type Recipe } from "@/data/soul-food-recipes";
import { Clock, Star, Leaf, ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SoulFoodKitchen = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    let recipes = soulFoodRecipes;
    if (activeCategory !== "all") {
      recipes = recipes.filter((r) => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return recipes;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <span className="font-serif text-lg font-semibold text-gradient-gold">Soul Food Kitchen</span>
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
            <p className="text-xs tracking-[0.25em] uppercase text-brand-gold/50 font-mono mb-3">
              Washington, Louisiana Roots
            </p>
            <h1 className="font-serif text-3xl md:text-5xl font-bold">
              <span className="text-gradient-gold">Soul Food</span> Kitchen
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
              Plant-based soul food inspired by our Southern heritage. Every dish tells a story,
              every flavor carries a memory. One exception: Nanny's Fried Chicken stays.
            </p>
          </motion.div>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes..."
              className="pl-9 bg-card border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-b border-border/50 sticky top-14 z-30 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveCategory("all")}
              className={`text-xs px-3 py-1.5 rounded transition-colors font-mono ${
                activeCategory === "all"
                  ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({soulFoodRecipes.length})
            </button>
            {SOUL_FOOD_CATEGORIES.map((cat) => {
              const count = soulFoodRecipes.filter((r) => r.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors font-mono whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-brand-gold/10 text-brand-gold border border-brand-gold/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No recipes found. Try a different search or category.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to={`/soul-food/${recipe.id}`}
        className="group block rounded-lg border border-border/50 bg-card overflow-hidden transition-all duration-200 hover:border-brand-gold/30"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {recipe.isPlantBased ? (
              <span className="inline-flex items-center gap-1 bg-brand-green/90 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                <Leaf className="h-3 w-3" /> Plant-Based
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-brand-gold/90 text-black text-[10px] px-2 py-0.5 rounded font-medium">
                Nanny's Exception
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

export default SoulFoodKitchen;
