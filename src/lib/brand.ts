// Nanny's Culture Kitchen — Brand Constants (Mardi Gras / Creole Futuristic)

export const BRAND = {
  name: "Nanny's",
  fullName: "Nanny's Culture Kitchen",
  tagline: "100% Plant-Based. Except for One Thing.",
  subtitle: "Southern Fried Chicken. Because Nanny wouldn't have it any other way.",
  description:
    "A Michelin-level ghost kitchen honoring the soul of home cooking — plant-based, culturally rich, and made with love.",
  story: {
    origin: "Washington, Louisiana",
    founder: "Nanny",
    philosophy:
      "Food is how we take care of people. Every plate tells a story, every recipe carries a memory.",
    mission:
      "Bringing the finest plant-based soul food and Latin American cuisine to every corner of America — one pop-up kitchen at a time.",
  },
  colors: {
    purple: "hsl(270, 65%, 40%)",
    gold: "hsl(45, 90%, 55%)",
    green: "hsl(155, 60%, 35%)",
    copper: "hsl(15, 80%, 50%)",
    magenta: "hsl(320, 75%, 55%)",
    bayou: "hsl(240, 15%, 8%)",
    cream: "hsl(45, 30%, 92%)",
  },
  fonts: {
    heading: "'Sora', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  social: {
    twitter: "",
    instagram: "",
  },
} as const;

export const CHEF_TYPES = {
  soulFood: {
    id: "soul-food",
    label: "Soul Food Kitchen",
    description: "Afro-Caribbean plant-based soul food at its finest",
    chefGender: "male" as const,
    colorAccent: "gold",
    route: "/soul-food",
  },
  latin: {
    id: "latin",
    label: "Latin Kitchen",
    description: "Authentic Mexican cuisine, reimagined 100% plant-based",
    chefGender: "female" as const,
    colorAccent: "green",
    route: "/latin-kitchen",
  },
} as const;

export const NANNYS_PRINCIPLES = {
  hospitalityFirst:
    "Food is how we take care of people. Every plate tells a story, every recipe carries a memory.",
  settingTheTable:
    "When you sit at our table, you're family. The table is set with love before the first dish arrives.",
  enlightenedHospitality: [
    "Caring for each other (staff)",
    "Caring for our guests",
    "Caring for our community",
    "Caring for our suppliers",
    "Caring for our investors",
  ],
  culturalRoots:
    "We honor the traditions that made us — from Washington, Louisiana to every Mexican state.",
  sacredException:
    "Everything is plant-based. Except Nanny's Southern Fried Chicken. Because Nanny wouldn't have it any other way.",
  consistency:
    "The secret isn't one big thing. It's a thousand small things done with consistent excellence.",
} as const;
