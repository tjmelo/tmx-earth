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

1. Start the app:

```bash
npm start
```

2. Open the running application in the browser and confirm the app loads with the updated, consistent visual style.

3. Inspect the primary experience in both appearance modes:
   - Toggle dark/light mode.
   - Confirm the app maintains a coherent palette, readable text, and consistent surfaces.

4. Check the core user journey:
   - Browse the country list.
   - Open country details.
   - Ensure the workflow remains easy to understand and fully usable after the visual update.

5. Validate accessibility basics:
   - Tab through interactive controls.
   - Ensure focus states are visible.
   - Confirm text and controls remain readable against the chosen backgrounds.

6. Run the project checks:

```bash
npm test -- --watchAll=false
npm run build
```

## Expected outcome

The app should feel materially inspired, consistent, and readable without any loss of functionality or clarity in the existing country browsing experience.
