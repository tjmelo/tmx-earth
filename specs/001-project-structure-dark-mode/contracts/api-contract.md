# API Contract — REST Countries

Summary: The feature MUST continue to use the existing REST Countries API used by the application. No changes to endpoints, query formats, or expected fields are introduced by this plan.

Contract:
- Endpoint: `https://restcountries.com/v3.1/` (project-specific configuration in `src/model/api.ts`)
- Expected fields used by the app: `name.common`, `population`, `area`, `region`, `flags`, `cca3` (or whichever fields the app currently consumes)

Stability requirements:
- The app code must defensively handle missing or extra fields.
- Any mapping logic that converts raw API responses into the app's `Country` entity should remain stable and backward-compatible.

Verification:
- Add a quick check in `quickstart.md` to confirm the same fields are present when calling the API.
