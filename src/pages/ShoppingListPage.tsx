
import MainLayout from "@/components/layout/MainLayout";
import ShoppingList from "@/components/shopping-list/ShoppingList";

// Sample items
const SAMPLE_ITEMS = [
  { id: "1", name: "Tomatoes", checked: false, category: "Produce" },
  { id: "2", name: "Cheese", checked: false, category: "Dairy" },
  { id: "3", name: "Chicken", checked: false, category: "Meat" },
  { id: "4", name: "Pasta", checked: false, category: "Pantry" },
  { id: "5", name: "Basil", checked: false, category: "Produce" },
  { id: "6", name: "Garlic", checked: false, category: "Produce" },
];

const ShoppingListPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold">Shopping List</h1>
        <p className="text-muted-foreground">
          Manage your grocery list and add items directly from recipes.
        </p>
        
        <ShoppingList initialItems={SAMPLE_ITEMS} />
      </div>
    </MainLayout>
  );
};

export default ShoppingListPage;
