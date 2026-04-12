
import { 
  Sidebar as UISidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, Home, Search, ShoppingBag, UtensilsCrossed } from "lucide-react";

const Sidebar = () => {
  return (
    <UISidebar>
      <SidebarHeader className="py-5 text-center">
        <Link to="/" className="flex items-center justify-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-recipe-orange" />
          <h1 className="font-serif text-lg font-medium">Recipe Box</h1>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/recipes">
                    <BookOpen className="h-5 w-5" />
                    <span>Recipes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/search">
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/meal-planner">
                    <Calendar className="h-5 w-5" />
                    <span>Meal Planner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/shopping-list">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Shopping List</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {["Main Dishes", "Desserts", "Breakfast", "Sides", "Drinks"].map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton asChild>
                    <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                      <span>{category}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarTrigger className="w-full flex justify-center">
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>
      </SidebarFooter>
    </UISidebar>
  );
};

export default Sidebar;
