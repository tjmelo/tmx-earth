# Quickstart — Validate Dark Mode & Data Flow

Prerequisites:
- Node.js (v18+ recommended)
- Yarn or npm

Steps:
1. Install dependencies

```bash
npm install
# or
# yarn
```

2. Start dev server

```bash
npm run start
# or
# yarn dev
```

3. Validate country data flow
- Open the app at `http://localhost:5173` (or the port printed by the dev server).
- Verify that the country list loads and you can open a country detail view.

4. Validate dark mode
- Toggle the dark mode control in the UI.
- Verify the theme updates immediately across screens.
- Refresh the page and confirm the selected preference persists.

Expected outcomes:
- Country data renders as before.
- Dark mode toggles and persists using `localStorage` key `tmx:appearance`.
