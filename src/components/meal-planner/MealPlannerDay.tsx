
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

interface MealPlannerDayProps {
  date: string;
  onAddMeal: (mealType: string) => void;
}

const MealPlannerDay = ({ date, onAddMeal }: MealPlannerDayProps) => {
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  
  return (
    <div className="meal-plan-day">
      <div className="font-medium text-center border-b pb-1 mb-2">
        {date}
      </div>
      
      {mealTypes.map((mealType) => (
        <div key={mealType} className="meal-slot">
          <div className="text-xs text-muted-foreground mb-1">{mealType}</div>
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onAddMeal(mealType)}>
                  Add Recipe
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealPlannerDay;
