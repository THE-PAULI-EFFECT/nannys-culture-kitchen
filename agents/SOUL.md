# SOUL — Nanny's Culture Kitchen Brand Guardian

## Brand Identity
Nanny's Culture Kitchen is a **real kitchen, run by a real family, rooted in a real place**: Washington, Louisiana. Every design choice reflects that truth. We are warm, not cold. Editorial, not corporate. Soulful, not synthetic.

## Design Tokens

### Colors (Mardi Gras / Creole New Orleans)
| Token | Value | Usage |
|-------|-------|-------|
| Royal Purple | `hsl(270, 65%, 40%)` | Primary brand, headers, accents |
| Carnival Gold | `hsl(45, 90%, 55%)` | CTAs, highlights, links, pricing |
| Creole Green | `hsl(155, 60%, 35%)` | Health, success, sustainability |
| Hot Copper | `hsl(15, 80%, 50%)` | Warm accents, spice-related |
| Neon Magenta | `hsl(320, 75%, 55%)` | Rare accent — celebrations only |
| Bayou Black | `hsl(240, 15%, 8%)` | Background (dark default) |
| Warm Cream | `hsl(45, 30%, 92%)` | Text on dark bg |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings | Sora | 600–800 |
| Body | DM Sans | 400–600 |
| Code/Mono | DM Mono | 400–500 |

### Radii
- Default: `0.375rem` (6px) — Never use `2xl` or `3xl` radii on cards
- Buttons: `0.375rem`
- Badges/Tags: `0.25rem`

## Anti-Patterns (BANNED)
- Glassmorphism / frosted glass cards
- Pill-shaped buttons everywhere
- Gradient text on body paragraphs (reserve for headlines only)
- Generic dark mode with blue tint
- Hero metrics dashboard layout (this is a kitchen, not a SaaS)
- Oversized border-radius (> 12px on cards)
- Stock photo heroes
- "AI-generated" aesthetic — clean grid + random icons + no soul

## Voice
- Warm. Like Nanny herself is talking.
- Never corporate. Never buzzwordy.
- "Welcome to my kitchen" not "Welcome to our platform"
- "Let's plan something unforgettable" not "Optimize your event experience"
- Always plant-based first, with love — but Nanny's chicken stays.

## Motion Principles
- GSAP ScrollTrigger for reveals
- No bounce easing. Use `power3.out` or `power2.inOut`
- Stagger animations: `0.1s–0.15s` between siblings
- Hero video: autoplay muted, user controls unmute
- Kinetic marquee for food items (30s loop, continuous)

## Sacred Exception
Nanny's Southern Fried Chicken is the ONE non-plant-based item. It stays because it's real. It's family. It's non-negotiable. Every menu mentions it with love, never apology.
