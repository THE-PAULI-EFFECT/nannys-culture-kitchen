
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
  category: string;
}

interface ShoppingListProps {
  initialItems?: ShoppingItem[];
}

const ShoppingList = ({ initialItems = [] }: ShoppingListProps) => {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [newItemName, setNewItemName] = useState("");
  
  const categories = ["Produce", "Dairy", "Meat", "Pantry", "Frozen", "Other"];
  
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      name: newItemName.trim(),
      checked: false,
      category: "Other"
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
  };
  
  const handleToggleCheck = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleClearChecked = () => {
    setItems(items.filter(item => !item.checked));
  };
  
  const itemsByCategory = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleAddItem} className="flex gap-2">
        <Input
          placeholder="Add item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>
      
      {items.length > 0 && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleClearChecked}
          className="text-sm"
        >
          Clear completed items
        </Button>
      )}
      
      <div className="space-y-4">
        {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
          <div key={category} className="space-y-2">
            <h3 className="font-medium text-sm text-muted-foreground">{category}</h3>
            <div className="space-y-1">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`item-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggleCheck(item.id)}
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className={`text-sm ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {item.name}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Your shopping list is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
