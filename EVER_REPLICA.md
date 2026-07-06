# Ever website replica

This React frontend replicates the **Ever** landing page (ever-live-here.com) using JSX, Tailwind CSS, and the saved resources from the `ever_live_here.com` folder.

## What’s included

- **Header** – Logo, menu, Apartments, 3D tour, favourites, Request call-back (fixed, responsive).
- **Intro** – Full-height hero with split background (left: image, right: video on desktop), “Live here” title, scroll CTA, tagline, “View on the map”.
- **Architecture** – Section with title, rounded image block (mobile), main image area with tabs, short copy.
- **Interior** – Section with warm theme and interior image.
- **Territory** – Green-themed section with territory image and copy.
- **Map** – Location text and map SVG (map-en.svg).
- **Footer** – Logo and links.

Assets (images, fonts, icons, video) are served from `public/ever/`, which is a copy of the saved `ever_live_here.com/ever-live-here.com` content. The first time you set this up, assets were copied from `ever_live_here.com/ever-live-here.com` into `React-Frontend/public/ever/`. If you update the saved site, copy that folder again into `public/ever/`.

## Run locally

```bash
cd React-Frontend
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5174). The page should look like the original Ever landing: same structure, typography, and color palette (cold/warm/green themes).

## Tech stack

- React 19, Vite
- Tailwind CSS (Ever theme in `tailwind.config.js` and `src/index.css`)
- No extra UI libs; layout and styling are Tailwind + minimal custom CSS

## Matching the original

- **Colors**: `ever-cold-1/2/3`, `ever-warm-1/2/3`, `ever-green` in Tailwind; CSS variables in `index.css`.
- **Layout**: Same section order and approximate layout (intro full-height split, architecture grid, etc.).
- **Assets**: Paths use `/ever/assets/...`; ensure `public/ever/assets` exists (see above).

To get even closer to the original, you can add more sections or copy additional CSS from `ever_live_here.com/ever-live-here.com/assets/stylesheets/landing.css` and `global.css` into your Tailwind config or a custom CSS file.
