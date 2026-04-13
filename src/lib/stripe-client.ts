import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!STRIPE_PUBLIC_KEY) {
    console.warn("Stripe public key not configured.");
    return Promise.resolve(null);
  }
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  image: string;
  category: "merch" | "pantry" | "gift";
}

export const PRODUCTS: Product[] = [
  {
    id: "nck-apron-gold",
    name: "Nanny's Gold Apron",
    description: "Premium cotton apron with embroidered Carnival Gold logo. Built for real kitchen work.",
    price: 3500,
    image: "/store/apron-gold.jpg",
    category: "merch",
  },
  {
    id: "nck-spice-kit",
    name: "Creole Spice Kit",
    description: "7 signature blends from Nanny's kitchen — gumbo filé, blackened seasoning, and more.",
    price: 2800,
    image: "/store/spice-kit.jpg",
    category: "pantry",
  },
  {
    id: "nck-hot-sauce",
    name: "Bayou Fire Hot Sauce (3-pack)",
    description: "Small-batch Louisiana-style hot sauce. Mild, Medium, and Nanny's Revenge.",
    price: 2200,
    image: "/store/hot-sauce.jpg",
    category: "pantry",
  },
  {
    id: "nck-tee-culture",
    name: '"Culture Kitchen" Tee',
    description: "Heavyweight cotton. Mardi Gras purple with gold print. Unisex fit.",
    price: 3200,
    image: "/store/tee-culture.jpg",
    category: "merch",
  },
  {
    id: "nck-gift-card-50",
    name: "Gift Card — $50",
    description: "Good for catering deposits, online store, or future events.",
    price: 5000,
    image: "/store/gift-card.jpg",
    category: "gift",
  },
  {
    id: "nck-cookbook-v1",
    name: "Nanny's Cookbook Vol. 1",
    description: "40 plant-based recipes from Washington, LA to your kitchen. Hardcover.",
    price: 2400,
    image: "/store/cookbook.jpg",
    category: "gift",
  },
];

export const AFFILIATES = [
  { name: "Made In Cookware", commission: "12%", url: "https://madeincookware.com", category: "Cookware" },
  { name: "Vitamix", commission: "10%", url: "https://vitamix.com", category: "Appliances" },
  { name: "Lodge Cast Iron", commission: "8%", url: "https://lodgecastiron.com", category: "Cookware" },
  { name: "KitchenAid", commission: "8%", url: "https://kitchenaid.com", category: "Appliances" },
  { name: "Williams Sonoma", commission: "8-10%", url: "https://williams-sonoma.com", category: "Kitchen" },
  { name: "Sur La Table", commission: "7%", url: "https://surlatable.com", category: "Kitchen" },
];
