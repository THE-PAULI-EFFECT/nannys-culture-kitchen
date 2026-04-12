// Nanny's Culture Kitchen — Brand Constants

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
    gold: "hsl(38, 75%, 50%)",
    green: "hsl(142, 55%, 35%)",
    copper: "hsl(20, 70%, 45%)",
    charcoal: "hsl(25, 20%, 6%)",
    cream: "hsl(38, 40%, 95%)",
    warmWhite: "hsl(30, 20%, 97%)",
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
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
    colorAccent: "copper",
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

export const DANNY_MEYER_PRINCIPLES = {
  hospitalityFirst:
    "Hospitality is the foundation of our business philosophy. It's how the delivery of a product makes its recipient feel.",
  settingTheTable:
    "The way you set the table—physically and emotionally—determines the experience.",
  enlightenedHospitality: [
    "Caring for each other (staff)",
    "Caring for our guests",
    "Caring for our community",
    "Caring for our suppliers",
    "Caring for our investors",
  ],
  serviceVsHospitality:
    "Service is the technical delivery of a product. Hospitality is how the delivery makes the recipient feel.",
  errorRecovery:
    "The road to success is paved with mistakes well handled. Err on the side of generosity.",
  consistency:
    "The secret isn't one big thing. It's a thousand small things done with consistent excellence.",
} as const;
