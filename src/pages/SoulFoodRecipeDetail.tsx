import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { soulFoodRecipes } from "@/data/soul-food-recipes";
import { Clock, Users, Star, Leaf, ArrowLeft, ChefHat } from "lucide-react";

const SoulFoodRecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = soulFoodRecipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Recipe Not Found</h1>
          <Link to="/soul-food" className="text-sm text-brand-gold hover:underline">← Back to Soul Food Kitchen</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex h-14 items-center justify-between px-4">
          <Link to="/soul-food" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Soul Food Kitchen</span>
          </Link>
        </div>
      </header>

      {/* Hero image */}
      <div className="relative aspect-[21/9] max-h-[360px] overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-4xl px-4 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Title area */}
          <div className="flex flex-wrap items-start gap-2 mb-2">
            {recipe.isPlantBased ? (
              <span className="inline-flex items-center gap-1 bg-brand-green/20 text-brand-green text-xs px-2 py-0.5 rounded">
                <Leaf className="h-3 w-3" /> Plant-Based
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-brand-gold/20 text-brand-gold text-xs px-2 py-0.5 rounded">
                Nanny's Sacred Exception
              </span>
            )}
            <span className="text-xs text-muted-foreground">{recipe.category}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold">{recipe.title}</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">{recipe.description}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime} prep + {recipe.cookTime} cook</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
              <span>{recipe.rating}</span>
            </div>
            {recipe.chef && (
              <div className="flex items-center gap-1.5">
                <ChefHat className="h-4 w-4" />
                <span>{recipe.chef}</span>
              </div>
            )}
          </div>

          {/* Story */}
          {recipe.story && (
            <div className="mt-8 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
              <p className="font-serif italic text-sm text-brand-cream/70 leading-relaxed">{recipe.story}</p>
            </div>
          )}

          {/* Two-column layout */}
          <div className="mt-10 grid md:grid-cols-[1fr_1.5fr] gap-10">
            {/* Ingredients */}
            <div>
              <h2 className="font-serif text-lg font-semibold mb-4 text-brand-gold">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className={`flex justify-between text-sm py-1.5 border-b border-border/30 ${
                      ing.isSubstitution ? "text-brand-green" : ""
                    }`}
                  >
                    <span>{ing.item}</span>
                    <span className="text-muted-foreground whitespace-nowrap ml-2">
                      {ing.amount} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
              {recipe.substitutionNotes && (
                <p className="mt-4 text-xs text-brand-green/70 leading-relaxed">
                  <span className="font-medium">Substitution note:</span> {recipe.substitutionNotes}
                </p>
              )}
              {recipe.allergens.length > 0 && (
                <p className="mt-3 text-xs text-muted-foreground">
                  <span className="font-medium">Allergens:</span> {recipe.allergens.join(", ")}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <h2 className="font-serif text-lg font-semibold mb-4 text-brand-gold">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded bg-brand-gold/10 text-brand-gold text-xs font-mono flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Nutrition */}
          {recipe.nutritionInfo && (
            <div className="mt-10 p-4 rounded-lg border border-border/50">
              <h3 className="font-serif text-sm font-medium mb-3">Nutrition per Serving</h3>
              <div className="grid grid-cols-5 gap-4 text-center">
                {[
                  { label: "Calories", value: recipe.nutritionInfo.calories, unit: "kcal" },
                  { label: "Protein", value: recipe.nutritionInfo.protein, unit: "g" },
                  { label: "Carbs", value: recipe.nutritionInfo.carbs, unit: "g" },
                  { label: "Fat", value: recipe.nutritionInfo.fat, unit: "g" },
                  { label: "Fiber", value: recipe.nutritionInfo.fiber, unit: "g" },
                ].map((n) => (
                  <div key={n.label}>
                    <p className="text-lg font-semibold text-brand-gold">{n.value}<span className="text-xs text-muted-foreground">{n.unit}</span></p>
                    <p className="text-xs text-muted-foreground">{n.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-1.5 pb-16">
            {recipe.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SoulFoodRecipeDetail;
