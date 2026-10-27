# Gaurav Rajput portfolio

Node.js 22 was used for the current build. Install dependencies with `npm install`, then use:

```powershell
npm run dev
npm run lint
npm run build
npm run preview
npm run check:launch
```

## Structure

- `src/pages/` composes the home, project and not-found pages.
- `src/components/` contains focused shared, layout, navigation, project, section and visual-effect components.
- `src/data/` holds factual project, skill, journey and navigation content.
- `src/hooks/` contains routing, command-palette shortcut and clipboard behavior.
- `src/utils/` holds public URLs and small routing helpers.

The SPA uses a small History API router. Project routes are `/projects/:slug`; both `public/_redirects` (Netlify) and `vercel.json` provide the required production fallback for direct routes. Add projects in `src/data/projects.js`.

## Deployment settings

`npm run check:launch` reports deploy-time missing assets/settings. Add a resume to `public/resume/gaurav-rajput-resume.pdf`; add `VITE_CONTACT_EMAIL` only when a public address is ready. `VITE_SITE_URL` is reserved for deploy metadata.
