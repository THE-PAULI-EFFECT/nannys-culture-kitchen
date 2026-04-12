
import RecipeCard, { RecipeCardProps } from "./RecipeCard";

interface RecipeGridProps {
  recipes: RecipeCardProps[];
  emptyMessage?: string;
}

const RecipeGrid = ({ recipes, emptyMessage = "No recipes found" }: RecipeGridProps) => {
  if (!recipes.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">{emptyMessage}</h3>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
