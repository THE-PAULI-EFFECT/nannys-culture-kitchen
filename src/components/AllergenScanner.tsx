import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, X, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ALLERGEN_DB,
  type AllergenId,
  type AllergenProfile,
  type AllergenScanResult,
  scanRecipeForAllergens,
  getAllergenVerdict,
} from "@/lib/allergens";

interface AllergenScannerProps {
  ingredients: string[];
  declaredAllergens?: string[];
  compact?: boolean;
}

const SEVERITY_COLORS = {
  high: "text-red-400 bg-red-500/10 border-red-500/30",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  low: "text-blue-400 bg-blue-500/10 border-blue-500/30",
};

const VERDICT_CONFIG = {
  safe: { icon: ShieldCheck, label: "Safe for you", color: "text-brand-green", bg: "bg-brand-green/10" },
  warning: { icon: ShieldAlert, label: "Caution", color: "text-amber-400", bg: "bg-amber-500/10" },
  danger: { icon: Shield, label: "Contains allergens", color: "text-red-400", bg: "bg-red-500/10" },
};

const AllergenScanner = ({ ingredients, declaredAllergens = [], compact = false }: AllergenScannerProps) => {
  const [profile, setProfile] = useState<AllergenProfile>(() => {
    const stored = localStorage.getItem("nannys-allergen-profile");
    if (stored) {
      try { return JSON.parse(stored); } catch { /* ignore */ }
    }
    return { allergies: [], intolerances: [] };
  });

  const [showPicker, setShowPicker] = useState(false);

  const saveProfile = (updated: AllergenProfile) => {
    setProfile(updated);
    localStorage.setItem("nannys-allergen-profile", JSON.stringify(updated));
  };

  const toggleAllergen = (allergenId: AllergenId, type: "allergies" | "intolerances") => {
    const updated = { ...profile };
    const list = [...updated[type]];
    const idx = list.indexOf(allergenId);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(allergenId);
      // Remove from the other list if present
      const otherType = type === "allergies" ? "intolerances" : "allergies";
      updated[otherType] = updated[otherType].filter((a) => a !== allergenId);
    }
    updated[type] = list;
    saveProfile(updated);
  };

  const hasProfile = profile.allergies.length > 0 || profile.intolerances.length > 0;
  const results = hasProfile ? scanRecipeForAllergens(ingredients, declaredAllergens, profile) : [];
  const verdict = getAllergenVerdict(results);
  const verdictConfig = VERDICT_CONFIG[verdict];
  const VerdictIcon = verdictConfig.icon;

  if (compact && !hasProfile) {
    return (
      <button
        onClick={() => setShowPicker(true)}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Shield className="h-3.5 w-3.5" />
        Set allergies
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Verdict badge */}
      {hasProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium ${verdictConfig.bg} ${verdictConfig.color} border-current/20`}
        >
          <VerdictIcon className="h-3.5 w-3.5" />
          {verdictConfig.label}
          {results.length > 0 && (
            <span className="text-[10px] opacity-70">({results.length} found)</span>
          )}
        </motion.div>
      )}

      {/* Allergen hits */}
      <AnimatePresence>
        {results.map((result) => {
          const allergen = ALLERGEN_DB[result.allergenId];
          return (
            <motion.div
              key={result.allergenId}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${SEVERITY_COLORS[result.severity as keyof typeof SEVERITY_COLORS]}`}
            >
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">{allergen.icon} {allergen.label}</span>
                <p className="mt-0.5 opacity-70">
                  Found: {result.matchedKeywords.join(", ")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Profile editor toggle */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPicker ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        {showPicker ? "Close" : hasProfile ? "Edit allergies" : "Set your allergies"}
      </button>

      {/* Allergen picker */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-2">
              <p className="text-xs text-muted-foreground">
                Select your allergies and intolerances. We'll scan every recipe for you.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(ALLERGEN_DB).map((allergen) => {
                  const isAllergy = profile.allergies.includes(allergen.id as AllergenId);
                  const isIntolerance = profile.intolerances.includes(allergen.id as AllergenId);
                  const isActive = isAllergy || isIntolerance;

                  return (
                    <div key={allergen.id} className="space-y-1">
                      <button
                        onClick={() => toggleAllergen(allergen.id as AllergenId, "allergies")}
                        className={`w-full flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-all ${
                          isAllergy
                            ? "border-red-500/50 bg-red-500/10 text-red-400"
                            : isIntolerance
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                            : "border-border/50 bg-card text-muted-foreground hover:border-border"
                        }`}
                      >
                        <span>{allergen.icon}</span>
                        <span>{allergen.label}</span>
                      </button>
                      {isActive && (
                        <div className="flex gap-1 px-1">
                          <Button
                            size="sm"
                            variant={isAllergy ? "destructive" : "ghost"}
                            className="h-5 text-[10px] flex-1"
                            onClick={() => toggleAllergen(allergen.id as AllergenId, "allergies")}
                          >
                            Allergy
                          </Button>
                          <Button
                            size="sm"
                            variant={isIntolerance ? "default" : "ghost"}
                            className="h-5 text-[10px] flex-1"
                            onClick={() => toggleAllergen(allergen.id as AllergenId, "intolerances")}
                          >
                            Intolerance
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllergenScanner;
