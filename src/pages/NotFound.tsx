
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <UtensilsCrossed className="h-20 w-20 text-recipe-orange mb-8" />
      <h1 className="text-4xl font-bold font-heading">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mt-4 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild size="lg">
        <Link to="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;

