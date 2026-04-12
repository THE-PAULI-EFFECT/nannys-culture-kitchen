import MainLayout from "@/components/layout/MainLayout";
import RecipeGrid from "@/components/recipe/RecipeGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<typeof RECIPES>([]);
  
  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);
  
  const handleSearch = () => {
    const filtered = RECIPES.filter(recipe => {
      const searchLower = searchQuery.toLowerCase();
      return (
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.category.toLowerCase().includes(searchLower)
      );
    });
    
    setResults(filtered);
  };
  
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>
          
          <div className="flex gap-2">
            <Input
              placeholder="Search by name, ingredient, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <SearchIcon className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-medium">
              Found {results.length} recipe{results.length !== 1 ? 's' : ''}
            </h2>
            <RecipeGrid recipes={results} />
          </div>
        )}
        
        {searchQuery && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No recipes found matching "{searchQuery}"
            </p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
        
        {!searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Enter a search term to find recipes
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
