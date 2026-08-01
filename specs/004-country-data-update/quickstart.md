# Quickstart — Validate the Country Data Migration

## Prerequisites

- Node.js 18+ recommended
- npm

## Steps

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run start
```

3. Validate the country list experience

- Open the app and confirm the country dropdown is populated from the updated provider.
- Select a country and verify the detail view still renders without empty or broken fields.

4. Validate failure handling

- Temporarily interrupt the network or point the request layer to an unavailable endpoint and confirm the app shows a clear loading or error state.
- Verify that missing values are displayed as unavailable rather than as blank or misleading UI.

5. Run the relevant tests

```bash
npm test -- --watchAll=false
```

## Expected outcomes

- The app continues to browse and display countries after the endpoint change.
- Detail lookups by country name still work.
- Missing or failed data results in clear and resilient user feedback.
