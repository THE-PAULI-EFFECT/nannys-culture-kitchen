
import MainLayout from "@/components/layout/MainLayout";
import MealPlannerCalendar from "@/components/meal-planner/MealPlannerCalendar";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const MealPlanner = () => {
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    if (!initialized) {
      toast({
        title: "Meal Planner",
        description: "Click + to add recipes to your meal plan",
      });
      setInitialized(true);
    }
  }, [initialized]);
  
  const handleAddMeal = (date: string, mealType: string) => {
    // This would typically open a modal to select a recipe
    toast({
      title: "Add to Meal Plan",
      description: `Add recipe for ${mealType} on ${date}`,
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold">Meal Planner</h1>
        <p className="text-muted-foreground">
          Plan your meals for the week ahead and automatically generate shopping lists.
        </p>
        
        <MealPlannerCalendar onAddMeal={handleAddMeal} />
      </div>
    </MainLayout>
  );
};

export default MealPlanner;
