
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: number; // in minutes
  isFavorite?: boolean;
  rating?: number;
}

const RecipeCard = ({ id, title, description, image, category, prepTime, isFavorite = false, rating }: RecipeCardProps) => {
  // Determine category color
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      'main-dishes': 'bg-recipe-orange text-white',
      'desserts': 'bg-recipe-red text-white',
      'breakfast': 'bg-recipe-amber text-black',
      'sides': 'bg-recipe-green text-white',
      'drinks': 'bg-recipe-blue text-white'
    };
    
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    return categoryColors[slug] || 'bg-recipe-neutral text-white';
  };
  
  return (
    <Link to={`/recipes/${id}`}>
      <Card className="overflow-hidden recipe-card h-full">
        <div className="overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="recipe-card-image" 
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <Badge className={`${getCategoryColor(category)}`}>{category}</Badge>
            {isFavorite && <Heart className="h-5 w-5 fill-recipe-red text-recipe-red" />}
          </div>
          <CardTitle className="text-lg mt-1 line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{prepTime} min</span>
          </div>
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-recipe-amber fill-recipe-amber mr-1" />
              <span className="text-sm">{rating}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
