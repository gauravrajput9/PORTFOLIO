# Portfolio v2 plan

- **Architecture:** Vite + React SPA, data-led project cards, shareable project routes handled by the client router.
- **Design:** near-black editorial system with violet/indigo accents, Space Grotesk display type, Inter body, and JetBrains Mono labels.
- **3D strategy:** a lazy R3F systems core; an SVG/CSS core is always available before it loads or when motion is reduced.
- **Performance:** code-split the 3D canvas, use local font packages, no image or third-party-script dependency.
- **Dependencies:** `three` and R3F for the core; `motion` for lightweight animation support; Lucide for accessible interface icons; Fontsource variable fonts for self-hosted typography.
- **Verification:** lint, production build, inspect home / case study / unknown route locally, and test responsiveness manually.
