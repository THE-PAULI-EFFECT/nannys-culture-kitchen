// Common allergens database and scanner logic

export const ALLERGEN_DB = {
  gluten: {
    id: "gluten",
    label: "Gluten",
    icon: "🌾",
    severity: "high",
    keywords: ["wheat", "flour", "bread", "pasta", "tortilla", "seitan", "barley", "rye", "couscous", "soy sauce", "panko", "crouton"],
  },
  nuts: {
    id: "nuts",
    label: "Tree Nuts",
    icon: "🥜",
    severity: "high",
    keywords: ["almond", "walnut", "pecan", "cashew", "pistachio", "macadamia", "hazelnut", "pine nut", "brazil nut"],
  },
  peanuts: {
    id: "peanuts",
    label: "Peanuts",
    icon: "🥜",
    severity: "high",
    keywords: ["peanut", "peanut butter", "peanut oil", "groundnut"],
  },
  soy: {
    id: "soy",
    label: "Soy",
    icon: "🫘",
    severity: "medium",
    keywords: ["soy", "soybean", "tofu", "tempeh", "edamame", "miso", "soy sauce", "tamari", "soy milk", "soy protein"],
  },
  dairy: {
    id: "dairy",
    label: "Dairy",
    icon: "🥛",
    severity: "medium",
    keywords: ["milk", "cheese", "butter", "cream", "yogurt", "whey", "casein", "lactose", "ghee"],
  },
  eggs: {
    id: "eggs",
    label: "Eggs",
    icon: "🥚",
    severity: "medium",
    keywords: ["egg", "eggs", "mayonnaise", "meringue", "albumin"],
  },
  shellfish: {
    id: "shellfish",
    label: "Shellfish",
    icon: "🦐",
    severity: "high",
    keywords: ["shrimp", "crab", "lobster", "crawfish", "crayfish", "prawn", "scallop", "clam", "mussel", "oyster"],
  },
  sesame: {
    id: "sesame",
    label: "Sesame",
    icon: "⚪",
    severity: "medium",
    keywords: ["sesame", "tahini", "sesame oil", "sesame seeds"],
  },
  coconut: {
    id: "coconut",
    label: "Coconut",
    icon: "🥥",
    severity: "low",
    keywords: ["coconut", "coconut milk", "coconut cream", "coconut oil", "coconut flour"],
  },
  corn: {
    id: "corn",
    label: "Corn",
    icon: "🌽",
    severity: "low",
    keywords: ["corn", "cornmeal", "cornstarch", "corn syrup", "masa", "hominy", "grits", "polenta"],
  },
  nightshade: {
    id: "nightshade",
    label: "Nightshades",
    icon: "🌶️",
    severity: "low",
    keywords: ["tomato", "pepper", "potato", "eggplant", "paprika", "cayenne", "chili", "jalapeño", "chipotle", "habanero", "serrano"],
  },
} as const;

export type AllergenId = keyof typeof ALLERGEN_DB;

export interface AllergenProfile {
  allergies: AllergenId[];
  intolerances: AllergenId[];
}

export interface AllergenScanResult {
  allergenId: AllergenId;
  matchedKeywords: string[];
  severity: string;
  source: "ingredients" | "allergens_field";
}

/**
 * Scan a recipe's ingredients list for allergens matching the user's profile.
 */
export function scanRecipeForAllergens(
  ingredients: string[],
  declaredAllergens: string[],
  userProfile: AllergenProfile
): AllergenScanResult[] {
  const results: AllergenScanResult[] = [];
  const allUserAllergens = [...userProfile.allergies, ...userProfile.intolerances];

  for (const allergenId of allUserAllergens) {
    const allergen = ALLERGEN_DB[allergenId];
    if (!allergen) continue;

    // Check declared allergens field
    const declaredMatch = declaredAllergens.some(
      (a) => a.toLowerCase().includes(allergenId) || allergenId.includes(a.toLowerCase())
    );
    if (declaredMatch) {
      results.push({
        allergenId,
        matchedKeywords: [allergenId],
        severity: allergen.severity,
        source: "allergens_field",
      });
      continue;
    }

    // Scan ingredient text
    const ingredientText = ingredients.join(" ").toLowerCase();
    const matchedKeywords = allergen.keywords.filter((kw) =>
      ingredientText.includes(kw.toLowerCase())
    );
    if (matchedKeywords.length > 0) {
      results.push({
        allergenId,
        matchedKeywords,
        severity: allergen.severity,
        source: "ingredients",
      });
    }
  }

  return results;
}

/**
 * Get a simple "safe/warning/danger" verdict.
 */
export function getAllergenVerdict(results: AllergenScanResult[]): "safe" | "warning" | "danger" {
  if (results.length === 0) return "safe";
  if (results.some((r) => r.severity === "high")) return "danger";
  return "warning";
}
