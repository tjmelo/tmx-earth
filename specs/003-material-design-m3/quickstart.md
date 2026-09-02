# Quickstart Validation Guide

## Prerequisites

- Node.js and npm installed
- Repository dependencies installed with `npm install`

## Setup

```bash
cd /home/thiago/Documents/projects/tmx-earth
npm install
```

## Validate the design refresh

1. Start the app locally (development):

```bash
npm start
```

2. Smoke-check the running site in a browser:
   - Open `http://localhost:8080` (or the URL printed by the dev server).
   - Confirm the app shell, list surface, and details panel render with the refreshed visual language.
   - Verify there are no uncaught console errors or React warnings.

3. Appearance toggle and persistence:
   - Toggle between light and dark modes using `DarkModeToggle`.
   - Confirm the visual tokens (palette, elevation, radii, spacing) update coherently.
   - Reload the page and verify the chosen appearance persists (localStorage or preference storage).

4. Core user journey verification:
   - Search and browse the country list.
   - Open at least three country detail views (desktop, tablet, mobile widths).
   - Verify selection, back/forward navigation, and expected fields are present and legible.

5. Accessibility & keyboard checks:
   - Tab through interactive controls and confirm focus visibility and order.
   - Use keyboard-only navigation to open and close detail views.
   - Spot-check color contrast for primary text against surfaces (browser devtools or axe/Lighthouse).

6. Responsive & visual polish:
   - Resize the viewport to mobile and tablet sizes and confirm layout stability.
   - Check rounded corners, shadows, and spacing feel consistent across surfaces.

7. Automated verification (run locally):

```bash
npm test -- --watchAll=false
npm run build
```

8. Post-build checks:
   - Serve the production build (`npm run serve`) and repeat steps 2–6 against the production bundle.
   - Ensure the production build does not introduce new visual regressions or console errors.

9. Record results:
   - Note any regressions and create issues linking screenshots, steps to reproduce, and device/viewport used.
   - If accessibility or contrast problems are found, add concrete remediation recommendations (token changes, focus styles).

## Expected outcome

The app should feel materially inspired, consistent, and readable without any loss of functionality or clarity in the existing country browsing experience.
