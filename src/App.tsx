
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/lib/language-context";

// Pages — lazy loaded for performance
const Index = lazy(() => import("./pages/Index"));
const SoulFoodKitchen = lazy(() => import("./pages/SoulFoodKitchen"));
const SoulFoodRecipeDetail = lazy(() => import("./pages/SoulFoodRecipeDetail"));
const LatinKitchen = lazy(() => import("./pages/LatinKitchen"));
const LatinRecipeDetail = lazy(() => import("./pages/LatinRecipeDetail"));
const CateringAgent = lazy(() => import("./pages/CateringAgent"));
const NannyDashboard = lazy(() => import("./pages/NannyDashboard"));
const HealthHub = lazy(() => import("./pages/HealthHub"));
const EarningsPage = lazy(() => import("./pages/EarningsPage"));
const OperationsPage = lazy(() => import("./pages/OperationsPage"));
const InteractiveMenu = lazy(() => import("./pages/InteractiveMenu"));
const ChefDashboard = lazy(() => import("./pages/ChefDashboard"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const StorePage = lazy(() => import("./pages/StorePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-muted-foreground font-mono">Loading...</p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/soul-food" element={<SoulFoodKitchen />} />
              <Route path="/soul-food/:id" element={<SoulFoodRecipeDetail />} />
              <Route path="/latin-kitchen" element={<LatinKitchen />} />
              <Route path="/latin-kitchen/:id" element={<LatinRecipeDetail />} />
              <Route path="/catering" element={<CateringAgent />} />
              <Route path="/dashboard" element={<NannyDashboard />} />
              <Route path="/health" element={<HealthHub />} />
              <Route path="/earnings" element={<EarningsPage />} />
              <Route path="/operations" element={<OperationsPage />} />
              <Route path="/menu" element={<InteractiveMenu />} />
              <Route path="/chef-dashboard" element={<ChefDashboard />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
