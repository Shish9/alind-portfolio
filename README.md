# Alind Salahaldin — Blueprint Portfolio

Dark, blueprint-styled single-page portfolio for Alind Salahaldin (Civil Engineering
Graduate / Site Engineer). Built with React + Vite, Tailwind CSS v4, and Framer
Motion, with glowing wireframe SVG illustrations throughout (hero construction
scene, villa, graduation cap, project blueprints, skyline).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build for deployment

```bash
npm run build    # output in dist/ — deploy to any static host
npm run preview  # serve the production build locally
```

The `dist/` folder is a fully static site and can be deployed to Netlify, Vercel,
GitHub Pages, Cloudflare Pages, or any plain web server.

## Replace the CV placeholder

`public/Alind_Salahaldin_CV.pdf` is a generated placeholder. Drop the real CV PDF
over that file (same name) and every "Download CV" button will serve it.
The placeholder can be regenerated with `node scripts/make-placeholder-pdf.mjs`.

## Where things live

- `src/data/cv.js` — **all portfolio content** (experience, projects, skills,
  education, languages, contact). Edit text here, not in components.
- `src/components/` — one component per section, plus:
  - `BlueprintBackground.jsx` — animated grid / crosshairs / parallax backdrop
  - `HeroSVGs.jsx` — glowing wireframe city + crane hero scene, footer skyline
  - `EducationLanguages.jsx` — combined education / languages band
  - `icons.jsx`, `ui.jsx` — shared icon set, section headings, progress rings
- `src/index.css` — Tailwind theme tokens (colors, fonts) and blueprint utilities.

## Notes

- All animations respect `prefers-reduced-motion`.
- Layout: fixed 150px sidebar ≥1024px, top bar + slide-down menu below that.
