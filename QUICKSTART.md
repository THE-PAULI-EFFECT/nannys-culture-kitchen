# Nanny's Culture Kitchen — Quick Start

**Live URL**: https://nannys-culture-kitchen.vercel.app  
**GitHub**: https://github.com/THE-PAULI-EFFECT/nannys-culture-kitchen  
**Vercel Dashboard**: https://vercel.com/the-pauli-effect/kitchen-creations-planner-pro-main

---

## What's Built

### 1. **Cinematic Landing Page**
- Full-screen intro animation (6s): dark → golden light → text scramble → typewriter effect
- "100% plant-based... except for one thing. Southern Fried Chicken. Because Nanny wouldn't have it any other way."
- Two chef entry cards (Soul Food + Latin American) with hover 3D flip effects
- Uses Framer Motion + GSAP (imported from cinematic-site-components patterns)

### 2. **Soul Food Kitchen**
- 30+ plant-based soul food recipes
  - Collard Greens, Cornbread, Plant-Based Boudin (Washington, LA special)
  - Plant-Based Gumbo with fried oyster mushroom topping
  - Cashew Mac & Cheese, Black-Eyed Peas, Candied Yams
  - Banana Pudding, Peach Cobbler, Sweet Potato Pie
  - **Southern Fried Chicken** (THE ONE EXCEPTION — "because Nanny wouldn't have it")
- Accordion-slider categories
- Horizontal scroll galleries
- Individual recipe pages with substitution callouts

### 3. **Latin American Kitchen**
- Interactive SVG Mexico map — click a state to see recipes
- 50+ plant-based Mexican recipes (organized by state)
  - Oaxaca: Vegan Mole Negro, Plant-Based Tlayudas
  - Yucatán: Vegan Cochinita (jackfruit), Papadzules
  - Jalisco: Plant-Based Birria, Torta Ahogada
  - Veracruz: Vegan "Huachinango" (oyster mushroom), Arroz a la Tumbada
  - Puebla: Chiles en Nogada, Cemitas
- Seafood replacements: oyster mushrooms, hearts of palm, banana blossom, jackfruit, lion's mane
- State-based recipe browser

### 4. **AI Catering Agent**
- Chat interface (floating bubble + expandable full-screen)
- Powered by Vercel AI SDK
- Tools: `searchRecipes`, `calculatePortions`, `createMenu`, `checkDietaryRestrictions`, `estimateCost`, `generateShoppingList`
- ElevenLabs voice integration (TTS for responses)
- Web Speech API for voice input
- Senior-friendly large controls

### 5. **Interactive QR Menus**
- 3D card-flip menu items
- Allergen badges, category tabs, kinetic marquee headers
- QR code generation per menu (shareable via URL)
- Digital menu responsive on mobile

### 6. **Senior-Friendly Nanny Dashboard**
- Large typography (18px+ base)
- Voice-activated navigation ("Hey Nanny" wake word)
- Today's featured recipe
- App earnings overview
- Recent activity
- Health tracking module (daily check-ins, water intake, meal log, medication reminders)

### 7. **Theme & Branding**
- **Primary color**: Deep warm gold `hsl(38, 75%, 50%)` (Nanny's warmth)
- **Accent**: Forest green `hsl(142, 55%, 35%)` (plant-based identity)
- **Dark backgrounds**: Warm charcoal `hsl(25, 20%, 6%)` (cinematic feel)
- **Copper accent**: `hsl(20, 70%, 45%)` (Louisiana soul)
- **Dark mode default** — all colors optimized for dark theme
- Typography: Playfair Display (headings) + Inter (body)

### 8. **Ghost Kitchen Operations**
- Health inspection codes for all 50 US states
- Pop-up kitchen permit requirements by state
- Street vendor laws and regulations
- Food safety guidelines (temperature, storage, handling)
- Danny Meyer "Setting the Table" service protocols

---

## Tech Stack

- **Framework**: React 18 + Vite 5 + TypeScript (strict mode)
- **UI Components**: shadcn/ui (40+ components)
- **Styling**: Tailwind CSS 3.4 + CSS variables (brand theme)
- **Animation**: Framer Motion + GSAP + ScrollTrigger
- **AI**: Vercel AI SDK + Anthropic/OpenAI
- **Voice**: ElevenLabs TTS + Web Speech API
- **QR Codes**: qrcode.react
- **State**: Zustand
- **Routing**: React Router DOM 6
- **Deployment**: Vercel (auto-deploy on git push)

---

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

Dev server runs on **http://localhost:5173**

---

## Environment Variables

Create `.env.local` in the project root with:

```env
# Optional: Add API keys for features
# VITE_ANTHROPIC_API_KEY=sk-ant-...
# VITE_OPENAI_API_KEY=sk-...
# VITE_ELEVENLABS_API_KEY=sk_...
```

For now, the app works without these (hardcoded fallbacks for demo).

---

## Key Files

**Pages** (`src/pages/`):
- `Index.tsx` — Cinematic landing page
- `SoulFoodKitchen.tsx` → `SoulFoodRecipeDetail.tsx`
- `LatinKitchen.tsx` → `LatinRecipeDetail.tsx`
- `CateringAgent.tsx` — AI chat interface
- `InteractiveMenu.tsx` — QR menu builder
- `NannyDashboard.tsx` — Senior-friendly dashboard

**Components** (`src/components/`):
- `intro/CinematicIntro.tsx` — Landing animation
- `intro/ChefSelector.tsx` — Chef entry cards

**Data** (`src/data/`):
- `soul-food-recipes.ts` — 30+ soul food recipes (835 lines)
- `latin-recipes.ts` — 50+ Latin American recipes (593 lines)

**Theme & Utils** (`src/lib/`):
- `brand.ts` — Brand constants, colors, taglines

---

## Deployment

Every push to `main` auto-deploys to Vercel.

**Current deployment URLs**:
- **Production**: https://kitchen-creations-planner-pro-main.vercel.app
- **Aliased**: https://nannys-culture-kitchen.vercel.app (after Vercel project rename)

To rename Vercel project (if not done yet):
- Go to: https://vercel.com/the-pauli-effect/kitchen-creations-planner-pro-main/settings/general
- Click "Rename project" → Enter "nannys-culture-kitchen"

---

## Next Steps (Post-MVP)

1. **Backend Integration** — Add Supabase for user data persistence
2. **Recipe Database** — Connect to Tandoor Recipes or custom API
3. **Payment Integration** — Stripe for monetization (affiliate links, cookbook sales)
4. **Phone Integration** — Twilio for AI agent to make calls and place orders
5. **Video Content** — Interview Nanny, create recipe demo videos
6. **AR/3D Menus** — Integrate Three.js for 3D food visualization
7. **Health Monitoring** — Track health metrics for seniors
8. **Staff Portal** — Operations dashboard for team management

---

## Support & Resources

- **GitHub**: https://github.com/THE-PAULI-EFFECT/nannys-culture-kitchen
- **Vercel**: https://vercel.com/the-pauli-effect
- **Brand**: See `src/lib/brand.ts` for color palette, taglines, Nanny's story

---

**Built with ❤️ for Nanny**
