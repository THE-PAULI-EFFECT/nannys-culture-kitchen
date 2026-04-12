
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";
import { useState } from "react";
import MealPlannerDay from "./MealPlannerDay";

interface MealPlannerCalendarProps {
  onAddMeal: (day: string, mealType: string) => void;
}

const MealPlannerCalendar = ({ onAddMeal }: MealPlannerCalendarProps) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Generate dates for the current week
  const getDaysOfWeek = () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    
    // Adjust for current week offset
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };
  
  const daysOfWeek = getDaysOfWeek();
  
  const formatWeekRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const startDate = daysOfWeek[0].toLocaleDateString(undefined, options);
    const endDate = daysOfWeek[6].toLocaleDateString(undefined, options);
    return `${startDate} - ${endDate}`;
  };
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setCurrentWeek(prev => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h3 className="text-lg font-medium">{formatWeekRange()}</h3>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setCurrentWeek(prev => prev + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => {
          const dateStr = day.toISOString().split('T')[0];
          const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
          const dayOfMonth = day.getDate();
          
          return (
            <MealPlannerDay 
              key={dateStr}
              date={`${dayName} ${dayOfMonth}`}
              onAddMeal={(mealType) => onAddMeal(dateStr, mealType)}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default MealPlannerCalendar;
