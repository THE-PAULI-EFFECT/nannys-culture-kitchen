
import { Button } from "@/components/ui/button";
import { 
  Clock, Heart, ShoppingBag, Timer, Bookmark, Share2,
  Printer, ChevronLeft, Star 
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

// Sample recipe data
const RECIPE = {
  id: "1",
  title: "Homemade Margherita Pizza",
  description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
  image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  category: "Main Dishes",
  prepTime: 20,
  cookTime: 25,
  servings: 4,
  isFavorite: false,
  rating: 4.8,
  ingredients: [
    "2 1/4 teaspoons active dry yeast",
    "1 teaspoon sugar",
    "1 1/3 cups warm water",
    "3 1/2 cups all-purpose flour",
    "2 tablespoons olive oil",
    "1 1/2 teaspoons salt",
    "1 (14 ounce) can crushed tomatoes",
    "2 cloves garlic, minced",
    "1 tablespoon dried basil",
    "8 ounces fresh mozzarella cheese, sliced",
    "Fresh basil leaves",
    "Salt and pepper to taste"
  ],
  instructions: [
    "In a small bowl, dissolve yeast and sugar in warm water. Let stand until creamy, about 10 minutes.",
    "In a large bowl, combine flour and salt. Add oil and the yeast mixture. Beat until a stiff dough forms. If dough is too dry, add more water, 1 tablespoon at a time.",
    "Turn dough out onto a lightly floured surface. Knead until smooth and elastic, about 5 minutes. Place in a well-oiled bowl, cover with a damp cloth, and set aside to rise until doubled in volume, about 40 minutes.",
    "Preheat oven to 450°F (230°C). Punch down dough and turn it out onto a lightly floured surface. Form into two tight balls and allow to rise for another 10 minutes.",
    "Roll or stretch each ball into a 12-inch circle, keeping the thickness as even as possible. Place on greased baking sheets.",
    "In a bowl, mix crushed tomatoes, garlic, and dried basil. Spread sauce over pizza dough, leaving a 1/2-inch border. Arrange mozzarella slices on top.",
    "Bake until crust is golden brown and cheese is bubbly, about 15-20 minutes. Remove from oven, top with fresh basil leaves, and season with salt and pepper. Slice and serve hot."
  ]
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(RECIPE.isFavorite);
  const [servings, setServings] = useState(RECIPE.servings);
  
  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/recipes">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Badge className="bg-recipe-orange text-white">{RECIPE.category}</Badge>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif">{RECIPE.title}</h1>
          <p className="text-muted-foreground">{RECIPE.description}</p>
          
          <div className="flex flex-wrap gap-4 items-center text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Prep: {RECIPE.prepTime} min</span>
            </div>
            <div className="flex items-center">
              <Timer className="h-4 w-4 mr-1" />
              <span>Cook: {RECIPE.cookTime} min</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-recipe-amber fill-recipe-amber mr-1" />
              <span>{RECIPE.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={RECIPE.image}
            alt={RECIPE.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-recipe-red text-recipe-red' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                >
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add to shopping list</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save to meal plan</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share recipe</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                >
                  <Printer className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print recipe</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Separator />
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Ingredients</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  disabled={servings <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{servings}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setServings(servings + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <ul className="space-y-2">
              {RECIPE.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-6 w-6 flex-none bg-recipe-orange/10 rounded-full flex items-center justify-center">
                    <span className="text-recipe-orange text-sm">•</span>
                  </div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {RECIPE.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-6 w-6 flex-none bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground text-sm">{index + 1}</span>
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecipeDetail;
