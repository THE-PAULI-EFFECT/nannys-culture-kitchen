
import MainLayout from "@/components/layout/MainLayout";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample data
const RECIPES = [
  {
    id: "1",
    title: "Homemade Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Main Dishes",
    prepTime: 45,
    isFavorite: true,
    rating: 4.8
  },
  {
    id: "2",
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy cookies with chunks of chocolate and a touch of sea salt",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Desserts",
    prepTime: 30,
    rating: 4.9
  },
  {
    id: "3",
    title: "Avocado Toast",
    description: "Sourdough toast topped with smashed avocado, poached eggs, and microgreens",
    image: "https://images.unsplash.com/photo-1603046891716-53c19687a2d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Breakfast",
    prepTime: 15,
    isFavorite: true,
    rating: 4.5
  },
  {
    id: "4",
    title: "Summer Fruit Smoothie",
    description: "Refreshing blend of seasonal berries, banana, and yogurt",
    image: "https://images.unsplash.com/photo-1553530666-ba11a90bb0ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Drinks",
    prepTime: 5,
    rating: 4.3
  },
  {
    id: "5",
    title: "Roasted Vegetable Salad",
    description: "Warm salad with roasted seasonal vegetables, feta cheese, and balsamic glaze",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Sides",
    prepTime: 35,
    rating: 4.6
  },
  {
    id: "6",
    title: "Classic Beef Stew",
    description: "Hearty beef stew with root vegetables, herbs, and red wine",
    image: "https://images.unsplash.com/photo-1608500218890-c4f9c5203517?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Main Dishes",
    prepTime: 120,
    rating: 4.7
  },
  {
    id: "7",
    title: "Banana Bread",
    description: "Moist banana bread with walnuts and cinnamon",
    image: "https://images.unsplash.com/photo-1605090944787-37595177ef71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Breakfast",
    prepTime: 65,
    isFavorite: true,
    rating: 4.8
  },
  {
    id: "8",
    title: "Vegetable Stir Fry",
    description: "Quick vegetable stir fry with tofu and teriyaki sauce",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Main Dishes",
    prepTime: 25,
    rating: 4.5
  }
];

const CATEGORIES = ["All Categories", "Main Dishes", "Desserts", "Breakfast", "Sides", "Drinks"];

const Recipes = () => {
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All Categories");
  
  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesTitle = recipe.title.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = filterCategory === "All Categories" || recipe.category === filterCategory;
    return matchesTitle && matchesCategory;
  });
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Recipes</h1>
          <Button asChild>
            <Link to="/recipes/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Recipe
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Filter recipes..." 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <Select 
            value={filterCategory}
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <RecipeGrid 
          recipes={filteredRecipes}
          emptyMessage="No recipes match your search"
        />
      </div>
    </MainLayout>
  );
};

export default Recipes;
