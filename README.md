# L-Cuisine

> L'Art du Braise Authentique — A modern restaurant landing page for a charcoal-grilled cuisine delivery service in Arras.

## Tech Stack

- **React 19** — Latest React with the new JSX transform
- **TypeScript 6** — Strictly typed
- **Vite 8** — Fast dev builds and HMR
- **Tailwind CSS 4** — Utility-first styling
- **Framer Motion** — Smooth animations and gestures
- **i18next** — Full French/English bilingual support
- **Lucide React** — Lightweight icon library
- **Radix UI** — Accessible, unstyled primitives (Accordion, Dialog, Slot)

## Features

- **Bilingual** — Instant French/English toggle via i18next
- **Interactive Menu** — Filter by category (fish, chicken, sides), product modal with sauce & spice options
- **Shopping Cart** — Persistent cart with add/remove, upsell suggestions, and inline checkout flow
- **Delivery Zones** — Dynamic pricing table by area with minimum order and estimated time
- **Time Slot Picker** — Select a delivery window from available daily slots
- **Animated UI** — Ken-Burns hero background, ember particles effect, scroll-triggered reveals, live badges
- **Contact & Ordering** — WhatsApp integration and email contact form
- **FAQ Accordion** — Expandable Q&A section
- **Responsive** — Mobile-first layout with full-width sections
- **Spy on Scroll**  — Scroll spy highlights the active navbar item

## Sections

| Section      | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| Hero         | Full-screen with background animation, stats, and CTAs             |
| Menu         | Product grid with category filters, detail modals, and add-to-cart |
| About        | Brand story with highlights                                        |
| Delivery     | Zone pricing table and WhatsApp CTA                                |
| Hours        | Time slot booking                                                  |
| Testimonials | Customer reviews carousel                                          |
| FAQ          | Accordion with common questions                                    |
| Contact      | Contact form with WhatsApp/email options                           |
| Cart         | Slide-out drawer with checkout flow                                |

## Getting Started

```bash
npm install
npm run dev      # starts on port 4200
npm run build    # tsc + vite build
npm run preview  # preview production build
npm run lint     # ESLint flat config
```

## Project Structure

```
src/
├── components/
│   ├── cart/        # CartDrawer, CheckoutFlow
│   ├── effects/     # EmberParticles, FadeIn
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, Menu, About, Delivery, Hours, etc.
│   └── ui/          # Reusable UI primitives
├── data/            # Products, testimonials, FAQ, delivery zones
├── hooks/           # useCart (context + reducer)
├── i18n/            # fr.ts, en.ts translations
├── lib/             # Utility helpers
└── types/           # Shared TypeScript interfaces
```

# Deploy 
- Deploy a React SPA automatically
- Todos:
  - Create a Netlify Site
    - Site ID == Client ID
    - Auth Token
  - Add GitHub Secrets (Not Variable)
    - Settings -> Secrets and variables -> Actions
    - NETLIFY_AUTH_TOKEN --> secrets
    - NETLIFY_SITE_ID  --> secrets
  - Create GitHub Actions YAML
    - Call it deploy.yml
    - netlify-cli is used as npm
- Netlify 
  - tulnhbu059@pluniversity.edu.pl 
  - V2026#
  - LauraCuisine
  - ID= nfp_kWAwBXdasKNKGhW6LPQ7bzzhjBFc9nJz9382
- CLI Netlify
  - npm install -D netlify-cli
  - 